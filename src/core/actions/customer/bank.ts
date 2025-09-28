import { createServerFn } from '@tanstack/react-start'
import { getCustomerBankDetailsService } from '@/core/services/customer/bank'
import { getCookie } from '@tanstack/react-start/server'

export const getClientBankDetailsAction = createServerFn({ method: 'GET' })
    .handler(async () => {
        try {
            const token = getCookie('auth_token')

            if (!token) throw new Error('Unauthorized')

            const res = await getCustomerBankDetailsService(token)

            return {
                success: true,
                banks: res.banks,
                mobile_payments_no: res.mobile_payments_no,
            }
        } catch (err: any) {
            throw {
                message: err?.message ?? 'Unable to fetch bank details',
                fieldErrors: err?.fieldErrors ?? null,
            }
        }
    })