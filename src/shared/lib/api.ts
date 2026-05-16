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

export class Api {
  private readonly baseUrl: string
  private readonly defaultHeaders: Record<string, string>
  private onUnauthorized: (() => void | Promise<void>) | null = null

  constructor(headers: Record<string, string> = {}) {
    this.baseUrl = environment.apiUrl
    this.defaultHeaders = {
      'Content-Type': 'application/json',
      Credentials: 'include',
      ...headers,
    }
  }

  setUnauthorizedHandler(handler: () => void | Promise<void>): void {
    this.onUnauthorized = handler
  }

  setAuthToken(token: string | null): void {
    if (token) {
      this.defaultHeaders['Authorization'] = `Bearer ${token}`
    } else {
      delete this.defaultHeaders['Authorization']
    }
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
      return await response.json()
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
          body.error ??
          body.message ??
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

  private async handleResponse<T>(
    promise: Promise<Response>,
  ): Promise<APIResponse<T>> {
    const response = await promise
    return this.processApiData<T>(response)
  }

  async get<T>(
    endpoint: string,
    options: ApiOptions = {},
  ): Promise<APIResponse<T>> {
    const { params, ...rest } = options
    return this.handleResponse<T>(
      fetch(this.buildUrl(endpoint, params), {
        ...rest,
        method: 'GET',
        headers: { ...this.defaultHeaders, ...rest.headers },
      }),
    )
  }

  async post<T>(
    endpoint: string,
    data?: unknown,
    options: ApiOptions = {},
  ): Promise<APIResponse<T>> {
    const { params, ...rest } = options
    return this.handleResponse<T>(
      fetch(this.buildUrl(endpoint, params), {
        ...rest,
        method: 'POST',
        headers: { ...this.defaultHeaders, ...rest.headers },
        body: data !== undefined ? JSON.stringify(data) : undefined,
      }),
    )
  }

  async put<T>(
    endpoint: string,
    data?: unknown,
    options: ApiOptions = {},
  ): Promise<APIResponse<T>> {
    const { params, ...rest } = options
    return this.handleResponse<T>(
      fetch(this.buildUrl(endpoint, params), {
        ...rest,
        method: 'PUT',
        headers: { ...this.defaultHeaders, ...rest.headers },
        body: data !== undefined ? JSON.stringify(data) : undefined,
      }),
    )
  }

  async patch<T>(
    endpoint: string,
    data?: unknown,
    options: ApiOptions = {},
  ): Promise<APIResponse<T>> {
    const { params, ...rest } = options
    return this.handleResponse<T>(
      fetch(this.buildUrl(endpoint, params), {
        ...rest,
        method: 'PATCH',
        headers: { ...this.defaultHeaders, ...rest.headers },
        body: data !== undefined ? JSON.stringify(data) : undefined,
      }),
    )
  }

  async delete<T>(
    endpoint: string,
    options: ApiOptions = {},
  ): Promise<APIResponse<T>> {
    const { params, ...rest } = options
    return this.handleResponse<T>(
      fetch(this.buildUrl(endpoint, params), {
        ...rest,
        method: 'DELETE',
        headers: { ...this.defaultHeaders, ...rest.headers },
      }),
    )
  }
}

const api = new Api()
export default api
