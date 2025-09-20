import { z } from 'zod'

export const otpSchema = z.object({
  otp: z.string().regex(/^\d{6}$/, 'OTP must be exactly 6 digits').transform((val) => Number(val)),
  user_agent: z.string(),
  token: z.string(),
})

export type OtpData = z.infer<typeof otpSchema>
