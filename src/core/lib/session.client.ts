import { queryClient } from '@/core/lib/query.client'
import { env } from '@/env'

export class SessionClient {


  // === Keys ===
  private static AUTH_TOKEN_KEY = 'auth_token'
  private static OTP_TOKEN_KEY = 'otp_token'


  // === Helpers ===
  private static setWithExpiry(key: string, token: string, expiresInSeconds: number) {
    if (typeof window === 'undefined') return
    localStorage.setItem(key, token)
    const expiry = Date.now() + expiresInSeconds * 1000
    localStorage.setItem(`${key}_exp`, expiry.toString())
  }

  private static get(key: string) {
    if (typeof window === 'undefined') return null
    return localStorage.getItem(key)
  }

  private static isExpired(key: string) {
    if (typeof window === 'undefined') return true
    const exp = localStorage.getItem(`${key}_exp`)
    if (!exp) return false
    return Date.now() > parseInt(exp, 10)
  }

  private static clearKey(key: string) {
    if (typeof window === 'undefined') return
    localStorage.removeItem(key)
    localStorage.removeItem(`${key}_exp`)
  }


  // === Auth Token ===
  static getAuthToken() {
    return this.get(this.AUTH_TOKEN_KEY)
  }

  static setAuthToken(token: string, expiresInSeconds = env.VITE_ACCESS_TOKEN_EXPIRY ?? 300) {
    this.setWithExpiry(this.AUTH_TOKEN_KEY, token, expiresInSeconds)
  }

  static isAuthExpired() {
    return this.isExpired(this.AUTH_TOKEN_KEY)
  }

  static clearAuthToken() {
    this.clearKey(this.AUTH_TOKEN_KEY)
  }

  // === OTP Token ===
  static getOtpToken() {
    return this.get(this.OTP_TOKEN_KEY)
  }

  static setOtpToken(token: string, expiresInSeconds = env.VITE_OTP_TOKEN_EXPIRY ?? 300) {
    this.setWithExpiry(this.OTP_TOKEN_KEY, token, expiresInSeconds)
  }

  static isOtpExpired() {
    return this.isExpired(this.OTP_TOKEN_KEY)
  }

  static clearOtpToken() {
    this.clearKey(this.OTP_TOKEN_KEY)
  }

  // === General ===
  static clearAll() {
    this.clearAuthToken()
    this.clearOtpToken()
    queryClient.cancelQueries()
    queryClient.clear()
  }
}