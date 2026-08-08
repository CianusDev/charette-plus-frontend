import type { Environment } from './environment.interface'

export const environment: Environment = {
  production: false,
  apiUrl: 'https://api-staging.charette-plus.ci/api',
  logLevel: 'info',
  appName: 'Charette Plus (staging)',
  apiTimeout: 20000,
  enableAnalytics: false,
  features: {
    enableBeta: true,
    enableNewUI: false,
  },
}
