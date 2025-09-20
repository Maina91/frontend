import { createFileRoute, redirect } from '@tanstack/react-router'
import { OtpPage } from '@/core/features/pages/auth/VerifyOtpPage'
import { SessionClient } from '@/core/lib/session.client'


export const Route = createFileRoute('/_auth/verify-otp')({
  beforeLoad: ({ location }) => {
    const token =
      typeof window !== 'undefined' ? SessionClient.getOtpToken() : null

    if (!token) {
      throw redirect({
        to: '/login',
        search: {
          redirect: location.pathname,
        },
      })
    }
  },
  component: OtpPage,
})
