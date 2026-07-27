import { ReactNode } from "react";

/**
 * FullLayout 组件
 *
 * 全屏布局，用于 Hero、登陆页等需要全屏展示的页面。
 * 不包含 Header、Sidebar、Footer。
 *
 * @component
 * @example
 * <FullLayout>
 *   <HeroSection />
 * </FullLayout>
 */

interface FullLayoutProps {
  /**
   * 页面内容
   */
  children: ReactNode;

  /**
   * 自定义 CSS 类名
   */
  className?: string;
}

/**
 * FullLayout 主组件
 */
export function FullLayout({ children, className = "" }: FullLayoutProps) {
  return (
    <div className={`min-h-screen flex flex-col ${className}`}>
      {/* Full Screen Content */}
      <main className="flex-1">{children}</main>
    </div>
  );
}
