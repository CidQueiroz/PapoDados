import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

// PapoDados Vite Config - Simplified (Matching Working Projects)
export default defineConfig(({ command }) => {
  const isDevelopment = command === 'serve';

  return {
    plugins: [react()],
    server: {
      host: true,
      port: 5173,
      watch: {
        usePolling: true,
      },
      fs: {
        // Permite carregar arquivos do workspace root (cdkteck-ui e node_modules)
        allow: ['../..']
      }
    },
    resolve: {
      alias: isDevelopment ? {
        // Alias apenas para o código-fonte da UI local
        '@cidqueiroz/cdkteck-ui': path.resolve(__dirname, '../../cdkteck-ui/src')
      } : {},
      // Dedupe garante instância única de bibliotecas core no workspace
      dedupe: ['react', 'react-dom', 'react-router-dom']
    },
    optimizeDeps: {
      exclude: ['@cidqueiroz/cdkteck-ui']
    }
  }
});
