import { createServerFn } from '@tanstack/react-start'
import { authTokenSchema } from '@/core/validators/auth.schema'
import { getCustomerBankDetailsService } from '@/core/services/customer/bank'

export const getClientBankDetailsAction = createServerFn({ method: 'GET' })
    .inputValidator(authTokenSchema)
    .handler(async ({ data }) => {
        try {
            const res = await getCustomerBankDetailsService(data)

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