import { cn } from "@/lib/utils";

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {}

export function Skeleton({ className, ...props }: SkeletonProps) {
  return (
    <div
      className={cn("animate-pulse rounded-md bg-muted", className)}
      {...props}
    />
  );
}

// Product Card Skeleton
export function ProductCardSkeleton() {
  return (
    <div className="overflow-hidden rounded-lg border bg-card">
      {/* Image placeholder */}
      <Skeleton className="aspect-square w-full" />

      <div className="p-4 space-y-3">
        {/* Product name */}
        <Skeleton className="h-4 w-3/4" />

        {/* Price */}
        <div className="flex items-baseline gap-1">
          <Skeleton className="h-6 w-20" />
          <Skeleton className="h-3 w-16" />
        </div>

        {/* Seller info */}
        <Skeleton className="h-3 w-1/2" />

        {/* Button */}
        <Skeleton className="h-9 w-full" />
      </div>
    </div>
  );
}

// Product Grid Skeleton
export function ProductGridSkeleton({ count = 8 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {Array.from({ length: count }).map((_, i) => (
        <ProductCardSkeleton key={i} />
      ))}
    </div>
  );
}

// Product Detail Skeleton
export function ProductDetailSkeleton() {
  return (
    <div className="grid gap-8 lg:grid-cols-2">
      {/* Images Section */}
      <div className="space-y-4">
        {/* Main Image */}
        <Skeleton className="aspect-square w-full rounded-lg" />

        {/* Thumbnails */}
        <div className="grid grid-cols-4 gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="aspect-square w-full rounded-lg" />
          ))}
        </div>
      </div>

      {/* Product Info Section */}
      <div className="space-y-6">
        {/* Title */}
        <div className="space-y-3">
          <Skeleton className="h-8 w-full" />
          <Skeleton className="h-4 w-1/3" />
        </div>

        {/* Price */}
        <div className="space-y-2">
          <Skeleton className="h-10 w-32" />
        </div>

        {/* Specs */}
        <div className="space-y-3 py-6 border-y">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="flex justify-between">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-4 w-32" />
            </div>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
        </div>
      </div>
    </div>
  );
}

// Category Skeleton
export function CategorySkeleton({ count = 8 }: { count?: number }) {
  return (
    <div className="grid grid-cols-4 gap-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8">
      {Array.from({ length: count }).map((_, i) => (
        <Skeleton key={i} className="aspect-square rounded-lg" />
      ))}
    </div>
  );
}

// Seller Card Skeleton
export function SellerCardSkeleton() {
  return (
    <div className="rounded-lg border bg-card p-6 space-y-4">
      {/* Avatar */}
      <Skeleton className="h-16 w-16 rounded-full" />

      {/* Name */}
      <Skeleton className="h-5 w-32" />

      {/* Description */}
      <div className="space-y-2">
        <Skeleton className="h-3 w-full" />
        <Skeleton className="h-3 w-3/4" />
      </div>

      {/* Button */}
      <Skeleton className="h-9 w-full" />
    </div>
  );
}

// Text Skeleton (for paragraphs)
export function TextSkeleton({ lines = 3 }: { lines?: number }) {
  return (
    <div className="space-y-2">
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton
          key={i}
          className={cn("h-4", i === lines - 1 ? "w-3/4" : "w-full")}
        />
      ))}
    </div>
  );
}

// List Skeleton
export function ListSkeleton({ count = 5 }: { count?: number }) {
  return (
    <div className="space-y-4">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="flex items-center gap-4 p-4 border rounded-lg">
          {/* Avatar */}
          <Skeleton className="h-12 w-12 rounded-full flex-shrink-0" />

          {/* Content */}
          <div className="flex-1 space-y-2">
            <Skeleton className="h-4 w-1/3" />
            <Skeleton className="h-3 w-1/2" />
          </div>

          {/* Action */}
          <Skeleton className="h-9 w-20" />
        </div>
      ))}
    </div>
  );
}

// Table Skeleton
export function TableSkeleton({ rows = 5, cols = 4 }: { rows?: number; cols?: number }) {
  return (
    <div className="border rounded-lg overflow-hidden">
      <table className="w-full">
        <thead className="border-b bg-muted">
          <tr>
            {Array.from({ length: cols }).map((_, i) => (
              <th key={i} className="px-4 py-3 text-left">
                <Skeleton className="h-4 w-20" />
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: rows }).map((_, rowI) => (
            <tr key={rowI} className="border-b last:border-0">
              {Array.from({ length: cols }).map((_, colI) => (
                <td key={colI} className="px-4 py-3">
                  <Skeleton className="h-4 w-full" />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// Seller Detail Skeleton
export function SellerDetailSkeleton() {
  return (
    <div className="min-h-screen space-y-8">
      {/* Header */}
      <div className="border-b">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <Skeleton className="h-8 w-24" />
        </div>
      </div>

      {/* Seller Info Section */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Seller Card */}
          <div className="lg:col-span-1">
            <div className="space-y-4 rounded-lg border bg-card p-6">
              <Skeleton className="h-24 w-24 rounded-full mx-auto" />
              <Skeleton className="h-6 w-40 mx-auto" />
              <Skeleton className="h-4 w-32 mx-auto" />
              <div className="space-y-2 pt-4 border-t">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
              </div>
              <Skeleton className="h-10 w-full" />
            </div>
          </div>

          {/* Details */}
          <div className="lg:col-span-2 space-y-6">
            <Skeleton className="h-32 w-full rounded-lg" />
            <div className="grid gap-4 md:grid-cols-2">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={`detail-${i}`} className="rounded-lg border bg-card p-4">
                  <Skeleton className="h-4 w-24 mb-2" />
                  <Skeleton className="h-6 w-20" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Products Section */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Skeleton className="h-8 w-32 mb-6" />
        <ProductGridSkeleton count={8} />
      </div>
    </div>
  );
}

// Dashboard Skeleton (for seller/admin dashboards)
export function DashboardSkeleton() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="space-y-2">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-4 w-64" />
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="rounded-lg border bg-card p-6 space-y-3">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-8 w-20" />
            <Skeleton className="h-3 w-24" />
          </div>
        ))}
      </div>

      {/* Recent Items List */}
      <div className="rounded-lg border bg-card">
        <div className="border-b p-6">
          <Skeleton className="h-6 w-40" />
        </div>
        <div className="p-6 space-y-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="flex items-center justify-between pb-4 border-b last:border-0">
              <div className="flex items-center gap-4 flex-1">
                <Skeleton className="h-16 w-16 rounded-lg flex-shrink-0" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-3 w-48" />
                </div>
              </div>
              <Skeleton className="h-9 w-20" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
