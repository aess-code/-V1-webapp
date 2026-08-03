/**
 * Pulse Protocol V1 — View List Hook
 *
 * Fetches all Views from PulseFactory by iterating viewIds 1..totalViews.
 * Combines ViewRecord + MarketState + VaultBalance for each view.
 */

import { useReadContracts } from "wagmi";
import { sepolia } from "wagmi/chains";
import { PulseFactoryABI, TradingEngineABI } from "@/config/abis";
import { CONTRACT_ADDRESSES, pulseIndexToPrices, MarketStatus } from "@/config/contracts";
import type { ViewData, ViewRecord, MarketState } from "@/types/protocol";
import { useTotalViews } from "./useProtocol";

function useAddresses() {
  return CONTRACT_ADDRESSES[sepolia.id];
}

/**
 * Fetch all on-chain views with market state.
 * Returns array of ViewData sorted by viewId descending (newest first).
 */
export function useAllViews(maxViews = 50): {
  views: ViewData[];
  isLoading: boolean;
  error: Error | null;
  total: number;
} {
  const addrs = useAddresses();
  const { data: totalData, isLoading: totalLoading } = useTotalViews();

  const total = totalData ? Number(totalData as bigint) : 0;

  // Build viewIds array: fetch latest `maxViews` views
  const viewIds: bigint[] = [];
  for (let i = Math.max(1, total - maxViews + 1); i <= total; i++) {
    viewIds.push(BigInt(i));
  }
  // Reverse so newest first
  viewIds.reverse();

  // Multicall: getView for each id
  const viewContracts = viewIds.map(id => ({
    address: addrs.PulseFactory as `0x${string}`,
    abi: PulseFactoryABI,
    functionName: "getView" as const,
    args: [id] as const,
  }));

  // Multicall: getMarketState for each id
  const stateContracts = viewIds.map(id => ({
    address: addrs.TradingEngine as `0x${string}`,
    abi: TradingEngineABI,
    functionName: "getMarketState" as const,
    args: [id] as const,
  }));

  // Multicall: getVaultBalance for each id
  const vaultContracts = viewIds.map(id => ({
    address: addrs.TradingEngine as `0x${string}`,
    abi: TradingEngineABI,
    functionName: "getVaultBalance" as const,
    args: [id] as const,
  }));

  const {
    data: viewResults,
    isLoading: viewsLoading,
    error: viewsError,
  } = useReadContracts({
    contracts: viewContracts,
    query: { enabled: viewIds.length > 0, refetchInterval: 30_000 },
  });

  const {
    data: stateResults,
    isLoading: statesLoading,
    error: statesError,
  } = useReadContracts({
    contracts: stateContracts,
    query: { enabled: viewIds.length > 0, refetchInterval: 15_000 },
  });

  const {
    data: vaultResults,
    isLoading: vaultsLoading,
    error: vaultsError,
  } = useReadContracts({
    contracts: vaultContracts,
    query: { enabled: viewIds.length > 0, refetchInterval: 15_000 },
  });

  const isLoading = totalLoading || viewsLoading || statesLoading || vaultsLoading;
  const error = (viewsError || statesError || vaultsError) as Error | null;

  if (!viewResults || !stateResults || !vaultResults) {
    return { views: [], isLoading, error, total };
  }

  const views: ViewData[] = [];

  for (let i = 0; i < viewIds.length; i++) {
    const viewResult = viewResults[i];
    const stateResult = stateResults[i];
    const vaultResult = vaultResults[i];

    if (
      viewResult?.status !== "success" ||
      stateResult?.status !== "success" ||
      vaultResult?.status !== "success"
    ) {
      continue;
    }

    const record = viewResult.result as unknown as ViewRecord;
    const state = stateResult.result as unknown as MarketState;
    const vaultBalance = vaultResult.result as bigint;

    const { yesPrice, noPrice } = pulseIndexToPrices(state.lastPulseIndex);

    views.push({
      record,
      state,
      yesPrice,
      noPrice,
      vaultBalance,
    });
  }

  return { views, isLoading: false, error, total };
}

/**
 * Filter views by market status
 */
export function useActiveViews(maxViews = 50) {
  const { views, isLoading, error, total } = useAllViews(maxViews);
  const activeViews = views.filter(v => v.state.status === MarketStatus.ACTIVE);
  return { views: activeViews, isLoading, error, total };
}

// Alias for convenience
export function useViewList(maxViews = 50) {
  return useAllViews(maxViews);
}

