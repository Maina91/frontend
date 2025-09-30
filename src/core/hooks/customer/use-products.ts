import { useQuery } from '@tanstack/react-query'
import { fetchProducts } from '@/core/actions/product/product'
import type { ProductResponse } from '@/core/types/product'

export const useProducts = () => {
    return useQuery<ProductResponse, Error>({
        queryKey: ['products'],
        queryFn: async () => {
            try {
                const res = await fetchProducts()

                return {
                    ...res,
                    securities: res.securities ?? [],
                }
            } catch (err: any) {
                const error = err?.message ?? ''
                console.error(error)

                const error_message = 'Failed to load next of products'
                throw new Error(error_message)
            }
        },
        staleTime: 1000 * 60 * 5, // cache for 5 minutes
        retry: (failureCount, error: Error) => {
            if (failureCount >= 3) return false
            if (error.message.startsWith('4')) return false
            return true
        },
        refetchOnWindowFocus: false,
    })
}
