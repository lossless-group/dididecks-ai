import adapter from '@sveltejs/adapter-vercel';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

// @dididecks/shared resolves through its own package.json "exports" as a
// workspace dependency; SvelteKit 3 deprecates the old kit.alias block.
export default defineConfig({
  plugins: [
    sveltekit({
      preprocess: vitePreprocess(),
      adapter: adapter()
    })
  ]
});
