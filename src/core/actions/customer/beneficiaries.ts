import { createServerFn } from '@tanstack/react-start'
import { authTokenSchema } from '@/core/validators/auth.schema'
import { fetchBeneficiaryService } from '@/core/services/customer/beneficiaries'
import type { BeneficiariesResponse } from '@/core/services/customer/beneficiaries'


export const fetchBeneficiaries = createServerFn({ method: 'GET' })
    .validator(authTokenSchema)
    .handler(async ({ data }): Promise<BeneficiariesResponse> => {
        try {
            const res = await fetchBeneficiaryService(data)

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