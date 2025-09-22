import { createServerFn } from '@tanstack/react-start'
import { customerProfileService } from '@/core/services/customer/profile'
import { authTokenSchema } from '@/core/validators/auth.schema'

export const clientProfileAction = createServerFn({ method: 'GET' })
    .validator(authTokenSchema)
    .handler(async ({ data }) => {
        try {
            const profile = await customerProfileService(data)

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