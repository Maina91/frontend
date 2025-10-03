import { apiClient } from '@/core/lib/api.client'
import type { BankDetailsResponse } from '@/core/types/banks'
import type { BankCreateData, BankUpdateData } from '@/core/validators/bank.schema'


export async function fetchBankDetailsService(
    token: string,
): Promise<BankDetailsResponse> {
    try {
        const endpoint = '/lofty/client_bank_details'

        const res = await apiClient.get<BankDetailsResponse>(endpoint, {
            headers: {
                'auth-token': token,
            },
        })

        if (res.status_code !== 200 || !res.banks) {
            throw new Error('Unable to fetch bank details')
        }
        return res
    } catch (error: any) {
        if (error.response?.data?.message) {
            throw new Error(error.response.data.message)
        }
        throw new Error('Unable to fetch bank details. Please try again later.')

    }
}

export async function createBankDetailsService(
    token: string,
    data: BankCreateData,
): Promise<BankDetailsResponse> {
    try {
        const endpoint = 'add_client_bank_details'

        const res = await apiClient.post<BankDetailsResponse>(endpoint, data, {
            headers: {
                'auth-token': token,
            },
        })

        if (res.status_code! == 200){
            throw new Error(res.message || 'Unable to create bank')
        }

        return res
    } catch (error: any) {
        if (error.response?.data?.message) {
            throw new Error(error.response.data.message)
        }
        throw new Error('Unable to create bank. Please try again later.')        
    }
    
}

export async function updateBankDetailsService(
    token: string,
    data: BankUpdateData,
): Promise<BankDetailsResponse> {
    try {
        const endpoint = 'update'

        const res = await apiClient.post<BankDetailsResponse>(endpoint, data, {
            headers: {
                'auth-token': token,
            },
        })

        if (res.status_code! == 200) {
            throw new Error(res.message || 'Unable to create bank')
        }

        return res
    } catch (error: any) {
        if (error.response?.data?.message) {
            throw new Error(error.response.data.message)
        }
        throw new Error('Unable to create bank. Please try again later.')
    }
}

export async function deleteBankDetailsService(
    token: string,
    id: Number,
): Promise<BankDetailsResponse> {
    try {
        if (!id) throw new Error('Bank details id is missing.')

        const endpoint = `delete/${id}`

        const res = await apiClient.post<BankDetailsResponse>(endpoint, {
            headers: {
                'auth-token': token,
            },
        })

        if (res.status_code! == 200) {
            throw new Error(res.message || 'Unable to delete bank details.')
        }

        return res
    } catch (error: any) {
        if (error.response?.data?.message) {
            throw new Error(error.response.data.message)
        }
        throw new Error('Unable to delete bank details. Please try again later.')
    }
}