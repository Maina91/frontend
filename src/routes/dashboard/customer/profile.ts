import { createFileRoute } from '@tanstack/react-router'
import { ProfilePage } from '@/core/features/pages/dashboard/customer/ProfilePage'

export const Route = createFileRoute('/dashboard/customer/profile')({
  component: ProfilePage,
})


