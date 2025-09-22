// src/core/hooks/useClientProfile.ts
import { useQuery } from '@tanstack/react-query'
import { SessionClient } from '@/core/lib/session.client'
import { queryClient } from '@/core/lib/query.client'
import { clientProfileAction } from '@/core/actions/customer/profile'

export interface ClientProfile {
    member_no: string
    full_name: string
    first_name: string
    last_name: string
    email_address: string
    mobile_no: string
    user_type: 'prospective' | 'customer'
    profileProgress?: any
    customer_ref?: string
    [key: string]: any
}

// Service to fetch profile
const fetchClientProfile = async (): Promise<ClientProfile> => {
    const token = SessionClient.getToken()
    if (!token) throw new Error('No session token found')

    const res = await clientProfileAction()
    if (!res.success || !res.profile) {
        throw new Error('Unable to fetch client profile')
    }

    return res.profile
}


// Hook
export const useClientProfile = () => {
    return useQuery<ClientProfile, Error>({
        queryKey: ['clientProfile'],
        queryFn: fetchClientProfile,
        staleTime: 1000 * 60 * 5, // 5 minutes
        cacheTime: 1000 * 60 * 10, // 10 minutes
        retry: (failureCount, error: any) => {
            if (failureCount >= 3) return false
            if (error?.message?.includes('4')) return false
            return true
        },
        refetchOnWindowFocus: false,
        onError: (err) => {
            console.error('Failed to fetch client profile:', err)
            // optional: handle auto logout if token expired
            if (err.message.includes('401')) {
                SessionClient.clear()
                queryClient.invalidateQueries()
                window.location.href = '/login'
            }
        },
    })
}
