import { Skeleton } from '@/components/ui/skeleton'

export function ListSkeleton() {
    return (
        <div className="space-y-2">
            <Skeleton className="relative h-4 w-60 rounded-md overflow-hidden">
                <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white/40 to-transparent dark:via-gray-500/20" />
            </Skeleton>

            <Skeleton className="relative h-4 w-86 rounded-md overflow-hidden">
                <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white/40 to-transparent dark:via-gray-500/20" />
            </Skeleton>
        </div>
    )
}
