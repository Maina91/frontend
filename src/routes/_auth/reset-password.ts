import { createFileRoute, redirect } from '@tanstack/react-router'
import { ResetPasswordPage } from '@/core/features/pages/auth/ResetPasswordPage'
import { clearSession, getSession } from '@/core/actions/auth/session'


export const Route = createFileRoute('/_auth/reset-password')({
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
  component: ResetPasswordPage,
})

