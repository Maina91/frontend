import { useQuery } from '@tanstack/react-query'
import type { BeneficiariesResponse } from '@/core/types/beneficiaries'
import { fetchBeneficiaries } from '@/core/actions/customer/beneficiaries'


export const useBeneficiary = () => {
    return useQuery<BeneficiariesResponse, Error>({
        queryKey: ['customer', 'beneficiaries'],
        queryFn: async () => {
            try {
                const res = await fetchBeneficiaries()

                return {
                    ...res,
                    beneficiaries: res.beneficiaries,
                }
            } catch (err: any) {
                const error = err?.message ?? ''
                console.error(error)

                const error_message = 'Failed to load next of beneficiary details'
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
