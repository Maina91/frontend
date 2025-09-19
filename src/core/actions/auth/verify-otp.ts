// src/core/actions/auth/verify-otp.action.ts
import { createServerFn } from '@tanstack/react-start'
import { otpSchema } from '@/core/validators/otp.schema'
import { verifyOtpService } from '@/core/services/auth/otp.service'

export const verifyOtpAction = createServerFn({ method: 'POST' })
  .validator(otpSchema)
  .handler(async ({ data }) => {
    try {
      const response = await verifyOtpService(data)

      return {
        success: response.status === 200,
        message: response.message,
        token: response.token,
        member_status: response.member_status,
        accounts_count: response.accounts_count,
      }
    } catch (err: any) {
      throw {
        message: err?.message ?? 'OTP verification failed',
        fieldErrors: err?.fieldErrors ?? null,
      }
    }
  })
