import { createFileRoute, redirect } from '@tanstack/react-router'
import { OtpPage } from '@/core/features/pages/auth/VerifyOtpPage'
import { SessionClient } from '@/core/lib/session.client'


export const Route = createFileRoute('/_auth/verify-otp')({
  // beforeLoad: ({ location }) => {

  //   const token = SessionClient.getOtpToken()
  //   const expired = SessionClient.isOtpExpired()

  //   if (!token || expired) {
  //     SessionClient.clearAll()
  //     throw redirect({
  //       to: '/login',
  //       search: { redirect: location.pathname },
  //     })
  //   }
  // },
  component: OtpPage,
})
