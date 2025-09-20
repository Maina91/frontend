import { createFileRoute, redirect } from '@tanstack/react-router'
import { OtpPage } from '@/core/features/pages/auth/VerifyOtpPage'

export const Route = createFileRoute('/_auth/verify-otp')({
  beforeLoad: ({ location }) => {
    const token =
      typeof window !== 'undefined' ? sessionStorage.getItem('OtpToken') : null

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
