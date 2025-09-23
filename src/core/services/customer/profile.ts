import { apiClient } from '@/core/lib/api.client'
import type { AuthTokenData } from '@/core/validators/auth.schema'

export interface CustomerProfile {
    member_no: string
    full_name: string
    first_name: string
    last_name: string
    email_address: string
    mobile_no: string
    user_type: 'prospective' | 'customer'
    profileProgress?: any
    customer_ref?: string
    [key: string]: any
}

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

export interface CustomerProfileResponse {
    status_code: number
    success: boolean
    profile: CustomerProfile
}

export interface CustomerBankDetailsResponse {
    status_code: number
    success: boolean
    banks: BankAccount[]
    mobile_payments_no: string | null
}

export async function customerProfileService(
    data: AuthTokenData,
): Promise<CustomerProfile> {
    try {
        if (!data.token) throw new Error('Auth token is missing.')

        const clientProfileEndpoint = '/lofty/client_profile'

        const res = await apiClient.get<CustomerProfileResponse>(clientProfileEndpoint, {
            headers: {
                'auth-token': data.token,
            },
        })

        if (!res.success || !res.profile) {
            throw new Error('Unable to fetch client profile')
        }

        return res.profile
        
    } catch (error: any) {
        if (error.response?.data?.message) {
            throw new Error(error.response.data.message)
        }
        throw new Error('Unable to fetch client profile. Please try again later.')
        
    }
}

export async function getCustomerBankDetailsService(
    data: AuthTokenData,
): Promise<CustomerBankDetailsResponse> {
    try {
        if (!data.token) throw new Error('Auth token is missing.')
        const clientBankDetailsEndpoint = '/lofty/client_bank_details'

        const res = await apiClient.get<CustomerBankDetailsResponse>(clientBankDetailsEndpoint, {
            headers: {
                'auth-token': data.token,
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