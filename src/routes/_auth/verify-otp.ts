import { createFileRoute } from '@tanstack/react-router'
import { OtpPage } from '@/core/features/pages/auth/VerifyOtpPage'

export const Route = createFileRoute('/_auth/verify-otp')({
  component: OtpPage,
})

