import { createServerFn } from '@tanstack/react-start'
import type { BankDetailsResponse } from '@/core/types/banks'
import { createBankDetailsService, deleteBankDetailsService, fetchBankDetailsService,  updateBankDetailsService } from '@/core/services/customer/bank'
import { bankCreateSchema,bankUpdateSchema } from '@/core/validators/bank.schema'
import { useAppSession } from '@/core/lib/session'


export const fetchBankDetails = createServerFn({ method: 'GET' })
    .handler(async (): Promise<BankDetailsResponse> => {
        try {
            const session = await useAppSession()
            const auth_token = session.data.auth_token

            if (!auth_token) throw new Error('Unauthorized')

            const res = await fetchBankDetailsService(auth_token)

            return {
                status_code: res.status_code,                
                success: true,
                message:res.message,
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

  
export const createBankDetails = createServerFn({ method: 'POST' })
    .inputValidator(bankCreateSchema)
    .handler(async ({ data }): Promise<BankDetailsResponse> => {
        try {
            const session = await useAppSession()
            const auth_token = session.data.auth_token
            const member_no = session.data.user?.member_no

            if (!auth_token) throw new Error('Unauthorized')
            if (!member_no) throw new Error('Member number not found in session')

            const payload = {
                ...data,
                member_no,
            }

            const res = await createBankDetailsService(auth_token, payload)
            return res
        } catch (err: any) {
            throw {
                message: err?.message ?? 'Unable to fetch bank details',
                fieldErrors: err?.fieldErrors ?? null,
            }
        }
    })

    
export const updateBankDetails = createServerFn({ method: 'POST' })
    .inputValidator(bankUpdateSchema)
    .handler(async ({ data }): Promise<BankDetailsResponse> => {
        try {
            const session = await useAppSession()
            const auth_token = session.data.auth_token

            if (!auth_token) throw new Error('Unauthorized')

            const res = await updateBankDetailsService(auth_token, data)
            return res
        } catch (err: any) {
            throw {
                message: err?.message ?? 'Unable to fetch bank details',
                fieldErrors: err?.fieldErrors ?? null,
            }
        }
    })
    
    
export const deleteBankDetails = createServerFn({ method: 'POST' })
    .inputValidator(bankUpdateSchema.pick({ id: true }))
    .handler(async ({ data }): Promise<BankDetailsResponse> => {
        try {
            const session = await useAppSession()
            const auth_token = session.data.auth_token

            if (!auth_token) throw new Error('Unauthorized')

            const res = await deleteBankDetailsService(auth_token, data.id)
            return res
        } catch (err: any) {
            throw {
                message: err?.message ?? 'Unable to fetch bank details',
                fieldErrors: err?.fieldErrors ?? null,
            }
        }
    })