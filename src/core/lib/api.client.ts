import { env } from '@/env'

const BASE_URL = env.VITE_API_URL

interface ApiError {
  message?: string
  status?: number
}

export interface RequestOptions extends RequestInit {
  timeoutMs?: number // custom timeout
  authToken?: string // optional token
}

export class ApiClient {
  private baseUrl: string

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl
  }

  private async handleResponse<T>(res: Response): Promise<T> {
    let data: any = null
    try {
      data = await res.json()
    } catch {
      // ignore empty or invalid JSON
    }

    if (!res.ok) {
      const error: ApiError = {
        status: res.status,
        message: data?.message || `Request failed: ${res.status}`,
      }
      throw error
    }

    return data as T
  }

  async request<T>(path: string, options: RequestInit = {}): Promise<T> {
    const headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      ...(options.headers ?? {}),
    }

    const res = await fetch(`${this.baseUrl}${path}`, {
      ...options,
      headers,
    })

    return this.handleResponse<T>(res)
  }

  post<T>(path: string, body: unknown, options?: RequestInit) {
    return this.request<T>(path, {
      method: 'POST',
      body: JSON.stringify(body),
      ...options,
    })
  }

  put<T>(path: string, body?: unknown, options?: RequestOptions) {
    return this.request<T>(path, {
      method: 'PUT',
      body: body ? JSON.stringify(body) : undefined,
      ...options,
    })
  }

  patch<T>(path: string, body?: unknown, options?: RequestOptions) {
    return this.request<T>(path, {
      method: 'PATCH',
      body: body ? JSON.stringify(body) : undefined,
      ...options,
    })
  }

  delete<T>(path: string, options?: RequestOptions) {
    return this.request<T>(path, { method: 'DELETE', ...options })
  }
}

export const apiClient = new ApiClient(BASE_URL)
