import { createServerFn } from '@tanstack/react-start'
import { customerProfileService } from '@/core/services/customer/profile'
import { authTokenSchema } from '@/core/validators/auth.schema'
import { getCustomerBankDetailsService } from '@/core/services/customer/profile'


export const clientProfileAction = createServerFn({ method: 'GET' })
    .validator(authTokenSchema)
    .handler(async ({ data }) => {
        try {
            const profile = await customerProfileService(data)

            return {
                success: true,
                profile
            }

        } catch (err: any) {
            throw {
                message: err?.message ?? 'Unable to fetch profile',
                fieldErrors: err?.fieldErrors ?? null,
            }
        }
    })

export const getClientBankDetailsAction = createServerFn({ method: 'GET' })
    .validator(authTokenSchema)
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