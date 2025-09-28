import { createServerFn } from '@tanstack/react-start'
import { loginUserService } from '@/core/services/auth/auth.service'
import { loginSchema } from '@/core/validators/auth.schema'
import { logoutUserService } from '@/core/services/auth/auth.service'
import { env } from '@/env'
import { getCookie, setCookie, deleteCookie} from '@tanstack/react-start/server'


export const loginAction = createServerFn({ method: 'POST' })
  .inputValidator(loginSchema)
  .handler(async ({ data }) => {
    try {
      const response = await loginUserService(data)

      if (response.token) {
        setCookie('otp_token', response.token, {
          httpOnly: true,
          secure: env.NODE_ENV === 'production',
          sameSite: 'strict',
          path: '/',
          maxAge: env.VITE_ACCESS_TOKEN_EXPIRY ?? 300, // seconds
        });
      }

      return {
        success: true,
        message: response.message,
        otp_generated: response.otp_generated,
        token: response.token,
        member_status: response.member_status,
      }
    } catch (err: any) {
      throw {
        message: err?.message ?? 'Login failed',
        fieldErrors: err?.fieldErrors ?? null,
      }
    }
  })

export const logoutAction = createServerFn({ method: 'POST' })
  .handler(async () => {
    try {
      const token = getCookie('auth_token')

      if (!token) throw new Error('No active session')

      const res = await logoutUserService(token)

      deleteCookie('auth_token', { path: '/login' })

      return { success: true, message: res.message }

    } catch (err: any) {
      deleteCookie('auth_token', { path: '/login' })
      throw {
        message: err?.message ?? 'Logout failed',
      }
    }
  })
