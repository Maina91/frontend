import { createFileRoute } from '@tanstack/react-router'
import { RegisterPage } from '@/core/features/pages/onboarding/RegisterPage'

export const Route = createFileRoute('/_onboarding/register')({
  component: RegisterPage,
})
