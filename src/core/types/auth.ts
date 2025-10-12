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

export interface UpdatePasswordResponse {
  status_code: number
  message?: string
}

export interface OtpResponse {
  status: number
  message: string
  token: string
  member_status: number
  accounts_count: number
}

export interface ResendOtpResponse {
  status: number
  message: string
}



