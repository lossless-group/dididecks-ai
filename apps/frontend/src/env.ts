import { defineEnvVars } from '@sveltejs/kit/env';

// Both are optional: src/lib/seo/site.ts falls back to a default origin.
export const variables = defineEnvVars({
	PUBLIC_SITE_URL: { public: true, schema: (input) => input },
	PUBLIC_ORIGIN: { public: true, schema: (input) => input }
});
