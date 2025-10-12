import { createServerFn } from '@tanstack/react-start'
import type { BeneficiariesResponse } from '@/core/types/beneficiaries'
import { fetchBeneficiaryService } from '@/core/services/customer/beneficiaries'
import { useAppSession } from '@/core/lib/session'


export const fetchBeneficiaries = createServerFn({ method: 'GET' })
    .handler(async (): Promise<BeneficiariesResponse> => {
        try {
            const session = await useAppSession()
            const auth_token = session.data.auth_token

            if (!auth_token) throw new Error('Unauthorized')

            const res = await fetchBeneficiaryService(auth_token)

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