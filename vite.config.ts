import { defineConfig } from 'vite'
import { devtools } from '@tanstack/devtools-vite'
import { tanstackStart } from '@tanstack/react-start/plugin/vite'
import viteReact from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { nitro } from 'nitro/vite'
import path from 'node:path'

const config = defineConfig(({ mode }) => {
  // Déterminer quel fichier d'environnement utiliser
  const envFile =
    mode === 'production'
      ? 'environment.prod'
      : mode === 'staging'
        ? 'environment.staging'
        : 'environment' // dev par défaut

  console.log(`🚀 Building with environment: ${envFile}`)

  return {
    resolve: {
      tsconfigPaths: true,
      alias: {
        '#/environments/environment': path.resolve(
          __dirname,
          `./src/environments/${envFile}.ts`,
        ),
      },
    },
    define: {
      'import.meta.env.MODE': JSON.stringify(mode),
    },
    plugins: [
      devtools(),
      nitro({ rollupConfig: { external: [/^@sentry\//] } }),
      tailwindcss(),
      tanstackStart(),
      viteReact(),
    ],
  }
})

export default config
