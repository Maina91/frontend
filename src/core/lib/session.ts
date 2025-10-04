import { useSession } from '@tanstack/react-start/server'
import { env } from '@/env'

export type SessionUSer = {
    member_no?: string
    email?: string
    role?: string
}

export type SessionData = {
    is_authed?: boolean
    login_token?: string
    auth_token?: string
    user?: SessionUSer
}

export const useAppSession = () =>
    useSession<SessionData>({
        name: 'app-session',
        password: env.SESSION_SECRET!,
        cookie: {
            secure: env.NODE_ENV === 'production',
            sameSite: 'lax',
            httpOnly: true,
            path: '/',
            maxAge: env.SESSION_EXPIRY,
        },
    })