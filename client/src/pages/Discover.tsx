/**
 * Discover Page — Protocol-aligned (Pulse V1 be73488)
 * Data source: Sepolia RPC via wagmi/viem
 * 
 * Features:
 * - Pioneer Curator Weighting
 * - Multi-category classification
 * - 25 items per category limit
 */
import { useState, useMemo } from "react";
import { useLocation } from "wouter";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { DAppLayout } from "@/layouts/DAppLayout";
import { ProtocolViewCard } from "@/components/cards/ProtocolViewCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { useAllViews } from "@/hooks/useViewList";
import { useTotalViews } from "@/hooks/useProtocol";
import { formatUSDT, MarketStatus, isPioneer } from "@/config/contracts";
import { Search, Plus, Activity, Layers, Sparkles, TrendingUp, Filter } from "lucide-react";
import type { ViewData } from "@/types/protocol";

const CATEGORIES = ["Crypto", "Tech", "Politics", "Sports", "Culture", "Science", "Economy"];

function ViewCardSkeleton() {
  return (
    <div className="bg-card border border-border rounded-xl p-4 space-y-3">
      <div className="flex justify-between">
        <Skeleton className="h-4 w-16" />
        <Skeleton className="h-4 w-12" />
      </div>
      <Skeleton className="h-5 w-3/4" />
      <Skeleton className="h-3 w-full" />
      <div className="space-y-2 pt-2">
        <Skeleton className="h-2 w-full" />
        <Skeleton className="h-2 w-full" />
      </div>
    </div>
  );
}

function SectionHeader({ title, icon: Icon, count, badge }: { title: string; icon: any; count?: number; badge?: string }) {
  return (
    <div className="flex items-center justify-between mb-4 mt-8 first:mt-0">
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
          <Icon className="w-4 h-4 text-primary" />
        </div>
        <h2 className="text-lg font-bold text-foreground">{title}</h2>
        {badge && (
          <span className="px-2 py-0.5 rounded-full bg-primary/20 text-primary text-[10px] font-bold uppercase tracking-wider animate-pulse">
            {badge}
          </span>
        )}
      </div>
      {count !== undefined && (
        <span className="text-xs text-muted-foreground">{count} Views</span>
      )}
    </div>
  );
}

