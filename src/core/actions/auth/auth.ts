import { createServerFn } from '@tanstack/react-start'
import { loginUserService } from '@/core/services/auth/auth.service'
import { loginSchema } from '@/core/validators/auth.schema'
import { logoutUserService } from '@/core/services/auth/auth.service'
import { useAppSession } from '@/core/lib/session'


export const loginAction = createServerFn({ method: 'POST' })
  .inputValidator(loginSchema)
  .handler(async ({ data }) => {
    try {
      const response = await loginUserService(data)

      if (!response.token) {
        throw new Error("An error occurred")
      }

      const session = await useAppSession()
      await session.update({
        is_authed: false,
        login_token: response.token,
        user: {
          email: data.email_address,
        },
      })

      return {
        success: true,
        message: response.message,
        otp_generated: response.otp_generated,
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
      const session = await useAppSession()
      const auth_token = session.data.auth_token

      if (!auth_token) {
        throw new Error('No active session')
      }

      const res = await logoutUserService(auth_token)
      await session.clear()

      return {
        success: true,
        message: res.message ?? 'Logged out successfully'
      }
    } catch (err: any) {
      const session = await useAppSession()
      await session.clear()

      throw {
        message: err?.message ?? 'Logged out successfully',
      }
    }
  })
