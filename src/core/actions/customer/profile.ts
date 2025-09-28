import { createServerFn } from '@tanstack/react-start'
import { customerProfileService } from '@/core/services/customer/profile'
import { getCookie } from '@tanstack/react-start/server'

export const clientProfileAction = createServerFn({ method: 'GET' })
    .handler(async () => {
        try {
            const token = getCookie('auth_token')

            if (!token) throw new Error('Unauthorized')

            const profile = await customerProfileService(token)

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

