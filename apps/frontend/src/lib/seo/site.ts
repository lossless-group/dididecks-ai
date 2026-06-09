import { env } from '$env/dynamic/public';

export const siteName = 'DidiDecks';
export const siteTagline = 'Reusable deck infrastructure for high-stakes narrative work';
export const siteDescription =
  'DidiDecks is a reusable deck operating system for due diligence, fundraising, board, and client delivery workflows.';
export const defaultSocialImagePath = '/logo.png';

const fallbackOrigin = 'https://deck.aistack.codes';

export function getSiteOrigin(): string {
  return (env.PUBLIC_SITE_URL || env.PUBLIC_ORIGIN || fallbackOrigin).replace(/\/+$/, '');
}

export function absoluteUrl(path = '/'): string {
  if (/^https?:\/\//.test(path)) {
    return path;
  }

  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  return `${getSiteOrigin()}${normalizedPath}`;
}
