/**
 * DApp Layout
 *
 * Layout for all /app/* pages.
 * Includes DAppHeader with wallet connect.
 */

import { ReactNode } from "react";
import DAppHeader from "@/components/layout/DAppHeader";
import { useAccount, useChainId, useSwitchChain } from "wagmi";
import { sepolia } from "wagmi/chains";
import { AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface DAppLayoutProps {
  children: ReactNode;
  className?: string;
}

export function DAppLayout({ children, className = "" }: DAppLayoutProps) {
  const { isConnected } = useAccount();
  const chainId = useChainId();
  const { switchChain } = useSwitchChain();
  const isWrongNetwork = isConnected && chainId !== sepolia.id;

  return (
    <div className={`min-h-screen flex flex-col bg-background text-foreground ${className}`}>
      <DAppHeader />
      
      {/* pt-28 for mobile (top bar ~56px + bottom nav ~52px = ~108px), pt-16 for desktop (top bar ~57px) */}
      <main className="flex-1 pt-28 md:pt-16">
        {isWrongNetwork && (
          <div className="bg-yellow-500/10 border-b border-yellow-500/20 py-2 px-4 mb-4">
            <div className="container mx-auto max-w-6xl flex items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-yellow-500 text-sm">
                <AlertCircle className="w-4 h-4" />
                <span>You are connected to the wrong network. Please switch to Sepolia.</span>
              </div>
              <Button 
                variant="outline" 
                size="sm" 
                className="h-8 border-yellow-500/50 text-yellow-500 hover:bg-yellow-500/10"
                onClick={() => switchChain({ chainId: sepolia.id })}
              >
                Switch to Sepolia
              </Button>
            </div>
          </div>
        )}
        
        <div className="container mx-auto px-4 py-6 md:px-6 lg:px-8 max-w-6xl">
          {children}
        </div>
      </main>
    </div>
  );
}
