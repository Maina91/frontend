// src/api/login.api.ts
import type { LoginFormData } from '@/validations/login.schema'
import { apiClient } from '@/lib/api/api.client'

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
