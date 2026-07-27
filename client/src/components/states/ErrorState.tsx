import { AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

/**
 * ErrorState 组件
 *
 * 用于显示错误状态。当发生错误时显示错误信息和重试选项。
 *
 * @component
 * @example
 * <ErrorState
 *   title="加载失败"
 *   message="网络连接错误，请检查您的网络"
 *   onRetry={() => refetch()}
 * />
 */

interface ErrorStateProps {
  /**
   * 错误标题
   */
  title?: string;

  /**
   * 错误信息
   */
  message?: string;

  /**
   * 重试处理函数
   */
  onRetry?: () => void;

  /**
   * 返回处理函数
   */
  onGoBack?: () => void;

  /**
   * 自定义 CSS 类名
   */
  className?: string;
}

/**
 * ErrorState 主组件
 * 显示错误提示和重试/返回选项
 */
export function ErrorState({
  title = "出错了",
  message = "发生了一个错误，请稍后重试",
  onRetry,
  onGoBack,
  className = "",
}: ErrorStateProps) {
  return (
    <div
      className={`flex flex-col items-center justify-center py-12 px-4 text-center space-y-4 ${className}`}
    >
      <AlertCircle className="h-12 w-12 text-destructive opacity-70" />

      <div className="space-y-2">
        <h3 className="text-lg font-semibold text-destructive">{title}</h3>
        <p className="text-sm text-muted-foreground">{message}</p>
      </div>

      <div className="flex gap-2 mt-4">
        {onRetry && (
          <Button onClick={onRetry} variant="default">
            重试
          </Button>
        )}
        {onGoBack && (
          <Button onClick={onGoBack} variant="outline">
            返回
          </Button>
        )}
      </div>
    </div>
  );
}
