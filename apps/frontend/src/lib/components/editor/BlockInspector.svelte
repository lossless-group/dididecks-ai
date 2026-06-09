<script lang="ts">
  import type { DeckBlock, DeckSlide, DeckSlideVariant, FieldUsage, PersistentField } from '$lib/types/dididecks';
  import {
    getAffectedBlockIds,
    getAffectedSlideIds,
    getBlockContentSummary,
    getBlockDisplayType,
    getBlockPositionSummary,
    getBlockStyleSummary
  } from '$lib/utils/dididecks';

  export let block: DeckBlock | null = null;
  export let slide: DeckSlide | null = null;
  export let variant: DeckSlideVariant | null = null;
  export let boundField: PersistentField | null = null;
  export let fieldUsages: FieldUsage[] = [];
  export let deckId = 'deck-001';
</script>

<section class="panel">
  <div class="eyebrow">Block inspector</div>
  {#if block}
    <h2>{block.blockKey ?? block.id}</h2>
    <div class="stack-list">
      <div class="list-card">
        <div>
          <strong>Block type</strong>
          <p>{getBlockDisplayType(block)}</p>
        </div>
      </div>
      <div class="list-card">
        <div>
          <strong>Slide</strong>
          <p>{slide?.title ?? block.slideId}</p>
        </div>
        <small>{variant ? `${variant.label} • ${variant.variantKey ?? variant.id}` : 'All variants'}</small>
      </div>
      <div class="list-card">
        <div>
          <strong>Content</strong>
          <p>{getBlockContentSummary(block)}</p>
        </div>
      </div>
      <div class="list-card">
        <div>
          <strong>Position</strong>
          <p>{getBlockPositionSummary(block)}</p>
        </div>
      </div>
      <div class="list-card">
        <div>
          <strong>Style</strong>
          <p>{getBlockStyleSummary(block)}</p>
        </div>
      </div>
      <div class="list-card">
        <div>
          <strong>State</strong>
          <p>{block.isLocked ? 'Locked' : 'Editable'} • {block.isGenerated ? 'Generated' : 'Manual'}</p>
        </div>
      </div>
    </div>
    {#if boundField}
      <div class="panel">
        <div class="eyebrow">Persistent field binding</div>
        <h2>{boundField.fieldLabel ?? boundField.label}</h2>
        <p class="muted-copy">
          {boundField.fieldKey} • {boundField.fieldGroup ?? boundField.category} • {boundField.fieldType ?? 'text'}
        </p>
        <p><strong>Current value:</strong> {boundField.value}</p>
        <p class="muted-copy">This block is linked to a persistent field. Editing the field can update other slides.</p>
        <p><strong>Field usage count:</strong> {fieldUsages.length}</p>
        <p><strong>Used in slides:</strong> {getAffectedSlideIds(fieldUsages).length}</p>
        <p><strong>Used in blocks:</strong> {getAffectedBlockIds(fieldUsages).length}</p>
      </div>
      <div class="hero-actions">
        <a class="ghost-button" href={`/decks/${deckId}/smart-edit?field=${encodeURIComponent(boundField.fieldKey ?? '')}&slide=${encodeURIComponent(block.slideId)}&block=${encodeURIComponent(block.id)}`}>Edit persistent field</a>
        <a class="ghost-button" href={`/decks/${deckId}/map?field=${encodeURIComponent(boundField.fieldKey ?? '')}`}>Preview affected slides</a>
        <a class="ghost-button" href={`/decks/${deckId}/rebuild?field=${encodeURIComponent(boundField.fieldKey ?? '')}`}>Rebuild affected slides</a>
      </div>
    {/if}
    <div class="hero-actions">
      <button class="ghost-button" type="button">Save block change</button>
      <button class="ghost-button" type="button">Duplicate block</button>
      <button class="ghost-button" type="button">Delete block</button>
    </div>
  {:else}
    <p>Select a slide element to inspect its content, style, data binding, and rebuild options.</p>
  {/if}
</section>
