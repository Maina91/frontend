import { createServerFn } from '@tanstack/react-start'
import { customerProfileService } from '@/core/services/customer/profile'
import { useAppSession } from '@/core/lib/session'

export const clientProfileAction = createServerFn({ method: 'GET' })
    .handler(async () => {
        try {
            const session = await useAppSession()
            const auth_token = session.data.auth_token

            if (!auth_token) throw new Error('Unauthorized') 

            const profile = await customerProfileService(auth_token)

            // user session data to be updated later
            const member_no = profile.member_no
            if (member_no){
                await session.update({
                    user: {
                        ...session.data.user,
                        member_no,
                    },   
                })
            }

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

