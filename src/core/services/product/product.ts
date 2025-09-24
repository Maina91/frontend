import { apiClient } from '@/core/lib/api.client'
import type { AuthTokenData } from '@/core/validators/auth.schema'
import type { RawProductResponse, ProductResponse } from '@/core/types/product'


export async function fetchProductsService(
    data: AuthTokenData,
): Promise<ProductResponse> {
    try {
        if (!data.token) throw new Error('Auth token is missing.')

        const ProductsEndpoint = '/securities'

        const res = await apiClient.get<RawProductResponse>(ProductsEndpoint, {
            headers: {
                'auth-token': data.token,
            },
        })

        // if (res.status_code !== 200 || !res.securities) {
        //     throw new Error(res.message || 'Unable to fetch products')
        // }

        console.log('Products response:', res)


        // return res

       return {
      status: res.status,
      status_code: res.status_code,
      message: res.message,
      securities: res.securities?.rows ?? [], 
      success: res.success ?? false,
    }

    } catch (error: any) {
        if (error.response?.data?.message) {
            throw new Error(error.response.data.message)
        }
        throw new Error('Unable to fetch products. Please try again later.')
    }
}