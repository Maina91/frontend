import { createFileRoute } from '@tanstack/react-router'
import { ProfilePage } from '@/core/features/pages/dashboard/ProfilePage'

export const Route = createFileRoute('/dashboard/profile')({
  component: ProfilePage,
})


