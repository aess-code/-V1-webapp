/**
 * Pulse Protocol V1 — Write Hooks (Transactions)
 *
 * All contract writes go through these hooks.
 * Handles approval + transaction in correct order.
 *
 * Frozen Baseline: be73488
 */

import { useWriteContract, useWaitForTransactionReceipt, useAccount } from "wagmi";
import { sepolia } from "wagmi/chains";
import {
  TradingEngineABI,
  SettlementManagerABI,
  PulseFactoryABI,
  MockUSDTABI,
} from "@/config/abis";
import { CONTRACT_ADDRESSES } from "@/config/contracts";
import type { BuyParams, SellParams, CreateViewParams } from "@/types/protocol";

function useAddresses() {
  return CONTRACT_ADDRESSES[sepolia.id];
}

// ─────────────────────────────────────────────────────────────────────────────
// USDT Approve
// ─────────────────────────────────────────────────────────────────────────────

export function useApproveUSDT() {
  const addrs = useAddresses();
  const { writeContract, data: hash, isPending, error } = useWriteContract();

  const approve = (amount: bigint) => {
    writeContract({
      address: addrs.MockUSDT,
      abi: MockUSDTABI,
      functionName: "approve",
      args: [addrs.TradingEngine, amount],
    });
  };

  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash });

  return { approve, hash, isPending, isConfirming, isSuccess, error };
}

// ─────────────────────────────────────────────────────────────────────────────
// Buy
// ─────────────────────────────────────────────────────────────────────────────

export function useBuy() {
  const addrs = useAddresses();
  const { writeContract, data: hash, isPending, error } = useWriteContract();

  const buy = (params: BuyParams) => {
    writeContract({
      address: addrs.TradingEngine,
      abi: TradingEngineABI,
      functionName: "buy",
      args: [params.viewId, BigInt(params.side), params.amountIn, params.minSharesOut],
    });
  };

  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash });

  return { buy, hash, isPending, isConfirming, isSuccess, error };
}

// ─────────────────────────────────────────────────────────────────────────────
// Sell
// ─────────────────────────────────────────────────────────────────────────────

export function useSell() {
  const addrs = useAddresses();
  const { writeContract, data: hash, isPending, error } = useWriteContract();

  const sell = (params: SellParams) => {
    writeContract({
      address: addrs.TradingEngine,
      abi: TradingEngineABI,
      functionName: "sell",
      args: [params.viewId, BigInt(params.side), params.sharesIn, params.minAmountOut],
    });
  };

  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash });

  return { sell, hash, isPending, isConfirming, isSuccess, error };
}

// ─────────────────────────────────────────────────────────────────────────────
// Lock Market (permissionless, anyone can call after endTime)
// ─────────────────────────────────────────────────────────────────────────────

export function useLockMarket() {
  const addrs = useAddresses();
  const { writeContract, data: hash, isPending, error } = useWriteContract();

  const lockMarket = (viewId: bigint) => {
    writeContract({
      address: addrs.TradingEngine,
      abi: TradingEngineABI,
      functionName: "lockMarket",
      args: [viewId],
    });
  };

  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash });

  return { lockMarket, hash, isPending, isConfirming, isSuccess, error };
}

// ─────────────────────────────────────────────────────────────────────────────
// Settle Market
// ─────────────────────────────────────────────────────────────────────────────

export function useSettleMarket() {
  const addrs = useAddresses();
  const { writeContract, data: hash, isPending, error } = useWriteContract();

  const settleMarket = (viewId: bigint) => {
    writeContract({
      address: addrs.SettlementManager,
      abi: SettlementManagerABI,
      functionName: "settleMarket",
      args: [viewId],
    });
  };

  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash });

  return { settleMarket, hash, isPending, isConfirming, isSuccess, error };
}

// ─────────────────────────────────────────────────────────────────────────────
// Claim Reward
// ─────────────────────────────────────────────────────────────────────────────

export function useClaimReward() {
  const addrs = useAddresses();
  const { address } = useAccount();
  const { writeContract, data: hash, isPending, error } = useWriteContract();

  const claimReward = (viewId: bigint, userAddress?: `0x${string}`) => {
    const user = userAddress ?? address;
    if (!user) return;
    writeContract({
      address: addrs.SettlementManager,
      abi: SettlementManagerABI,
      functionName: "claimReward",
      args: [viewId, user],
    });
  };

  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash });

  return { claimReward, hash, isPending, isConfirming, isSuccess, error };
}

// ─────────────────────────────────────────────────────────────────────────────
// Create View
// ─────────────────────────────────────────────────────────────────────────────

export function useCreateView() {
  const addrs = useAddresses();
  const { writeContract, data: hash, isPending, error } = useWriteContract();

  const createView = (params: CreateViewParams) => {
    writeContract({
      address: addrs.PulseFactory,
      abi: PulseFactoryABI,
      functionName: "createView",
      args: [
        params.viewType,
        params.metadataURI,
        params.metadataHash,
        params.startTime,
        params.endTime,
        params.initialYesLiquidity,
        params.initialNoLiquidity,
      ],
    });
  };

  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash });

  return { createView, hash, isPending, isConfirming, isSuccess, error };
}

// ─────────────────────────────────────────────────────────────────────────────
// Approve USDT for Factory (for createView)
// ─────────────────────────────────────────────────────────────────────────────

export function useApproveUSDTForFactory() {
  const addrs = useAddresses();
  const { writeContract, data: hash, isPending, error } = useWriteContract();

  const approve = (amount: bigint) => {
    writeContract({
      address: addrs.MockUSDT,
      abi: MockUSDTABI,
      functionName: "approve",
      args: [addrs.PulseFactory, amount],
    });
  };

  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash });

  return { approve, hash, isPending, isConfirming, isSuccess, error };
}
