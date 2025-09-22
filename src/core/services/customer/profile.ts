import { apiClient } from '@/core/lib/api.client'
import { SessionClient } from '@/core/lib/session.client'

export interface CustomerProfile {
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

export interface CustomerProfileResponse {
    status_code: number
    success: boolean
    profile: CustomerProfile
}

export async function customerProfileService(): Promise<CustomerProfile> {
    const token = SessionClient.getToken()
    if (!token) throw new Error('Login token is missing.')

    const clientProfileEndpoint = '/lofty/client_profile'

    const res = await apiClient.get<CustomerProfileResponse>(clientProfileEndpoint, {
        headers: { 'auth-token': token },
    })

    if (!res.success || !res.profile) {
        throw new Error('Unable to fetch client profile')
    }

    return res.profile
}