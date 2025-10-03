import { apiClient } from '@/core/lib/api.client'
import type { NextOfKinResponse} from '@/core/types/kin'
import type { NextOfKinCreateData, NextOfKinUpdateData } from '@/core/validators/kin.schema'


export async function fetchNextOfKinService(
    token: string,
): Promise<NextOfKinResponse> {
    try {
        const endpoint = '/client_next_of_kin'

        const res = await apiClient.get<NextOfKinResponse>(endpoint, {
            headers: {
                'auth-token': token,
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


export async function createNextOfKinService(
    token: string,
    data: NextOfKinCreateData,
): Promise<NextOfKinResponse> {
    try {
        const endpoint = '/add_client_next_of_kin_details'

        const res = await apiClient.post<NextOfKinResponse>(endpoint, data, {
            headers: {
                'auth-token': token,
            },
        })

        if (res.status_code !== 200) {
            throw new Error(res.message || 'Unable to create next of kin')
        }

        return res

    } catch (error: any) {
        if (error.response?.data?.message) {
            throw new Error(error.response.data.message)
        }
        throw new Error('Unable to create next of kin. Please try again later.')
    }
}

export async function updateNextOfKinService(
    token: string,
    data: NextOfKinUpdateData,
): Promise<NextOfKinResponse> {
    try {

        const endpoint = `/update_client_next_of_kin`

        const res = await apiClient.put<NextOfKinResponse>(endpoint, data, {
            headers: {
                'auth-token': token,
            },
        })

        if (res.status_code !== 200) {
            throw new Error(res.message || 'Unable to update next of kin')
        }

        return res
    } catch (error: any) {
        if (error.response?.data?.message) {
            throw new Error(error.response.data.message)
        }
        throw new Error('Unable to update next of kin. Please try again later.')
    }
}

export async function deleteNextOfKinService(
    token: string,
    id: number,
): Promise<NextOfKinResponse> {
    try {
        if (!id) throw new Error('Next of kin ID is missing.')

        const endpoint = `/delete_client_next_of_kin/${id}`

        const res = await apiClient.delete<NextOfKinResponse>(endpoint, {
            headers: {
                'auth-token': token,
            },
        })

        if (res.status_code !== 200) {
            throw new Error(res.message || 'Unable to delete next of kin')
        }

        return res
    } catch (error: any) {
        if (error.response?.data?.message) {
            throw new Error(error.response.data.message)
        }
        throw new Error('Unable to delete next of kin. Please try again later.')
    }
}
