import { createServerFn } from "@tanstack/react-start";
import { useAppSession } from "@/core/lib/session";
import type { SessionData } from "@/core/lib/session"


export const getSession = createServerFn({ method: 'GET' })
    .handler(async (): Promise<SessionData> => {
        try {
            const session = await useAppSession()

            return {
                is_authed: session.data.is_authed ?? false,
                login_token: session.data.login_token ?? '',
                auth_token: session.data.auth_token ?? '',
                user: session.data.user ?? {},
            }

        } catch (error) {
            console.error("getSession error:", error)
            return {
                is_authed: false,
                login_token: '',
                auth_token: '',
                user: {},
            }
        }
    })
