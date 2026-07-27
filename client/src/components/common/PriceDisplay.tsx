import { ReactNode } from "react";

/**
 * PriceDisplay 组件
 *
 * 统一的价格显示组件。支持 Long/Short 颜色区分。
 *
 * @component
 * @example
 * <PriceDisplay type="long" value={0.65} />
 * <PriceDisplay type="short" value={0.35} />
 */

interface PriceDisplayProps {
  /**
   * 价格类型
   * - long: 看涨（绿色）
   * - short: 看跌（红色）
   */
  type: "long" | "short";

  /**
   * 价格数值
   */
  value: number;

  /**
   * 显示的小数位数
   */
  decimals?: number;

  /**
   * 是否显示货币符号
   */
  showCurrency?: boolean;

  /**
   * 自定义 CSS 类名
   */
  className?: string;

  /**
   * 自定义内容包装
   */
  children?: (value: string) => ReactNode;
}

/**
 * PriceDisplay 主组件
 */
export function PriceDisplay({
  type,
  value,
  decimals = 2,
  showCurrency = false,
  className = "",
  children,
}: PriceDisplayProps) {
  const formattedValue = value.toFixed(decimals);
  const displayValue = showCurrency ? `$${formattedValue}` : formattedValue;
  const colorClass = type === "long" ? "text-green-600" : "text-red-600";

  if (children) {
    return <>{children(displayValue)}</>;
  }

  return (
    <span className={`font-semibold ${colorClass} ${className}`}>
      {displayValue}
    </span>
  );
}
