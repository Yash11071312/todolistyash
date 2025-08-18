import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/todolistyashnew/', // 👈 Repo name goes here
  plugins: [react()],
})
