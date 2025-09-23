import { useQuery } from '@tanstack/react-query'
import { SessionClient } from '@/core/lib/session.client'
import { queryClient } from '@/core/lib/query.client'
import { clientProfileAction } from '@/core/actions/customer/profile'
import type { CustomerProfile } from '@/core/services/customer/profile'
import { getClientBankDetailsAction } from '@/core/actions/customer/profile'

export const useCustomerProfile = () => {
    return useQuery<CustomerProfile, Error>({
        queryKey: ['clientProfile'],
        queryFn: async () => {
            const token = SessionClient.getToken()
            const expired = SessionClient.isTokenExpired()

            console.log('useCustomerProfile token', token)
            if (!token || expired) {
                SessionClient.clear()
                window.location.href = '/login'
                throw new Error('Session expired')
            }

            try {
                const res = await clientProfileAction({ data: { token }  })
                return res.profile as CustomerProfile
            } catch (err: any) {
                if (err?.message?.includes('401')) {
                    SessionClient.clear()
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

export const useCustomerBankDetails = () => {
    return useQuery({
        queryKey: ['customerBankDetails'],
        queryFn: async () => {
            const token = SessionClient.getToken()
            const expired = SessionClient.isTokenExpired()

            console.log('useCustomerBankDetails token', token)
            if (!token || expired) {
                SessionClient.clear()
                window.location.href = '/login'
                throw new Error('Session expired')
            }

            try {
                const res = await getClientBankDetailsAction({ data: { token }  })
                return res
            } catch (err: any) {
                if (err?.message?.includes('401')) {
                    SessionClient.clear()
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
