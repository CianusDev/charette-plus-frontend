import type { Environment } from './environment.interface'

export const environment: Environment = {
  production: true,
  // Doit correspondre a l'URL du projet Vercel du backend (sans slash final).
  apiUrl: 'https://charette-plus-backend.vercel.app/api',
  logLevel: 'error',
  appName: 'Charette Plus',
  apiTimeout: 10000,
  enableAnalytics: true,
  features: {
    enableBeta: false,
    enableNewUI: false,
  },
}
