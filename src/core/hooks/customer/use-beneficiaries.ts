import { useQuery } from '@tanstack/react-query'
import type { BeneficiariesResponse } from '@/core/types/beneficiaries'
import { fetchBeneficiaries } from '@/core/actions/customer/beneficiaries'


const BENEFICIARIES_QUERY_KEY = ['customer', 'beneficiaries'];

export const useBeneficiary = () => {
    return useQuery<BeneficiariesResponse, Error>({
        queryKey: BENEFICIARIES_QUERY_KEY,
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

                const error_message = 'Failed to load beneficiary details'
                throw new Error(error_message)
            }
        },
    })
}
