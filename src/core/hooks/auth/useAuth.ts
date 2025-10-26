import { useQuery } from '@tanstack/react-query'
import { useEffect } from 'react'
import { useNavigate } from '@tanstack/react-router'
import { clearSession, getSession } from '@/core/actions/auth/session'



const SESSION_QUERY_KEY = ['app', 'session']

export function useAuth() {
  const navigate = useNavigate()


  const query = useQuery({
    queryKey: SESSION_QUERY_KEY,
    queryFn: async () => {
      const res = await getSession()
      if (res.auth_token === null) {
        throw new Error('Failed to fetch session')
      }
      return res
    }
  })

  useEffect(() => {
    if (query.data && !query.data.is_authed) {
      clearSession()
      navigate({ to: '/login' })
    }
  }, [query.data, navigate])

  return query
}
