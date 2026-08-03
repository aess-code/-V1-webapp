/**
 * Pulse Protocol V1 — TypeScript Types
 *
 * Mirrors the Solidity structs and enums from the frozen V1 contracts.
 * Source: contracts/interfaces/ITradingEngine.sol, IPulseFactory.sol
 * Frozen Baseline: be73488
 */

import { MarketStatus, ViewType } from "@/config/contracts";

// ─────────────────────────────────────────────────────────────────────────────
// On-Chain Types (direct mirrors of Solidity structs)
// ─────────────────────────────────────────────────────────────────────────────

/**
 * TradingEngine.MarketState
 * Complete snapshot of a market's runtime state.
 */
export interface MarketState {
  status: MarketStatus;
  reserveBalance: bigint;
  forSupply: bigint;
  againstSupply: bigint;
  lastPulseIndex: bigint;
  lastTradeTimestamp: bigint;
}

/**
 * TradingEngine.Position
 * A user's internal position accounting entry.
 */
export interface Position {
  forShares: bigint;
  againstShares: bigint;
  claimStatus: boolean;
  lastUpdate: bigint;
}

/**
 * PulseFactory.FeeConfig
 * Immutable fee configuration snapshot per View.
 */
export interface FeeConfig {
  feeRecipientBps: bigint;
  treasuryBps: bigint;
  teamBps: bigint;
  totalFeeBps: bigint;
}

/**
 * PulseFactory.ViewRecord
 * Complete on-chain record for a registered View.
 * All fields except viewId are immutable after creation.
 */
export interface ViewRecord {
  viewId: bigint;
  feeRecipient: `0x${string}`;
  viewType: ViewType;
  metadataURI: string;
  metadataHash: `0x${string}`;
  createdAt: bigint;
  startTime: bigint;
  endTime: bigint;
  vault: `0x${string}`;
  priceEngine: `0x${string}`;
  settlementManager: `0x${string}`;
  feeConfig: FeeConfig;
}

/**
 * PulseFactory.LiquidityAllocation
 * Per-user liquidity contribution for initial market allocation.
 */
export interface LiquidityAllocation {
  user: `0x${string}`;
  yesLiquidity: bigint;
  noLiquidity: bigint;
}

// ─────────────────────────────────────────────────────────────────────────────
// Derived / Computed Types (frontend convenience)
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Combined view data: on-chain ViewRecord + MarketState + off-chain metadata.
 * This is the primary data structure used by Discover and ViewDetail pages.
 */
export interface ViewData {
  /** On-chain ViewRecord from PulseFactory */
  record: ViewRecord;
  /** Runtime MarketState from TradingEngine */
  state: MarketState;
  /** YES price (0-1), derived from lastPulseIndex */
  yesPrice: number;
  /** NO price (0-1), derived from lastPulseIndex */
  noPrice: number;
  /** Vault balance (total liquidity in USDT, 6 decimals) */
  vaultBalance: bigint;
  /** Off-chain metadata (resolved from metadataURI) */
  metadata?: ViewMetadata;
}

/**
 * Off-chain metadata stored on IPFS/Arweave, referenced by metadataURI.
 */
export interface ViewMetadata {
  title: string;
  description: string;
  category?: string;
  image?: string;
  tags?: string[];
  creatorName?: string;
  creatorAvatar?: string;
}

/**
 * User's position in a specific View, enriched with computed values.
 */
export interface UserPosition {
  viewId: bigint;
  position: Position;
  /** Estimated claimable amount (if CLAIMABLE status) */
  claimableAmount?: bigint;
  /** Whether the user has any shares */
  hasPosition: boolean;
}

// ─────────────────────────────────────────────────────────────────────────────
// Transaction Parameter Types
// ─────────────────────────────────────────────────────────────────────────────

/** Parameters for TradingEngine.buy() */
export interface BuyParams {
  viewId: bigint;
  side: 0 | 1; // 0 = YES (For), 1 = NO (Against)
  amountIn: bigint; // Gross USDT amount (6 decimals)
  minSharesOut: bigint; // Slippage protection
}

/** Parameters for TradingEngine.sell() */
export interface SellParams {
  viewId: bigint;
  side: 0 | 1;
  sharesIn: bigint;
  minAmountOut: bigint; // Slippage protection
}

/** Parameters for PulseFactory.createView() */
export interface CreateViewParams {
  viewType: ViewType;
  metadataURI: string;
  metadataHash: `0x${string}`;
  startTime: bigint;
  endTime: bigint;
  initialYesLiquidity: bigint;
  initialNoLiquidity: bigint;
}
