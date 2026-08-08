import { environment } from '#/environments'

type Params = Record<string, string | number | boolean | null | undefined>

interface ApiOptions extends Omit<RequestInit, 'body' | 'method'> {
  params?: Params
}

export type APIResponse<T = unknown> = {
  data?: T
  message?: string
  success: boolean
}

/** Enveloppe renvoyee par l'API NestJS (`ControllerResponse`). */
export type ApiEnvelope<T> = {
  success: boolean
  message: string
  data: T
}

/**
 * Deballe une reponse API : renvoie `data` ou leve une Error portant
 * le message renvoye par l'API (utilisable dans un loader ou un catch).
 */
export function unwrap<T>(response: APIResponse<ApiEnvelope<T>>): T {
  if (!response.success || !response.data) {
    throw new Error(response.message ?? 'Une erreur est survenue')
  }
  return response.data.data
}

/**
 * Client HTTP du projet. L'authentification repose sur le cookie httpOnly
 * `authentication` pose par l'API : toutes les requetes partent donc avec
 * `credentials: 'include'` et aucun token n'est manipule cote JavaScript.
 */
export class Api {
  private readonly baseUrl: string
  private readonly defaultHeaders: Record<string, string>
  private onUnauthorized: (() => void | Promise<void>) | null = null

  constructor(headers: Record<string, string> = {}) {
    this.baseUrl = environment.apiUrl
    this.defaultHeaders = {
      'Content-Type': 'application/json',
      ...headers,
    }
  }

  setUnauthorizedHandler(handler: () => void | Promise<void>): void {
    this.onUnauthorized = handler
  }

  private buildUrl(endpoint: string, params?: Params): string {
    const base = `${this.baseUrl}${endpoint.startsWith('/') ? '' : '/'}${endpoint}`
    if (!params) return base
    const search = new URLSearchParams()
    for (const [key, value] of Object.entries(params)) {
      if (value !== null && value !== undefined) search.set(key, String(value))
    }
    const qs = search.toString()
    return qs ? `${base}?${qs}` : base
  }

  private async extractError(
    response: Response,
  ): Promise<{ error?: string; message?: string }> {
    try {
      return (await response.json()) as { error?: string; message?: string }
    } catch {
      return {}
    }
  }

  private async processApiData<T>(response: Response): Promise<APIResponse<T>> {
    if (!response.ok) {
      if (response.status === 401) await this.onUnauthorized?.()
      const body = await this.extractError(response)
      return {
        success: false,
        message:
          body.message ??
          body.error ??
          `HTTP ${response.status}: ${response.statusText}`,
      }
    }
    try {
      const data = (await response.json()) as T
      return { success: true, data }
    } catch {
      return { success: true }
    }
  }

  private async request<T>(
    method: string,
    endpoint: string,
    { params, headers, ...rest }: ApiOptions = {},
    body?: unknown,
  ): Promise<APIResponse<T>> {
    try {
      const response = await fetch(this.buildUrl(endpoint, params), {
        ...rest,
        method,
        credentials: 'include',
        headers: { ...this.defaultHeaders, ...headers },
        body: body !== undefined ? JSON.stringify(body) : undefined,
      })
      return await this.processApiData<T>(response)
    } catch (error) {
      return {
        success: false,
        message:
          error instanceof Error
            ? error.message
            : 'Impossible de joindre le serveur',
      }
    }
  }

  async get<T>(endpoint: string, options?: ApiOptions) {
    return this.request<T>('GET', endpoint, options)
  }

  async post<T>(endpoint: string, data?: unknown, options?: ApiOptions) {
    return this.request<T>('POST', endpoint, options, data)
  }

  async put<T>(endpoint: string, data?: unknown, options?: ApiOptions) {
    return this.request<T>('PUT', endpoint, options, data)
  }

  async patch<T>(endpoint: string, data?: unknown, options?: ApiOptions) {
    return this.request<T>('PATCH', endpoint, options, data)
  }

  async delete<T>(endpoint: string, options?: ApiOptions) {
    return this.request<T>('DELETE', endpoint, options)
  }
}

const api = new Api()
export default api
