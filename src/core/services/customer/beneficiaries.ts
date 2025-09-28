import { apiClient } from '@/core/lib/api.client'
import type { AuthTokenData } from '@/core/validators/auth.schema'


export interface Beneficiary {
    id: number
    full_name: string
    id_passport_number: string | null
    mobile: string | null
    email: string | null
    relationship: string
    percentage_share: string | null
}


export interface BeneficiariesResponse {
    status: number
    status_code: number
    message: string
    beneficiaries: Beneficiary[]
    success?: boolean
}


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

        if (res.status_code !== 200 || !res.beneficiaries) {
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

