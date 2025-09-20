import { createServerFn } from '@tanstack/react-start'
import { loginUserService } from '@/core/services/auth/auth.service'
import { loginSchema } from '@/core/validators/auth.schema'

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
