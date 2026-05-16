export interface Environment {
  production: boolean
  apiUrl: string
  logLevel: 'debug' | 'info' | 'warn' | 'error'
  appName: string
  apiTimeout?: number
  enableAnalytics?: boolean
  sentryDsn?: string
  stripePublicKey?: string
  googleMapsApiKey?: string
  features?: {
    enableBeta?: boolean
    enableNewUI?: boolean
    [key: string]: boolean | undefined
  }
}
