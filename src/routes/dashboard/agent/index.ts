import { createFileRoute } from '@tanstack/react-router'
import { IndexPage } from '@/core/features/pages/dashboard/agent/IndexPage'


export const Route = createFileRoute('/dashboard/agent/')({
  component: IndexPage,
})