export default function DiscoverPage() {
  const [, navigate] = useLocation();
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const { views, isLoading, error } = useAllViews(100);
  const { data: totalData } = useTotalViews();
  const totalViews = totalData ? Number(totalData as bigint) : 0;

  // 1. Process and Sort Views (Pioneer Weighting)
  const processedViews = useMemo(() => {
    return [...views].sort((a, b) => {
      const aPioneer = isPioneer(a.record.feeRecipient);
      const bPioneer = isPioneer(b.record.feeRecipient);
      
      // Pioneer first
      if (aPioneer && !bPioneer) return -1;
      if (!aPioneer && bPioneer) return 1;
      
      // Then by liquidity
      return Number(b.vaultBalance - a.vaultBalance);
    });
  }, [views]);

  // 2. Filter by Search
  const filteredViews = useMemo(() => {
    if (!search) return processedViews;
    const q = search.toLowerCase();
    return processedViews.filter(v => {
      const title = v.metadata?.title || "";
      const desc = v.metadata?.description || "";
      const id = v.record.viewId.toString();
      return title.toLowerCase().includes(q) || desc.toLowerCase().includes(q) || id.includes(q);
    });
  }, [processedViews, search]);

  // 3. Categorize Views
  const categorized = useMemo(() => {
    const pioneer = filteredViews.filter(v => isPioneer(v.record.feeRecipient));
    const trending = filteredViews.filter(v => !isPioneer(v.record.feeRecipient));
    
    const byCategory: Record<string, ViewData[]> = {};
    filteredViews.forEach(v => {
      const cat = v.metadata?.category || "Other";
      if (!byCategory[cat]) byCategory[cat] = [];
      if (byCategory[cat].length < 25) {
        byCategory[cat].push(v);
      }
    });

    return { pioneer: pioneer.slice(0, 25), trending: trending.slice(0, 25), byCategory };
  }, [filteredViews]);

  const displayCategories = selectedCategory 
    ? { [selectedCategory]: filteredViews.filter(v => (v.metadata?.category || "Other") === selectedCategory).slice(0, 25) }
    : categorized.byCategory;

  return (
    <DAppLayout>
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Discover</h1>
          <p className="text-muted-foreground mt-1">Explore curated opinion markets on Pulse V1</p>
        </div>
        <Button
          onClick={() => navigate("/app/create")}
          className="w-full md:w-auto gap-2 bg-gradient-to-r from-primary-light to-primary-dark hover:opacity-90 font-bold"
        >
          <Plus className="w-4 h-4" />
          Create New View
        </Button>
      </div>

      {/* Search & Categories Bar */}
      <div className="space-y-4 mb-8">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input
            placeholder="Search by title, ID, or keyword..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="pl-10 h-12 bg-card border-border rounded-xl focus:ring-primary"
          />
        </div>
        
        <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
          <Button
            variant={selectedCategory === null ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedCategory(null)}
            className="rounded-full px-4 flex-shrink-0"
          >
            All Markets
          </Button>
          {CATEGORIES.map(cat => (
            <Button
              key={cat}
              variant={selectedCategory === cat ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(cat)}
              className="rounded-full px-4 flex-shrink-0"
            >
              {cat}
            </Button>
          ))}
        </div>
      </div>

      {/* Error State */}
      {error && (
        <div className="bg-destructive/10 border border-destructive/30 rounded-2xl p-6 mb-8 flex flex-col items-center text-center gap-4">
          <Activity className="w-10 h-10 text-destructive" />
          <div>
            <h3 className="text-lg font-bold text-destructive">Connection Required</h3>
            <p className="text-sm text-muted-foreground mt-1 max-w-md">
              Please connect your wallet to Sepolia testnet to view live opinion markets.
            </p>
          </div>
          <ConnectButton />
        </div>
      )}

      {/* Main Content */}
      <div className="space-y-12">
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => <ViewCardSkeleton key={i} />)}
          </div>
        ) : filteredViews.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center border-2 border-dashed border-border rounded-3xl">
            <Layers className="w-12 h-12 text-muted-foreground mb-4 opacity-20" />
            <h3 className="text-xl font-bold">No markets found</h3>
            <p className="text-muted-foreground mt-2 max-w-xs">Try adjusting your search or category filters.</p>
          </div>
        ) : (
          <>
            {/* 1. Pioneer Featured (Only in "All" view) */}
            {!selectedCategory && categorized.pioneer.length > 0 && (
              <section>
                <SectionHeader title="Pioneer Featured" icon={Sparkles} badge="High Weight" />
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {categorized.pioneer.map(view => (
                    <div key={view.record.viewId.toString()} className="relative group">
                      <div className="absolute -inset-0.5 bg-gradient-to-r from-primary/50 to-primary-dark/50 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-500"></div>
                      <ProtocolViewCard viewData={view} />
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* 2. Categorized Sections */}
            {Object.entries(displayCategories).map(([cat, items]) => (
              items.length > 0 && (
                <section key={cat}>
                  <SectionHeader title={cat} icon={Filter} count={items.length} />
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {items.map(view => (
                      <ProtocolViewCard key={view.record.viewId.toString()} viewData={view} />
                    ))}
                  </div>
                  {items.length >= 25 && (
                    <div className="mt-6 text-center">
                      <p className="text-xs text-muted-foreground italic">Showing first 25 items in this category.</p>
                    </div>
                  )}
                </section>
              )
            ))}

            {/* 3. Trending (If not filtering by category) */}
            {!selectedCategory && categorized.trending.length > 0 && (
              <section>
                <SectionHeader title="Trending Opinions" icon={TrendingUp} />
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {categorized.trending.map(view => (
                    <ProtocolViewCard key={view.record.viewId.toString()} viewData={view} />
                  ))}
                </div>
              </section>
            )}
          </>
        )}
      </div>

      {!isLoading && filteredViews.length > 0 && (
        <div className="mt-20 pt-8 border-t border-border text-center">
          <p className="text-sm text-muted-foreground">
            Total Protocol Volume: {totalViews} Views · Network: Sepolia Testnet
          </p>
        </div>
      )}
    </DAppLayout>
  );
}
