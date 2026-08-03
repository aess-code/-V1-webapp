/**
 * Pulse Protocol V1 — Core Protocol Hooks
 *
 * All contract reads go through these hooks.
 * Pages MUST NOT call contracts directly.
 *
 * Source: contracts/interfaces/ITradingEngine.sol, IPulseFactory.sol
 * Frozen Baseline: be73488
 */

import { useReadContract, useReadContracts, useAccount, useChainId } from "wagmi";
import { sepolia } from "wagmi/chains";
import { PulseFactoryABI, TradingEngineABI, SettlementManagerABI, MockUSDTABI } from "@/config/abis";
import { CONTRACT_ADDRESSES, pulseIndexToPrices, MarketStatus } from "@/config/contracts";
import type { ViewRecord, MarketState, Position, ViewData } from "@/types/protocol";

// ─────────────────────────────────────────────────────────────────────────────
// Helper: get Sepolia addresses (always use Sepolia for V1)
// ─────────────────────────────────────────────────────────────────────────────
function useAddresses() {
  return CONTRACT_ADDRESSES[sepolia.id];
}

// ─────────────────────────────────────────────────────────────────────────────
// PulseFactory Hooks
// ─────────────────────────────────────────────────────────────────────────────

/** Get total number of Views ever created */
export function useTotalViews() {
  const addrs = useAddresses();
  return useReadContract({
    address: addrs.PulseFactory,
    abi: PulseFactoryABI,
    functionName: "totalViews",
  });
}

/** Get a single ViewRecord by ID */
export function useViewRecord(viewId: bigint | undefined) {
  const addrs = useAddresses();
  return useReadContract({
    address: addrs.PulseFactory,
    abi: PulseFactoryABI,
    functionName: "getView",
    args: viewId !== undefined ? [viewId] : undefined,
    query: { enabled: viewId !== undefined },
  });
}

/** Get multiple ViewRecords in one multicall */
export function useViewRecords(viewIds: bigint[]) {
  const addrs = useAddresses();
  const contracts = viewIds.map(id => ({
    address: addrs.PulseFactory as `0x${string}`,
    abi: PulseFactoryABI,
    functionName: "getView" as const,
    args: [id] as const,
  }));
  return useReadContracts({
    contracts,
    query: { enabled: viewIds.length > 0 },
  });
}

/** Check if a ViewID exists */
export function useViewExists(viewId: bigint | undefined) {
  const addrs = useAddresses();
  return useReadContract({
    address: addrs.PulseFactory,
    abi: PulseFactoryABI,
    functionName: "exists",
    args: viewId !== undefined ? [viewId] : undefined,
    query: { enabled: viewId !== undefined },
  });
}

/** Get vault address for a view */
export function useVaultAddress(viewId: bigint | undefined) {
  const addrs = useAddresses();
  return useReadContract({
    address: addrs.PulseFactory,
    abi: PulseFactoryABI,
    functionName: "getVault",
    args: viewId !== undefined ? [viewId] : undefined,
    query: { enabled: viewId !== undefined },
  });
}

// ─────────────────────────────────────────────────────────────────────────────
// TradingEngine Hooks
// ─────────────────────────────────────────────────────────────────────────────

/** Get full MarketState for a view */
export function useMarketState(viewId: bigint | undefined) {
  const addrs = useAddresses();
  return useReadContract({
    address: addrs.TradingEngine,
    abi: TradingEngineABI,
    functionName: "getMarketState",
    args: viewId !== undefined ? [viewId] : undefined,
    query: {
      enabled: viewId !== undefined,
      refetchInterval: 15_000, // refresh every 15s
    },
  });
}

/** Get current Pulse Index (basis points, 0-10000) */
export function usePulseIndex(viewId: bigint | undefined) {
  const addrs = useAddresses();
  return useReadContract({
    address: addrs.TradingEngine,
    abi: TradingEngineABI,
    functionName: "getPulseIndex",
    args: viewId !== undefined ? [viewId] : undefined,
    query: {
      enabled: viewId !== undefined,
      refetchInterval: 15_000,
    },
  });
}

/** Get current MarketStatus */
export function useMarketStatus(viewId: bigint | undefined) {
  const addrs = useAddresses();
  return useReadContract({
    address: addrs.TradingEngine,
    abi: TradingEngineABI,
    functionName: "getMarketStatus",
    args: viewId !== undefined ? [viewId] : undefined,
    query: {
      enabled: viewId !== undefined,
      refetchInterval: 15_000,
    },
  });
}

/** Get vault balance (total liquidity) */
export function useVaultBalance(viewId: bigint | undefined) {
  const addrs = useAddresses();
  return useReadContract({
    address: addrs.TradingEngine,
    abi: TradingEngineABI,
    functionName: "getVaultBalance",
    args: viewId !== undefined ? [viewId] : undefined,
    query: {
      enabled: viewId !== undefined,
      refetchInterval: 15_000,
    },
  });
}

