import { createServerFn } from "@tanstack/react-start";
import type { SessionData } from "@/core/types/auth";
import { useAppSession } from "@/core/lib/session";


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


// export const refreshSession = createServerFn({ method: 'POST' })
//     .handler(async () => {
//         const session = await useAppSession()

//         if (!session.data.login_token) return null

//         try {
//             const res = await fetch(`${env.VITE_API_URL}/auth/refresh`, {
//                 method: 'POST',
//                 headers: { 'Content-Type': 'application/json' },
//                 body: JSON.stringify({ refreshToken: session.data.login_token }),
//             })

//             if (!res.ok) return null

//             const data = await res.json()

//             // Update the session tokens
//             session.data.auth_token = data.access_token
//             session.data.login_token = data.refresh_token ?? session.data.login_token
//             session.data.is_authed = true
//             await session.save()

//             return session.data
//         } catch (err) {
//             console.error('Token refresh failed:', err)
//             return null
//         }
//     })
