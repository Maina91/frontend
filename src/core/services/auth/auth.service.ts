// src/api/login.api.ts
import type { LoginFormData } from '@/core/validators/login.schema'
import { apiClient } from '@/core/lib/api.client'


export async function loginUser(data: LoginFormData) {
  try {
  const res = await apiClient.post('/login', data)
   return {
     user: {
       username: access.username,
       role: 'default',
     },
     access_tkn,
     refresh_tkn,
   }
  } catch (err: any) {
    if (err.response?.data?.message) {
      throw new Error(err.response.data.message)
    }
    throw new Error('Unable to login. Please try again later.')
  }
}
