import { Loader2 } from "lucide-react";

/**
 * LoadingState 组件
 *
 * 用于显示加载状态。支持两种模式：
 * 1. Skeleton Loading - 显示骨架屏
 * 2. Loading Spinner - 显示加载动画
 *
 * @component
 * @example
 * // 显示 Spinner
 * <LoadingState type="spinner" message="加载中..." />
 *
 * // 显示 Skeleton
 * <LoadingState type="skeleton" count={3} />
 */

interface LoadingStateProps {
  /**
   * 加载类型
   * - spinner: 显示加载动画
   * - skeleton: 显示骨架屏
   */
  type?: "spinner" | "skeleton";

  /**
   * 加载提示文本（仅在 type="spinner" 时使用）
   */
  message?: string;

  /**
   * 骨架屏数量（仅在 type="skeleton" 时使用）
   */
  count?: number;

  /**
   * 自定义 CSS 类名
   */
  className?: string;
}

/**
 * 骨架屏组件
 * 用于显示内容加载前的占位符
 */
function SkeletonLoader({ count = 3 }: { count: number }) {
  return (
    <div className="space-y-4">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="space-y-2">
          <div className="h-4 bg-muted rounded-md animate-pulse" />
          <div className="h-3 bg-muted rounded-md animate-pulse w-5/6" />
          <div className="h-3 bg-muted rounded-md animate-pulse w-4/6" />
        </div>
      ))}
    </div>
  );
}

/**
 * 加载动画组件
 * 用于显示全屏或局部加载状态
 */
function LoadingSpinner({ message = "加载中..." }: { message: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-12 space-y-4">
      <Loader2 className="h-8 w-8 animate-spin text-primary" />
      <p className="text-sm text-muted-foreground">{message}</p>
    </div>
  );
}

/**
 * LoadingState 主组件
 * 根据 type 属性显示不同的加载状态
 */
export function LoadingState({
  type = "spinner",
  message = "加载中...",
  count = 3,
  className = "",
}: LoadingStateProps) {
  return (
    <div className={className}>
      {type === "skeleton" ? (
        <SkeletonLoader count={count} />
      ) : (
        <LoadingSpinner message={message} />
      )}
    </div>
  );
}

export { SkeletonLoader, LoadingSpinner };
