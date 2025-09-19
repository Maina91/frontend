import { createServerFn } from '@tanstack/react-start'
import { loginUser } from '@/core/services/auth/auth.service'
import { loginSchema } from '@/core/validators/login.schema'

export const loginAction = createServerFn({ method: 'POST' })
  .validator(loginSchema)
  .handler(async ({ data }) => {
    try {
      const response = await loginUser(data)

      return {
        success: true,
        message: response.message ?? 'Login successful',
        user: {
          id: response.user.id,
          email: response.user.email,
          username: response.user.username,
          role: response.user.role,
        },
        access_token: response.access_token,
        refresh_token: response.refresh_token,
      }
    } catch (err: any) {
      throw {
        message: err?.message ?? 'Login failed',
        fieldErrors: err?.fieldErrors ?? null,
      }
    }
  })
