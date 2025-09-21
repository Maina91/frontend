import { createServerFn } from '@tanstack/react-start'
import { otpSchema, resendOtpSchema } from '@/core/validators/otp.schema'
import {
  resendOtpService,
  verifyOtpService,
} from '@/core/services/auth/otp.service'

export const verifyOtpAction = createServerFn({ method: 'POST' })
  .validator(otpSchema)
  .handler(async ({ data }) => {
    try {
      const res = await verifyOtpService(data)

      return {
        success: true,
        message: res.message,
        token: res.token,
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
.validator(resendOtpSchema)
.handler(async ({ data }) => {
  try {
    const res = await resendOtpService(data)

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

