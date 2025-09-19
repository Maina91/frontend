import { createServerFn } from '@tanstack/react-start'
import { loginUser } from '@/core/services/auth/auth.service'
import { loginSchema } from '@/core/validators/login.schema'

export const loginAction = createServerFn({ method: 'POST' })
  .validator(loginSchema)
  .handler(async ({ data }) => {
    const user = await loginUser(data)
    return { success: true, user }
  })
