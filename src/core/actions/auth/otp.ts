import { createServerFn } from '@tanstack/react-start'
import { otpSchema, resendOtpSchema } from '@/core/validators/otp.schema'
import {
  resendOtpService,
  verifyOtpService,
} from '@/core/services/auth/otp.service'
import { env } from '@/env'
import { setCookie, getCookie } from '@tanstack/react-start/server'

export const verifyOtpAction = createServerFn({ method: 'POST' })
  .inputValidator(otpSchema)
  .handler(async ({ data }) => {
    try {
      const token = getCookie('otp_token')

      if (!token) throw new Error('Login token is missing.')

      const res = await verifyOtpService(token, data)

      if (res.token) {
              setCookie('auth_token', res.token, {
                httpOnly: true,
                secure: env.NODE_ENV === 'production',
                sameSite: 'lax',
                path: '/',
                maxAge: env.VITE_ACCESS_TOKEN_EXPIRY ?? 300, // seconds
              });
            }

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
.inputValidator(resendOtpSchema)
.handler(async ({ data }) => {
  try {
    const token = getCookie('otp_token')

    if (!token) throw new Error('Login token is missing.')

    const res = await resendOtpService(token, data)

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

