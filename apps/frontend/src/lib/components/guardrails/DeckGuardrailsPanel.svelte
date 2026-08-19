<script lang="ts">
  import GuardrailFindingsTable from './GuardrailFindingsTable.svelte';
  import GuardrailRulesList from './GuardrailRulesList.svelte';
  import PromptToFixPanel from './PromptToFixPanel.svelte';

  export let findings: Array<{ title: string; severity: string; note: string }> = [];
  export let rules: string[] = [];
  export let prompts: string[] = [];
</script>

<section class="route-grid route-grid-wide">
  <article class="panel">
    <div class="eyebrow">Findings</div>
    <GuardrailFindingsTable {findings} />
  </article>
  <article class="panel">
    <div class="eyebrow">Rules</div>
    <GuardrailRulesList {rules} />
  </article>
</section>

<section class="panel">
  <div class="eyebrow">Prompt to fix</div>
  <PromptToFixPanel prompts={prompts} />
</section>
