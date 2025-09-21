import { queryClient } from '@/core/lib/query.client'

export class SessionClient {
  private static TOKEN_KEY = 'token'
  private static OTP_TOKEN_KEY = 'OtpToken'
  private static EXP_KEY = 'auth_expiry'

  static getToken() {
    if (typeof window === 'undefined') return null
    return sessionStorage.getItem(this.TOKEN_KEY)
  }

  static setToken(token: string, expiresInSeconds?: number) {
    if (typeof window === 'undefined') return
    sessionStorage.setItem(this.TOKEN_KEY, token)
    if (expiresInSeconds) {
      const expiry = Date.now() + expiresInSeconds * 1000
      sessionStorage.setItem(this.EXP_KEY, expiry.toString())
    }
  }

  static isTokenExpired() {
    if (typeof window === 'undefined') return true
    const exp = sessionStorage.getItem(this.EXP_KEY)
    if (!exp) return false
    return Date.now() > parseInt(exp, 10)
  }

  static clearToken() {
    if (typeof window === 'undefined') return
    sessionStorage.removeItem(this.TOKEN_KEY)
    sessionStorage.removeItem(this.EXP_KEY)
  }

  static getOtpToken() {
    if (typeof window === 'undefined') return null
    return sessionStorage.getItem(this.OTP_TOKEN_KEY)
  }

  static setOtpToken(token: string) {
    if (typeof window === 'undefined') return
    sessionStorage.setItem(this.OTP_TOKEN_KEY, token)
  }

  static clearOtpToken() {
    if (typeof window === 'undefined') return
    sessionStorage.removeItem(this.OTP_TOKEN_KEY)
  }

  static clear() {
    if (typeof window === 'undefined') return
    this.clearToken()
    this.clearOtpToken()
    queryClient.cancelQueries()
    queryClient.clear()
  }
}
