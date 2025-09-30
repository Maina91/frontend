import { createFileRoute, redirect } from '@tanstack/react-router'
import { DashboardLayout } from '@/core/features/pages/dashboard/DashboardLayout'
import { getSession } from '@/core/actions/auth/get_session'


export const Route = createFileRoute('/dashboard')({
  beforeLoad: async ({ location }) => {
    const session = await getSession()

    if (!session.is_authed && !session.auth_token) {
      throw redirect({
        to: '/login',
        search: { redirect: location.href },
      })
    }
  },
  component: DashboardLayout,
})

