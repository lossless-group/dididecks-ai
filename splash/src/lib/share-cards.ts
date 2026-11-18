// Every page on the splash gets a card: what its share image says. Pages pass
// their card's key to BaseLayout; the images are built at /og/{tall|wide}/{key}.jpg.
// Blueprint: astro-knots/context-v/blueprints/Share-Every-Page-and-Section-With-Its-Own-Image.md
import { getCollection } from 'astro:content';

export interface ShareCard {
  /** Stable key; also the image path: /og/{tall|wide}/{key}.jpg */
  key: string;
  /** Small line above the title. */
  kicker: string;
  /** The big text. */
  title: string;
  /** One line under the title. */
  subtitle?: string;
  /** Background photo, a path inside public/. */
  image?: string;
  /** Last words of the title to set in brass. */
  accent?: string;
  /** Set the title as large as the frame allows (short headlines only). */
  big?: boolean;
}

export const changelogKey = (id: string) => `changelog/${id}`;
export const contextKey = (id: string) => `context-v/${id}`;

/** "plans", "specs"… from a context-v path, singular and capitalized for a kicker. */
function docKind(fromPath: unknown): string {
  const folder = String(fromPath ?? '').split('/')[1] ?? '';
  const name = folder.replace(/s$/, '').replace(/-/g, ' ');
  return name ? name[0].toUpperCase() + name.slice(1) : 'Context';
}

export async function getShareCards(): Promise<ShareCard[]> {
  const cards: ShareCard[] = [
    {
      key: 'home',
      kicker: 'DidiDecks AI',
      title: 'Decks that pass due diligence.',
      accent: 'due diligence.',
      subtitle: 'Decks as repositories, slides as components, AI as the main author.',
      image: 'ogimage__DDDecks--Bankers-Safe.png',
    },
    {
      key: 'changelog',
      kicker: 'Changelog',
      title: 'What shipped, and why it matters.',
      accent: 'why it matters.',
      subtitle: 'Ship notes from the deck OS and its public packages.',
    },
    {
      key: 'context-v',
      kicker: 'Context-V',
      title: 'The thinking, written down.',
      accent: 'written down.',
      subtitle: 'Specs, plans, explorations and blueprints behind DidiDecks.',
    },
    { key: 'search', kicker: 'Search', title: 'Search DidiDecks.', accent: 'DidiDecks.', big: true },
  ];

  for (const e of await getCollection('changelog')) {
    cards.push({
      key: changelogKey(e.id),
      kicker: e.data.from && e.data.from !== 'dididecks-ai' ? `Changelog · ${e.data.from}` : 'Changelog',
      title: e.data.title ?? e.id,
      subtitle: e.data.lede,
    });
  }

  for (const e of await getCollection('context-v')) {
    cards.push({
      key: contextKey(e.id),
      kicker: `Context-V · ${docKind(e.data.from_path)}`,
      title: e.data.title ?? e.id,
      subtitle: e.data.lede,
    });
  }

  return cards;
}
