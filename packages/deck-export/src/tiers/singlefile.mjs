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

    const stats = await page.evaluate(INLINE_IN_PAGE);
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
