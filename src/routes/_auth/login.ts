import { createFileRoute, redirect } from '@tanstack/react-router'
import { LoginPage } from '@/core/features/pages/auth/LoginPage'

export const Route = createFileRoute('/_auth/login')({
  //  beforeLoad: ({ location }) => {
  
  //     if (token && !expired) {
  //       throw redirect({
  //         to: '/dashboard',
  //         search: { redirect: location.pathname },
  //       })
  //     }
  //   },
  component: LoginPage,
})

