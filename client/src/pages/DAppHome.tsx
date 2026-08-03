/**
 * DApp Home Page (/app)
 * Shows protocol stats, quick actions, and recent views.
 */
import { useLocation } from "wouter";
import { useAccount } from "wagmi";
import { DAppLayout } from "@/layouts/DAppLayout";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useTotalViews } from "@/hooks/useProtocol";
import { useViewList } from "@/hooks/useViewList";
import { ProtocolViewCard } from "@/components/cards/ProtocolViewCard";
import { formatUSDT, MarketStatus } from "@/config/contracts";
import { Compass, Plus, User, TrendingUp, Activity, Layers } from "lucide-react";

function StatCard({ label, value, icon: Icon, sub }: {
  label: string;
  value: string;
  icon: React.ElementType;
  sub?: string;
}) {
  return (
    <div className="bg-card border border-border rounded-xl p-5">
      <div className="flex items-center justify-between mb-3">
        <p className="text-sm text-muted-foreground">{label}</p>
        <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
          <Icon className="w-4 h-4 text-primary" />
        </div>
      </div>
      <p className="text-2xl font-bold text-foreground">{value}</p>
      {sub && <p className="text-xs text-muted-foreground mt-1">{sub}</p>}
    </div>
  );
}

function ProtocolStats() {
  const { data: totalViews, isLoading } = useTotalViews();
  const { views, isLoading: viewsLoading } = useViewList();

  const activeCount = views.filter(v => v.state.status === MarketStatus.ACTIVE).length;
  const totalLiquidity = views.reduce((sum, v) => sum + (v.vaultBalance || 0n), 0n);

  if (isLoading || viewsLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[1, 2, 3].map(i => <Skeleton key={i} className="h-24 w-full" />)}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      <StatCard
        label="Total Views"
        value={totalViews?.toString() ?? "0"}
        icon={Layers}
        sub="Opinion markets created"
      />
      <StatCard
        label="Active Views"
        value={activeCount.toString()}
        icon={Activity}
        sub="Currently trading"
      />
      <StatCard
        label="Total Liquidity"
        value={formatUSDT(totalLiquidity)}
        icon={TrendingUp}
        sub="Across all vaults (Sepolia)"
      />
    </div>
  );
}

export default function DAppHomePage() {
  const [, navigate] = useLocation();
  const { isConnected, address } = useAccount();
  const { views, isLoading } = useViewList();

  // Show latest 3 active views
  const recentViews = views
    .filter(v => v.state.status === MarketStatus.ACTIVE)
    .slice(0, 3);

  return (
    <DAppLayout>
      {/* Welcome */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-foreground">
          {isConnected && address
            ? `Welcome, ${address.slice(0, 6)}...${address.slice(-4)}`
            : "Welcome to Pulse Protocol"}
        </h1>
        <p className="text-muted-foreground text-sm mt-1">
          Decentralized opinion markets on Ethereum Sepolia
        </p>
      </div>

      {/* Protocol Stats */}
      <div className="mb-8">
        <h2 className="text-sm font-medium text-muted-foreground mb-4 uppercase tracking-wider">Protocol Overview</h2>
        <ProtocolStats />
      </div>

      {/* Quick Actions */}
      <div className="mb-8">
        <h2 className="text-sm font-medium text-muted-foreground mb-4 uppercase tracking-wider">Quick Actions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <button
            onClick={() => navigate("/app/explore")}
            className="flex items-center gap-4 p-5 bg-card border border-border rounded-xl hover:border-primary/40 hover:bg-primary/5 transition-all text-left group"
          >
            <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center group-hover:bg-blue-500/20 transition-colors">
              <Compass className="w-5 h-5 text-blue-400" />
            </div>
            <div>
              <p className="font-semibold text-foreground">Discover Views</p>
              <p className="text-xs text-muted-foreground">Browse opinion markets</p>
            </div>
          </button>

          <button
            onClick={() => navigate("/app/create")}
            className="flex items-center gap-4 p-5 bg-card border border-border rounded-xl hover:border-green-500/40 hover:bg-green-500/5 transition-all text-left group"
          >
            <div className="w-10 h-10 rounded-lg bg-green-500/10 flex items-center justify-center group-hover:bg-green-500/20 transition-colors">
              <Plus className="w-5 h-5 text-green-400" />
            </div>
            <div>
              <p className="font-semibold text-foreground">Create View</p>
              <p className="text-xs text-muted-foreground">Launch an opinion market</p>
            </div>
          </button>

          <button
            onClick={() => navigate("/app/portfolio")}
            className="flex items-center gap-4 p-5 bg-card border border-border rounded-xl hover:border-purple-500/40 hover:bg-purple-500/5 transition-all text-left group"
          >
            <div className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center group-hover:bg-purple-500/20 transition-colors">
              <User className="w-5 h-5 text-purple-400" />
            </div>
            <div>
              <p className="font-semibold text-foreground">My Portfolio</p>
              <p className="text-xs text-muted-foreground">View your positions</p>
            </div>
          </button>
        </div>
      </div>

      {/* Recent Active Views */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Active Views</h2>
          <button onClick={() => navigate("/app/explore")} className="text-xs text-primary hover:underline">
            View all →
          </button>
        </div>
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[1, 2, 3].map(i => <Skeleton key={i} className="h-48 w-full" />)}
          </div>
        ) : recentViews.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {recentViews.map(v => (
              <ProtocolViewCard key={v.record.viewId.toString()} viewData={v} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-card border border-border rounded-xl">
            <Activity className="w-8 h-8 text-muted-foreground mx-auto mb-3" />
            <p className="text-sm text-muted-foreground">No active views yet.</p>
            <Button className="mt-4" size="sm" onClick={() => navigate("/app/create")}>
              Create the first View
            </Button>
          </div>
        )}
      </div>
    </DAppLayout>
  );
}
