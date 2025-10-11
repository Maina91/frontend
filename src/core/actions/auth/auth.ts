import { createServerFn } from '@tanstack/react-start'
import { loginUserService, logoutUserService, resetPasswordService } from '@/core/services/auth/auth.service'
import { loginSchema, resetPasswordSchema  } from '@/core/validators/auth.schema'
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
          role: data.user_type
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


export const resetPassword = createServerFn({ method: 'POST' })
  .inputValidator(resetPasswordSchema)
  .handler(async ({ data }) => {
    try {
      const res = await resetPasswordService(data)

      if (res.status_code !== 200) {
        throw new Error(res.message || 'Unable to reset password')
      }

      const session = await useAppSession()
      await session.update({
        is_authed: false,
        reset_token: res,
        login_token: res.member_token,
        user: {
          email: data.email,
          role: "CUSTOMER",
        },
      })

      return {
        success: true,
        message: res.message,
        member_status: res.member_status,
      }

    } catch (err: any) {
      throw {
        message: err?.message ?? 'Reset password failed',
        fieldErrors: err?.fieldErrors ?? null,
      }
    }
  })
