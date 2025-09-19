import { z } from 'zod'

export const otpSchema = z.object({
  otp: z.string().regex(/^\d{6}$/, 'OTP must be exactly 6 digits'),
  user_agent: z.string(),
  token: z.string().optional(),
})

export type OtpData = z.infer<typeof otpSchema>
