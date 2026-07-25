import { LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

/**
 * EmptyState 组件
 *
 * 用于显示空状态。当没有数据时显示友好的提示信息和建议操作。
 *
 * @component
 * @example
 * <EmptyState
 *   icon={SearchIcon}
 *   title="没有找到结果"
 *   description="尝试调整搜索条件"
 *   action={{
 *     label: "清除筛选",
 *     onClick: () => clearFilters()
 *   }}
 * />
 */

interface EmptyStateAction {
  /**
   * 按钮文本
   */
  label: string;

  /**
   * 点击处理函数
   */
  onClick: () => void;

  /**
   * 按钮变体
   */
  variant?: "default" | "outline" | "secondary";
}

interface EmptyStateProps {
  /**
   * 显示的图标
   */
  icon?: LucideIcon;

  /**
   * 标题文本
   */
  title: string;

  /**
   * 描述文本
   */
  description?: string;

  /**
   * 建议操作按钮
   */
  action?: EmptyStateAction;

  /**
   * 自定义 CSS 类名
   */
  className?: string;
}

/**
 * EmptyState 主组件
 * 显示空状态提示和建议操作
 */
export function EmptyState({
  icon: Icon,
  title,
  description,
  action,
  className = "",
}: EmptyStateProps) {
  return (
    <div
      className={`flex flex-col items-center justify-center py-12 px-4 text-center space-y-4 ${className}`}
    >
      {Icon && <Icon className="h-12 w-12 text-muted-foreground opacity-50" />}

      <div className="space-y-2">
        <h3 className="text-lg font-semibold">{title}</h3>
        {description && (
          <p className="text-sm text-muted-foreground">{description}</p>
        )}
      </div>

      {action && (
        <Button
          variant={action.variant || "outline"}
          onClick={action.onClick}
          className="mt-4"
        >
          {action.label}
        </Button>
      )}
    </div>
  );
}
