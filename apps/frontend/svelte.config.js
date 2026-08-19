import adapter from '@sveltejs/adapter-vercel';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import path from 'node:path';

const config = {
  preprocess: vitePreprocess(),
  kit: {
    adapter: adapter(),
    alias: {
      '@dididecks/shared': path.resolve('./../../packages/shared/src/index.ts'),
      '@dididecks/shared/api': path.resolve('./../../packages/shared/src/api.ts'),
      '@dididecks/shared/auth': path.resolve('./../../packages/shared/src/auth.ts'),
      '@dididecks/shared/billing': path.resolve('./../../packages/shared/src/billing.ts'),
      '@dididecks/shared/dididecks': path.resolve('./../../packages/shared/src/dididecks.ts')
    }
  }
};

export default config;
