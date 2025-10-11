import type { LoginData, ResetPasswordData} from '@/core/validators/auth.schema'
import type { LoginResponse, LogoutResponse, ResetPasswordResponse } from '@/core/types/auth'
import { apiClient } from '@/core/lib/api.client'

export async function loginUserService(
  data: LoginData,
): Promise<LoginResponse> {
  try {
    const loginEndpoint = '/lofty/login'

    const res = await apiClient.post<LoginResponse>(loginEndpoint, data)
    console.log('login res', res)

    return res
  } catch (err: any) {
    if (err.response?.data?.message) {
      throw new Error(err.response.data.message)
    }
    throw new Error('Unable to login. Please try again later.')
  }
}

export async function logoutUserService(
  token: string,
): Promise<LogoutResponse> {
  try {
    const LogoutEndpoint = '/logout'

    const res = await apiClient.post<LogoutResponse>(LogoutEndpoint, null, {
      headers: {
        'auth-token': token,
      },
    })
    console.log('logout res', res)

    return res
  } catch (err: any) {    
    if (err.response?.data?.message) {
      throw new Error(err.response.data.message)
    }
    throw new Error('Unable to logout. Please try again later.')
  }
}

export async function resetPasswordService(
  data: ResetPasswordData,
): Promise<ResetPasswordResponse> {
  try {
    const endpoint = '/lofty/reset_email'

    const res = await apiClient.post<ResetPasswordResponse>(endpoint, data)
    console.log('reset pass res', res)

    return res
  } catch (err: any) {
    if (err.response?.data?.message) {
      throw new Error(err.response.data.message)
    }
    throw new Error('Unable reset password. Please try again later.')
  }
}
