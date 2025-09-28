import { useQuery } from '@tanstack/react-query'
import { queryClient } from '@/core/lib/query.client'
import { getClientBankDetailsAction } from '@/core/actions/customer/bank'


export const useBank = () => {
    return useQuery({
        queryKey: ['customer', 'BankDetails'],
        queryFn: async () => {
            try {
                const res = await getClientBankDetailsAction()
                return res
            } catch (err: any) {
                if (err?.message?.includes('401')) {
                    queryClient.invalidateQueries()
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
