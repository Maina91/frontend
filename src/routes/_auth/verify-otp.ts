import { createFileRoute, redirect } from '@tanstack/react-router'
import { OtpPage } from '@/core/features/pages/auth/VerifyOtpPage'
import { getSession, clearSession } from '@/core/actions/auth/session'


export const Route = createFileRoute('/_auth/verify-otp')({
  beforeLoad: async ({ location }) => {
    const session = await getSession()

    if (session.is_authed && session.auth_token) {
      throw redirect({
        to: '/dashboard',
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
  },
  component: OtpPage,
})
