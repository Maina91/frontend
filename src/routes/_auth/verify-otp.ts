import { createFileRoute, redirect } from '@tanstack/react-router'
import { OtpPage } from '@/core/features/pages/auth/VerifyOtpPage'


export const Route = createFileRoute('/_auth/verify-otp')({
  // beforeLoad: ({ location }) => {

  //   if (!token || expired) {
  //     throw redirect({
  //       to: '/login',
  //       search: { redirect: location.pathname },
  //     })
  //   }
  // },
  component: OtpPage,
})
