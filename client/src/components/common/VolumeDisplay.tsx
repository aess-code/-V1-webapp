import { ReactNode } from "react";

/**
 * VolumeDisplay 组件
 *
 * 统一的成交量显示组件。自动格式化大数字。
 *
 * @component
 * @example
 * <VolumeDisplay value={1234567} />
 * <VolumeDisplay value={1234567} label="24h Volume" />
 */

interface VolumeDisplayProps {
  /**
   * 成交量数值
   */
  value: number;

  /**
   * 显示的标签
   */
  label?: string;

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
 * 格式化成交量
 */
function formatVolume(value: number, decimals = 1): string {
  if (value >= 1000000) {
    return `${(value / 1000000).toFixed(decimals)}M`;
  }
  if (value >= 1000) {
    return `${(value / 1000).toFixed(decimals)}K`;
  }
  return value.toFixed(decimals);
}

/**
 * VolumeDisplay 主组件
 */
export function VolumeDisplay({
  value,
  label,
  decimals = 1,
  showCurrency = false,
  className = "",
  children,
}: VolumeDisplayProps) {
  const formattedValue = formatVolume(value, decimals);
  const displayValue = showCurrency ? `$${formattedValue}` : formattedValue;

  if (children) {
    return <>{children(displayValue)}</>;
  }

  return (
    <div className={`space-y-1 ${className}`}>
      {label && <p className="text-xs text-muted-foreground">{label}</p>}
      <p className="font-semibold">{displayValue}</p>
    </div>
  );
}
