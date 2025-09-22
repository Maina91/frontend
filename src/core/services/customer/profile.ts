import { apiClient } from '@/core/lib/api.client'
import { SessionClient } from '@/core/lib/session.client'

export async function clientProfileService() {
    try {
        const token = SessionClient.getToken()
        if (!token) throw new Error('No session token found')

        const clientProfileEndpoint = '/lofty/client_profile'    

        const res = await apiClient.get(clientProfileEndpoint, {
            headers: { 'auth-token': token },
        })

        return res
    } catch (err: any) {
        if (err.response?.data?.message) throw new Error(err.response.data.message)
        throw new Error('Unable to fetch client profile. Please try again later.')
    }
}