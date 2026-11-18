// Static share images: /og/tall/{key}.jpg (og:image) and /og/wide/{key}.jpg
// (twitter:image), one pair per ShareCard, rendered at build time.
import type { APIRoute, GetStaticPaths } from 'astro';
import { getShareCards, type ShareCard } from '@lib/share-cards';
import { renderCard, type OgVariant } from '@lib/og-render';

export const getStaticPaths: GetStaticPaths = async () => {
  const cards = await getShareCards();
  return (['tall', 'wide'] as const).flatMap((variant) =>
    cards.map((card) => ({ params: { variant, key: card.key }, props: { card, variant } })),
  );
};

export const GET: APIRoute = async ({ props }) => {
  const { card, variant } = props as { card: ShareCard; variant: OgVariant };
  const jpg = await renderCard(card, variant);
  return new Response(new Uint8Array(jpg), {
    headers: { 'Content-Type': 'image/jpeg', 'Cache-Control': 'public, max-age=86400' },
  });
};
