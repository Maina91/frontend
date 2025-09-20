import { env } from '@/env'

const BASE_URL = env.VITE_API_URL

interface ApiError {
  message?: string
  status?: number
}

export class ApiClient {
  private baseUrl: string

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl
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

    if (!res.ok) {
      let error: ApiError = { status: res.status }
      try {
        // Parse error payload flexibly
        const parsed = (await res.json()) as Partial<ApiError>
        error = { ...error, ...parsed }
      } catch {
        /* ignore JSON parse errors */
      }

      // message can still be undefined -> fall back gracefully
      throw new Error(error.message || `Request failed: ${res.status}`)
    }

    return res.json() as Promise<T>
  }

  post<T>(path: string, body: unknown, options?: RequestInit) {
    return this.request<T>(path, {
      method: 'POST',
      body: JSON.stringify(body),
      ...options,
    })
  }

  get<T>(path: string, options?: RequestInit) {
    return this.request<T>(path, { method: 'GET', ...options })
  }

  // put, delete, patch can be added later
}

// ✅ singleton client (baseUrl from env)
export const apiClient = new ApiClient(BASE_URL)
