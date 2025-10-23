import { createRouter as createTanstackRouter } from '@tanstack/react-router'
import { setupRouterSsrQueryIntegration } from '@tanstack/react-router-ssr-query'
import { routeTree } from './routeTree.gen'
import * as TanstackQuery from '@/integrations/tanstack-query/root-provider'
import { DefaultCatchBoundary } from '@/components/DefaultCatchBoundary'
import { NotFound } from '@/components/NotFound'

// Define our app context type
export type AppRouterContext = ReturnType<typeof TanstackQuery.getContext>

export function getRouter() {
  const rqContext = TanstackQuery.getContext()

  const router = createTanstackRouter({
    routeTree,
    scrollRestoration: true,
    context: rqContext,
    defaultPreload: 'intent',
    defaultErrorComponent: DefaultCatchBoundary,
    defaultNotFoundComponent: () => <NotFound />,
    Wrap: ({ children }: { children: React.ReactNode }) => (
      <TanstackQuery.Provider {...rqContext}>{children}</TanstackQuery.Provider>
    ),
  })

  setupRouterSsrQueryIntegration({ router, queryClient: rqContext.queryClient })

  return router
}

// Register the router instance for type safety
declare module '@tanstack/react-router' {
  interface Register {
    router: ReturnType<typeof getRouter>
  }
}
  