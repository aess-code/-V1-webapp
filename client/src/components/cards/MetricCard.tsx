import { Card } from "@/components/ui/card";
import { LucideIcon, TrendingUp, TrendingDown } from "lucide-react";
import { ReactNode } from "react";

/**
 * 支持的数据类型
 */
type MetricDataType =
  | "currency"
  | "percentage"
  | "ratio"
  | "index"
  | "token"
  | "text"
  | "custom";

const DEFAULT_DATA_TYPE: MetricDataType = "text";

/**
 * MetricCard 组件
 *
 * 通用的数据展示组件。支持多种数据类型，保持统一的展示规范。
 *
 * @component
 * @example
 * // 货币类型
 * <MetricCard
 *   icon={DollarSign}
 *   label="Total Volume"
 *   value={1234567}
 *   dataType="currency"
 *   change={5.2}
 * />
 *
 * // 百分比类型
 * <MetricCard
 *   label="Accuracy"
 *   value={85.5}
 *   dataType="percentage"
 * />
 *
 * // 自定义渲染
 * <MetricCard
 *   label="Status"
 *   value="Active"
 *   dataType="custom"
 *   render={(value) => <Badge>{value}</Badge>}
 * />
 */

interface MetricCardProps {
  /**
   * 显示的图标
   */
  icon?: LucideIcon;

  /**
   * 指标标签
   */
  label: string;

  /**
   * 指标数值
   */
  value: string | number;

  /**
   * 数据类型
   * - currency: 货币（带 $ 符号，自动格式化）
   * - percentage: 百分比（显示 % 符号）
   * - ratio: 比率（例如 1:2）
   * - index: 指数（例如 100.5）
   * - token: 代币数量（例如 1.234 ETH）
   * - text: 纯文本
   * - custom: 自定义渲染
   */
  dataType?: MetricDataType;

  /**
   * 货币单位（dataType="currency" 时使用）
   * 默认为 "$"
   */
  currencySymbol?: string;

  /**
   * 代币符号（dataType="token" 时使用）
   * 例如 "ETH"、"USDC"
   */
  tokenSymbol?: string;

  /**
   * 变化百分比（正数表示上升，负数表示下降）
   */
  change?: number;

  /**
   * 变化时间范围
   */
  changeLabel?: string;

  /**
   * 自定义渲染函数（dataType="custom" 时使用）
   */
  render?: (value: any) => ReactNode;

  /**
   * 是否显示变化趋势
   */
  showTrend?: boolean;

  /**
   * 自定义 CSS 类名
   */
  className?: string;

  /**
   * 副标题或描述
   */
  subtitle?: string;
}

/**
 * 格式化数字为可读格式
 */
function formatNumber(num: number, decimals = 1): string {
  if (num >= 1000000) {
    return `${(num / 1000000).toFixed(decimals)}M`;
  }
  if (num >= 1000) {
    return `${(num / 1000).toFixed(decimals)}K`;
  }
  return num.toFixed(decimals);
}

/**
 * 格式化指标值
 */
function formatMetricValue(
  value: string | number,
  dataType: MetricDataType = "text" as MetricDataType,
  options?: {
    currencySymbol?: string;
    tokenSymbol?: string;
    render?: (value: any) => ReactNode;
  }
): ReactNode {
  // 自定义渲染
  if (dataType === "custom" && options?.render) {
    return options.render(value);
  }

  // 纯文本
  if (dataType === "text" || typeof value === "string") {
    return value;
  }

  const numValue = value as number;

  switch (dataType) {
    case "currency":
      return `${options?.currencySymbol || "$"}${formatNumber(numValue, 2)}`;
    case "percentage":
      return `${numValue.toFixed(2)}%`;
    case "ratio":
      return `${numValue}:1`;
    case "index":
      return numValue.toFixed(2);
    case "token":
      return `${formatNumber(numValue, 4)} ${options?.tokenSymbol || ""}`;
    case "custom":
      return options?.render ? options.render(value) : value;
    default:
      return value;
  }
}

/**
 * 获取数据类型的显示格式
 */
function getDataTypeFormat(dataType: MetricDataType): string {
  const formats: Record<MetricDataType, string> = {
    currency: "货币",
    percentage: "百分比",
    ratio: "比率",
    index: "指数",
    token: "代币",
    text: "文本",
    custom: "自定义",
  };
  return formats[dataType];
}

/**
 * MetricCard 主组件
 */
export function MetricCard({
  icon: Icon,
  label,
  value,
  dataType = "text",
  currencySymbol = "$",
  tokenSymbol,
  change,
  changeLabel = "24h",
  render,
  showTrend = true,
  className = "",
  subtitle,
}: MetricCardProps) {
  const isPositive = change !== undefined && change >= 0;
  const TrendIcon = isPositive ? TrendingUp : TrendingDown;
  const trendColor = isPositive ? "text-green-600" : "text-red-600";

  const displayValue = formatMetricValue(value, dataType, {
    currencySymbol,
    tokenSymbol,
    render,
  });

  return (
    <Card className={`p-4 space-y-3 ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <span className="text-xs text-muted-foreground font-medium">
            {label}
          </span>
          {subtitle && (
            <p className="text-xs text-muted-foreground opacity-70">
              {subtitle}
            </p>
          )}
        </div>
        {Icon && <Icon className="h-4 w-4 text-muted-foreground" />}
      </div>

      {/* Value */}
      <div className="space-y-2">
        <p className="text-2xl font-bold">{displayValue}</p>

        {/* Change Indicator */}
        {showTrend && change !== undefined && (
          <div className="flex items-center gap-1">
            <TrendIcon className={`h-4 w-4 ${trendColor}`} />
            <span className={`text-xs font-medium ${trendColor}`}>
              {isPositive ? "+" : ""}
              {change.toFixed(2)}%
            </span>
            <span className="text-xs text-muted-foreground">{changeLabel}</span>
          </div>
        )}
      </div>

      {/* Data Type Badge (Optional - for debugging) */}
      {process.env.NODE_ENV === "development" && (
        <div className="pt-2 border-t">
          <span className="text-xs text-muted-foreground opacity-50">
            Type: {getDataTypeFormat(dataType)}
          </span>
        </div>
      )}
    </Card>
  );
}

export type { MetricCardProps, MetricDataType };
