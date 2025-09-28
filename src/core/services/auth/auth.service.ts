import type { LoginData, LogoutData } from '@/core/validators/auth.schema'
import type { LoginResponse, LogoutResponse } from '@/core/types/auth'
import { apiClient } from '@/core/lib/api.client'
import { SessionClient } from '@/core/lib/session.client'

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
  data: LogoutData,
): Promise<LogoutResponse> {
  try {
    const LogoutEndpoint = '/logout'

    const res = await apiClient.post<LogoutResponse>(LogoutEndpoint, null, {
      headers: {
        'auth-token': data.token,
      },
    })

    SessionClient.clearAll()

    console.log('logout res', res)
    return res
  } catch (err: any) {

    SessionClient.clearAll()
    
    if (err.response?.data?.message) {
      throw new Error(err.response.data.message)
    }
    throw new Error('Unable to logout. Please try again later.')
  }
}
