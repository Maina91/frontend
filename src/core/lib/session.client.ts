import { queryClient } from '@/core/lib/query.client'

export class SessionClient {
  private static TOKEN_KEY = 'token'
  private static OTP_TOKEN_KEY = 'OtpToken'

  static getToken() {
    return localStorage.getItem(this.TOKEN_KEY)
  }

  static setToken(token: string) {
    localStorage.setItem(this.TOKEN_KEY, token)
  }

  static clearToken() {
    localStorage.removeItem(this.TOKEN_KEY)
  }

  static getOtpToken() {
    return sessionStorage.getItem(this.OTP_TOKEN_KEY)
  }

  static setOtpToken(token: string) {
    sessionStorage.setItem(this.OTP_TOKEN_KEY, token)
  }

  static clearOtpToken() {
    sessionStorage.removeItem(this.OTP_TOKEN_KEY)
  }

  static clear() {
    this.clearToken()
    this.clearOtpToken()
    queryClient.cancelQueries()
    queryClient.clear()
  }
}
