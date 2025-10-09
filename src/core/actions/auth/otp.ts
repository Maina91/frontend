import { createServerFn } from '@tanstack/react-start'
import { otpSchema, resendOtpSchema } from '@/core/validators/otp.schema'
import {
  resendOtpService,
  verifyOtpService,
} from '@/core/services/auth/otp.service'
import { useAppSession } from '@/core/lib/session'

export const verifyOtpAction = createServerFn({ method: 'POST' })
  .inputValidator(otpSchema)
  .handler(async ({ data }) => {
    try {
      const session = await useAppSession()
      const login_token = session.data.login_token

      if (!login_token) {
        throw new Error('OTP session expired or invalid')
      }

      const res = await verifyOtpService(login_token, data)

      if (!res.token) {
        throw new Error("OTP verification failed")
      }

      await session.update({
        is_authed: true,
        auth_token: res.token,
        login_token: undefined,
      })

      return {
        success: true,
        message: res.message,
        member_status: res.member_status,
        accounts_count: res.accounts_count,
      }
    } catch (err: any) {
      throw {
        message: err?.message ?? 'OTP verification failed',
        fieldErrors: err?.fieldErrors ?? null,
      }
    }
  })

export const resendOtpAction = createServerFn({ method: 'POST' })
  .inputValidator(resendOtpSchema)
  .handler(async ({ data }) => {
    try {
      const session = await useAppSession()
      const login_token = session.data.login_token

      if (!login_token) {
        throw new Error('OTP session expired or invalid')
      }

      const res = await resendOtpService(login_token, data)

      return {
        success: true,
        message: res.message,
      }
    } catch (err: any) {
      throw {
        message: err?.message ?? 'Resending OTP failed',
        fieldErrors: err?.fieldErrors ?? null,
      }
    }
  })

