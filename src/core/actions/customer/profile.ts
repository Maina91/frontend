import { createServerFn } from '@tanstack/react-start'
import { customerProfileService } from '@/core/services/customer/profile'

export const clientProfileAction = createServerFn({ method: 'GET' })
    .handler(async () => {
        try {
            const profile = await customerProfileService()
            return { success: true, profile }
        } catch (err: any) {
            throw {
                message: err?.message ?? 'Unable to fetch profile',
            }
        }
    })