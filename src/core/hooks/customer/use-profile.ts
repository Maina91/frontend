import { useQuery } from '@tanstack/react-query'
import type { CustomerProfile } from '@/core/types/customer-profile'
import { clientProfileAction } from '@/core/actions/customer/profile'

export const useCustomerProfile = () => {
    return useQuery<CustomerProfile, Error>({
        queryKey: ['customer', 'clientProfile'],
        queryFn: async () => {
            try {
                const res = await clientProfileAction()
                return res.profile as CustomerProfile
            } catch (err: any) {
                const error = err?.message ?? ''
                console.error(error)

                const error_message = 'Failed to load profile info'
                throw new Error(error_message)
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

