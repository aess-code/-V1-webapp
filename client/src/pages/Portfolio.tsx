/**
 * Portfolio Page (/app/portfolio)
 *
 * Reads on-chain positions via TradingEngine.getPosition() for all views.
 * Reads trade history via Bought/Sold events from TradingEngine.
 * All data is live from Sepolia.
 */
import { useAccount, useReadContracts, usePublicClient } from "wagmi";
import { sepolia } from "wagmi/chains";
import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { DAppLayout } from "@/layouts/DAppLayout";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { useTotalViews } from "@/hooks/useProtocol";
import { useViewList } from "@/hooks/useViewList";
import {
  CONTRACT_ADDRESSES,
  MarketStatus,
  formatUSDT,
  pulseIndexToPrices,
} from "@/config/contracts";
import { TradingEngineABI } from "@/config/abis";
import {
  AlertCircle,
  TrendingUp,
  TrendingDown,
  Wallet,
  Activity,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";

// ─────────────────────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────────────────────
interface TradeEvent {
  type: "support" | "exit";
  viewId: bigint;
  side: number;
  amount: bigint;
  shares: bigint;
  txHash: string;
  blockNumber: bigint;
  timestamp?: number;
}

// ─────────────────────────────────────────────────────────────────────────────
// Hook: fetch all positions for current user
// ─────────────────────────────────────────────────────────────────────────────
function useAllPositions(userAddress: `0x${string}` | undefined) {
  const { views, isLoading: viewsLoading } = useViewList();
  const addrs = CONTRACT_ADDRESSES[sepolia.id];

  const contracts = views.map(v => ({
    address: addrs.TradingEngine,
    abi: TradingEngineABI,
    functionName: "getPosition" as const,
    args: [v.record.viewId, userAddress!] as [bigint, `0x${string}`],
  }));

  const { data, isLoading } = useReadContracts({
    contracts: userAddress && contracts.length > 0 ? contracts : [],
    query: { enabled: !!userAddress && contracts.length > 0 },
  });

  const positions = views.map((v, i) => {
    const pos = data?.[i]?.result as { forShares: bigint; againstShares: bigint; claimStatus: number } | undefined;
    return {
      viewData: v,
      forShares: pos?.forShares ?? 0n,
      againstShares: pos?.againstShares ?? 0n,
      claimStatus: pos?.claimStatus ?? 0,
      hasPosition: (pos?.forShares ?? 0n) > 0n || (pos?.againstShares ?? 0n) > 0n,
    };
  }).filter(p => p.hasPosition);

  return { positions, isLoading: viewsLoading || isLoading };
}

// ─────────────────────────────────────────────────────────────────────────────
// Hook: fetch trade history from events
// ─────────────────────────────────────────────────────────────────────────────
function useTradeHistory(userAddress: `0x${string}` | undefined) {
  const [trades, setTrades] = useState<TradeEvent[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const client = usePublicClient({ chainId: sepolia.id });
  const addrs = CONTRACT_ADDRESSES[sepolia.id];

  useEffect(() => {
    if (!userAddress || !client) return;
    setIsLoading(true);

    const fetchEvents = async () => {
      try {
        const [boughtLogs, soldLogs] = await Promise.all([
          client.getLogs({
            address: addrs.TradingEngine,
            event: {
              type: "event",
              name: "Bought",
              inputs: [
                { type: "uint256", name: "viewId", indexed: true },
                { type: "address", name: "trader", indexed: true },
                { type: "uint256", name: "side" },
                { type: "uint256", name: "amountIn" },
                { type: "uint256", name: "sharesOut" },
                { type: "uint256", name: "newIndex" },
              ],
            },
            args: { trader: userAddress },
            fromBlock: "earliest",
            toBlock: "latest",
          }),
          client.getLogs({
            address: addrs.TradingEngine,
            event: {
              type: "event",
              name: "Sold",
              inputs: [
                { type: "uint256", name: "viewId", indexed: true },
                { type: "address", name: "trader", indexed: true },
                { type: "uint256", name: "side" },
                { type: "uint256", name: "sharesIn" },
                { type: "uint256", name: "amountOut" },
                { type: "uint256", name: "newIndex" },
              ],
            },
            args: { trader: userAddress },
            fromBlock: "earliest",
            toBlock: "latest",
          }),
        ]);

        const allTrades: TradeEvent[] = [
          ...boughtLogs.map(log => ({
            type: "support" as const,
            viewId: (log.args as any).viewId as bigint,
            side: Number((log.args as any).side),
            amount: (log.args as any).amountIn as bigint,
            shares: (log.args as any).sharesOut as bigint,
            txHash: log.transactionHash ?? "",
            blockNumber: log.blockNumber ?? 0n,
          })),
          ...soldLogs.map(log => ({
            type: "exit" as const,
            viewId: (log.args as any).viewId as bigint,
            side: Number((log.args as any).side),
            amount: (log.args as any).amountOut as bigint,
            shares: (log.args as any).sharesIn as bigint,
            txHash: log.transactionHash ?? "",
            blockNumber: log.blockNumber ?? 0n,
          })),
        ].sort((a, b) => Number(b.blockNumber - a.blockNumber));

        setTrades(allTrades);
      } catch (err) {
        console.error("Failed to fetch trade history:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchEvents();
  }, [userAddress, client]);

  return { trades, isLoading };
}

// ─────────────────────────────────────────────────────────────────────────────
// Position Card
// ─────────────────────────────────────────────────────────────────────────────
function PositionCard({ position }: { position: ReturnType<typeof useAllPositions>["positions"][0] }) {
  const [, navigate] = useLocation();
  const { viewData, forShares, againstShares, claimStatus } = position;
  const { record, state, yesPrice, noPrice } = viewData;
  const title = record.metadataURI?.startsWith("data:") ? (() => {
    try {
      const json = JSON.parse(decodeURIComponent(record.metadataURI.replace("data:application/json,", "")));
      return json.title || `View #${record.viewId.toString()}`;
    } catch { return `View #${record.viewId.toString()}`; }
  })() : `View #${record.viewId.toString()}`;

  const statusColors: Record<MarketStatus, string> = {
    [MarketStatus.ACTIVE]: "bg-green-500/20 text-green-400 border-green-500/30",
    [MarketStatus.LOCKED]: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
    [MarketStatus.SETTLEMENT]: "bg-blue-500/20 text-blue-400 border-blue-500/30",
    [MarketStatus.CLAIMABLE]: "bg-purple-500/20 text-purple-400 border-purple-500/30",
  };
  const statusLabels: Record<MarketStatus, string> = {
    [MarketStatus.ACTIVE]: "Active",
    [MarketStatus.LOCKED]: "Locked",
    [MarketStatus.SETTLEMENT]: "Settlement",
    [MarketStatus.CLAIMABLE]: "Claimable",
  };

  return (
    <div
      className="bg-card border border-border rounded-xl p-5 cursor-pointer hover:border-primary/30 transition-all"
      onClick={() => navigate(`/app/view/${record.viewId.toString()}`)}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1 min-w-0">
          <span className="text-xs text-muted-foreground font-mono">View #{record.viewId.toString()}</span>
          <h3 className="font-semibold text-sm mt-0.5 line-clamp-2">{title}</h3>
        </div>
        <Badge className={`ml-2 flex-shrink-0 text-xs ${statusColors[state.status]}`}>
          {statusLabels[state.status]}
        </Badge>
      </div>

      <div className="grid grid-cols-2 gap-3 mb-4">
        {forShares > 0n && (
          <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-3">
            <p className="text-xs text-muted-foreground">FOR Position</p>
            <p className="text-base font-bold text-green-400 font-mono">{forShares.toString()}</p>
            <p className="text-xs text-muted-foreground mt-0.5">shares @ {(yesPrice * 100).toFixed(1)}¢</p>
          </div>
        )}
        {againstShares > 0n && (
          <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3">
            <p className="text-xs text-muted-foreground">AGAINST Position</p>
            <p className="text-base font-bold text-red-400 font-mono">{againstShares.toString()}</p>
            <p className="text-xs text-muted-foreground mt-0.5">shares @ {(noPrice * 100).toFixed(1)}¢</p>
          </div>
        )}
      </div>

      <div className="flex items-center justify-between text-xs text-muted-foreground">
        <span>Pulse Index: <span className="font-mono text-primary">{state.lastPulseIndex.toString()}</span></span>
        {state.status === MarketStatus.CLAIMABLE && claimStatus === 0 && (
          <span className="text-purple-400 font-medium">Claim available →</span>
        )}
        {state.status === MarketStatus.CLAIMABLE && claimStatus === 1 && (
          <span className="text-green-400">Claimed</span>
        )}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Trade History Row
// ─────────────────────────────────────────────────────────────────────────────
function TradeRow({ trade }: { trade: TradeEvent }) {
  const isSupport = trade.type === "support";
  return (
    <div className="flex items-center gap-4 py-3 border-b border-border last:border-0">
      <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${isSupport ? "bg-green-500/20" : "bg-red-500/20"}`}>
        {isSupport
          ? <ArrowUpRight className="w-4 h-4 text-green-400" />
          : <ArrowDownRight className="w-4 h-4 text-red-400" />}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span className={`text-sm font-medium ${isSupport ? "text-green-400" : "text-red-400"}`}>
            {isSupport ? "Support" : "Exit"}
          </span>
          <span className="text-xs text-muted-foreground">
            {trade.side === 0 ? "FOR" : "AGAINST"} on View #{trade.viewId.toString()}
          </span>
        </div>
        <div className="flex items-center gap-3 mt-0.5">
          <span className="text-xs text-muted-foreground font-mono">{formatUSDT(trade.amount)}</span>
          <span className="text-xs text-muted-foreground">·</span>
          <span className="text-xs text-muted-foreground font-mono">{trade.shares.toString()} shares</span>
        </div>
      </div>
      <a
        href={`https://sepolia.etherscan.io/tx/${trade.txHash}`}
        target="_blank"
        rel="noopener noreferrer"
        onClick={e => e.stopPropagation()}
        className="text-xs text-primary hover:underline font-mono flex-shrink-0"
      >
        {trade.txHash.slice(0, 8)}...
      </a>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Main Page
// ─────────────────────────────────────────────────────────────────────────────
export default function PortfolioPage() {
  const { address, isConnected } = useAccount();
  const [, navigate] = useLocation();
  const { positions, isLoading: posLoading } = useAllPositions(address);
  const { trades, isLoading: tradeLoading } = useTradeHistory(address);

  if (!isConnected) {
    return (
      <DAppLayout>
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <Wallet className="w-12 h-12 text-muted-foreground mb-4" />
          <h2 className="text-xl font-bold mb-2">Connect Your Wallet</h2>
          <p className="text-muted-foreground text-sm">Connect your wallet to view your positions and trade history.</p>
        </div>
      </DAppLayout>
    );
  }

  return (
    <DAppLayout>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-foreground">Portfolio</h1>
        <p className="text-muted-foreground text-sm mt-1 font-mono">
          {address?.slice(0, 10)}...{address?.slice(-8)}
        </p>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-8">
        <div className="bg-card border border-border rounded-xl p-4">
          <p className="text-xs text-muted-foreground">Active Positions</p>
          <p className="text-2xl font-bold mt-1">
            {posLoading ? <Skeleton className="h-8 w-12" /> : positions.filter(p => p.viewData.state.status === MarketStatus.ACTIVE).length}
          </p>
        </div>
        <div className="bg-card border border-border rounded-xl p-4">
          <p className="text-xs text-muted-foreground">Claimable</p>
          <p className="text-2xl font-bold mt-1 text-purple-400">
            {posLoading ? <Skeleton className="h-8 w-12" /> : positions.filter(p => p.viewData.state.status === MarketStatus.CLAIMABLE && p.claimStatus === 0).length}
          </p>
        </div>
        <div className="bg-card border border-border rounded-xl p-4">
          <p className="text-xs text-muted-foreground">Total Trades</p>
          <p className="text-2xl font-bold mt-1">
            {tradeLoading ? <Skeleton className="h-8 w-12" /> : trades.length}
          </p>
        </div>
      </div>

      {/* Positions */}
      <div className="mb-8">
        <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-4">My Positions</h2>
        {posLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[1, 2].map(i => <Skeleton key={i} className="h-40 w-full" />)}
          </div>
        ) : positions.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {positions.map(p => (
              <PositionCard key={p.viewData.record.viewId.toString()} position={p} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-card border border-border rounded-xl">
            <TrendingUp className="w-8 h-8 text-muted-foreground mx-auto mb-3" />
            <p className="text-sm text-muted-foreground">No positions yet.</p>
            <Button className="mt-4" size="sm" onClick={() => navigate("/app/explore")}>
              Discover Views
            </Button>
          </div>
        )}
      </div>

      {/* Trade History */}
      <div>
        <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-4">Trade History</h2>
        {tradeLoading ? (
          <div className="space-y-3">
            {[1, 2, 3].map(i => <Skeleton key={i} className="h-14 w-full" />)}
          </div>
        ) : trades.length > 0 ? (
          <div className="bg-card border border-border rounded-xl p-4">
            {trades.slice(0, 20).map((trade, i) => (
              <TradeRow key={`${trade.txHash}-${i}`} trade={trade} />
            ))}
            {trades.length > 20 && (
              <p className="text-xs text-muted-foreground text-center pt-3">
                Showing latest 20 of {trades.length} trades
              </p>
            )}
          </div>
        ) : (
          <div className="text-center py-12 bg-card border border-border rounded-xl">
            <Activity className="w-8 h-8 text-muted-foreground mx-auto mb-3" />
            <p className="text-sm text-muted-foreground">No trade history found for this wallet on Sepolia.</p>
          </div>
        )}
      </div>
    </DAppLayout>
  );
}
