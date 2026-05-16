import { environment } from '#/environments'

type LogLevel = 'debug' | 'info' | 'warn' | 'error'

const LEVELS: Record<LogLevel, number> = { debug: 0, info: 1, warn: 2, error: 3 }

class Logger {
  private readonly minLevel = environment.logLevel

  private shouldLog(level: LogLevel): boolean {
    return LEVELS[level] >= LEVELS[this.minLevel]
  }

  debug(message: string, ...args: unknown[]): void {
    if (this.shouldLog('debug')) console.log(`[DEBUG] ${message}`, ...args)
  }

  info(message: string, ...args: unknown[]): void {
    if (this.shouldLog('info')) console.info(`[INFO] ${message}`, ...args)
  }

  warn(message: string, ...args: unknown[]): void {
    if (this.shouldLog('warn')) console.warn(`[WARN] ${message}`, ...args)
  }

  error(message: string, ...args: unknown[]): void {
    if (this.shouldLog('error')) console.error(`[ERROR] ${message}`, ...args)
  }
}

export const logger = new Logger()
export default logger
