import type { ProductResponse, RawProductResponse } from '@/core/types/product'
import { apiClient } from '@/core/lib/api.client'


export async function fetchProductsService(
    token: string,
): Promise<ProductResponse> {
    try {
        if (!token) throw new Error('Unauthorized')

        const ProductsEndpoint = '/securities'

        const res = await apiClient.get<RawProductResponse>(ProductsEndpoint, {
            headers: {
                'auth-token': token,
            },
        })

        console.log('Products response:', res)

        return {
            status: res.status,
            status_code: res.status_code,
            message: res.message,
            securities: res.securities.rows,
            success: res.success ?? false,
        }

    } catch (error: any) {
        if (error.response?.data?.message) {
            throw new Error(error.response.data.message)
        }
        throw new Error('Unable to fetch products. Please try again later.')
    }
}