import { useState } from "react";
/**
 * ProtocolViewCard
 *
 * View card using real on-chain data (ViewData).
 * Replaces the mock-based ViewCard for DApp pages.
 */

import { Share2, Copy, Check, Card } from "@/components/ui/card";
import { Share2, Copy, Check, Badge } from "@/components/ui/badge";
import { Share2, Copy, Check, MarketStatus, formatUSDT } from "@/config/contracts";
import type { ViewData } from "@/types/protocol";
import { Share2, Copy, Check, Clock, CheckCircle, Lock, TrendingUp } from "lucide-react";
import { Share2, Copy, Check } from "lucide-react";
import { Share2, Copy, Check, useLocation } from "wouter";

interface ProtocolViewCardProps {
  viewData: ViewData;
  onClick?: () => void;
}

function StatusBadge({ status }: { status: MarketStatus }) {
  switch (status) {
    case MarketStatus.ACTIVE:
      return (
        <Badge className="bg-green-500/20 text-green-400 border-green-500/30 text-xs">
          <TrendingUp className="w-3 h-3 mr-1" />
          Active
        </Badge>
      );
    case MarketStatus.LOCKED:
      return (
        <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30 text-xs">
          <Lock className="w-3 h-3 mr-1" />
          Locked
        </Badge>
      );
    case MarketStatus.SETTLEMENT:
      return (
        <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30 text-xs">
          <Clock className="w-3 h-3 mr-1" />
          Settlement
        </Badge>
      );
    case MarketStatus.CLAIMABLE:
      return (
        <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/30 text-xs">
          <CheckCircle className="w-3 h-3 mr-1" />
          Claimable
        </Badge>
      );
    default:
      return null;
  }
}

function PriceBar({ yesPrice, noPrice }: { yesPrice: number; noPrice: number }) {
  const yesPercent = yesPrice * 100;
  const noPercent = noPrice * 100;
  return (
    <div className="space-y-2">
      {/* YES bar */}
      <div className="space-y-1">
        <div className="flex justify-between items-center">
          <span className="text-xs text-muted-foreground">YES</span>
          <span className="text-sm font-semibold text-green-400">
            {yesPercent.toFixed(1)}¢
          </span>
        </div>
        <div className="w-full bg-muted rounded-full h-2">
          <div
            className="bg-green-500 h-2 rounded-full transition-all duration-300"
            style={{ width: `${yesPercent}%` }}
          />
        </div>
      </div>
      {/* NO bar */}
      <div className="space-y-1">
        <div className="flex justify-between items-center">
          <span className="text-xs text-muted-foreground">NO</span>
          <span className="text-sm font-semibold text-red-400">
            {noPercent.toFixed(1)}¢
          </span>
        </div>
        <div className="w-full bg-muted rounded-full h-2">
          <div
            className="bg-red-500 h-2 rounded-full transition-all duration-300"
            style={{ width: `${noPercent}%` }}
          />
        </div>
      </div>
    </div>
  );
}


function ShareButton({ viewId, title }: { viewId: string; title: string }) {
  const [copied, setCopied] = useState(false);
  const url = typeof window !== "undefined" ? `${window.location.origin}/app/view/${viewId}` : "";
  const xUrl = `https://x.com/intent/tweet?text=${encodeURIComponent(`Check out this View on Pulse Protocol: ${title}`)}&url=${encodeURIComponent(url)}`;
  const handleCopy = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };
  return (
    <>
      <button onClick={handleCopy}
        className="flex items-center gap-1 px-2 py-1 rounded text-xs text-muted-foreground hover:text-foreground hover:bg-muted transition-colors">
        {copied ? <Check className="w-3 h-3 text-green-400" /> : <Copy className="w-3 h-3" />}
        {copied ? "Copied" : "Copy"}
      </button>
      <a href={xUrl} target="_blank" rel="noopener noreferrer" onClick={e => e.stopPropagation()}
        className="flex items-center gap-1 px-2 py-1 rounded text-xs text-muted-foreground hover:text-foreground hover:bg-muted transition-colors">
        <Share2 className="w-3 h-3" />
        Share
      </a>
    </>
  );
}

export function ProtocolViewCard({ viewData, onClick }: ProtocolViewCardProps) {
  const { record, state, yesPrice, noPrice, vaultBalance, metadata } = viewData;
  const [, navigate] = useLocation();

  const handleClick = () => {
    if (onClick) {
      onClick();
    } else {
      navigate(`/app/view/${record.viewId.toString()}`);
    }
  };

  // Derive display values
  const title = metadata?.title || `View #${record.viewId.toString()}`;
  const description = metadata?.description || record.metadataURI;
  const category = metadata?.category || "Protocol";
  const feeRecipientShort = `${record.feeRecipient.slice(0, 6)}...${record.feeRecipient.slice(-4)}`;

  // Time info
  const endTime = record.endTime > 0n
    ? new Date(Number(record.endTime) * 1000)
    : null;
  const isExpired = endTime ? endTime < new Date() : false;

  return (
    <Card
      onClick={handleClick}
      className="p-4 cursor-pointer hover:shadow-lg hover:border-primary/30 transition-all duration-200 bg-card border-border"
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs text-muted-foreground font-mono">
              #{record.viewId.toString()}
            </span>
            <StatusBadge status={state.status} />
          </div>
          <h3 className="font-semibold text-sm line-clamp-2 text-foreground">
            {title}
          </h3>
          <p className="text-xs text-muted-foreground line-clamp-1 mt-1">
            {description}
          </p>
        </div>
        <Badge variant="outline" className="ml-2 flex-shrink-0 text-xs">
          {category}
        </Badge>
      </div>

      {/* Fee Recipient */}
      <div className="flex items-center gap-2 mb-4 pb-3 border-b border-border">
        <div className="w-5 h-5 rounded-full bg-gradient-to-br from-primary/40 to-primary-dark/40 flex-shrink-0" />
        <span className="text-xs text-muted-foreground font-mono">
          {feeRecipientShort}
        </span>
        {endTime && (
          <span className={`text-xs ml-auto ${isExpired ? "text-red-400" : "text-muted-foreground"}`}>
            {isExpired ? "Ended" : `Ends ${endTime.toLocaleDateString()}`}
          </span>
        )}
      </div>

      {/* Price Bars */}
      <div className="mb-4">
        <PriceBar yesPrice={yesPrice} noPrice={noPrice} />
      </div>

      {/* Bottom Stats */}
      <div className="grid grid-cols-2 gap-3 pt-3 border-t border-border">
        <div>
          <p className="text-xs text-muted-foreground">Liquidity</p>
          <p className="text-sm font-semibold text-foreground">
            {formatUSDT(vaultBalance)}
          </p>
        </div>
        <div>
          <p className="text-xs text-muted-foreground">Pulse Index</p>
          <p className="text-sm font-semibold text-primary">
            {state.lastPulseIndex.toString()}
          </p>
        </div>
      </div>
      {/* Share */}
      <div className="mt-3 pt-3 border-t border-border flex gap-2" onClick={e => e.stopPropagation()}>
        <ShareButton viewId={record.viewId.toString()} title={title} />
      </div>
    </Card>
  );
}
