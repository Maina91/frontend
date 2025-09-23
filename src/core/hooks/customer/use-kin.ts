import { useQuery } from '@tanstack/react-query'
import { SessionClient } from '@/core/lib/session.client'
import { queryClient } from '@/core/lib/query.client'
import { fetchNextOfKin } from '@/core/actions/customer/kin'
import type { NextOfKinResponse } from '@/core/services/customer/kin'


export const useKin = () => {
    return useQuery<NextOfKinResponse, Error>({
        queryKey: ['customer', 'nextOfKin'],
        queryFn: async () => {
            const token = SessionClient.getToken()
            const expired = SessionClient.isTokenExpired()

            if (!token || expired) {
                SessionClient.clear()
                queryClient.clear()
                window.location.href = '/login'
                throw new Error('Session expired')
            }

            try {
                const res = await fetchNextOfKin({ data: { token } })

                return {
                    ...res,
                    next_of_kin: res.next_of_kin ?? [],
                }
            } catch (err: any) {
                const apiError = err?.message ?? 'Unexpected error'
                const error = 'Failed to load next of kin'

                if (apiError.includes('401')) {
                    SessionClient.clear()
                    queryClient.clear()
                    window.location.href = '/login'
                }

                throw new Error(error)
            }
        },
        staleTime: 1000 * 60 * 5, // cache for 5 minutes
        retry: (failureCount, error: Error) => {
            if (failureCount >= 3) return false
            if (error.message.startsWith('4')) return false
            return true
        },
        refetchOnWindowFocus: false,
    })
}
