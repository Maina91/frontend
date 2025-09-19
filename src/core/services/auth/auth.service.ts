import type { LoginFormData } from '@/core/validators/login.schema'
import { apiClient } from '@/core/lib/api.client'

export interface LoginResponse {
  user: {
    id: string
    email: string
    username: string
    role: string
  }
  access_token: string
  refresh_token: string
  message?: string
}



export async function loginUser(data: LoginFormData): Promise<LoginResponse> {
  try {
    const res = await apiClient.post<LoginResponse>('/login', data)
    const { user, access_token, refresh_token, message } = res

    return {
      user,
      access_token,
      refresh_token,
      message: message ?? 'Login successful',
    }
  } catch (err: any) {
    if (err.response?.data?.message) {
      throw new Error(err.response.data.message)
    }
    throw new Error('Unable to login. Please try again later.')
  }
}
