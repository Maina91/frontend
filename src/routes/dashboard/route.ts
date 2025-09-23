import { createFileRoute, redirect } from '@tanstack/react-router'
import { SessionClient } from '@/core/lib/session.client'
import { DashboardLayout } from '@/core/features/pages/dashboard/DashboardLayout'

export const Route = createFileRoute('/dashboard')({
  beforeLoad: ({ location }) => {
    const token = SessionClient.getAuthToken()
    const expired = SessionClient.isAuthExpired()  

    if (!token || expired) {
      SessionClient.clearAll()
      throw redirect({
        to: '/login',
        search: { redirect: location.pathname },
      })
    }
  },
  component: DashboardLayout,
})

