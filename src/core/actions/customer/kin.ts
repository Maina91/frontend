import { createServerFn } from '@tanstack/react-start'
import { authTokenSchema } from '@/core/validators/auth.schema'
import { fetchNextOfKinService } from '@/core/services/customer/kin'
import type { NextOfKinResponse } from '@/core/services/customer/kin'


export const fetchNextOfKin = createServerFn({ method: 'GET' })
    .inputValidator(authTokenSchema)
    .handler(async ({ data }): Promise<NextOfKinResponse> => {
        try {
            const res = await fetchNextOfKinService(data)

            return {
                status: res.status,
                status_code: res.status_code,
                message: res.message,
                next_of_kin: res.next_of_kin,
                success: true, 
            }

        } catch (err: any) {
            throw {
                message: err?.message ?? 'Unable to fetch next of kin',
                fieldErrors: err?.fieldErrors ?? null,
            }
        }
    })