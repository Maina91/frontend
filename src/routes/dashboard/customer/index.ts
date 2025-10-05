import { createFileRoute } from '@tanstack/react-router'
import { IndexPage } from '@/core/features/pages/dashboard/customer/IndexPage'

export const Route = createFileRoute('/dashboard/customer/')({
  component: IndexPage,
})


