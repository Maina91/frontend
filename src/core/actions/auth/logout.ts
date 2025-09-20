import { createServerFn } from '@tanstack/react-start'
import { logoutUserService } from '@/core/services/auth/auth.service'
import { logoutSchema } from '@/core/validators/auth.schema'

export const logoutAction = createServerFn({ method: 'POST' })
  .validator(logoutSchema)
  .handler(async ({ data }) => {
    try {
      const res = await logoutUserService(data)

      return { success: true, message: res.message }
    } catch (err: any) {
      throw {
        message: err?.message ?? 'Logout failed',
      }
    }
  })
