import { createServerFn } from "@tanstack/react-start";
import { useAppSession } from "@/core/lib/session";
import type { SessionData } from "@/core/lib/session"


export const getSession = createServerFn({ method: 'GET' })
    .handler(async (): Promise<SessionData> => {
        try {
            const session = await useAppSession()

            return {
                is_authed: session.data.is_authed ?? false,
                login_token: session.data.login_token ?? null,
                auth_token: session.data.auth_token ?? null,
                user: session.data.user ?? null,
            }

        } catch (error) {
            console.error("getSession error:", error instanceof Error ? error.message : error)
            return {
                is_authed: false,
                login_token: null,
                auth_token: null,
                user: null,
            }
        }
    })

export const clearSession = createServerFn({ method: 'POST' })
    .handler(async (): Promise<SessionData> => {
        try {
            const session = await useAppSession()
            await session.clear() 

            return {
                is_authed: false,
                login_token: null,
                auth_token: null,
                user: null,
            }
        } catch (error) {
            console.error("clearSession error:", error instanceof Error ? error.message : error)
            return {
                is_authed: false,
                login_token: null,
                auth_token: null,
                user: null,
            }
        }
    })    
