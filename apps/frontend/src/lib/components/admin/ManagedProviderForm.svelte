<script lang="ts">
  let provider: 'anthropic' | 'openai' = 'anthropic';
  let defaultModel = 'claude-sonnet';
  let apiKey = '';
</script>

<section class="panel">
  <div class="eyebrow">Managed provider MVP</div>
  <h2>Configure provider status</h2>
  <p>Production storage and encryption are still required. Do not commit real keys.</p>
  <div class="route-grid">
    <label><span>Provider</span><select bind:value={provider}><option value="anthropic">anthropic</option><option value="openai">openai</option></select></label>
    <label><span>Product scope</span><input value="dididecks" readonly /></label>
    <label><span>Default model</span><input bind:value={defaultModel} /></label>
    <label><span>API key</span><input bind:value={apiKey} type="password" placeholder="Enter key locally only" /></label>
  </div>
  <div class="hero-actions">
    <button class="primary-button" type="button">Save mock provider</button>
    <button class="ghost-button" type="button">Test connection</button>
  </div>
</section>
