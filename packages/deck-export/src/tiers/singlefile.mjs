/**
 * singlefile — collapse a running page into ONE self-contained .html file.
 *
 * The motivating case: a client who has never logged in. A single file can be
 * dropped into WhatsApp, email or AirDrop and opens with no server, no login
 * and no network. That means every external reference has to be resolved and
 * embedded before serialising:
 *
 *   • <link rel=stylesheet>  → inlined <style>, with url() inside the CSS
 *                              recursively embedded (fonts, background images)
 *   • <img src|srcset>       → data: URI (srcset dropped — one source is
 *                              enough once the bytes are embedded, and keeping
 *                              it would multiply file size by the variant count)
 *   • <script src>           → removed. In dev these are HMR/toolbar plumbing
 *                              that is useless offline and noisy in the output;
 *                              inline scripts are preserved.
 *
 * The page is driven over HTTP like every other tier — the exporter never
 * imports the site's source, so it works against dev, preview or production.
 *
 * Distribution options (for sending a deck to readers rather than reviewers):
 *
 *   dropTier "post-nda" → removes every section tagged data-tier="post-nda",
 *                          before inlining, so its images are never embedded.
 *   clean               → removes the authoring chrome (slide-rank pill, deck
 *                          overlays and their inline scripts) and injects a
 *                          small inline runtime that restores what stripping
 *                          <script src> broke on a scroll deck: keyboard and
 *                          double-click navigation, the NN / total counter with
 *                          type-to-jump, #N deep links, and the light / dark /
 *                          vibrant toggle.
 */
import { writeFile, mkdir } from "node:fs/promises";
import { dirname } from "node:path";
import { chromium } from "playwright";

/** Log in through the passcode gate when the route sits behind middleware. */
async function authenticate(page, baseUrl, passcode, log) {
  await page.goto(`${baseUrl}/access`, { waitUntil: "networkidle" });
  const field = page.locator('input[name="passcode"]');
  if (!(await field.count())) {
    log("  no passcode form at /access — continuing unauthenticated");
    return;
  }
  await field.fill(passcode);
  await field.press("Enter");
  await page.waitForTimeout(1200);
  log("  authenticated");
}

/** Runs INSIDE the page, before inlining. */
const CLEAN_IN_PAGE = ({ dropTier, clean }) => {
  let dropped = 0;
  if (dropTier) {
    document.querySelectorAll(`[data-tier="${dropTier}"]`).forEach((el) => { el.remove(); dropped++; });
  }
  if (clean) {
    document.querySelectorAll(".ddd-overlay, [data-slide-rank-pill], [data-ddd-overlay]").forEach((el) => el.remove());
    // The only inline scripts left on a deck page are authoring ones (the rater);
    // the distribution runtime below replaces the navigation they don't provide.
    document.querySelectorAll("script:not([src])").forEach((sc) => sc.remove());
  }
  return dropped;
};

/**
 * The scroll-deck runtime injected by `clean`. Self-contained: it reads only
 * the markup PageAsDeckWrapper, SlidePaginator and ModeToggle render.
 */
