import { useQuery } from '@tanstack/react-query'
import { SessionClient } from '@/core/lib/session.client'
import { queryClient } from '@/core/lib/query.client'
import { getClientBankDetailsAction } from '@/core/actions/customer/bank'


export const useBank = () => {
    return useQuery({
        queryKey: ['customer', 'BankDetails'],
        queryFn: async () => {
            const token = SessionClient.getAuthToken()
            const expired = SessionClient.isAuthExpired()

            if (!token || expired) {
                SessionClient.clearAll()
                window.location.href = '/login'
                throw new Error('Session expired')
            }

            try {
                const res = await getClientBankDetailsAction({ data: { token } })
                return res
            } catch (err: any) {
                if (err?.message?.includes('401')) {
                    SessionClient.clearAll()
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
