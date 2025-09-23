import { queryClient } from '@/core/lib/query.client'

export class SessionClient {
  private static TOKEN_KEY = 'authToken'
  private static TOKEN_EXP_KEY = 'auth_expiry'

  private static LOGIN_TOKEN_KEY = 'loginToken'
  private static LOGIN_TOKEN_EXPIRY = 'otp_expiry'

  // === Auth Token ===
  static getToken() {
    if (typeof window === 'undefined') return null
    return localStorage.getItem(this.TOKEN_KEY)
  }

  static setToken(token: string, expiresInSeconds = 300) {
    // default 5 minutes
    if (typeof window === 'undefined') return
    localStorage.setItem(this.TOKEN_KEY, token)
    if (expiresInSeconds) {
      const expiry = Date.now() + expiresInSeconds * 1000
      localStorage.setItem(this.TOKEN_EXP_KEY, expiry.toString())
    }
  }

  static isTokenExpired() {
    if (typeof window === 'undefined') return true
    const exp = localStorage.getItem(this.TOKEN_EXP_KEY)
    if (!exp) return false
    return Date.now() > parseInt(exp, 10)
  }

  static clearToken() {
    if (typeof window === 'undefined') return
    localStorage.removeItem(this.TOKEN_KEY)
    localStorage.removeItem(this.TOKEN_EXP_KEY)
  }

  // === OTP Token ===
  static getOtpToken() {
    if (typeof window === 'undefined') return null
    return localStorage.getItem(this.LOGIN_TOKEN_KEY)
  }

  static setOtpToken(token: string, expiresInSeconds = 300) {
    // default 5 minutes
    if (typeof window === 'undefined') return
    localStorage.setItem(this.LOGIN_TOKEN_KEY, token)
    const expiry = Date.now() + expiresInSeconds * 1000
    localStorage.setItem(this.LOGIN_TOKEN_EXPIRY, expiry.toString())
  }

  static isOtpExpired() {
    if (typeof window === 'undefined') return true
    const exp = localStorage.getItem(this.LOGIN_TOKEN_EXPIRY)
    if (!exp) return false
    return Date.now() > parseInt(exp, 10)
  }

  static clearOtpToken() {
    if (typeof window === 'undefined') return
    localStorage.removeItem(this.LOGIN_TOKEN_KEY)
    localStorage.removeItem(this.LOGIN_TOKEN_EXPIRY)
  }

  // === General ===
  static clear() {
    if (typeof window === 'undefined') return
    this.clearToken()
    this.clearOtpToken()
    queryClient.cancelQueries()
    queryClient.clear()
  }
}
