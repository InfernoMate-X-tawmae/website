// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import Icons from 'unplugin-icons/vite';

export default defineConfig({
  site: 'https://infernomate-x-tawmae.github.io',
  base: '/website',
  trailingSlash: 'ignore',
  vite: {
    plugins: [tailwindcss(), Icons({ compiler: 'astro' })],
  },
});
