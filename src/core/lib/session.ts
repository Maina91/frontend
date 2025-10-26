import { useSession } from '@tanstack/react-start/server'
import type { SessionData } from '@/core/types/auth'
import { env } from '@/env'


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