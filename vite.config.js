import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Relative base so the build works on any host path (GitHub Pages, Netlify, etc.)
export default defineConfig({
  base: './',
  plugins: [react()],
})