const DECK_RUNTIME = `(() => {
  const wrap = document.querySelector(".ddd-deck-wrapper");
  const sections = [...document.querySelectorAll("section[data-slot]")];
  if (!sections.length) return;
  const cur = document.querySelector(".ddd-paginator-current");
  const tot = document.querySelector(".ddd-paginator-total");
  if (tot) tot.textContent = String(sections.length);
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  let index = 0;
  const go = (i) => {
    const n = Math.max(0, Math.min(sections.length - 1, i));
    sections[n].scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
  };
  const io = new IntersectionObserver((entries) => {
    for (const e of entries) {
      if (!e.isIntersecting) continue;
      index = sections.indexOf(e.target);
      if (cur && document.activeElement !== cur) cur.value = String(index + 1);
      wrap && wrap.classList.toggle("at-first", index === 0);
      history.replaceState(null, "", "#" + (index + 1));
    }
  }, { root: wrap, threshold: 0.55 });
  sections.forEach((s) => io.observe(s));
  document.addEventListener("keydown", (e) => {
    if (e.metaKey || e.ctrlKey || e.altKey) return;
    const t = e.target;
    if (t && (t.tagName === "INPUT" || t.tagName === "TEXTAREA" || t.isContentEditable)) return;
    const k = e.key;
    if (k === "ArrowDown" || k === "PageDown" || (k === " " && !e.shiftKey)) go(index + 1);
    else if (k === "ArrowUp" || k === "PageUp" || (k === " " && e.shiftKey)) go(index - 1);
    else if (k === "Home") go(0);
    else if (k === "End") go(sections.length - 1);
    else return;
    e.preventDefault();
  });
  (wrap || document).addEventListener("dblclick", (e) => {
    if (e.target.closest("a, button, input")) return;
    go(index + (e.clientY > innerHeight / 2 ? 1 : -1));
  });
  if (cur) cur.addEventListener("keydown", (e) => {
    if (e.key !== "Enter") return;
    const n = parseInt(cur.value, 10);
    if (n) go(n - 1);
    cur.blur();
  });
  const start = parseInt(location.hash.slice(1), 10);
  if (start > 1) requestAnimationFrame(() => go(start - 1));

  const modes = ["light", "dark", "vibrant"];
  const root = document.documentElement;
  const btn = document.querySelector("[data-ddd-mode-toggle]");
  const set = (m) => {
    root.setAttribute("data-mode", m);
    if (btn) btn.setAttribute("aria-label", "Color mode: " + m);
    try { localStorage.setItem("dididecks-mode", m); } catch {}
  };
  try { const saved = localStorage.getItem("dididecks-mode"); if (modes.includes(saved)) set(saved); } catch {}
  if (btn) btn.addEventListener("click", () => set(modes[(modes.indexOf(root.getAttribute("data-mode") || "light") + 1) % modes.length]));

  const hint = document.querySelector(".ddd-nav-hint");
  if (hint) setTimeout(() => { hint.style.transition = "opacity 400ms"; hint.style.opacity = "0"; setTimeout(() => hint.remove(), 450); }, 2400);
})();`;

/**
 * Everything below runs INSIDE the page: it needs `fetch` with the page's
 * cookies and its own origin to resolve relative URLs correctly.
 */
