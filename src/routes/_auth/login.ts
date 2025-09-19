import { createFileRoute } from '@tanstack/react-router'
import { LoginPage } from '@/core/features/pages/auth/LoginPage'


export const Route = createFileRoute('/_auth/login')({
  component: LoginPage,
})

