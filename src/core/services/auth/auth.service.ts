import type { LoginFormData } from '@/core/validators/login.schema'
import { apiClient } from '@/core/lib/api.client'

export interface LoginResponse {
  status: number
  status_code: number
  message: string
  otp_generated: string
  token: string
  member_status: number
}

export async function loginUser(data: LoginFormData): Promise<LoginResponse> {
  try {
    const res = await apiClient.post<LoginResponse>('/login', data)
    return res
    console.log(res)
  } catch (err: any) {
    if (err.response?.data?.message) {
      throw new Error(err.response.data.message)
    }
    throw new Error('Unable to login. Please try again later.')
  }
}
