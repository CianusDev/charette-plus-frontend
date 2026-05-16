import { environment } from '#/environments'

type Params = Record<string, string | number | boolean | null | undefined>

interface ApiOptions extends Omit<RequestInit, 'body' | 'method'> {
  params?: Params
}

export class Api {
  private readonly baseUrl: string
  private readonly defaultHeaders: Record<string, string>

  constructor(headers: Record<string, string> = {}) {
    this.baseUrl = environment.apiUrl
    this.defaultHeaders = { 'Content-Type': 'application/json', ...headers }
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

  private async handleResponse<T>(response: Response): Promise<T> {
    if (!response.ok) {
      const error = await this.extractError(response)
      throw new ApiError(
        error.message || `HTTP ${response.status}: ${response.statusText}`,
        response.status,
        error.data,
      )
    }
    return response.json() as Promise<T>
  }

  private async extractError(response: Response): Promise<{ message?: string; data?: unknown }> {
    try {
      return await response.json()
    } catch {
      return {}
    }
  }

  async get<T>(endpoint: string, options: ApiOptions = {}): Promise<T> {
    const { params, ...rest } = options
    const response = await fetch(this.buildUrl(endpoint, params), {
      ...rest,
      method: 'GET',
      headers: { ...this.defaultHeaders, ...rest.headers },
    })
    return this.handleResponse<T>(response)
  }

  async post<T>(endpoint: string, data?: unknown, options: ApiOptions = {}): Promise<T> {
    const { params, ...rest } = options
    const response = await fetch(this.buildUrl(endpoint, params), {
      ...rest,
      method: 'POST',
      headers: { ...this.defaultHeaders, ...rest.headers },
      body: data !== undefined ? JSON.stringify(data) : undefined,
    })
    return this.handleResponse<T>(response)
  }

  async put<T>(endpoint: string, data?: unknown, options: ApiOptions = {}): Promise<T> {
    const { params, ...rest } = options
    const response = await fetch(this.buildUrl(endpoint, params), {
      ...rest,
      method: 'PUT',
      headers: { ...this.defaultHeaders, ...rest.headers },
      body: data !== undefined ? JSON.stringify(data) : undefined,
    })
    return this.handleResponse<T>(response)
  }

  async patch<T>(endpoint: string, data?: unknown, options: ApiOptions = {}): Promise<T> {
    const { params, ...rest } = options
    const response = await fetch(this.buildUrl(endpoint, params), {
      ...rest,
      method: 'PATCH',
      headers: { ...this.defaultHeaders, ...rest.headers },
      body: data !== undefined ? JSON.stringify(data) : undefined,
    })
    return this.handleResponse<T>(response)
  }

  async delete<T>(endpoint: string, options: ApiOptions = {}): Promise<T> {
    const { params, ...rest } = options
    const response = await fetch(this.buildUrl(endpoint, params), {
      ...rest,
      method: 'DELETE',
      headers: { ...this.defaultHeaders, ...rest.headers },
    })
    return this.handleResponse<T>(response)
  }
}

export class ApiError extends Error {
  constructor(
    message: string,
    public readonly status: number,
    public readonly data?: unknown,
  ) {
    super(message)
    this.name = 'ApiError'
  }
}

const api = new Api()
export default api
