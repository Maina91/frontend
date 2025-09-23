import { queryClient } from '@/core/lib/query.client'

export class SessionClient {
  private static TOKEN_KEY = 'token'
  private static TOKEN_EXP_KEY = 'auth_expiry'

  private static OTP_TOKEN_KEY = 'OtpToken'
  private static OTP_EXP_KEY = 'otp_expiry'

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
    return localStorage.getItem(this.OTP_TOKEN_KEY)
  }

  static setOtpToken(token: string, expiresInSeconds = 300) {
    // default 5 minutes
    if (typeof window === 'undefined') return
    localStorage.setItem(this.OTP_TOKEN_KEY, token)
    const expiry = Date.now() + expiresInSeconds * 1000
    localStorage.setItem(this.OTP_EXP_KEY, expiry.toString())
  }

  static isOtpExpired() {
    if (typeof window === 'undefined') return true
    const exp = localStorage.getItem(this.OTP_EXP_KEY)
    if (!exp) return false
    return Date.now() > parseInt(exp, 10)
  }

  static clearOtpToken() {
    if (typeof window === 'undefined') return
    localStorage.removeItem(this.OTP_TOKEN_KEY)
    localStorage.removeItem(this.OTP_EXP_KEY)
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
