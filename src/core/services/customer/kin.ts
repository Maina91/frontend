import { apiClient } from '@/core/lib/api.client'
import type { AuthTokenData } from '@/core/validators/auth.schema'

export interface NextOfKin {
    id: number
    full_name: string
    id_passport_number: string | null
    mobile: string | null
    email: string | null
    relationship: string
}


export interface NextOfKinResponse {
    status: number
    status_code: number
    message: string
    next_of_kin: NextOfKin[]
    success?: boolean
}


export async function fetchNextOfKinService(
    data: AuthTokenData,
): Promise<NextOfKinResponse> {
    try {
        if (!data.token) throw new Error('Auth token is missing.')
        const NextOfKinEndpoint = '/client_next_of_kin'

        const res = await apiClient.get<NextOfKinResponse>(NextOfKinEndpoint, {
            headers: {
                'auth-token': data.token,
            },
        })

        if (res.status_code !== 200 || !res.next_of_kin) {
            throw new Error(res.message || 'Unable to fetch next of kin')
        }

        return res

    } catch (error: any) {
        if (error.response?.data?.message) {
            throw new Error(error.response.data.message)
        }
        throw new Error('Unable to fetch next of kin. Please try again later.')

    }
}