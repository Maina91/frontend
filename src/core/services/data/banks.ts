import type { BanksResponse, BranchesResponse } from '@/core/types/data/banks'
import { apiClient } from '@/core/lib/api.client'


export async function fetchBanksService(
    token: string,
): Promise<BanksResponse> {
    try {
        if (!token) throw new Error('Unauthorized')

        const ProductsEndpoint = '/banks'

        const res = await apiClient.get<BanksResponse>(ProductsEndpoint, {
            headers: {
                'auth-token': token,
            },
        })

        console.log('Products response:', res)

        return res

    } catch (error: any) {
        if (error.response?.data?.message) {
            throw new Error(error.response.data.message)
        }
        throw new Error('Unable to fetch banks. Please try again later.')
    }
}

export async function fetchBranchesService(
    token: string,
    bank_code: string,
): Promise<BranchesResponse> {
    try {
        if (!token) throw new Error('Unauthorized')
        if (!bank_code) throw new Error('Bank code is required')

        const endpoint = `/bank_branches/${bank_code}`

        const res = await apiClient.get<BranchesResponse>(endpoint, {
            headers: { 'auth-token': token },
        })

        console.log('Branches response:', res)

        return res

    } catch (error: any) {
        if (error.response?.data?.message) {
            throw new Error(error.response.data.message)
        }
        throw new Error('Unable to fetch branches. Please try again later.')
    }
}