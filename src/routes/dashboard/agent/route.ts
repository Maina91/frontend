import { Outlet, createFileRoute, redirect} from '@tanstack/react-router'
import { clearSession, getSession } from '@/core/actions/auth/session'

export const Route = createFileRoute('/dashboard/agent')({
  beforeLoad: async ({ location }) => {
    const session = await getSession()
    if (!session.is_authed || !session.auth_token || session.user?.role !== 'AGENT') {
      await clearSession()
      throw redirect({
        to: '/login',
        search: { redirect: location.href },
      })
    }
    return { session }
  },
  component: Outlet,
})
