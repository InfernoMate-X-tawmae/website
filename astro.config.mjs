// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import Icons from 'unplugin-icons/vite';

export default defineConfig({
  site: 'https://stats.infernomate.de',
  base: '/',
  trailingSlash: 'ignore',
  vite: {
    plugins: [tailwindcss(), Icons({ compiler: 'astro' })],
  },
});
