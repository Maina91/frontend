// src/api/login.api.ts
import type { LoginFormData } from '@/core/validators/login.schema'
import { apiClient } from '@/core/lib/api.client'

interface LoginResponse {
  token: string
  user: {
    id: string
    email: string
  }
}

export async function loginUser(data: LoginFormData) {
  return apiClient.post<LoginResponse>('/lofty/login', data)
}
