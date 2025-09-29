import { createSignal } from 'solid-js'
import { getCookie, deleteCookie } from '@tanstack/react-start/server'

export const [authToken, setAuthToken] = createSignal<string | null>(null)

export function initAuth() {
    const token = getCookie('auth_token') || null
    setAuthToken(token)
}

export function logout() {
    setAuthToken(null)
    deleteCookie('auth_token', { path: '/' })
    deleteCookie('otp_token', { path: '/' })
}