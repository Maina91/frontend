import { z } from 'zod'
import { USER_TYPES } from '@/core/lib/constants'

export const loginSchema = z.object({
  email_address: z
    .string()
    .min(1, 'Email or username is required')
    .email('Invalid email address'),
  password: z
    .string()
    .min(6, 'Password must be at least 6 characters long'),
  user_type: z
    .enum(USER_TYPES),
})
export type LoginData = z.infer<typeof loginSchema>


export const resetPasswordSchema = z.object({
  email: z
    .string()
    .min(1, 'Email or username is required')
    .email('Invalid email address'),
})
export type ResetPasswordData = z.infer<typeof resetPasswordSchema>

export const updatePasswordSchema = z.object({
  customer_ref: z
    .string(),
  password: z
    .string()
    .min(6, 'Password must be at least 6 characters long'),
})
export type updatePasswordData = z.infer<typeof updatePasswordSchema>

