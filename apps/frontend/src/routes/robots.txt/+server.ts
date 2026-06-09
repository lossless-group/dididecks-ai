import type { RequestHandler } from './$types';

import { PRIVATE_ROBOTS_DISALLOWS } from '$lib/seo/routes';
import { absoluteUrl } from '$lib/seo/site';

export const prerender = true;

export const GET: RequestHandler = async () => {
  const body = [
    'User-agent: *',
    'Allow: /',
    ...PRIVATE_ROBOTS_DISALLOWS.map((path) => `Disallow: ${path}`),
    '',
    `Sitemap: ${absoluteUrl('/sitemap.xml')}`
  ].join('\n');

  return new Response(body, {
    headers: {
      'content-type': 'text/plain; charset=utf-8'
    }
  });
};
