/**
 * Pulse Protocol V1 — Wagmi & RainbowKit Configuration
 *
 * Connects to Ethereum Sepolia testnet.
 * Uses RainbowKit for wallet connection UI.
 */

import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import { sepolia } from "wagmi/chains";

export const wagmiConfig = getDefaultConfig({
  appName: "Pulse Protocol",
  projectId: "pulse-protocol-v1",
  chains: [sepolia],
  ssr: false,
});
