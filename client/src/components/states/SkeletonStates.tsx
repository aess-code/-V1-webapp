import { Skeleton } from "@/components/ui/skeleton";

/**
 * Skeleton Loading 组件库
 *
 * 提供统一的 Skeleton 加载状态，确保所有页面保持一致的加载体验。
 * 支持 Card、List、Detail 等不同场景。
 */

/**
 * 卡片 Skeleton
 * 用于 ViewCard、CreatorCard 等卡片组件的加载状态
 */
export function CardSkeleton() {
  return (
    <div className="p-4 space-y-4">
      {/* Header */}
      <div className="space-y-2">
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-3 w-full" />
      </div>

      {/* Creator Info */}
      <div className="flex items-center gap-2 pb-4 border-b">
        <Skeleton className="h-6 w-6 rounded-full" />
        <Skeleton className="h-3 w-1/3" />
      </div>

      {/* Metrics */}
      <div className="space-y-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="space-y-1">
            <div className="flex justify-between">
              <Skeleton className="h-3 w-1/4" />
              <Skeleton className="h-3 w-1/4" />
            </div>
            <Skeleton className="h-2 w-full" />
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="pt-3 border-t">
        <Skeleton className="h-3 w-1/3" />
      </div>
    </div>
  );
}

/**
 * 列表 Skeleton
 * 用于 ViewList、CreatorList 等列表组件的加载状态
 */
export function ListSkeleton({ count = 3 }: { count?: number }) {
  return (
    <div className="space-y-3">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="p-4 space-y-2 border rounded-lg">
          <div className="flex justify-between items-start">
            <div className="space-y-2 flex-1">
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-3 w-1/2" />
            </div>
            <Skeleton className="h-6 w-16" />
          </div>
          <Skeleton className="h-3 w-full" />
        </div>
      ))}
    </div>
  );
}

/**
 * 详情页 Skeleton
 * 用于 ViewDetail、CreatorDetail 等详情页的加载状态
 */
export function DetailSkeleton() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-4">
        <Skeleton className="h-8 w-3/4" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
      </div>

      {/* Creator Info */}
      <div className="flex items-center gap-4 p-4 border rounded-lg">
        <Skeleton className="h-12 w-12 rounded-full" />
        <div className="space-y-2 flex-1">
          <Skeleton className="h-4 w-1/3" />
          <Skeleton className="h-3 w-1/2" />
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-3 gap-4">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="p-4 border rounded-lg space-y-2">
            <Skeleton className="h-3 w-1/2" />
            <Skeleton className="h-6 w-3/4" />
            <Skeleton className="h-2 w-full" />
          </div>
        ))}
      </div>

      {/* Chart Placeholder */}
      <div className="p-4 border rounded-lg">
        <Skeleton className="h-64 w-full" />
      </div>

      {/* Activity Feed */}
      <div className="space-y-3">
        <Skeleton className="h-4 w-1/4" />
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="p-3 border rounded flex justify-between items-center"
          >
            <div className="space-y-1 flex-1">
              <Skeleton className="h-3 w-1/2" />
              <Skeleton className="h-2 w-1/3" />
            </div>
            <Skeleton className="h-3 w-1/4" />
          </div>
        ))}
      </div>
    </div>
  );
}

/**
 * 表格 Skeleton
 * 用于 Leaderboard、Table 等表格组件的加载状态
 */
export function TableSkeleton({
  rows = 5,
  cols = 4,
}: {
  rows?: number;
  cols?: number;
}) {
  return (
    <div className="space-y-2 border rounded-lg overflow-hidden">
      {/* Header */}
      <div className="flex gap-2 p-4 border-b bg-muted">
        {Array.from({ length: cols }).map((_, i) => (
          <Skeleton key={i} className="h-4 flex-1" />
        ))}
      </div>

      {/* Rows */}
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="flex gap-2 p-4 border-b last:border-b-0">
          {Array.from({ length: cols }).map((_, j) => (
            <Skeleton key={j} className="h-4 flex-1" />
          ))}
        </div>
      ))}
    </div>
  );
}

/**
 * 搜索结果 Skeleton
 * 用于 Search Results 的加载状态
 */
export function SearchResultSkeleton({ count = 5 }: { count?: number }) {
  return (
    <div className="space-y-2">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="p-3 border rounded-lg flex gap-3">
          <Skeleton className="h-10 w-10 rounded" />
          <div className="space-y-1 flex-1">
            <Skeleton className="h-4 w-1/2" />
            <Skeleton className="h-3 w-3/4" />
          </div>
        </div>
      ))}
    </div>
  );
}

/**
 * 网格 Skeleton
 * 用于响应式网格布局的加载状态
 */
export function GridSkeleton({
  count = 6,
  cols = 3,
}: {
  count?: number;
  cols?: number;
}) {
  return (
    <div className={`grid gap-4 grid-cols-${cols}`}>
      {Array.from({ length: count }).map((_, i) => (
        <CardSkeleton key={i} />
      ))}
    </div>
  );
}
