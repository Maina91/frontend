import { useQuery } from '@tanstack/react-query'
import type { CustomerProfile } from '@/core/types/customer-profile'
import { clientProfileAction } from '@/core/actions/customer/profile'


const CUSTOMER_PROFILE_QUERY_KEY = ['customer', 'clientProfile'];

export const useCustomerProfile = () => {
    return useQuery<CustomerProfile, Error>({
        queryKey: CUSTOMER_PROFILE_QUERY_KEY,
        queryFn: async () => {
            try {
                const res = await clientProfileAction()
                return res.profile
            } catch (err: any) {
                const error = err?.message ?? ''
                console.error(error)

                const error_message = 'Failed to load profile info'
                throw new Error(error_message)
            }
        }
    })
}

