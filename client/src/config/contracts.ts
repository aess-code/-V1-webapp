/**
 * Pulse Protocol V1 — Contract Addresses & Chain Config
 *
 * Source: docs/Stage8_Sepolia_Deployment_Manifest_FINAL.md
 * Frozen Baseline: be73488
 * Network: Ethereum Sepolia (Chain ID: 11155111)
 * Deployer: 0x0B2141b7F564bf0Be428188c9Ba0D5De4e41342B (Nonce 48)
 */

import { sepolia } from "wagmi/chains";

// ─────────────────────────────────────────────────────────────────────────────
// Supported Chains
// ─────────────────────────────────────────────────────────────────────────────
export const SUPPORTED_CHAINS = [sepolia] as const;

export const DEFAULT_CHAIN = sepolia;

// ─────────────────────────────────────────────────────────────────────────────
// Contract Addresses — Sepolia
// ─────────────────────────────────────────────────────────────────────────────
export const CONTRACT_ADDRESSES = {
  [sepolia.id]: {
    PulseFactory:      "0x0e7592aF466DE837B700a97909E73cDF74E26D93" as `0x${string}`,
    TradingEngine:     "0xa6EE88f610140c9934153fC0d3549930a8f60B91" as `0x${string}`,
    FeeManager:        "0xE15FF88dB39740a7B9E46e69712F0Ad4a288dbe7" as `0x${string}`,
    SettlementManager: "0xB73abD77372FcD9E2Ca1D93d64A5d8163F24cC1e" as `0x${string}`,
    PriceEngine:       "0x70A91100f52D09b021ba28B607A534ED94e3986d" as `0x${string}`,
    MarketVaultFactory:"0x9F9d076cdE441EeCeD011CAF0F18f2a3a48274A8" as `0x${string}`,
    MockUSDT:          "0xDE92b9aF7FCd57ad660d7098C6a125D6594aA243" as `0x${string}`,
  },
} as const;

// ─────────────────────────────────────────────────────────────────────────────
// Protocol Constants (Immutable after deployment)
// ─────────────────────────────────────────────────────────────────────────────
// ─────────────────────────────────────────────────────────────────────────────
// Pioneer Curators (High-weight opinion contributors)
// ─────────────────────────────────────────────────────────────────────────────
export const PIONEER_CURATORS = [
  "0x0B2141b7F564bf0Be428188c9Ba0D5De4e41342B", // Deployer
] as const;

export const isPioneer = (address: string) => 
  PIONEER_CURATORS.some(p => p.toLowerCase() === address.toLowerCase());

export const PROTOCOL_CONSTANTS = {
  /** Initial Pulse Index at market creation (50.00%) */
  INITIAL_INDEX: 5000n,
  /** Minimum Pulse Index (exclusive) */
  MIN_PULSE_INDEX: 1n,
  /** Maximum Pulse Index (exclusive) */
  MAX_PULSE_INDEX: 9999n,
  /** Total fee in basis points (1%) */
  TOTAL_FEE_BPS: 100n,
  /** FeeRecipient share (70% of total fee) */
  FEE_RECIPIENT_SHARE_BPS: 7000n,
  /** Treasury share (20% of total fee) */
  TREASURY_SHARE_BPS: 2000n,
  /** Team share (10% of total fee) */
  TEAM_SHARE_BPS: 1000n,
  /** MockUSDT decimals */
  USDT_DECIMALS: 6,
  /** Minimum initial liquidity: 100 USDT (6 decimals) */
  MIN_INITIAL_LIQUIDITY: 100_000_000n,
  /** BPS denominator */
  BPS_DENOMINATOR: 10000n,
} as const;

// ─────────────────────────────────────────────────────────────────────────────
// Market Status Enum (mirrors TradingEngine.MarketStatus)
// ─────────────────────────────────────────────────────────────────────────────
export enum MarketStatus {
  ACTIVE = 0,
  LOCKED = 1,
  SETTLEMENT = 2,
  CLAIMABLE = 3,
}

// ─────────────────────────────────────────────────────────────────────────────
// ViewType Enum (mirrors PulseFactory.ViewType)
// ─────────────────────────────────────────────────────────────────────────────
export enum ViewType {
  FIXED = 0,
  PERMANENT = 1,
}

// ─────────────────────────────────────────────────────────────────────────────
// Helper: get addresses for current chain
// ─────────────────────────────────────────────────────────────────────────────
export function getContractAddresses(chainId: number) {
  const addrs = CONTRACT_ADDRESSES[chainId as keyof typeof CONTRACT_ADDRESSES];
  if (!addrs) throw new Error(`Unsupported chain: ${chainId}`);
  return addrs;
}

// ─────────────────────────────────────────────────────────────────────────────
// Helper: convert Pulse Index (0-10000) to YES/NO prices (0-1)
// ─────────────────────────────────────────────────────────────────────────────
export function pulseIndexToPrices(pulseIndex: bigint) {
  const yesPrice = Number(pulseIndex) / 10000;
  const noPrice = 1 - yesPrice;
  return { yesPrice, noPrice };
}

// ─────────────────────────────────────────────────────────────────────────────
// Helper: format USDT amount (6 decimals) to human-readable
// ─────────────────────────────────────────────────────────────────────────────
export function formatUSDT(amount: bigint): string {
  const num = Number(amount) / 1_000_000;
  if (num >= 1_000_000) return `$${(num / 1_000_000).toFixed(2)}M`;
  if (num >= 1_000) return `$${(num / 1_000).toFixed(2)}K`;
  return `$${num.toFixed(2)}`;
}

// ─────────────────────────────────────────────────────────────────────────────
// Helper: parse human-readable USDT to bigint (6 decimals)
// ─────────────────────────────────────────────────────────────────────────────
export function parseUSDT(amount: string | number): bigint {
  const num = typeof amount === "string" ? parseFloat(amount) : amount;
  return BigInt(Math.round(num * 1_000_000));
}
