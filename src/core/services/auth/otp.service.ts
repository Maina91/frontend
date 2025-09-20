import type { OtpData } from '@/core/validators/otp.schema'
import { apiClient } from '@/core/lib/api.client'

export interface OtpResponse {
  status: number
  message: string
  token?: string
  member_status?: number
  accounts_count?: number
}

export async function verifyOtpService(data: OtpData): Promise<OtpResponse> {
  try {
    if (!data.token) throw new Error('Login token is missing.')

    const verifyOtpEndpoint = '/lofty/otp-verification'

    const res = await apiClient.post<OtpResponse>(verifyOtpEndpoint, data, {
      headers: {
        'auth-token': data.token,
      },
    })
    return res
  } catch (err: any) {
    if (err.response?.data?.message) {
      throw new Error(err.response.data.message)
    }
    throw new Error('Unable to verify OTP. Please try again later.')
  }
}
