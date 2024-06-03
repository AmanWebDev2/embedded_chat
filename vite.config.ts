import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist', // Specify the output directory for the build
    assetsDir: 'assets', // Specify the directory for static assets
    rollupOptions: {
      // You can further customize the generated build here if needed
      output: {
        // Specify the name of the generated bundle
        entryFileNames: 'chatEmbed.js', // You can use [hash] or other placeholders for unique names
        chunkFileNames: 'chatEmbedChunk.js',
      },
    },
  },
})
