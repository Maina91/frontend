// src/core/actions/products/fetch-products.ts
import { createServerFn } from '@tanstack/react-start'
import { authTokenSchema } from '@/core/validators/auth.schema'
import { fetchProductsService } from '@/core/services/product/product'
import type { ProductResponse } from '@/core/types/product'

export const fetchProducts = createServerFn({ method: 'GET' })
    .validator(authTokenSchema)
    .handler(async ({ data }): Promise<ProductResponse> => {
        try {
            const res = await fetchProductsService(data)

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
