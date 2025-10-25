import { useQuery } from '@tanstack/react-query'
import type { ProductResponse } from '@/core/types/product'
import { fetchProducts } from '@/core/actions/product/product'


const PRODUCTS_QUERY_KEY = ['products'];

export const useProducts = () => {
    return useQuery<ProductResponse, Error>({
        queryKey: PRODUCTS_QUERY_KEY,
        queryFn: async () => {
            try {
                const res = await fetchProducts()

                return {
                    ...res,
                    securities: res.securities,
                }
            } catch (err: any) {
                const error = err?.message ?? ''
                console.error(error)

                const error_message = 'Failed to load product details'
                throw new Error(error_message)
            }
        },
    })
}
