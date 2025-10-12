import type { BeneficiariesResponse } from '@/core/types/beneficiaries'
import { apiClient } from '@/core/lib/api.client'


export async function fetchBeneficiaryService(
    token: string,
): Promise<BeneficiariesResponse> {
    try {
        if (!token) throw new Error('Unauthorized')

            const NextOfKinEndpoint = '/client_beneficiaries'

        const res = await apiClient.get<BeneficiariesResponse>(NextOfKinEndpoint, {
            headers: {
                'auth-token': token,
            },
        })

        if (res.status_code !== 200) {
            throw new Error(res.message || 'Unable to fetch beneficiaries')
        }

        return res

    } catch (error: any) {
        if (error.response?.data?.message) {
            throw new Error(error.response.data.message)
        }
        throw new Error('Unable to fetch next of kin. Please try again later.')

    }
}

