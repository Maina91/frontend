import { createServerFn } from '@tanstack/react-start'
import { getCookie } from '@tanstack/react-start/server'
import { nextOfKinCreateSchema, nextOfKinUpdateSchema} from '@/core/validators/kin.schema'
import type { NextOfKinResponse } from '@/core/types/kin'
import { createNextOfKinService, updateNextOfKinService, deleteNextOfKinService, fetchNextOfKinService } from '@/core/services/customer/kin'


export const fetchNextOfKin = createServerFn({ method: 'GET' })
    .handler(async (): Promise<NextOfKinResponse> => {
        try {
            const token = getCookie('auth_token')

            if (!token) throw new Error('Unauthorized')

            const res = await fetchNextOfKinService(token)

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

export const createNextOfKin = createServerFn({ method: 'POST' })
    .inputValidator(nextOfKinCreateSchema)
    .handler(async ({ data }): Promise<NextOfKinResponse> => {
        try {
            const token = getCookie('auth_token')

            if (!token) throw new Error('Unauthorized')

            const res = await createNextOfKinService(token, data)
            return res
        } catch (err: any) {
            throw {
                message: err?.message ?? 'Unable to create next of kin',
                fieldErrors: err?.fieldErrors ?? null,
            }
        }   
    })

export const updateNextOfKin = createServerFn({ method: 'POST' })
    .inputValidator(nextOfKinUpdateSchema)
    .handler(async ({ data }): Promise<NextOfKinResponse> => {
        try {
            const token = getCookie('auth_token')

            if (!token) throw new Error('Unauthorized')

            const res = await updateNextOfKinService(token, data)
            return res

        } catch (err: any) {
            throw {
                message: err?.message ?? 'Unable to update next of kin',
                fieldErrors: err?.fieldErrors ?? null,
            }
        }   
    })
    
export const deleteNextOfKin = createServerFn({ method: 'POST' })
    .inputValidator(nextOfKinUpdateSchema.pick({ id: true }))
    .handler(async ({ data }): Promise<NextOfKinResponse> => {
        try {
            const token = getCookie('auth_token')

            if (!token) throw new Error('Unauthorized')

            const res = await deleteNextOfKinService(token, data.id)
            return res
        } catch (err: any) {
            throw {
                message: err?.message ?? 'Unable to delete next of kin',
                fieldErrors: err?.fieldErrors ?? null,
            }
        }
    })