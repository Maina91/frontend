import { z } from 'zod'
import { USER_TYPES } from '@/core/lib/constants'

export const loginSchema = z.object({
  email_address: z
    .string()
    .min(1, 'Email or username is required')
    .email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters long'),
  user_type: z.enum(USER_TYPES),
})

// ✅ Export the type separately
export type LoginFormData = z.infer<typeof loginSchema>
