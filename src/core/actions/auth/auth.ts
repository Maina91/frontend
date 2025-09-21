import { createServerFn } from '@tanstack/react-start'
import { loginUserService } from '@/core/services/auth/auth.service'
import { loginSchema } from '@/core/validators/auth.schema'
import { logoutUserService } from '@/core/services/auth/auth.service'
import { logoutSchema } from '@/core/validators/auth.schema'

export const loginAction = createServerFn({ method: 'POST' })
  .validator(loginSchema)
  .handler(async ({ data }) => {
    try {
      const response = await loginUserService(data)

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
  .validator(logoutSchema)
  .handler(async ({ data }) => {
    try {
      const res = await logoutUserService(data)

      return { success: true, message: res.message }
    } catch (err: any) {
      throw {
        message: err?.message ?? 'Logout failed',
      }
    }
  })
