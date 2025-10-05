import { z } from 'zod'

export const otpSchema = z.object({
  otp: z
    .string()
    .trim()
    .min(6, "OTP must be 6 digits")
    .max(6, "OTP must be 6 digits")
    .regex(/^\d+$/, "Please enter a valid OTP")
    .transform((val) => Number(val)),
  user_agent: z.string(),
})
export type OtpData = z.infer<typeof otpSchema>

export const resendOtpSchema = z.object({
  description: z.string().optional(),
})
export type ResendOtpData = z.infer<typeof resendOtpSchema>
