import { createFileRoute, redirect } from '@tanstack/react-router'
import { z } from 'zod'
import { OtpPage } from '@/core/features/pages/auth/VerifyOtpPage'
import { clearSession, getSession } from '@/core/actions/auth/session'


const searchSchema = z.object({
  context: z.enum(['login', 'reset']).optional(),
})


export const Route = createFileRoute('/_auth/verify-otp')({
  validateSearch: searchSchema,
  beforeLoad: async ({ location }) => {
    const session = await getSession()

    if (session.is_authed && session.auth_token && session.user?.role) {
      const role = session.user.role
      const redirectTo =
      role === 'CUSTOMER'
        ? '/dashboard/customer'
        : '/dashboard/agent'

      throw redirect({
        to: redirectTo,
        search: { redirect: location.href },
      })
    }

    if (!session.login_token) {
      await clearSession()
      throw redirect({
        to: '/login',
        search: { redirect: location.href },
      })
    }
    return { session }
  },
  component: OtpPage,
})
