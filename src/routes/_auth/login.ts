import { createFileRoute, redirect } from '@tanstack/react-router'
import { LoginPage } from '@/core/features/pages/auth/LoginPage'
import { getSession } from '@/core/actions/auth/session'


export const Route = createFileRoute('/_auth/login')({
  beforeLoad: async ({ location }) => {
    const session = await getSession()

    if (session.is_authed && session.auth_token) {
      throw redirect({
        to: '/dashboard',
        search: { redirect: location.href },
      })
    }

    if (session.login_token) {
      throw redirect({
        to: '/verify-otp',
        search: { redirect: location.href },
      })
    }
  },
  component: LoginPage,
})

