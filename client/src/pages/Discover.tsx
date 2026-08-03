/**
 * Discover Page — Protocol-aligned (Pulse V1 be73488)
 * Data source: Sepolia RPC via wagmi/viem
 */
import { useState } from "react";
import { useLocation } from "wouter";
import { DAppLayout } from "@/layouts/DAppLayout";
import { ProtocolViewCard } from "@/components/cards/ProtocolViewCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { useAllViews } from "@/hooks/useViewList";
import { useTotalViews } from "@/hooks/useProtocol";
import { formatUSDT, MarketStatus } from "@/config/contracts";
import { Search, Plus, Activity, Layers } from "lucide-react";
import type { ViewData } from "@/types/protocol";

type FilterType = "all" | "active" | "locked" | "claimable";

function ProtocolStats({ views, total }: { views: ViewData[]; total: number }) {
  const totalLiquidity = views.reduce((sum, v) => sum + v.vaultBalance, 0n);
  const activeCount = views.filter(v => v.state.status === MarketStatus.ACTIVE).length;
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
      <div className="bg-card border border-border rounded-xl p-4">
        <p className="text-xs text-muted-foreground mb-1">Total Views</p>
        <p className="text-2xl font-bold text-foreground">{total}</p>
        <p className="text-xs text-muted-foreground mt-1">on Sepolia</p>
      </div>
      <div className="bg-card border border-border rounded-xl p-4">
        <p className="text-xs text-muted-foreground mb-1">Active Markets</p>
        <p className="text-2xl font-bold text-green-400">{activeCount}</p>
        <p className="text-xs text-muted-foreground mt-1">trading open</p>
      </div>
      <div className="bg-card border border-border rounded-xl p-4">
        <p className="text-xs text-muted-foreground mb-1">Total Liquidity</p>
        <p className="text-2xl font-bold text-primary">{formatUSDT(totalLiquidity)}</p>
        <p className="text-xs text-muted-foreground mt-1">MockUSDT</p>
      </div>
      <div className="bg-card border border-border rounded-xl p-4">
        <p className="text-xs text-muted-foreground mb-1">Network</p>
        <p className="text-lg font-bold text-foreground">Sepolia</p>
        <p className="text-xs text-muted-foreground mt-1">Chain ID: 11155111</p>
      </div>
    </div>
  );
}

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
      <div className="grid grid-cols-2 gap-2 pt-2">
        <Skeleton className="h-8 w-full" />
        <Skeleton className="h-8 w-full" />
      </div>
    </div>
  );
}

function EmptyState({ onCreateClick }: { onCreateClick: () => void }) {
  return (
    <div className="col-span-full flex flex-col items-center justify-center py-20 text-center">
      <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
        <Layers className="w-8 h-8 text-muted-foreground" />
      </div>
      <h3 className="text-lg font-semibold mb-2">No Views Yet</h3>
      <p className="text-muted-foreground text-sm mb-6 max-w-sm">
        No prediction markets have been created on this network yet. Be the first to create a View.
      </p>
      <Button onClick={onCreateClick} className="gap-2">
        <Plus className="w-4 h-4" />
        Create First View
      </Button>
    </div>
  );
}

function FilterTabs({
  active,
  onChange,
  counts,
}: {
  active: FilterType;
  onChange: (f: FilterType) => void;
  counts: Record<FilterType, number>;
}) {
  const tabs: { key: FilterType; label: string }[] = [
    { key: "all", label: "All" },
    { key: "active", label: "Active" },
    { key: "locked", label: "Locked" },
    { key: "claimable", label: "Claimable" },
  ];
  return (
    <div className="flex gap-2 flex-wrap">
      {tabs.map(tab => (
        <button
          key={tab.key}
          onClick={() => onChange(tab.key)}
          className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
            active === tab.key
              ? "bg-primary text-primary-foreground"
              : "bg-muted text-muted-foreground hover:text-foreground"
          }`}
        >
          {tab.label}
          {counts[tab.key] > 0 && (
            <span className="ml-1.5 text-xs opacity-70">({counts[tab.key]})</span>
          )}
        </button>
      ))}
    </div>
  );
}

export default function DiscoverPage() {
  const [, navigate] = useLocation();
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<FilterType>("all");

  const { views, isLoading, error, total } = useAllViews(50);
  const { data: totalData } = useTotalViews();
  const totalViews = totalData ? Number(totalData as bigint) : total;

  const filteredViews = views.filter(v => {
    if (filter === "active" && v.state.status !== MarketStatus.ACTIVE) return false;
    if (filter === "locked" && v.state.status !== MarketStatus.LOCKED) return false;
    if (filter === "claimable" && v.state.status !== MarketStatus.CLAIMABLE) return false;
    if (search) {
      const q = search.toLowerCase();
      const title = v.metadata?.title || "";
      const uri = v.record.metadataURI.toLowerCase();
      const id = v.record.viewId.toString();
      if (!title.toLowerCase().includes(q) && !uri.includes(q) && !id.includes(q)) return false;
    }
    return true;
  });

  const counts: Record<FilterType, number> = {
    all: views.length,
    active: views.filter(v => v.state.status === MarketStatus.ACTIVE).length,
    locked: views.filter(v => v.state.status === MarketStatus.LOCKED).length,
    claimable: views.filter(v => v.state.status === MarketStatus.CLAIMABLE).length,
  };

  return (
    <DAppLayout>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Discover</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Prediction markets on Pulse Protocol V1
          </p>
        </div>
        <Button
          onClick={() => navigate("/app/create")}
          className="gap-2 bg-gradient-to-r from-primary to-primary-dark hover:opacity-90"
        >
          <Plus className="w-4 h-4" />
          Create View
        </Button>
      </div>

      {!isLoading && <ProtocolStats views={views} total={totalViews} />}

      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search by View ID or metadata..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>
        <FilterTabs active={filter} onChange={setFilter} counts={counts} />
      </div>

      {error && (
        <div className="bg-destructive/10 border border-destructive/30 rounded-xl p-4 mb-6 flex items-center gap-3">
          <Activity className="w-5 h-5 text-destructive flex-shrink-0" />
          <div>
            <p className="text-sm font-medium text-destructive">Failed to load views</p>
            <p className="text-xs text-muted-foreground mt-1">
              Connect your wallet to Sepolia testnet to view live data.
            </p>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {isLoading ? (
          Array.from({ length: 6 }).map((_, i) => <ViewCardSkeleton key={i} />)
        ) : filteredViews.length === 0 ? (
          <EmptyState onCreateClick={() => navigate("/app/create")} />
        ) : (
          filteredViews.map(viewData => (
            <ProtocolViewCard
              key={viewData.record.viewId.toString()}
              viewData={viewData}
            />
          ))
        )}
      </div>

      {!isLoading && filteredViews.length > 0 && (
        <p className="text-center text-xs text-muted-foreground mt-8">
          Showing {filteredViews.length} of {totalViews} views · Live from Sepolia
        </p>
      )}
    </DAppLayout>
  );
}
