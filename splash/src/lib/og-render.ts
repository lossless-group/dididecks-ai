// Renders a ShareCard to a JPEG at build time: satori (layout to SVG), resvg
// (SVG to PNG), sharp (PNG to JPEG). Ported from astro-knots/sites/cathode-site.
//
// Tall (1080x1440, 3:4) is the og:image chat apps show; wide (1200x630) is the
// twitter:image only. One og:image per page.
import satori from 'satori';
import { Resvg } from '@resvg/resvg-js';
import sharp from 'sharp';
import { readFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import type { ShareCard } from './share-cards';

export const OG_SIZES = {
  tall: { width: 1080, height: 1440 },
  wide: { width: 1200, height: 630 },
} as const;
export type OgVariant = keyof typeof OG_SIZES;

// Raw brand values (theme.css Tier 1). Images can't read CSS custom properties.
const C = {
  ink: '#0b0d12',
  paper: '#f6f3ec',
  mist: '#8a93a3',
  line: 'rgba(201,162,92,0.28)',
  brass: '#c9a25c',
  ember: '#d97757',
};

const FONTS = join(process.cwd(), 'node_modules/@fontsource');
let fonts: { name: string; data: Buffer; weight: 500 | 600 | 700; style: 'normal' }[] | null = null;
const loadFonts = () =>
  (fonts ??= [
    { name: 'Cormorant', data: readFileSync(join(FONTS, 'cormorant-garamond/files/cormorant-garamond-latin-600-normal.woff')), weight: 600, style: 'normal' },
    { name: 'Cormorant', data: readFileSync(join(FONTS, 'cormorant-garamond/files/cormorant-garamond-latin-700-normal.woff')), weight: 700, style: 'normal' },
    { name: 'Inter', data: readFileSync(join(FONTS, 'inter/files/inter-latin-500-normal.woff')), weight: 500, style: 'normal' },
    { name: 'Mono', data: readFileSync(join(FONTS, 'jetbrains-mono/files/jetbrains-mono-latin-500-normal.woff')), weight: 500, style: 'normal' },
  ]);

// Background photos come from public/, normalized to a modest JPEG so satori
// gets a small, decodable data URI.
const imageCache = new Map<string, string | null>();
async function loadImage(src?: string): Promise<string | null> {
  if (!src) return null;
  if (imageCache.has(src)) return imageCache.get(src)!;
  let out: string | null = null;
  const p = join(process.cwd(), 'public', src);
  if (existsSync(p)) {
    const jpg = await sharp(readFileSync(p)).resize({ width: 1400, withoutEnlargement: true }).jpeg({ quality: 80 }).toBuffer();
    out = `data:image/jpeg;base64,${jpg.toString('base64')}`;
  }
  imageCache.set(src, out);
  return out;
}

type El = { type: string; props: Record<string, any> };
const h = (type: string, style: Record<string, any>, children?: any, extra: Record<string, any> = {}): El => ({
  type,
  props: { style, children, ...extra },
});

const fit = (text: string, max: number) => (text.length > max ? `${text.slice(0, max - 1).trimEnd()}…` : text);

function titleSize(title: string, variant: OgVariant) {
  const n = title.length;
  if (variant === 'tall') return n < 28 ? 136 : n < 56 ? 112 : n < 90 ? 88 : 74;
  return n < 28 ? 84 : n < 56 ? 68 : n < 90 ? 56 : 48;
}

// The deck mark: two stacked slides, the front one ruled in brass.
const mark = (size: number) =>
  h('div', { display: 'flex', alignItems: 'center', gap: Math.round(size * 0.36) }, [
    h('div', { display: 'flex', position: 'relative', width: size * 1.25, height: size }, [
      h('div', { position: 'absolute', top: 0, left: size * 0.28, width: size * 0.95, height: size * 0.62, border: `2px solid ${C.mist}`, borderRadius: 4 }),
      h('div', {
        position: 'absolute', top: size * 0.3, left: 0, width: size * 0.95, height: size * 0.62,
        border: `3px solid ${C.brass}`, borderRadius: 4, background: C.ink,
        display: 'flex', flexDirection: 'column', justifyContent: 'center', paddingLeft: size * 0.14, gap: size * 0.1,
      }, [
        h('div', { width: size * 0.42, height: 3, background: C.brass }),
        h('div', { width: size * 0.26, height: 3, background: C.ember }),
      ]),
    ]),
    h('div', { fontFamily: 'Mono', fontSize: size * 0.72, color: C.paper, letterSpacing: 0.5 }, 'dididecks'),
  ]);

function footer(variant: OgVariant): El {
  const tall = variant === 'tall';
  return h('div', {
    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
    borderTop: `1px solid ${C.line}`, paddingTop: tall ? 28 : 18,
    fontFamily: 'Mono', fontSize: tall ? 24 : 18, letterSpacing: 2, color: C.mist,
  }, [h('div', {}, 'DIDIDECKS AI'), h('div', {}, 'DECKS THAT PASS DUE DILIGENCE')]);
}

async function toJpeg(root: El, width: number, height: number) {
  const svg = await satori(root as any, { width, height, fonts: loadFonts() });
  const png = new Resvg(svg, { fitTo: { mode: 'width', value: width } }).render().asPng();
  return sharp(png).jpeg({ quality: 86, mozjpeg: true }).toBuffer();
}

export async function renderCard(card: ShareCard, variant: OgVariant): Promise<Buffer> {
  const { width, height } = OG_SIZES[variant];
  const tall = variant === 'tall';
  const photo = await loadImage(card.image);
  const pad = tall ? 88 : 64;
  const inner = { w: width - 2 * pad, h: height - 2 * pad };

  // On wide cards with a photo, keep the text off the photo on the right.
  const tw = photo && !tall ? Math.round(width * 0.5) - pad : inner.w;
  const accent = card.accent && card.title.endsWith(card.accent) ? card.accent : '';
  const lead = accent ? card.title.slice(0, -accent.length) : card.title;
  const words = (s: string, color: string) =>
    s.split(/\s+/).filter(Boolean).map((word) => h('span', { color, marginRight: '0.24em' }, word));
  const size = card.big ? (tall ? 156 : 96) : titleSize(card.title, variant);

  const text = h('div', { display: 'flex', flexDirection: 'column', width: tw, gap: tall ? 30 : 18 }, [
    h('div', {
      fontFamily: 'Mono', fontSize: tall ? 28 : 20, letterSpacing: 2.5, color: C.brass, textTransform: 'uppercase',
    }, `[ ${fit(card.kicker, 46)} ]`),
    h('div', {
      display: 'flex', flexWrap: 'wrap', width: tw,
      fontFamily: 'Cormorant', fontWeight: 700, fontSize: size, lineHeight: 1.1, letterSpacing: -1.5,
    }, [...words(fit(lead, 140), C.paper), ...words(accent, C.brass)]),
    ...(card.subtitle
      ? [h('div', {
          display: 'flex', width: tw, fontFamily: 'Inter', fontWeight: 500,
          fontSize: tall ? 38 : 26, lineHeight: 1.32, color: C.paper, opacity: 0.78,
        }, fit(card.subtitle, tall ? 150 : 100))]
      : []),
  ]);

  // Photo: a band across the top of tall cards fading into ink, or the right
  // side of wide ones. Without one, a brass glow from the top right corner.
  const layers: El[] = [];
  if (photo) {
    const box = tall
      ? { top: 0, left: 0, width, height: Math.round(height * 0.55) }
      : { top: 0, left: Math.round(width * 0.42), width: Math.round(width * 0.58), height };
    layers.push(h('img', { position: 'absolute', ...box, objectFit: 'cover', objectPosition: 'center' }, undefined, { src: photo, width: box.width, height: box.height }));
    layers.push(h('div', {
      position: 'absolute', top: 0, left: 0, width, height,
      backgroundImage: tall
        ? 'linear-gradient(180deg, rgba(11,13,18,0.85) 0%, rgba(11,13,18,0.1) 16%, rgba(11,13,18,0.05) 30%, rgba(11,13,18,0.85) 48%, rgba(11,13,18,1) 56%)'
        : 'linear-gradient(90deg, rgba(11,13,18,1) 0%, rgba(11,13,18,1) 42%, rgba(11,13,18,0.5) 62%, rgba(11,13,18,0.05) 100%)',
    }));
  } else {
    layers.push(h('div', {
      position: 'absolute', top: 0, left: 0, width, height,
      backgroundImage: 'radial-gradient(circle at 100% 0%, rgba(201,162,92,0.18), rgba(11,13,18,0) 55%)',
    }));
  }

  const root = h('div', {
    width, height, display: 'flex', position: 'relative', background: C.ink, fontFamily: 'Inter', color: C.paper,
  }, [
    ...layers,
    // Mark at the top, footer at the bottom. Text sits under the photo band
    // when there is one, and centered when there isn't, so WhatsApp's square
    // crop of a tall card still shows the headline.
    h('div', {
      position: 'absolute', top: pad, left: pad, width: inner.w, height: inner.h,
      display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
    }, [
      mark(tall ? 44 : 34),
      h('div', {
        display: 'flex', flexDirection: 'column', flexGrow: 1,
        justifyContent: photo && tall ? 'flex-end' : 'center',
        paddingTop: tall ? 40 : 20, paddingBottom: tall ? 48 : 20,
      }, text),
      footer(variant),
    ]),
  ]);

  return toJpeg(root, width, height);
}
