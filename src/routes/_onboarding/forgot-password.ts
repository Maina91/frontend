import { createFileRoute } from '@tanstack/react-router'
import { ForgotPasswordPage } from '@/core/features/pages/onboarding/ForgotPasswordPage'

export const Route = createFileRoute('/_onboarding/forgot-password')({
    component: ForgotPasswordPage,
})

