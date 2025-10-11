import { createFileRoute } from '@tanstack/react-router'
import { ResetPasswordPage } from '@/core/features/pages/auth/ResetPasswordPage'

export const Route = createFileRoute('/_auth/reset-password')({
  component: ResetPasswordPage,
})

