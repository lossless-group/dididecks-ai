import type {
  DeckBlock,
  DeckSlide,
  DeckSlideVariant,
  FieldUsage,
  PersistentField,
  ReviewSurface
} from '$lib/types/dididecks';

export function getVariantKey(value: { variantKey?: string; id: string } | null | undefined): string {
  return value?.variantKey ?? value?.id ?? '';
}

export function getBlockDisplayType(block: DeckBlock | null | undefined): string {
  if (!block) return 'block';
  return block.blockType ?? block.type;
}

export function getBlockBindingKey(block: DeckBlock | null | undefined): string | null {
  return block?.dataBindingKey ?? null;
}

export function getBlockContentSummary(block: DeckBlock | null | undefined): string {
  if (!block) return 'No block selected.';

  const content = block.contentJson ?? {};
  if (typeof content.text === 'string') return content.text;
  if (typeof content.value === 'string' && typeof content.label === 'string') return `${content.label}: ${content.value}`;
  if (typeof content.value === 'string') return content.value;
  if (typeof content.alt === 'string') return content.alt;
  if (typeof content.href === 'string') return content.href;

  return block.content || block.blockKey || 'Empty block';
}

export function getBlockPositionSummary(block: DeckBlock | null | undefined): string {
  if (!block?.positionJson) return 'Auto layout';

  const { x, y, width, height, rotation } = block.positionJson;
  return `${x}% / ${y}% • ${width}% × ${height}%${rotation ? ` • rotate ${rotation}deg` : ''}`;
}

export function getBlockStyleSummary(block: DeckBlock | null | undefined): string {
  const style = block?.styleJson;
  if (!style) return 'Default styling';

  return Object.entries(style)
    .slice(0, 4)
    .map(([key, value]) => `${key}: ${String(value)}`)
    .join(' • ');
}

export function getFieldForBlock(block: DeckBlock | null | undefined, fields: PersistentField[]): PersistentField | null {
  if (!block) return null;

  return fields.find((field) => field.id === block.boundFieldId || field.fieldKey === block.dataBindingKey) ?? null;
}

export function getFieldUsagesForField(field: PersistentField | null, usages: FieldUsage[]): FieldUsage[] {
  if (!field) return [];

  return usages.filter(
    (usage) =>
      usage.fieldId === field.id ||
      usage.persistentFieldId === field.id ||
      usage.fieldKey === field.fieldKey
  );
}

export function getAffectedSlideIds(usages: FieldUsage[]): string[] {
  return Array.from(
    new Set(
      usages.flatMap((usage) => (usage.usedInSlideIds.length ? usage.usedInSlideIds : usage.slideId ? [usage.slideId] : []))
    )
  );
}

export function getAffectedBlockIds(usages: FieldUsage[]): string[] {
  return Array.from(
    new Set(
      usages.flatMap((usage) => (usage.usedInBlockIds.length ? usage.usedInBlockIds : usage.blockId ? [usage.blockId] : []))
    )
  );
}

export function buildCanvasBlockStyle(block: DeckBlock): string {
  const position = block.positionJson;
  const style = (block.styleJson ?? {}) as Record<string, string | number>;
  const parts: string[] = [];

  if (position) {
    parts.push(`left:${position.x}%`);
    parts.push(`top:${position.y}%`);
    parts.push(`width:${position.width}%`);
    parts.push(`height:${position.height}%`);
    if (position.rotation) parts.push(`transform:rotate(${position.rotation}deg)`);
  }

  const cssKeyMap: Record<string, string> = {
    background: 'background',
    color: 'color',
    border: 'border',
    borderRadius: 'border-radius',
    fontSize: 'font-size',
    fontWeight: 'font-weight',
    textAlign: 'text-align',
    lineHeight: 'line-height',
    justifyContent: 'justify-content',
    alignItems: 'align-items',
    opacity: 'opacity',
    padding: 'padding',
    letterSpacing: 'letter-spacing',
    boxShadow: 'box-shadow'
  };

  for (const [key, cssKey] of Object.entries(cssKeyMap)) {
    if (style[key] !== undefined) {
      parts.push(`${cssKey}:${String(style[key])}`);
    }
  }

  return parts.join(';');
}

export function getSurfaceVariants(slide: DeckSlide | null | undefined, surface: ReviewSurface): DeckSlideVariant[] {
  if (!slide) return [];

  return slide.variants.filter((variant) => {
    const availability = variant.surfaceAvailability?.[surface];
    return availability !== false;
  });
}

export function getPrimaryVariant(slide: DeckSlide | null | undefined, surface: ReviewSurface): DeckSlideVariant | null {
  return getSurfaceVariants(slide, surface)[0] ?? slide?.variants[0] ?? null;
}

export function getBlocksForSlideVariant(
  blocks: DeckBlock[],
  slideId: string,
  variantId?: string | null
): DeckBlock[] {
  const slideBlocks = blocks.filter((block) => block.slideId === slideId);

  if (!variantId) {
    return slideBlocks;
  }

  const variantScopedBlocks = slideBlocks.filter((block) => block.variantId === variantId);
  const sharedBlocks = slideBlocks.filter((block) => !block.variantId);

  return variantScopedBlocks.length ? [...sharedBlocks, ...variantScopedBlocks] : slideBlocks;
}

export function getVariantSummary(
  slide: DeckSlide | null | undefined,
  activeVariantId: string,
  surface: ReviewSurface
): {
  index: number;
  total: number;
  variant: DeckSlideVariant | null;
  variants: DeckSlideVariant[];
} {
  const variants = getSurfaceVariants(slide, surface);
  const index = Math.max(
    variants.findIndex((variant) => variant.id === activeVariantId),
    0
  );

  return {
    index,
    total: variants.length,
    variant: variants[index] ?? null,
    variants
  };
}
