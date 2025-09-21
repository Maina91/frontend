import { createFileRoute } from '@tanstack/react-router'
import { IndexPage } from '@/core/features/pages/dashboard/IndexPage'

export const Route = createFileRoute('/dashboard/')({
  component: IndexPage,
})


