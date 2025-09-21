import { createFileRoute, redirect } from '@tanstack/react-router'
import { LoginPage } from '@/core/features/pages/auth/LoginPage'
import { SessionClient } from '@/core/lib/session.client'

export const Route = createFileRoute('/_auth/login')({
   beforeLoad: ({ location }) => {
      const token = SessionClient.getToken()
      const expired = SessionClient.isTokenExpired()  
  
      if (token && !expired) {
        throw redirect({
          to: '/dashboard',
          search: { redirect: location.pathname },
        })
      }
    },
  component: LoginPage,
})

