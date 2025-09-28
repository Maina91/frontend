import { apiClient } from '@/core/lib/api.client'

export interface BankAccount {
    id: number
    member_no: string
    account_no: string
    bank_code: string
    branch_code: string
    account_name: string
    account_type: string
    currency_code: string
    default_account: boolean
    verified: boolean
    active: boolean
    name: string // bank name
    branch_name: string
    payment_type?: string
}

export interface CustomerBankDetailsResponse {
    status_code: number
    success: boolean
    banks: BankAccount[]
    mobile_payments_no: string | null
}

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