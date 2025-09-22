import { createServerFn } from '@tanstack/react-start'
import { clientProfileService } from '@/core/services/customer/profile'

export const clientProfileAction = createServerFn({ method: 'GET' })
    .handler(async ({ data }) => {
        try {
            const profile = await clientProfileService(data)
            return { success: true, profile }
        } catch (err: any) {
            throw {
                message: err?.message ?? 'Unable to fetch profile',
            }
        }
    })