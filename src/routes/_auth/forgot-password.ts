import { createFileRoute } from '@tanstack/react-router'
import { ForgotPasswordPage } from '@/core/features/pages/auth/ForgotPasswordPage'

export const Route = createFileRoute('/_auth/forgot-password')({
    component: ForgotPasswordPage,
})

