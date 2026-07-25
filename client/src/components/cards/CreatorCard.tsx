import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { ReactNode } from "react";

/**
 * Creator 数据类型
 */
interface Creator {
  address: string;
  name: string;
  avatar?: string;
  bio?: string;
  viewsCount: number;
  totalVolume: number;
  followers: number;
  reputation?: number;
  // 预留字段，支持未来扩展
  accuracy?: number;
  historicalPerformance?: number;
  verified?: boolean;
}

/**
 * 可配置的统计指标
 */
interface StatItem {
  /**
   * 指标 ID
   */
  id: string;

  /**
   * 指标标签
   */
  label: string;

  /**
   * 指标数值
   */
  value: string | number;

  /**
   * 是否显示
   */
  visible?: boolean;

  /**
   * 自定义渲染函数
   */
  render?: (value: any) => ReactNode;
}

/**
 * CreatorCard 组件
 *
 * 显示单个 Creator 的卡片组件。采用可扩展设计，支持自定义指标和内容区域。
 *
 * @component
 * @example
 * <CreatorCard
 *   creator={creatorData}
 *   stats={[
 *     { id: 'views', label: 'Views', value: creator.viewsCount },
 *     { id: 'volume', label: 'Volume', value: `$${creator.totalVolume}` },
 *     { id: 'accuracy', label: 'Accuracy', value: `${creator.accuracy}%` },
 *   ]}
 *   onViewProfile={() => navigate(`/creator/${creatorData.address}`)}
 *   onFollow={() => followCreator(creatorData.address)}
 * >
 *   <div>Custom content area</div>
 * </CreatorCard>
 */

interface CreatorCardProps {
  /**
   * Creator 数据
   */
  creator: Creator;

  /**
   * 自定义统计指标
   * 如果不提供，将使用默认指标
   */
  stats?: StatItem[];

  /**
   * 查看资料处理函数
   */
  onViewProfile?: () => void;

  /**
   * 关注处理函数
   */
  onFollow?: () => void;

  /**
   * 是否已关注
   */
  isFollowing?: boolean;

  /**
   * 自定义内容区域（可扩展性）
   * 在统计数据和操作按钮之间显示
   */
  children?: ReactNode;

  /**
   * 自定义 CSS 类名
   */
  className?: string;
}

/**
 * 格式化数字为可读格式
 */
function formatNumber(num: number): string {
  if (num >= 1000000) {
    return `${(num / 1000000).toFixed(1)}M`;
  }
  if (num >= 1000) {
    return `${(num / 1000).toFixed(1)}K`;
  }
  return num.toString();
}

/**
 * 获取默认统计指标
 */
function getDefaultStats(creator: Creator): StatItem[] {
  const stats: StatItem[] = [
    {
      id: "views",
      label: "Views",
      value: formatNumber(creator.viewsCount),
      visible: true,
    },
    {
      id: "volume",
      label: "Volume",
      value: `$${formatNumber(creator.totalVolume)}`,
      visible: true,
    },
    {
      id: "followers",
      label: "Followers",
      value: formatNumber(creator.followers),
      visible: true,
    },
  ];

  // 可选指标：Accuracy
  if (creator.accuracy !== undefined) {
    stats.push({
      id: "accuracy",
      label: "Accuracy",
      value: `${creator.accuracy}%`,
      visible: true,
    });
  }

  // 可选指标：Historical Performance
  if (creator.historicalPerformance !== undefined) {
    stats.push({
      id: "performance",
      label: "Performance",
      value: `${creator.historicalPerformance}%`,
      visible: true,
    });
  }

  return stats;
}

/**
 * 统计项组件
 */
function StatRow({ stat }: { stat: StatItem }) {
  if (stat.visible === false) {
    return null;
  }

  const displayValue = stat.render ? stat.render(stat.value) : stat.value;

  return (
    <div className="space-y-1">
      <p className="text-xs text-muted-foreground">{stat.label}</p>
      <p className="font-semibold text-sm">{displayValue}</p>
    </div>
  );
}

/**
 * CreatorCard 主组件
 */
export function CreatorCard({
  creator,
  stats,
  onViewProfile,
  onFollow,
  isFollowing = false,
  children,
  className = "",
}: CreatorCardProps) {
  const displayStats = stats || getDefaultStats(creator);
  const visibleStats = displayStats.filter(s => s.visible !== false);

  return (
    <Card
      className={`p-6 flex flex-col items-center text-center space-y-4 ${className}`}
    >
      {/* Avatar */}
      <Avatar className="h-16 w-16">
        <AvatarImage src={creator.avatar} />
        <AvatarFallback>{creator.name[0]}</AvatarFallback>
      </Avatar>

      {/* Name and Bio */}
      <div className="space-y-1">
        <div className="flex items-center justify-center gap-2">
          <h3 className="font-semibold text-base">{creator.name}</h3>
          {creator.verified && (
            <Badge variant="secondary" className="text-xs">
              Verified
            </Badge>
          )}
        </div>
        {creator.bio && (
          <p className="text-xs text-muted-foreground line-clamp-2">
            {creator.bio}
          </p>
        )}
      </div>

      {/* Reputation Badge */}
      {creator.reputation !== undefined && (
        <Badge variant="secondary">Reputation: {creator.reputation}</Badge>
      )}

      {/* Stats Grid */}
      {visibleStats.length > 0 && (
        <div
          className={`grid gap-4 w-full py-4 border-y grid-cols-${Math.min(visibleStats.length, 3)}`}
        >
          {visibleStats.map(stat => (
            <StatRow key={stat.id} stat={stat} />
          ))}
        </div>
      )}

      {/* Custom Content Area */}
      {children && <div className="w-full">{children}</div>}

      {/* Actions */}
      <div className="flex gap-2 w-full">
        {onViewProfile && (
          <Button
            variant="outline"
            size="sm"
            onClick={onViewProfile}
            className="flex-1"
          >
            View Profile
          </Button>
        )}
        {onFollow && (
          <Button
            variant={isFollowing ? "outline" : "default"}
            size="sm"
            onClick={onFollow}
            className="flex-1"
          >
            {isFollowing ? "Following" : "Follow"}
          </Button>
        )}
      </div>
    </Card>
  );
}

export type { Creator, StatItem, CreatorCardProps };
