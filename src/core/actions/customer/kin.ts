import { createServerFn } from '@tanstack/react-start'
import { nextOfKinSchema, nextOfKinDeleteSchema } from '@/core/validators/kin.schema'
import type { NextOfKinResponse } from '@/core/types/kin'
import { createNextOfKinService, updateNextOfKinService, deleteNextOfKinService, fetchNextOfKinService } from '@/core/services/customer/kin'
import { useAppSession } from '@/core/lib/session'



export const fetchNextOfKin = createServerFn({ method: 'GET' })
    .handler(async (): Promise<NextOfKinResponse> => {
        try {
            const session = await useAppSession()
            const auth_token = session.data.auth_token

            if (!auth_token) throw new Error('Unauthorized') 

            const res = await fetchNextOfKinService(auth_token)

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
    .inputValidator(nextOfKinSchema)
    .handler(async ({ data }): Promise<NextOfKinResponse> => {
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

            const res = await createNextOfKinService(auth_token, payload)
            return res
        } catch (err: any) {
            throw {
                message: err?.message ?? 'Unable to create next of kin',
                fieldErrors: err?.fieldErrors ?? null,
            }
        }   
    })

    
export const updateNextOfKin = createServerFn({ method: 'POST' })
    .inputValidator(nextOfKinSchema)
    .handler(async ({ data }): Promise<NextOfKinResponse> => {
        try {
            const session = await useAppSession()
            const auth_token = session.data.auth_token

            if (!auth_token) throw new Error('Unauthorized') 

            const res = await updateNextOfKinService(auth_token, data)
            return res

        } catch (err: any) {
            throw {
                message: err?.message ?? 'Unable to update next of kin',
                fieldErrors: err?.fieldErrors ?? null,
            }
        }   
    })
    

export const deleteNextOfKin = createServerFn({ method: 'POST' })
    .inputValidator(nextOfKinDeleteSchema.pick({ id: true }))
    .handler(async ({ data }): Promise<NextOfKinResponse> => {
        try {
            const session = await useAppSession()
            const auth_token = session.data.auth_token

            if (!auth_token) throw new Error('Unauthorized') 

            const res = await deleteNextOfKinService(auth_token, data.id)
            return res
        } catch (err: any) {
            throw {
                message: err?.message ?? 'Unable to delete next of kin',
                fieldErrors: err?.fieldErrors ?? null,
            }
        }
    })