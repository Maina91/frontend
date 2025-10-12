import type { CustomerProfileResponse } from '@/core/types/customer-profile'
import { apiClient } from '@/core/lib/api.client'


export async function customerProfileService(
    token: string,
): Promise<CustomerProfileResponse> {
    try {
        if (!token) throw new Error('Unauthorized')

        const clientProfileEndpoint = '/lofty/client_profile'

        const res = await apiClient.get<CustomerProfileResponse>(clientProfileEndpoint, {
            headers: {
                'auth-token': token,
            },
        })

        if (res.status_code !== 200) {
            throw new Error('Unable to fetch client profile')
        }

        return res
        
    } catch (error: any) {
        if (error.response?.data?.message) {
            throw new Error(error.response.data.message)
        }
        throw new Error('Unable to fetch client profile. Please try again later.')
        
    }
}

