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

export interface ResetPasswordResponse {
  status_code: number
  message?: string
  customer_ref?: string
  token?: string
  member_status?: number
  member_token?: string
  member_no?: string
}