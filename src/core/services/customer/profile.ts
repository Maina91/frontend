import { apiClient } from '@/core/lib/api.client'
import type { AuthTokenData } from '@/core/validators/auth.schema'

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

export async function customerProfileService(
    token: string,
): Promise<CustomerProfile> {
    try {
        if (!token) throw new Error('Unauthorized')

        const clientProfileEndpoint = '/lofty/client_profile'

        const res = await apiClient.get<CustomerProfileResponse>(clientProfileEndpoint, {
            headers: {
                'auth-token': token,
            },
        })

        if (!res.success || !res.profile) {
            throw new Error('Unable to fetch client profile')
        }

        return res.profile
        
    } catch (error: any) {
        if (error.response?.data?.message) {
            throw new Error(error.response.data.message)
        }
        throw new Error('Unable to fetch client profile. Please try again later.')
        
    }
}

