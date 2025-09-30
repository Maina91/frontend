import { createFileRoute, redirect } from '@tanstack/react-router'
import { DashboardLayout } from '@/core/features/pages/dashboard/DashboardLayout'

export const Route = createFileRoute('/dashboard')({
  // beforeLoad: ({ location }) => {

  //   if (!token || expired) {
  //     throw redirect({
  //       to: '/login',
  //       search: { redirect: location.pathname },
  //     })
  //   }
  // },
  component: DashboardLayout,
})

