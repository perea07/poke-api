import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: 'https://perea07.github.io/poke-api/', // Reemplaza con el nombre de tu repositorio
})