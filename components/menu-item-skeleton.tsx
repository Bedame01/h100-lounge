import { Skeleton } from "@/components/ui/skeleton"

export function MenuItemSkeleton() {
  return (
    <div className="flex gap-6 items-start">
      {/* Image skeleton */}
      <Skeleton className="flex-shrink-0 w-32 h-32 rounded-2xl" />

      {/* Content skeleton */}
      <div className="flex-grow space-y-3">
        {/* Badges skeleton */}
        <div className="flex gap-2">
          <Skeleton className="h-5 w-24" />
          <Skeleton className="h-5 w-16" />
        </div>

        {/* Title and price skeleton */}
        <div className="flex justify-between gap-4">
          <Skeleton className="h-6 w-48" />
          <Skeleton className="h-6 w-16" />
        </div>

        {/* Description skeleton */}
        <div className="space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
        </div>
      </div>
    </div>
  )
}