import { ReactNode } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator, BreadcrumbPage } from "@/components/ui/breadcrumb";

/**
 * DetailLayout 组件
 *
 * 详情页布局，用于 View Detail、Creator Profile 等详情页面。
 * 包含 Header、Breadcrumb、Main Content、Footer。
 *
 * @component
 * @example
 * <DetailLayout
 *   breadcrumbs={[
 *     { label: 'Discover', href: '/' },
 *     { label: 'Bitcoin Price', href: '#' },
 *   ]}
 * >
 *   <ViewDetailContent />
 * </DetailLayout>
 */

interface BreadcrumbItem {
  /**
   * 面包屑标签
   */
  label: string;

  /**
   * 面包屑链接
   */
  href?: string;

  /**
   * 是否为当前页面（不可点击）
   */
  isCurrent?: boolean;
}

interface DetailLayoutProps {
  /**
   * 页面内容
   */
  children: ReactNode;

  /**
   * 面包屑数据
   */
  breadcrumbs?: BreadcrumbItem[];

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
 * DetailLayout 主组件
 */
export function DetailLayout({
  children,
  breadcrumbs = [],
  className = "",
  showFooter = true,
}: DetailLayoutProps) {
  return (
    <div className={`min-h-screen flex flex-col bg-background text-foreground ${className}`}>
      {/* Header */}
      <Header />

      {/* Main Content */}
      <main className="flex-1 pt-16">
        <div className="container mx-auto px-4 py-6 md:px-6 lg:px-8">
          {/* Breadcrumb */}
          {breadcrumbs.length > 0 && (
            <div className="mb-6">
              <Breadcrumb>
                <BreadcrumbList>
                  {breadcrumbs.map((item, index) => (
                    <div key={index} className="flex items-center gap-2">
                      {index > 0 && <BreadcrumbSeparator />}
                      {item.isCurrent ? (
                        <BreadcrumbPage>{item.label}</BreadcrumbPage>
                      ) : (
                        <BreadcrumbLink href={item.href || "#"}>
                          {item.label}
                        </BreadcrumbLink>
                      )}
                    </div>
                  ))}
                </BreadcrumbList>
              </Breadcrumb>
            </div>
          )}

          {/* Detail Content */}
          {children}
        </div>
      </main>

      {/* Footer */}
      {showFooter && <Footer />}
    </div>
  );
}

export type { BreadcrumbItem };
