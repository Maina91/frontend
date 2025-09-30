import { useQuery } from '@tanstack/react-query'
import { getClientBankDetailsAction } from '@/core/actions/customer/bank'


export const useBank = () => {
    return useQuery({
        queryKey: ['customer', 'BankDetails'],
        queryFn: async () => {
            try {
                const res = await getClientBankDetailsAction()
                return res
            } catch (err: any) {
                const error = err?.message ?? ''
                console.error(error)

                const error_message = 'Failed to load bank details'
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
