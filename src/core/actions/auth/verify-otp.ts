// src/core/actions/auth/verify-otp.action.ts
import { createServerFn } from '@tanstack/react-start'
import { otpSchema } from '@/core/validators/otp.schema'
import { verifyOtpService } from '@/core/services/auth/otp.service'

export const verifyOtpAction = createServerFn({ method: 'POST' })
  .validator(otpSchema)
  .handler(async ({ data }) => {
    try {
      const res = await verifyOtpService(data)

      if (res.status !== 200) {
        return {
          success: false,
          message: res.message,
          token: res.token ?? null,
          member_status: res.member_status ?? null,
          accounts_count: res.accounts_count ?? 0,
        }
      }

      return {
        success: true,
        message: res.message,
        token: res.token,
        member_status: res.member_status,
        accounts_count: res.accounts_count,
      }
    } catch (err: any) {
      console.error('OTP verification error:', err)

      throw {
        message: err?.message ?? 'OTP verification failed',
        fieldErrors: err?.fieldErrors ?? null,
      }
    }
  })
