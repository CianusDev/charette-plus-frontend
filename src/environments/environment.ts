import type { Environment } from './environment.interface'

export const environment: Environment = {
  production: false,
  apiUrl: 'http://localhost:5000/api',
  logLevel: 'debug',
  appName: 'Charette Plus',
  apiTimeout: 30000,
  enableAnalytics: false,
  features: {
    enableBeta: true,
    enableNewUI: true,
  },
}
