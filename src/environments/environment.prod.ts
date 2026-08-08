import type { Environment } from './environment.interface'

export const environment: Environment = {
  production: true,
  apiUrl: 'https://api.charette-plus.ci/api',
  logLevel: 'error',
  appName: 'Charette Plus',
  apiTimeout: 10000,
  enableAnalytics: true,
  features: {
    enableBeta: false,
    enableNewUI: false,
  },
}
