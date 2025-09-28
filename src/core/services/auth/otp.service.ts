import type { OtpData, ResendOtpData } from '@/core/validators/otp.schema'
import { apiClient } from '@/core/lib/api.client'

export interface OtpResponse {
  status: number
  message: string
  token: string
  member_status: number
  accounts_count: number
}

export interface ResendOtpResponse {
  status: number
  message: string
}

export async function verifyOtpService(
  token: string,
  data: OtpData
): Promise<OtpResponse> {
  try {
    const verifyOtpEndpoint = '/lofty/otp-verification'

    const res = await apiClient.post<OtpResponse>(verifyOtpEndpoint, data, {
      headers: {
        'auth-token': token,
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

export async function resendOtpService(
  token: string,
  data: ResendOtpData): Promise<ResendOtpResponse> {
  try {

    const resendOtpEndpoint = '/lofty/auth/send_otp'

    const res = await apiClient.post<OtpResponse>(resendOtpEndpoint, data, {
      headers: {
        'auth-token': token,
      },
    })

    return res
  } catch (err: any) {
    if (err.response?.data?.message) {
      throw new Error(err.response.data.message)
    }
    throw new Error('Unable to resend OTP. Please try again later.')
  }
}
