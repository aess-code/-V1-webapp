/**
 * View Detail Page — Protocol-aligned (Pulse V1 be73488)
 * Data: TradingEngine + PulseFactory via wagmi/viem
 */
import { useState } from "react";
import { useParams, useLocation } from "wouter";
import { useAccount } from "wagmi";
import { sepolia } from "wagmi/chains";
import { DAppLayout } from "@/layouts/DAppLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import {
  useViewData,
  usePosition,
  useUSDTBalance,
  useUSDTAllowance,
  useClaimableAmount,
  useHasClaimed,
} from "@/hooks/useProtocol";
import {
  useBuy,
  useSell,
  useApproveUSDT,
  useClaimReward,
  useLockMarket,
  useSettleMarket,
} from "@/hooks/useProtocolWrite";
import {
  MarketStatus,
  formatUSDT,
  parseUSDT,
  CONTRACT_ADDRESSES,
} from "@/config/contracts";
import {
  ArrowLeft,
  TrendingUp,
  Lock,
  CheckCircle,
  Clock,
  ExternalLink,
  AlertCircle,
  Share2,
  Copy,
  Check,
} from "lucide-react";

function StatusBadge({ status }: { status: MarketStatus }) {
  const configs = {
    [MarketStatus.ACTIVE]: { label: "Active", icon: TrendingUp, cls: "bg-green-500/20 text-green-400 border-green-500/30" },
    [MarketStatus.LOCKED]: { label: "Locked", icon: Lock, cls: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30" },
    [MarketStatus.SETTLEMENT]: { label: "Settlement", icon: Clock, cls: "bg-blue-500/20 text-blue-400 border-blue-500/30" },
    [MarketStatus.CLAIMABLE]: { label: "Claimable", icon: CheckCircle, cls: "bg-purple-500/20 text-purple-400 border-purple-500/30" },
  };
  const cfg = configs[status];
  const Icon = cfg.icon;
  return (
    <Badge className={`${cfg.cls} text-xs`}>
      <Icon className="w-3 h-3 mr-1" />
      {cfg.label}
    </Badge>
  );
}

function PriceDisplay({ yesPrice, noPrice, pulseIndex }: { yesPrice: number; noPrice: number; pulseIndex: bigint }) {
  return (
    <div className="bg-card border border-border rounded-xl p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-medium text-muted-foreground">Current Prices</h3>
        <span className="text-xs text-muted-foreground font-mono">Pulse Index: {pulseIndex.toString()}</span>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-sm text-muted-foreground">YES</span>
            <span className="text-lg font-bold text-green-400">{(yesPrice * 100).toFixed(2)}¢</span>
          </div>
          <div className="w-full bg-muted rounded-full h-3">
            <div className="bg-green-500 h-3 rounded-full transition-all" style={{ width: `${yesPrice * 100}%` }} />
          </div>
        </div>
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-sm text-muted-foreground">NO</span>
            <span className="text-lg font-bold text-red-400">{(noPrice * 100).toFixed(2)}¢</span>
          </div>
          <div className="w-full bg-muted rounded-full h-3">
            <div className="bg-red-500 h-3 rounded-full transition-all" style={{ width: `${noPrice * 100}%` }} />
          </div>
        </div>
      </div>
    </div>
  );
}

function TradePanel({ viewId, isActive }: { viewId: bigint; isActive: boolean }) {
  const { isConnected } = useAccount();
  const [tradeTab, setTradeTab] = useState<"support" | "exit">("support");
  const [side, setSide] = useState<0 | 1>(0);
  const [amount, setAmount] = useState("");
  const [shares, setShares] = useState("");
  const { data: usdtBalance } = useUSDTBalance();
  const { data: allowance } = useUSDTAllowance();
  const { data: position } = usePosition(viewId);
  const { approve, isPending: approving, isConfirming: approveConfirming, isSuccess: approved } = useApproveUSDT();
  const { buy, isPending: buying, isConfirming: buyConfirming, isSuccess: bought } = useBuy();
  const { sell, isPending: selling, isConfirming: sellConfirming, isSuccess: sold } = useSell();
  const amountBigInt = amount ? parseUSDT(amount) : 0n;
  const needsApproval = allowance !== undefined && (allowance as bigint) < amountBigInt && amountBigInt > 0n;
  const pos = position as any;
  const userForShares = pos?.forShares ?? 0n;
  const userAgainstShares = pos?.againstShares ?? 0n;
  const currentShares = side === 0 ? userForShares : userAgainstShares;

  if (!isConnected) {
    return (
      <div className="bg-card border border-border rounded-xl p-5 text-center">
        <AlertCircle className="w-8 h-8 text-muted-foreground mx-auto mb-3" />
        <p className="text-sm text-muted-foreground">Connect your wallet to trade</p>
      </div>
    );
  }
  if (!isActive) {
    return (
      <div className="bg-card border border-border rounded-xl p-5 text-center">
        <Lock className="w-8 h-8 text-muted-foreground mx-auto mb-3" />
        <p className="text-sm text-muted-foreground">Trading is closed for this market</p>
      </div>
    );
  }

  return (
    <div className="bg-card border border-border rounded-xl p-5">
      <Tabs value={tradeTab} onValueChange={v => setTradeTab(v as "support" | "exit")}>
        <TabsList className="grid grid-cols-2 w-full mb-4">
          <TabsTrigger value="support">Support</TabsTrigger>
          <TabsTrigger value="exit">Exit</TabsTrigger>
        </TabsList>
        <div className="grid grid-cols-2 gap-2 mb-4">
          <button onClick={() => setSide(0)} className={`py-2 rounded-lg text-sm font-medium transition-colors border ${side === 0 ? "bg-green-500/20 text-green-400 border-green-500/40" : "bg-muted text-muted-foreground border-border"}`}>YES</button>
          <button onClick={() => setSide(1)} className={`py-2 rounded-lg text-sm font-medium transition-colors border ${side === 1 ? "bg-red-500/20 text-red-400 border-red-500/40" : "bg-muted text-muted-foreground border-border"}`}>NO</button>
        </div>
        <TabsContent value="support" className="space-y-3">
          <div>
            <label className="text-xs text-muted-foreground mb-1 block">Amount (USDT)</label>
            <Input type="number" placeholder="0.00" value={amount} onChange={e => setAmount(e.target.value)} className="font-mono" />
            {usdtBalance !== undefined && <p className="text-xs text-muted-foreground mt-1">Balance: {formatUSDT(usdtBalance as bigint)}</p>}
          </div>
          {needsApproval ? (
            <Button className="w-full" onClick={() => approve(amountBigInt)} disabled={approving || approveConfirming || !amount}>
              {approving || approveConfirming ? "Approving..." : "Approve USDT"}
            </Button>
          ) : (
            <Button className={`w-full ${side === 0 ? "bg-green-600 hover:bg-green-700" : "bg-red-600 hover:bg-red-700"}`} onClick={() => buy({ viewId, side, amountIn: amountBigInt, minSharesOut: 0n })} disabled={buying || buyConfirming || !amount || amountBigInt === 0n}>
              {buying || buyConfirming ? "Confirming..." : `Support ${side === 0 ? "FOR" : "AGAINST"}`}
            </Button>
          )}
          {bought && <p className="text-xs text-green-400 text-center">Transaction confirmed!</p>}
        </TabsContent>
        <TabsContent value="exit" className="space-y-3">
          <div>
            <label className="text-xs text-muted-foreground mb-1 block">Shares to exit</label>
            <Input type="number" placeholder="0" value={shares} onChange={e => setShares(e.target.value)} className="font-mono" />
            <p className="text-xs text-muted-foreground mt-1">Your {side === 0 ? "FOR" : "AGAINST"} shares: <span className="font-mono">{currentShares.toString()}</span></p>
          </div>
          <Button className="w-full" variant="outline" onClick={() => sell({ viewId, side, sharesIn: shares ? BigInt(shares) : 0n, minAmountOut: 0n })} disabled={selling || sellConfirming || !shares}>
            {selling || sellConfirming ? "Confirming..." : `Exit ${side === 0 ? "FOR" : "AGAINST"}`}
          </Button>
          {sold && <p className="text-xs text-green-400 text-center">Transaction confirmed!</p>}
        </TabsContent>
      </Tabs>
    </div>
  );
}

function PositionPanel({ viewId, status }: { viewId: bigint; status: MarketStatus }) {
  const { isConnected } = useAccount();
  const { data: position } = usePosition(viewId);
  const { data: claimable } = useClaimableAmount(viewId);
  const { data: hasClaimed } = useHasClaimed(viewId);
  const { claimReward, isPending, isConfirming, isSuccess } = useClaimReward();
  if (!isConnected || !position) {
    return (
      <div className="bg-card border border-border rounded-xl p-5">
        <h3 className="text-sm font-medium mb-3">Your Position</h3>
        <p className="text-xs text-muted-foreground">{isConnected ? "No position in this market." : "Connect wallet to view position."}</p>
      </div>
    );
  }
  const pos = position as any;
  const forShares = pos.forShares ?? 0n;
  const againstShares = pos.againstShares ?? 0n;
  const hasPosition = forShares > 0n || againstShares > 0n;
  return (
    <div className="bg-card border border-border rounded-xl p-5">
      <h3 className="text-sm font-medium mb-4">Your Position</h3>
      {!hasPosition ? (
        <p className="text-xs text-muted-foreground">No position in this market.</p>
      ) : (
        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-3">
              <p className="text-xs text-muted-foreground">FOR Shares</p>
              <p className="text-lg font-bold text-green-400 font-mono">{forShares.toString()}</p>
            </div>
            <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3">
              <p className="text-xs text-muted-foreground">AGAINST Shares</p>
              <p className="text-lg font-bold text-red-400 font-mono">{againstShares.toString()}</p>
            </div>
          </div>
          {status === MarketStatus.CLAIMABLE && claimable !== undefined && (
            <div className="pt-3 border-t border-border">
              <div className="flex items-center justify-between mb-3">
                <p className="text-sm text-muted-foreground">Claimable</p>
                <p className="text-lg font-bold text-primary">{formatUSDT(claimable as bigint)}</p>
              </div>
              {hasClaimed ? (
                <p className="text-xs text-green-400 text-center">Already claimed</p>
              ) : (
                <Button className="w-full" onClick={() => claimReward(viewId)} disabled={isPending || isConfirming || (claimable as bigint) === 0n}>
                  {isPending || isConfirming ? "Claiming..." : "Claim Reward"}
                </Button>
              )}
              {isSuccess && <p className="text-xs text-green-400 text-center mt-2">Claimed!</p>}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function MarketStatePanel({ viewId, status, endTime, viewType }: {
  viewId: bigint;
  status: MarketStatus;
  endTime: Date | null;
  viewType: number;
}) {
  const { lockMarket, isPending: locking, error: lockError } = useLockMarket();
  const { settleMarket, isPending: settling, error: settleError } = useSettleMarket();
  const now = new Date();
  const endTimeReached = endTime !== null && endTime <= now;
  const isPermanent = viewType === 1;

  return (
    <div className="bg-card border border-border rounded-xl p-5">
      <h3 className="text-sm font-medium mb-4">Market Actions</h3>
      <div className="space-y-2">
        {isPermanent && (
          <p className="text-xs text-muted-foreground">This is a Permanent View — it has no end time and cannot be locked.</p>
        )}
        {!isPermanent && status === MarketStatus.ACTIVE && (
          <div className="space-y-2">
            {endTimeReached ? (
              <>
                <p className="text-xs text-muted-foreground">End time reached. Anyone can now lock this market.</p>
                <Button variant="outline" size="sm" className="w-full" onClick={() => lockMarket(viewId)} disabled={locking}>
                  {locking ? "Locking..." : "Lock Market"}
                </Button>
              </>
            ) : (
              <div className="bg-muted/50 rounded-lg p-3">
                <p className="text-xs text-muted-foreground">
                  Market can be locked after end time.
                </p>
                {endTime && (
                  <p className="text-xs text-foreground/60 mt-1 font-mono">
                    Ends: {endTime.toLocaleString()}
                  </p>
                )}
              </div>
            )}
            {lockError && (
              <p className="text-xs text-red-400 break-all">Error: {(lockError as Error).message?.slice(0, 80)}</p>
            )}
          </div>
        )}
        {status === MarketStatus.LOCKED && (
          <div className="space-y-2">
            <p className="text-xs text-muted-foreground">Market is locked. Settlement can now be triggered.</p>
            <Button variant="outline" size="sm" className="w-full" onClick={() => settleMarket(viewId)} disabled={settling}>
              {settling ? "Settling..." : "Trigger Settlement"}
            </Button>
            {settleError && (
              <p className="text-xs text-red-400 break-all">Error: {(settleError as Error).message?.slice(0, 80)}</p>
            )}
          </div>
        )}
        {status === MarketStatus.SETTLEMENT && (
          <p className="text-xs text-muted-foreground">Settlement in progress...</p>
        )}
        {status === MarketStatus.CLAIMABLE && (
          <p className="text-xs text-green-400">Settlement complete. Claims are open.</p>
        )}
      </div>
    </div>
  );
}

export default function ViewDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [, navigate] = useLocation();
  const viewId = id ? BigInt(id) : undefined;
  const { data: viewData, isLoading, error } = useViewData(viewId);

  if (isLoading) {
    return (
      <DAppLayout>
        <div className="space-y-4">
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-32 w-full" />
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-4"><Skeleton className="h-40 w-full" /><Skeleton className="h-60 w-full" /></div>
            <div className="space-y-4"><Skeleton className="h-40 w-full" /><Skeleton className="h-40 w-full" /></div>
          </div>
        </div>
      </DAppLayout>
    );
  }

  if (error || !viewData) {
    return (
      <DAppLayout>
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <AlertCircle className="w-12 h-12 text-destructive mb-4" />
          <h2 className="text-xl font-bold mb-2">View Not Found</h2>
          <p className="text-muted-foreground text-sm mb-6">View #{id} does not exist or could not be loaded.</p>
          <Button onClick={() => navigate("/app/explore")}>Back to Discover</Button>
        </div>
      </DAppLayout>
    );
  }

  const { record, state, yesPrice, noPrice, vaultBalance, metadata } = viewData;
  const title = metadata?.title || `View #${record.viewId.toString()}`;
  const description = metadata?.description || record.metadataURI;
  const isActive = state.status === MarketStatus.ACTIVE;
  const [copied, setCopied] = useState(false);
  const shareUrl = typeof window !== "undefined" ? window.location.href : "";
  const xShareUrl = `https://x.com/intent/tweet?text=${encodeURIComponent(`Check out this View on Pulse Protocol: ${title}`)}&url=${encodeURIComponent(shareUrl)}`;
  const handleCopy = () => {
    navigator.clipboard.writeText(shareUrl).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };
  const endTime = record.endTime > 0n ? new Date(Number(record.endTime) * 1000) : null;
  const startTime = record.startTime > 0n ? new Date(Number(record.startTime) * 1000) : null;

  return (
    <DAppLayout>
      <button onClick={() => navigate("/app/explore")} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors">
        <ArrowLeft className="w-4 h-4" />Back to Discover
      </button>

      <div className="mb-6">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-xs text-muted-foreground font-mono">View #{record.viewId.toString()}</span>
              <StatusBadge status={state.status} />
            </div>
            <h1 className="text-2xl font-bold text-foreground">{title}</h1>
            <p className="text-muted-foreground mt-2 text-sm">{description}</p>
          </div>
          {/* Share buttons */}
          <div className="flex items-center gap-2 flex-shrink-0">
            <button onClick={handleCopy}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border hover:bg-muted transition-colors text-xs text-muted-foreground hover:text-foreground">
              {copied ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5" />}
              {copied ? "Copied!" : "Copy Link"}
            </button>
            <a href={xShareUrl} target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border hover:bg-muted transition-colors text-xs text-muted-foreground hover:text-foreground">
              <Share2 className="w-3.5 h-3.5" />
              Share
            </a>
          </div>
        </div>
        <div className="flex flex-wrap gap-4 mt-4 text-xs text-muted-foreground">
          <span>Fee Recipient: <a href={`https://sepolia.etherscan.io/address/${record.feeRecipient}`} target="_blank" rel="noopener noreferrer" className="font-mono text-primary hover:underline inline-flex items-center gap-1">{record.feeRecipient.slice(0, 8)}...{record.feeRecipient.slice(-6)}<ExternalLink className="w-3 h-3" /></a></span>
          {startTime && <span>Started: {startTime.toLocaleDateString()}</span>}
          {endTime && <span className={endTime < new Date() ? "text-red-400" : ""}>{endTime < new Date() ? "Ended" : "Ends"}: {endTime.toLocaleDateString()}</span>}
          <a href={`https://sepolia.etherscan.io/address/${record.vault}`} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline inline-flex items-center gap-1">Vault <ExternalLink className="w-3 h-3" /></a>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-5">
          <PriceDisplay yesPrice={yesPrice} noPrice={noPrice} pulseIndex={state.lastPulseIndex} />
          <div className="bg-card border border-border rounded-xl p-5">
            <h3 className="text-sm font-medium mb-4">Market Statistics</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div><p className="text-xs text-muted-foreground">Total Liquidity</p><p className="text-lg font-bold">{formatUSDT(vaultBalance)}</p></div>
              <div><p className="text-xs text-muted-foreground">Reserve Balance</p><p className="text-lg font-bold">{formatUSDT(state.reserveBalance)}</p></div>
              <div><p className="text-xs text-muted-foreground">FOR Supply</p><p className="text-lg font-bold text-green-400 font-mono">{state.forSupply.toString()}</p></div>
              <div><p className="text-xs text-muted-foreground">AGAINST Supply</p><p className="text-lg font-bold text-red-400 font-mono">{state.againstSupply.toString()}</p></div>
              <div><p className="text-xs text-muted-foreground">Total Fee</p><p className="text-lg font-bold">1%</p></div>
              <div><p className="text-xs text-muted-foreground">View Type</p><p className="text-lg font-bold">{record.viewType === 0 ? "Fixed" : "Permanent"}</p></div>
            </div>
          </div>
          <div className="bg-card border border-border rounded-xl p-5">
            <h3 className="text-sm font-medium mb-4">On-chain Details</h3>
            <div className="space-y-2 text-xs font-mono">
              <div className="flex justify-between items-center py-1.5 border-b border-border">
                <span className="text-muted-foreground">PulseFactory</span>
                <a href={`https://sepolia.etherscan.io/address/${CONTRACT_ADDRESSES[sepolia.id].PulseFactory}`} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">{CONTRACT_ADDRESSES[sepolia.id].PulseFactory.slice(0, 10)}...</a>
              </div>
              <div className="flex justify-between items-center py-1.5 border-b border-border">
                <span className="text-muted-foreground">TradingEngine</span>
                <a href={`https://sepolia.etherscan.io/address/${CONTRACT_ADDRESSES[sepolia.id].TradingEngine}`} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">{CONTRACT_ADDRESSES[sepolia.id].TradingEngine.slice(0, 10)}...</a>
              </div>
              <div className="flex justify-between items-center py-1.5">
                <span className="text-muted-foreground">MockUSDT</span>
                <a href={`https://sepolia.etherscan.io/address/${CONTRACT_ADDRESSES[sepolia.id].MockUSDT}`} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">{CONTRACT_ADDRESSES[sepolia.id].MockUSDT.slice(0, 10)}...</a>
              </div>
            </div>
          </div>
        </div>
        <div className="space-y-4">
          <TradePanel viewId={record.viewId} isActive={isActive} />
          <PositionPanel viewId={record.viewId} status={state.status} />
          <MarketStatePanel viewId={record.viewId} status={state.status} endTime={endTime} viewType={record.viewType} />
        </div>
      </div>
    </DAppLayout>
  );
}
