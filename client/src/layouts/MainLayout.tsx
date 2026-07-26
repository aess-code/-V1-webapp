import { ReactNode } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

/**
 * MainLayout 组件
 *
 * 标准布局，用于大多数页面。
 * 包含 Header、Main Content、Footer。
 *
 * @component
 * @example
 * <MainLayout>
 *   <DiscoverPage />
 * </MainLayout>
 */

interface MainLayoutProps {
  /**
   * 页面内容
   */
  children: ReactNode;

  /**
   * 自定义 CSS 类名
   */
  className?: string;

  /**
   * 是否显示 Footer
   */
  showFooter?: boolean;
}

/**
 * MainLayout 主组件
 */
export function MainLayout({
  children,
  className = "",
  showFooter = true,
}: MainLayoutProps) {
  return (
    <div className={`min-h-screen flex flex-col bg-background text-foreground ${className}`}>
      {/* Header */}
      <Header />

      {/* Main Content */}
      <main className="flex-1 pt-16">
        {/* Container with responsive padding */}
        <div className="container mx-auto px-4 py-8 md:px-6 lg:px-8">
          {children}
        </div>
      </main>

      {/* Footer */}
      {showFooter && <Footer />}
    </div>
  );
}
