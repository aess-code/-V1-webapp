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
      {/* pt-28 for mobile (top bar ~56px + bottom nav ~52px = ~108px), pt-16 for desktop (top bar ~57px) */}
      <main className="flex-1 pt-28 md:pt-16">
        <div className="container mx-auto px-4 py-6 md:px-6 lg:px-8 max-w-6xl">
          {children}
        </div>
      </main>
    </div>
  );
}
