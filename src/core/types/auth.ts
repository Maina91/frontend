export interface LoginResponse {
  status: number
  status_code: number
  message: string
  otp_generated: string
  token: string
  member_status: number
}

export interface LogoutResponse {
  status: number
  message: string
}
