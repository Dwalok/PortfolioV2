import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://www.samuelvanderhoeven.fr',
  trailingSlash: 'ignore',
  build: { format: 'directory' },
});
