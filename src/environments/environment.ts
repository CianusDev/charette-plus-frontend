import type { Environment } from './environment.interface'

export const environment: Environment = {
  production: false,
  apiUrl: 'https://backend-dev.example.com/api',
  logLevel: 'debug',
  appName: 'React Start Dev',
  apiTimeout: 30000,
  enableAnalytics: false,
  features: {
    enableBeta: true,
    enableNewUI: true,
  },
}
