import { apiClient } from '@/core/lib/api.client'
import { CustomerProfile, CustomerProfileResponse } from '@/core/types/customer-profile'


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

