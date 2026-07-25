import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { ReactNode } from "react";

/**
 * LeaderboardRow 组件
 *
 * 排行榜行组件。支持排名、名称、数据等信息。
 *
 * @component
 * @example
 * <LeaderboardRow
 *   rank={1}
 *   name="Alice"
 *   avatar="..."
 *   stats={[
 *     { label: "Volume", value: "$1.2M" },
 *     { label: "Views", value: "42" },
 *   ]}
 * />
 */

interface LeaderboardStat {
  /**
   * 统计标签
   */
  label: string;

  /**
   * 统计数值
   */
  value: string | number;

  /**
   * 是否突出显示
   */
  highlight?: boolean;
}

interface LeaderboardRowProps {
  /**
   * 排名
   */
  rank: number;

  /**
   * 名称
   */
  name: string;

  /**
   * 头像 URL
   */
  avatar?: string;

  /**
   * 统计数据
   */
  stats: LeaderboardStat[];

  /**
   * 是否显示排名徽章
   */
  showRankBadge?: boolean;

  /**
   * 点击处理
   */
  onClick?: () => void;

  /**
   * 自定义内容区域
   */
  children?: ReactNode;

  /**
   * 自定义 CSS 类名
   */
  className?: string;
}

/**
 * 获取排名徽章颜色
 */
function getRankBadgeColor(rank: number): string {
  if (rank === 1) return "bg-yellow-100 text-yellow-700";
  if (rank === 2) return "bg-gray-100 text-gray-700";
  if (rank === 3) return "bg-orange-100 text-orange-700";
  return "bg-muted text-muted-foreground";
}

/**
 * LeaderboardRow 主组件
 */
export function LeaderboardRow({
  rank,
  name,
  avatar,
  stats,
  showRankBadge = true,
  onClick,
  children,
  className = "",
}: LeaderboardRowProps) {
  return (
    <div
      onClick={onClick}
      className={`flex items-center gap-4 p-3 border rounded-lg hover:bg-muted transition-colors ${onClick ? "cursor-pointer" : ""} ${className}`}
    >
      {/* Rank */}
      {showRankBadge && (
        <Badge
          className={`min-w-[2.5rem] justify-center ${getRankBadgeColor(rank)}`}
        >
          #{rank}
        </Badge>
      )}

      {/* Avatar and Name */}
      <div className="flex items-center gap-3 flex-1 min-w-0">
        <Avatar className="h-8 w-8 flex-shrink-0">
          <AvatarImage src={avatar} />
          <AvatarFallback>{name[0]}</AvatarFallback>
        </Avatar>
        <span className="font-semibold text-sm truncate">{name}</span>
      </div>

      {/* Stats */}
      <div className="flex gap-4 flex-shrink-0">
        {stats.map((stat, i) => (
          <div key={i} className="text-right">
            <p className="text-xs text-muted-foreground">{stat.label}</p>
            <p
              className={`text-sm font-semibold ${stat.highlight ? "text-primary" : "text-foreground"}`}
            >
              {stat.value}
            </p>
          </div>
        ))}
      </div>

      {/* Custom Content */}
      {children && <div className="flex-shrink-0">{children}</div>}
    </div>
  );
}

export type { LeaderboardStat };
