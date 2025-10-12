import { createServerFn } from '@tanstack/react-start'
import type { ProductResponse } from '@/core/types/product'
import { fetchProductsService } from '@/core/services/product/product'
import { useAppSession } from '@/core/lib/session'


export const fetchProducts = createServerFn({ method: 'GET' })
    .handler(async (): Promise<ProductResponse> => {
        try {
            const session = await useAppSession()
            const auth_token = session.data.auth_token

            if (!auth_token) throw new Error('Unauthorized') 

            const res = await fetchProductsService(auth_token)

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
