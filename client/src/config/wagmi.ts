/**
 * Pulse Protocol V1 — Wagmi & RainbowKit Configuration
 *
 * Connects to Ethereum Sepolia testnet.
 * Uses RainbowKit for wallet connection UI.
 */

import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import { sepolia } from "wagmi/chains";

// WalletConnect Project ID
// REQUIRED: Set VITE_WALLETCONNECT_PROJECT_ID in Vercel Environment Variables
// Get your free projectId at: https://cloud.walletconnect.com
const WALLETCONNECT_PROJECT_ID =
  import.meta.env.VITE_WALLETCONNECT_PROJECT_ID || "";

if (!WALLETCONNECT_PROJECT_ID) {
  console.warn("[Pulse] VITE_WALLETCONNECT_PROJECT_ID is not set. WalletConnect may not work.");
}

export const wagmiConfig = getDefaultConfig({
  appName: "Pulse Protocol",
  projectId: WALLETCONNECT_PROJECT_ID,
  chains: [sepolia],
  ssr: false,
});
