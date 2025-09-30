import { createServerFn } from '@tanstack/react-start'
import { getCustomerBankDetailsService } from '@/core/services/customer/bank'
import { useAppSession } from '@/core/lib/session'

export const getClientBankDetailsAction = createServerFn({ method: 'GET' })
    .handler(async () => {
        try {
            const session = await useAppSession()
            const auth_token = session.data.auth_token

            if (!auth_token) throw new Error('Unauthorized')

            const res = await getCustomerBankDetailsService(auth_token)

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