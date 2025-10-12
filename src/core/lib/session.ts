import { useSession } from '@tanstack/react-start/server'
import type { UserType } from './constants'
import { env } from '@/env'


export type SessionUser = {
    member_no?: string
    email: string
    role: UserType
    custom_ref?: string
}

export type SessionData = {
    is_authed: boolean
    login_token: string | null
    auth_token: string | null
    user: SessionUser | null
}

export const useAppSession = () =>
    useSession<SessionData>({
        name: 'app-session',
        password: env.SESSION_SECRET,
        cookie: {
            secure: env.NODE_ENV === 'production',
            sameSite: 'lax',
            httpOnly: true,
            path: '/',
            maxAge: env.SESSION_EXPIRY,
        },
    })