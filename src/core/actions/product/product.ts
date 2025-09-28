import { createServerFn } from '@tanstack/react-start'
import { fetchProductsService } from '@/core/services/product/product'
import type { ProductResponse } from '@/core/types/product'
import { getCookie } from '@tanstack/react-start/server'

export const fetchProducts = createServerFn({ method: 'GET' })
    .handler(async (): Promise<ProductResponse> => {
        try {
            const token = getCookie('auth_token')

            if (!token) throw new Error('Unauthorized') 

            const res = await fetchProductsService(token)

            return {
                status: res.status,
                status_code: res.status_code,
                message: res.message,
                securities: res.securities,
                success: true,
            }
        } catch (err: any) {
            throw {
                message: err?.message ?? 'Unable to fetch products',
                fieldErrors: err?.fieldErrors ?? null,
            }
        }
    })
