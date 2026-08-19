import type { RequestHandler } from './$types';

import { PUBLIC_INDEXABLE_PATHS } from '$lib/seo/routes';
import { absoluteUrl } from '$lib/seo/site';

export const prerender = true;

function escapeXml(value: string): string {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&apos;');
}

export const GET: RequestHandler = async () => {
  const body = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...PUBLIC_INDEXABLE_PATHS.map((path) => `  <url><loc>${escapeXml(absoluteUrl(path))}</loc></url>`),
    '</urlset>'
  ].join('\n');

  return new Response(body, {
    headers: {
      'content-type': 'application/xml; charset=utf-8'
    }
  });
};
