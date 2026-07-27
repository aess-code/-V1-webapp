import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { TrendingUp, LucideIcon } from "lucide-react";
import { ReactNode } from "react";

import { View as ViewType } from "@/types/view";

/**
 * 可配置的指标项
 * 支持扩展：Belief Index、Confidence Score、Liquidity、Protocol Fee 等
 */
interface MetricItem {
  /**
   * 指标 ID（唯一标识）
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
   * 指标类型
   * - price: 价格（显示为绿/红）
   * - currency: 货币（带 $ 符号）
   * - number: 普通数字
   * - percentage: 百分比
   * - custom: 自定义渲染
   */
  type?: "price" | "currency" | "number" | "percentage" | "custom";

  /**
   * 自定义渲染函数（type="custom" 时使用）
   */
  render?: (value: any) => ReactNode;

  /**
   * 指标颜色（用于 price 类型）
   * - green: 看涨（Long）
   * - red: 看跌（Short）
   */
  color?: "green" | "red";

  /**
   * 是否显示百分比条
   */
  showBar?: boolean;

  /**
   * 百分比值（0-100）
   */
  percentage?: number;

  /**
   * 额外的 CSS 类名
   */
  className?: string;
}

/**
 * ViewCard 组件
 *
 * 显示单个 View 的卡片组件。采用可配置的指标系统，支持灵活扩展。
 *
 * @component
 * @example
 * <ViewCard
 *   view={viewData}
 *   metrics={[
 *     { id: 'long', label: 'Long', value: view.longPrice, type: 'price', color: 'green', showBar: true, percentage: 60 },
 *     { id: 'short', label: 'Short', value: view.shortPrice, type: 'price', color: 'red', showBar: true, percentage: 40 },
 *     { id: 'tvl', label: 'TVL', value: view.tvl, type: 'currency' },
 *   ]}
 *   onClick={() => navigate(`/view/${viewData.id}`)}
 * />
 */

interface ViewCardProps {
  /**
   * View 数据
   */
  view: ViewType;

  /**
   * 可配置的指标列表
   * 如果不提供，将使用默认指标
   */
  metrics?: MetricItem[];

  /**
   * 是否显示 Trending 标签
   */
  showTrending?: boolean;

  /**
   * 点击事件处理
   */
  onClick?: () => void;

  /**
   * 自定义 CSS 类名
   */
  className?: string;

  /**
   * 自定义内容区域（可扩展性）
   */
  children?: ReactNode;
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
  return num.toFixed(0);
}

/**
 * 格式化指标值
 */
function formatMetricValue(metric: MetricItem): string | ReactNode {
  if (metric.render) {
    return metric.render(metric.value);
  }

  switch (metric.type) {
    case "currency":
      return `$${formatNumber(metric.value as number)}`;
    case "percentage":
      return `${metric.value}%`;
    case "price":
      return (metric.value as number).toFixed(2);
    case "number":
    default:
      return metric.value;
  }
}

/**
 * 获取指标颜色类名
 */
function getMetricColorClass(metric: MetricItem): string {
  if (metric.type === "price") {
    return metric.color === "green" ? "text-green-600" : "text-red-600";
  }
  return "text-foreground";
}

/**
 * 获取百分比条颜色
 */
function getBarColorClass(metric: MetricItem): string {
  if (metric.type === "price") {
    return metric.color === "green" ? "bg-green-600" : "bg-red-600";
  }
  return "bg-primary";
}

/**
 * 默认指标配置
 */
function getDefaultMetrics(view: ViewType): MetricItem[] {
  const total = view.pool.longPrice + view.pool.shortPrice;
  const longPercentage = (view.pool.longPrice / total) * 100;
  const shortPercentage = (view.pool.shortPrice / total) * 100;

  return [
    {
      id: "long",
      label: "Long",
      value: view.pool.longPrice,
      type: "price",
      color: "green",
      showBar: true,
      percentage: longPercentage,
    },
    {
      id: "short",
      label: "Short",
      value: view.pool.shortPrice,
      type: "price",
      color: "red",
      showBar: true,
      percentage: shortPercentage,
    },
    {
      id: "tvl",
      label: "TVL",
      value: view.metrics.tvl,
      type: "currency",
    },
    {
      id: "volume24h",
      label: "24h Volume",
      value: view.metrics.volume24h,
      type: "currency",
    },
    {
      id: "participants",
      label: "Participants",
      value: view.metrics.participants,
      type: "number",
    },
  ];
}

/**
 * 指标项组件
 */
function MetricRow({ metric }: { metric: MetricItem }) {
  return (
    <div className={`space-y-1 ${metric.className || ""}`}>
      <div className="flex justify-between items-center">
        <span className="text-xs text-muted-foreground">{metric.label}</span>
        <span
          className={`text-sm font-semibold ${getMetricColorClass(metric)}`}
        >
          {formatMetricValue(metric)}
        </span>
      </div>

      {metric.showBar && metric.percentage !== undefined && (
        <div className="w-full bg-muted rounded-full h-2">
          <div
            className={`${getBarColorClass(metric)} h-2 rounded-full transition-all`}
            style={{ width: `${metric.percentage}%` }}
          />
        </div>
      )}
    </div>
  );
}

/**
 * ViewCard 主组件
 */
export function ViewCard({
  view,
  metrics,
  showTrending = true,
  onClick,
  className = "",
  children,
}: ViewCardProps) {
  const displayMetrics = metrics || getDefaultMetrics(view);

  return (
    <Card
      onClick={onClick}
      className={`p-4 cursor-pointer hover:shadow-lg transition-shadow ${className}`}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <h3 className="font-semibold text-sm line-clamp-2">{view.title}</h3>
          <p className="text-xs text-muted-foreground line-clamp-1 mt-1">
            {view.description}
          </p>
        </div>
        <Badge variant="outline" className="ml-2 flex-shrink-0">
          {view.category}
        </Badge>
      </div>

      {/* Creator Info */}
      <div className="flex items-center gap-2 mb-4 pb-4 border-b">
        <Avatar className="h-6 w-6">
          <AvatarImage src={view.creator.avatar} />
          <AvatarFallback>{view.creator.name[0]}</AvatarFallback>
        </Avatar>
        <span className="text-xs text-muted-foreground">
          {view.creator.name}
        </span>
      </div>

      {/* Metrics Section */}
      <div className="mb-4 space-y-3">
        {displayMetrics.map(metric => (
          <MetricRow key={metric.id} metric={metric} />
        ))}
      </div>

      {/* Custom Content Area */}
      {children && <div className="mb-4">{children}</div>}

      {/* Trending Indicator */}
      {showTrending && (
        <div className="mt-3 pt-3 border-t flex items-center gap-1 text-xs text-green-600">
          <TrendingUp className="h-3 w-3" />
          <span>Trending</span>
        </div>
      )}
    </Card>
  );
}

export type { MetricItem, ViewCardProps };
