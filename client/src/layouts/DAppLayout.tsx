/**
 * DApp Layout
 *
 * Layout for all /app/* pages.
 * Includes DAppHeader with wallet connect.
 */

import { ReactNode } from "react";
import DAppHeader from "@/components/layout/DAppHeader";

interface DAppLayoutProps {
  children: ReactNode;
  className?: string;
}

export function DAppLayout({ children, className = "" }: DAppLayoutProps) {
  return (
    <div className={`min-h-screen flex flex-col bg-background text-foreground ${className}`}>
      <DAppHeader />
      {/* pt-16 for desktop header, pt-28 for mobile (header + bottom nav) */}
      <main className="flex-1 pt-16 md:pt-14">
        <div className="container mx-auto px-4 py-6 md:px-6 lg:px-8 max-w-6xl">
          {children}
        </div>
      </main>
    </div>
  );
}
