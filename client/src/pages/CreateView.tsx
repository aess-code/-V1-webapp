/**
 * Create View Page — Protocol-aligned (Pulse V1 be73488)
 *
 * Supports both FIXED and PERMANENT view types.
 * - FIXED: requires endTime >= startTime + 1 hour (protocol minimum)
 * - PERMANENT: endTime = 0, cannot be locked, exists forever
 *
 * Protocol: PulseFactory @ 0x0e7592aF466DE837B700a97909E73cDF74E26D93
 */
import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { useAccount } from "wagmi";
import { DAppLayout } from "@/layouts/DAppLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useApproveUSDTForFactory, useCreateView } from "@/hooks/useProtocolWrite";
import { useUSDTBalance } from "@/hooks/useProtocol";
import {
  formatUSDT,
  parseUSDT,
  PROTOCOL_CONSTANTS,
  CONTRACT_ADDRESSES,
  ViewType,
} from "@/config/contracts";
import { sepolia } from "wagmi/chains";
import { keccak256, toHex } from "viem";
import {
  AlertCircle,
  CheckCircle,
  Info,
  ArrowLeft,
  ExternalLink,
  Clock,
  Infinity,
} from "lucide-react";

function StepIndicator({ step, current }: { step: number; current: number }) {
  const done = current > step;
  const active = current === step;
  return (
    <div className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-bold border-2 transition-colors ${
      done ? "bg-green-500 border-green-500 text-white" :
      active ? "bg-primary border-primary text-white" :
      "bg-muted border-border text-muted-foreground"
    }`}>
      {done ? <CheckCircle className="w-4 h-4" /> : step}
    </div>
  );
}

function ViewTypeSelector({ value, onChange, disabled }: {
  value: ViewType;
  onChange: (v: ViewType) => void;
  disabled?: boolean;
}) {
  return (
    <div className="grid grid-cols-2 gap-3">
      <button
        type="button"
        disabled={disabled}
        onClick={() => onChange(ViewType.FIXED)}
        className={`p-4 rounded-xl border-2 text-left transition-all ${
          value === ViewType.FIXED
            ? "border-primary bg-primary/5"
            : "border-border bg-card hover:border-primary/40"
        } ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
      >
        <div className="flex items-center gap-2 mb-2">
          <Clock className="w-4 h-4 text-primary" />
          <span className="font-semibold text-sm">Fixed</span>
        </div>
        <p className="text-xs text-muted-foreground">Has a defined end time. Settles after end time is reached.</p>
      </button>
      <button
        type="button"
        disabled={disabled}
        onClick={() => onChange(ViewType.PERMANENT)}
        className={`p-4 rounded-xl border-2 text-left transition-all ${
          value === ViewType.PERMANENT
            ? "border-purple-500 bg-purple-500/5"
            : "border-border bg-card hover:border-purple-500/40"
        } ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
      >
        <div className="flex items-center gap-2 mb-2">
          <Infinity className="w-4 h-4 text-purple-400" />
          <span className="font-semibold text-sm">Permanent</span>
        </div>
        <p className="text-xs text-muted-foreground">No end time. Cannot be locked or settled. Exists forever.</p>
      </button>
    </div>
  );
}

function InvariantNotice() {
  return (
    <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-4 flex gap-3">
      <Info className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
      <div className="text-sm">
        <p className="font-medium text-blue-400 mb-1">Protocol Invariant: 50/50 Initial Liquidity</p>
        <p className="text-muted-foreground text-xs">
          Pulse Protocol V1 enforces equal FOR and AGAINST initial liquidity at market creation.
          This guarantees a fair launch at Pulse Index 5000 (50/50).
        </p>
      </div>
    </div>
  );
}

export default function CreateViewPage() {
  const [, navigate] = useLocation();
  const { address, isConnected } = useAccount();

  const [viewType, setViewType] = useState<ViewType>(ViewType.FIXED);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [liquidityPerSide, setLiquidityPerSide] = useState("100");
  const [durationHours, setDurationHours] = useState("24");
  const [step, setStep] = useState(1);

  const { data: usdtBalance } = useUSDTBalance();
  const { approve, isPending: approving, isConfirming: approveConfirming, isSuccess: approved } = useApproveUSDTForFactory();
  const { createView, hash: createHash, isPending: creating, isConfirming: createConfirming, isSuccess: created } = useCreateView();

  const liquidityBigInt = liquidityPerSide ? parseUSDT(liquidityPerSide) : 0n;
  const totalLiquidity = liquidityBigInt * 2n;
  const minLiquidity = PROTOCOL_CONSTANTS.MIN_INITIAL_LIQUIDITY;
  const isLiquidityValid = liquidityBigInt >= minLiquidity / 2n;
  const hasEnoughBalance = usdtBalance !== undefined && (usdtBalance as bigint) >= totalLiquidity;
  const durationHoursNum = Number(durationHours) || 0;
  const isDurationValid = viewType === ViewType.PERMANENT || durationHoursNum >= 1;

  useEffect(() => { if (approved && step === 2) setStep(3); }, [approved]);
  useEffect(() => { if (created && step === 3) setStep(4); }, [created]);

  const handleApprove = () => {
    approve(totalLiquidity);
    setStep(2);
  };

  const handleCreate = () => {
    if (!title || !description) return;
    const metadataObj = JSON.stringify({ title, description, createdBy: address, viewType: viewType === ViewType.FIXED ? "FIXED" : "PERMANENT" });
    const metadataURI = `data:application/json,${encodeURIComponent(metadataObj)}`;
    const metadataHash = keccak256(toHex(metadataObj));
    const now = BigInt(Math.floor(Date.now() / 1000));
    const startTime = now;
    const endTime = viewType === ViewType.PERMANENT
      ? 0n
      : now + BigInt(durationHoursNum * 3600);

    createView({
      viewType,
      metadataURI,
      metadataHash,
      startTime,
      endTime,
      initialYesLiquidity: liquidityBigInt,
      initialNoLiquidity: liquidityBigInt,
    });
  };

  if (!isConnected) {
    return (
      <DAppLayout>
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <AlertCircle className="w-12 h-12 text-muted-foreground mb-4" />
          <h2 className="text-xl font-bold mb-2">Wallet Required</h2>
          <p className="text-muted-foreground text-sm">Connect your wallet to Sepolia to create a View.</p>
        </div>
      </DAppLayout>
    );
  }

  if (step === 4) {
    return (
      <DAppLayout>
        <div className="max-w-lg mx-auto text-center py-16">
          <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-8 h-8 text-green-400" />
          </div>
          <h2 className="text-2xl font-bold mb-3">View Created!</h2>
          <p className="text-muted-foreground text-sm mb-6">
            Your opinion market (View) has been deployed on Sepolia.
          </p>
          {createHash && (
            <a href={`https://sepolia.etherscan.io/tx/${createHash}`} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-primary hover:underline text-sm mb-6">
              View on Etherscan <ExternalLink className="w-4 h-4" />
            </a>
          )}
          <div className="flex gap-3 justify-center">
            <Button variant="outline" onClick={() => navigate("/app/explore")}>Back to Discover</Button>
            <Button onClick={() => { setStep(1); setTitle(""); setDescription(""); }}>Create Another</Button>
          </div>
        </div>
      </DAppLayout>
    );
  }

  return (
    <DAppLayout>
      <button onClick={() => navigate("/app/explore")}
        className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors">
        <ArrowLeft className="w-4 h-4" />Back to Discover
      </button>

      <div className="max-w-2xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-foreground">Create View</h1>
          <p className="text-sm text-muted-foreground mt-1">Deploy a new opinion market on Pulse Protocol V1</p>
        </div>

        {/* Step Indicator */}
        <div className="flex items-center gap-3 mb-8">
          <StepIndicator step={1} current={step} />
          <div className="flex-1 h-px bg-border" />
          <StepIndicator step={2} current={step} />
          <div className="flex-1 h-px bg-border" />
          <StepIndicator step={3} current={step} />
        </div>
        <div className="flex justify-between text-xs text-muted-foreground mb-8 -mt-6">
          <span>Configure</span>
          <span>Approve USDT</span>
          <span>Deploy</span>
        </div>

        <div className="space-y-6">
          <InvariantNotice />

          {/* View Type */}
          <div className="bg-card border border-border rounded-xl p-6 space-y-4">
            <h3 className="font-medium">View Type</h3>
            <ViewTypeSelector value={viewType} onChange={setViewType} disabled={step > 1} />
            {viewType === ViewType.PERMANENT && (
              <div className="bg-purple-500/10 border border-purple-500/20 rounded-lg p-3">
                <p className="text-xs text-purple-400">
                  Permanent Views have no end time and cannot be locked or settled. They exist as long as the protocol runs.
                </p>
              </div>
            )}
          </div>

          {/* Market Details */}
          <div className="bg-card border border-border rounded-xl p-6 space-y-5">
            <h3 className="font-medium">View Details</h3>
            <div>
              <label className="text-sm text-muted-foreground mb-2 block">Question / Title *</label>
              <Input placeholder="Will Bitcoin reach $200k by end of 2026?" value={title} onChange={e => setTitle(e.target.value)} disabled={step > 1} />
            </div>
            <div>
              <label className="text-sm text-muted-foreground mb-2 block">Description *</label>
              <textarea
                className="w-full min-h-[80px] rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-50"
                placeholder="Describe the resolution criteria..."
                value={description}
                onChange={e => setDescription(e.target.value)}
                disabled={step > 1}
              />
            </div>
            {viewType === ViewType.FIXED && (
              <div>
                <label className="text-sm text-muted-foreground mb-2 block">Duration (hours, minimum 1)</label>
                <Input type="number" min="1" max="8760" value={durationHours} onChange={e => setDurationHours(e.target.value)} disabled={step > 1} />
                {!isDurationValid && durationHours && (
                  <p className="text-xs text-red-400 mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />Minimum duration is 1 hour (protocol requirement)
                  </p>
                )}
              </div>
            )}
          </div>

          {/* Liquidity */}
          <div className="bg-card border border-border rounded-xl p-6 space-y-4">
            <h3 className="font-medium">Initial Liquidity</h3>
            <div>
              <label className="text-sm text-muted-foreground mb-2 block">USDT per side (FOR + AGAINST equally)</label>
              <Input type="number" placeholder="100" value={liquidityPerSide} onChange={e => setLiquidityPerSide(e.target.value)} disabled={step > 1} className="font-mono" />
            </div>
            <div className="bg-muted rounded-lg p-4 space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">FOR Liquidity</span>
                <span className="font-mono">{formatUSDT(liquidityBigInt)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">AGAINST Liquidity</span>
                <span className="font-mono">{formatUSDT(liquidityBigInt)}</span>
              </div>
              <div className="flex justify-between border-t border-border pt-2">
                <span className="text-muted-foreground font-medium">Total Required</span>
                <span className="font-mono font-bold">{formatUSDT(totalLiquidity)}</span>
              </div>
              {usdtBalance !== undefined && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Your Balance</span>
                  <span className={`font-mono ${hasEnoughBalance ? "text-green-400" : "text-red-400"}`}>
                    {formatUSDT(usdtBalance as bigint)}
                  </span>
                </div>
              )}
            </div>
            {!isLiquidityValid && liquidityPerSide && (
              <p className="text-xs text-red-400 flex items-center gap-1">
                <AlertCircle className="w-3 h-3" />Minimum {formatUSDT(minLiquidity / 2n)} per side required
              </p>
            )}
          </div>

          {/* Contract Info */}
          <div className="bg-muted/50 rounded-xl p-4 text-xs text-muted-foreground space-y-1">
            <p className="font-medium text-foreground mb-2">Contract</p>
            <div className="flex justify-between">
              <span>PulseFactory</span>
              <a href={`https://sepolia.etherscan.io/address/${CONTRACT_ADDRESSES[sepolia.id].PulseFactory}`} target="_blank" rel="noopener noreferrer" className="font-mono text-primary hover:underline">
                {CONTRACT_ADDRESSES[sepolia.id].PulseFactory.slice(0, 10)}...
              </a>
            </div>
            <div className="flex justify-between">
              <span>Settlement Token</span>
              <span className="font-mono">MockUSDT (6 decimals)</span>
            </div>
            <div className="flex justify-between">
              <span>Initial Pulse Index</span>
              <span className="font-mono">5000 (50/50)</span>
            </div>
            <div className="flex justify-between">
              <span>View Type</span>
              <span className="font-mono">{viewType === ViewType.FIXED ? "FIXED" : "PERMANENT"}</span>
            </div>
          </div>

          {/* Actions */}
          {step === 1 && (
            <Button className="w-full h-12 text-base" onClick={handleApprove}
              disabled={!title || !description || !isLiquidityValid || !hasEnoughBalance || totalLiquidity === 0n || !isDurationValid}>
              Step 1: Approve USDT ({formatUSDT(totalLiquidity)})
            </Button>
          )}
          {step === 2 && (
            <div className="space-y-3">
              <Button className="w-full h-12 text-base" disabled={approving || approveConfirming}>
                {approving || approveConfirming ? "Approving..." : "Waiting for approval..."}
              </Button>
              <p className="text-xs text-muted-foreground text-center">Confirm the approval transaction in your wallet</p>
            </div>
          )}
          {step === 3 && (
            <div className="space-y-3">
              <Button className="w-full h-12 text-base bg-gradient-to-r from-primary to-primary-dark hover:opacity-90"
                onClick={handleCreate} disabled={creating || createConfirming}>
                {creating || createConfirming ? "Deploying..." : "Step 2: Create View"}
              </Button>
              <p className="text-xs text-muted-foreground text-center">This will deploy a new MarketVault and initialize the opinion market</p>
            </div>
          )}
        </div>
      </div>
    </DAppLayout>
  );
}