const INLINE_IN_PAGE = async () => {
  const cache = new Map();

  async function toDataUri(url) {
    if (!url || url.startsWith("data:")) return url;
    const abs = new URL(url, location.href).href;
    if (cache.has(abs)) return cache.get(abs);
    try {
      const res = await fetch(abs, { credentials: "include" });
      if (!res.ok) return url;
      const blob = await res.blob();
      const uri = await new Promise((resolve) => {
        const fr = new FileReader();
        fr.onload = () => resolve(fr.result);
        fr.onerror = () => resolve(url);
        fr.readAsDataURL(blob);
      });
      cache.set(abs, uri);
      return uri;
    } catch {
      return url;
    }
  }

  /** Recursively embed url(...) references inside a stylesheet's text. */
  async function inlineCssUrls(cssText, baseHref) {
    const urls = [...cssText.matchAll(/url\(\s*['"]?([^'")]+)['"]?\s*\)/g)]
      .map((m) => m[1])
      .filter((u) => u && !u.startsWith("data:"));
    for (const u of [...new Set(urls)]) {
      let abs;
      try { abs = new URL(u, baseHref).href; } catch { continue; }
      const uri = await toDataUri(abs);
      if (uri !== abs) {
        cssText = cssText.split(u).join(uri);
      }
    }
    return cssText;
  }

  // 1. Stylesheets → <style>
  const links = [...document.querySelectorAll('link[rel="stylesheet"][href]')];
  for (const link of links) {
    try {
      const href = new URL(link.getAttribute("href"), location.href).href;
      const res = await fetch(href, { credentials: "include" });
      let css = await res.text();
      css = await inlineCssUrls(css, href);
      const style = document.createElement("style");
      style.textContent = css;
      link.replaceWith(style);
    } catch {
      /* leave the link; a missing stylesheet is better than a thrown export */
    }
  }

  // 2. Existing <style> blocks may themselves reference fonts/images.
  for (const style of [...document.querySelectorAll("style")]) {
    if (/url\(/.test(style.textContent)) {
      style.textContent = await inlineCssUrls(style.textContent, location.href);
    }
  }

  // 3. Images → data URIs. srcset is dropped deliberately (see header).
  for (const img of [...document.querySelectorAll("img")]) {
    const src = img.getAttribute("src");
    if (src) img.setAttribute("src", await toDataUri(src));
    img.removeAttribute("srcset");
    img.removeAttribute("loading");
  }
  for (const source of [...document.querySelectorAll("picture source")]) source.remove();

  // 4. Inline style="background-image:url(...)" attributes.
  for (const el of [...document.querySelectorAll('[style*="url("]')]) {
    el.setAttribute("style", await inlineCssUrls(el.getAttribute("style"), location.href));
  }

  // 5. Strip what only makes sense against a live server.
  document.querySelectorAll("script[src]").forEach((s) => s.remove());
  document.querySelectorAll('link[rel="modulepreload"], link[rel="preload"], link[rel="prefetch"]')
    .forEach((l) => l.remove());
  document.querySelectorAll("astro-dev-toolbar, astro-island, .astro-route-announcer")
    .forEach((e) => e.remove());

  return {
    styles: document.querySelectorAll("style").length,
    images: document.querySelectorAll("img").length,
  };
};

export async function exportSingleFile({
  baseUrl,
  route,
  outFile,
  passcode,
  viewport = { width: 1280, height: 900 },
  settleMs = 2500,
  dropTier = null,
  clean = false,
  title = null,
  log = console.log,
}) {
  const browser = await chromium.launch();
  const ctx = await browser.newContext({ viewport, deviceScaleFactor: 2 });
  const page = await ctx.newPage();
  const problems = [];
  page.on("pageerror", (e) => problems.push(String(e).slice(0, 160)));

  try {
    if (passcode) await authenticate(page, baseUrl, passcode, log);

    const url = `${baseUrl}${route}`;
    log(`  loading ${url}`);
    const res = await page.goto(url, { waitUntil: "networkidle" });
    if (res && res.status() >= 400) {
      throw new Error(`${url} returned HTTP ${res.status()}`);
    }
    if (page.url().includes("/access")) {
      throw new Error(`redirected to the passcode gate — pass --passcode to export ${route}`);
    }

    // Let fonts, images and any fit/measure scripts settle before serialising.
    await page.waitForLoadState("networkidle");
    await page.waitForTimeout(settleMs);

    if (dropTier || clean) {
      const dropped = await page.evaluate(CLEAN_IN_PAGE, { dropTier, clean });
      if (dropTier) log(`  dropped ${dropped} section(s) tagged data-tier="${dropTier}"`);
    }
    const stats = await page.evaluate(INLINE_IN_PAGE);
    if (clean) {
      await page.evaluate(({ runtime, title }) => {
        const sc = document.createElement("script");
        sc.textContent = runtime;
        document.body.append(sc);
        const robots = document.createElement("meta");
        robots.name = "robots";
        robots.content = "noindex, nofollow";
        document.head.append(robots);
        if (title) document.title = title;
      }, { runtime: DECK_RUNTIME, title });
    }
    const html = await page.evaluate(() => "<!doctype html>\n" + document.documentElement.outerHTML);

    await mkdir(dirname(outFile), { recursive: true });
    await writeFile(outFile, html, "utf8");

    const bytes = Buffer.byteLength(html, "utf8");
    log(`  wrote ${outFile} — ${(bytes / 1024 / 1024).toFixed(2)} MB, ` +
        `${stats.styles} style blocks, ${stats.images} images embedded`);
    if (problems.length) log(`  page errors: ${problems.slice(0, 3).join(" | ")}`);

    return { outFile, bytes, ...stats, problems };
  } finally {
    await browser.close();
  }
}
