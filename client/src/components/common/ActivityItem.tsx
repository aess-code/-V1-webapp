import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { LucideIcon } from "lucide-react";
import { ReactNode } from "react";

/**
 * 活动类型
 */
type ActivityType =
  | "stake"
  | "unstake"
  | "buy"
  | "sell"
  | "create"
  | "comment"
  | "follow"
  | "custom";

/**
 * ActivityItem 组件
 *
 * 显示单条活动记录。支持不同类型的活动。
 *
 * @component
 * @example
 * <ActivityItem
 *   type="stake"
 *   actor={{ name: "Alice", avatar: "..." }}
 *   action="Staked $100 on Long"
 *   timestamp="2 hours ago"
 * />
 */

interface ActivityItemProps {
  /**
   * 活动类型
   */
  type: ActivityType;

  /**
   * 活动执行者
   */
  actor: {
    name: string;
    avatar?: string;
  };

  /**
   * 活动描述
   */
  action: string;

  /**
   * 活动时间戳
   */
  timestamp: string;

  /**
   * 活动数值（可选）
   */
  value?: string | number;

  /**
   * 自定义图标
   */
  icon?: LucideIcon;

  /**
   * 自定义颜色
   */
  color?: "green" | "red" | "blue" | "purple" | "gray";

  /**
   * 自定义内容区域
   */
  children?: ReactNode;

  /**
   * 点击处理
   */
  onClick?: () => void;

  /**
   * 自定义 CSS 类名
   */
  className?: string;
}

/**
 * 获取活动类型的默认颜色
 */
function getActivityColor(
  type: ActivityType
): "green" | "red" | "blue" | "purple" | "gray" {
  const colorMap: Record<
    ActivityType,
    "green" | "red" | "blue" | "purple" | "gray"
  > = {
    stake: "green",
    unstake: "red",
    buy: "green",
    sell: "red",
    create: "blue",
    comment: "purple",
    follow: "blue",
    custom: "gray",
  };
  return colorMap[type];
}

/**
 * 获取颜色类名
 */
function getColorClass(color: string): string {
  const colorMap: Record<string, string> = {
    green: "bg-green-100 text-green-700",
    red: "bg-red-100 text-red-700",
    blue: "bg-blue-100 text-blue-700",
    purple: "bg-purple-100 text-purple-700",
    gray: "bg-gray-100 text-gray-700",
  };
  return colorMap[color] || colorMap.gray;
}

/**
 * ActivityItem 主组件
 */
export function ActivityItem({
  type,
  actor,
  action,
  timestamp,
  value,
  icon: Icon,
  color,
  children,
  onClick,
  className = "",
}: ActivityItemProps) {
  const displayColor = color || getActivityColor(type);
  const colorClass = getColorClass(displayColor);

  return (
    <div
      onClick={onClick}
      className={`flex gap-3 p-3 border rounded-lg hover:bg-muted transition-colors ${onClick ? "cursor-pointer" : ""} ${className}`}
    >
      {/* Avatar */}
      <Avatar className="h-8 w-8 flex-shrink-0">
        <AvatarImage src={actor.avatar} />
        <AvatarFallback>{actor.name[0]}</AvatarFallback>
      </Avatar>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-sm font-semibold text-foreground">
            {actor.name}
          </span>
          <Badge variant="outline" className={`text-xs ${colorClass}`}>
            {type}
          </Badge>
        </div>
        <p className="text-sm text-muted-foreground line-clamp-1">{action}</p>
        <p className="text-xs text-muted-foreground mt-1">{timestamp}</p>
      </div>

      {/* Value or Icon */}
      {value && (
        <div className="flex-shrink-0 text-right">
          <p className="text-sm font-semibold">{value}</p>
        </div>
      )}

      {Icon && !value && (
        <Icon className="h-5 w-5 text-muted-foreground flex-shrink-0" />
      )}

      {/* Custom Content */}
      {children && <div className="flex-shrink-0">{children}</div>}
    </div>
  );
}

export type { ActivityType };