/** Get user's position in a view */
export function usePosition(viewId: bigint | undefined, userAddress?: `0x${string}`) {
  const { address } = useAccount();
  const addrs = useAddresses();
  const user = userAddress ?? address;
  return useReadContract({
    address: addrs.TradingEngine,
    abi: TradingEngineABI,
    functionName: "getPosition",
    args: viewId !== undefined && user ? [viewId, user] : undefined,
    query: {
      enabled: viewId !== undefined && !!user,
      refetchInterval: 15_000,
    },
  });
}

/** Get supply (forSupply, againstSupply) */
export function useSupply(viewId: bigint | undefined) {
  const addrs = useAddresses();
  return useReadContract({
    address: addrs.TradingEngine,
    abi: TradingEngineABI,
    functionName: "getSupply",
    args: viewId !== undefined ? [viewId] : undefined,
    query: {
      enabled: viewId !== undefined,
      refetchInterval: 15_000,
    },
  });
}

/** Get final TWAP (only valid when LOCKED or later) */
export function useFinalTWAP(viewId: bigint | undefined) {
  const addrs = useAddresses();
  return useReadContract({
    address: addrs.TradingEngine,
    abi: TradingEngineABI,
    functionName: "getFinalTWAP",
    args: viewId !== undefined ? [viewId] : undefined,
    query: { enabled: viewId !== undefined },
  });
}

// ─────────────────────────────────────────────────────────────────────────────
// SettlementManager Hooks
// ─────────────────────────────────────────────────────────────────────────────

/** Get claimable amount for a user */
export function useClaimableAmount(viewId: bigint | undefined, userAddress?: `0x${string}`) {
  const { address } = useAccount();
  const addrs = useAddresses();
  const user = userAddress ?? address;
  return useReadContract({
    address: addrs.SettlementManager,
    abi: SettlementManagerABI,
    functionName: "getClaimableAmount",
    args: viewId !== undefined && user ? [viewId, user] : undefined,
    query: {
      enabled: viewId !== undefined && !!user,
      refetchInterval: 30_000,
    },
  });
}

/** Check if user has claimed */
export function useHasClaimed(viewId: bigint | undefined, userAddress?: `0x${string}`) {
  const { address } = useAccount();
  const addrs = useAddresses();
  const user = userAddress ?? address;
  return useReadContract({
    address: addrs.SettlementManager,
    abi: SettlementManagerABI,
    functionName: "hasClaimed",
    args: viewId !== undefined && user ? [viewId, user] : undefined,
    query: { enabled: viewId !== undefined && !!user },
  });
}

// ─────────────────────────────────────────────────────────────────────────────
// MockUSDT Hooks
// ─────────────────────────────────────────────────────────────────────────────

/** Get user's USDT balance */
export function useUSDTBalance(userAddress?: `0x${string}`) {
  const { address } = useAccount();
  const addrs = useAddresses();
  const user = userAddress ?? address;
  return useReadContract({
    address: addrs.MockUSDT,
    abi: MockUSDTABI,
    functionName: "balanceOf",
    args: user ? [user] : undefined,
    query: {
      enabled: !!user,
      refetchInterval: 30_000,
    },
  });
}

/** Get USDT allowance for TradingEngine */
export function useUSDTAllowance(userAddress?: `0x${string}`) {
  const { address } = useAccount();
  const addrs = useAddresses();
  const user = userAddress ?? address;
  return useReadContract({
    address: addrs.MockUSDT,
    abi: MockUSDTABI,
    functionName: "allowance",
    args: user ? [user, addrs.TradingEngine] : undefined,
    query: {
      enabled: !!user,
      refetchInterval: 15_000,
    },
  });
}

// ─────────────────────────────────────────────────────────────────────────────
// Composite Hook: Full View Data
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Fetch all on-chain data for a single view in parallel.
 * Returns combined ViewData object.
 */
export function useViewData(viewId: bigint | undefined): {
  data: ViewData | undefined;
  isLoading: boolean;
  error: Error | null;
} {
  const addrs = useAddresses();

  const { data: record, isLoading: l1, error: e1 } = useViewRecord(viewId);
  const { data: state, isLoading: l2, error: e2 } = useMarketState(viewId);
  const { data: vaultBalance, isLoading: l3, error: e3 } = useVaultBalance(viewId);

  const isLoading = l1 || l2 || l3;
  const error = (e1 || e2 || e3) as Error | null;

  if (!record || !state || vaultBalance === undefined) {
    return { data: undefined, isLoading, error };
  }

  const typedState = state as unknown as MarketState;
  const { yesPrice, noPrice } = pulseIndexToPrices(typedState.lastPulseIndex);

  const data: ViewData = {
    record: record as unknown as import("@/types/protocol").ViewRecord,
    state: typedState,
    yesPrice,
    noPrice,
    vaultBalance: vaultBalance as bigint,
  };

  return { data, isLoading: false, error };
}
