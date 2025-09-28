import { useQuery } from '@tanstack/react-query'
import { queryClient } from '@/core/lib/query.client'
import { fetchNextOfKin } from '@/core/actions/customer/kin'
import type { NextOfKinResponse } from '@/core/types/kin'


export const useKin = () => {
    return useQuery<NextOfKinResponse, Error>({
        queryKey: ['customer', 'nextOfKin'],
        queryFn: async () => {
            try {
                const res = await fetchNextOfKin()

                return {
                    ...res,
                    next_of_kin: res.next_of_kin ?? [],
                }
            } catch (err: any) {
                const apiError = err?.message ?? 'Unexpected error'
                const error = 'Failed to load next of kin'

                if (apiError.includes('401')) {
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
