import { useQuery } from '@tanstack/react-query'
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
                const error = err?.message ?? ''
                console.error(error)

                const error_message = 'Failed to load next of kin details'
                throw new Error(error_message)
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
