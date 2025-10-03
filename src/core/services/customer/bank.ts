import { apiClient } from '@/core/lib/api.client'
import { BankAccount, CustomerBankDetailsResponse } from '@/core/types/banks'


export async function getCustomerBankDetailsService(
    token: string,
): Promise<CustomerBankDetailsResponse> {
    try {
        if (!token) throw new Error('Auth token is missing.')

        const clientBankDetailsEndpoint = '/lofty/client_bank_details'

        const res = await apiClient.get<CustomerBankDetailsResponse>(clientBankDetailsEndpoint, {
            headers: {
                'auth-token': token,
            },
        })

        if (!res.success || !res.banks) {
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