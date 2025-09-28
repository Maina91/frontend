import { createServerFn } from '@tanstack/react-start'
import { fetchBeneficiaryService } from '@/core/services/customer/beneficiaries'
import type { BeneficiariesResponse } from '@/core/services/customer/beneficiaries'
import { getCookie } from '@tanstack/react-start/server'


export const fetchBeneficiaries = createServerFn({ method: 'GET' })
    .handler(async (): Promise<BeneficiariesResponse> => {
        try {
            const token = getCookie('auth_token')

            if (!token) throw new Error('Unauthorized')

            const res = await fetchBeneficiaryService(token)

            return {
                status: res.status,
                status_code: res.status_code,
                message: res.message,
                beneficiaries: res.beneficiaries,
                success: true, 
            }

        } catch (err: any) {
            throw {
                message: err?.message ?? 'Unable to fetch next of kin',
                fieldErrors: err?.fieldErrors ?? null,
            }
        }
    })