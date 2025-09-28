import { useQuery } from '@tanstack/react-query'
import { queryClient } from '@/core/lib/query.client'
import { clientProfileAction } from '@/core/actions/customer/profile'
import type { CustomerProfile } from '@/core/services/customer/profile'

export const useCustomerProfile = () => {
    return useQuery<CustomerProfile, Error>({
        queryKey: ['customer', 'clientProfile'],
        queryFn: async () => {
            try {
                const res = await clientProfileAction()
                return res.profile as CustomerProfile
            } catch (err: any) {
                if (err?.message?.includes('401')) {
                    window.location.href = '/login'
                }
                throw err
            }
        },
        staleTime: 1000 * 60 * 5,
        retry: (failureCount, error: any) => {
            if (failureCount >= 3) return false
            if (error?.message?.startsWith('4')) return false
            return true
        },
        refetchOnWindowFocus: false,
    })
}

