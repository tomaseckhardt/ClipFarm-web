// @ts-check
import { defineConfig } from 'astro/config';
import { BASE_PATH, SITE } from './site.config.mjs';

export default defineConfig({
  site: SITE,
  base: BASE_PATH,
  trailingSlash: 'always', // GitHub Pages: každá stránka je složka/index.html
  build: { format: 'directory', inlineStylesheets: 'auto' },
  devToolbar: { enabled: false },
});
