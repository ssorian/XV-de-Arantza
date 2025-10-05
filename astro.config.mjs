// @ts-check
import { defineConfig } from 'astro/config'
import react from '@astrojs/react'
import tailwindcss from '@tailwindcss/vite'

import vercel from '@astrojs/vercel'

// https://astro.build/config
export default defineConfig({
  vite: {
    resolve: {
      alias: {
        '@': '/src',
      },
    },

    plugins: [tailwindcss()],
  },

  output: 'server',
  integrations: [react()],
  image: {
    domains: ['dl1fn8emzdzuebjv.public.blob.vercel-storage.com'],
  },
  adapter: vercel({
    imageService: true,
  }),
})
