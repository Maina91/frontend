import { useQuery } from '@tanstack/react-query'
import { queryClient } from '@/core/lib/query.client'
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
                const apiError = err?.message ?? 'Unexpected error'
                const error = 'Failed to load products'

                if (apiError.includes('401')) {
                    window.location.href = '/login'
                }

                throw new Error(error)
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
