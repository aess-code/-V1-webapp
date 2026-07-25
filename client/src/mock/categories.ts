export interface Category {
  id: string;
  name: string;
  description: string;
  icon: string;
  viewCount: number;
  tvl: number;
  color: string;
}

export const mockCategories: Category[] = [
  {
    id: "crypto",
    name: "Crypto",
    description: "Bitcoin, Ethereum, and other cryptocurrencies",
    icon: "₿",
    viewCount: 450,
    tvl: 12500000,
    color: "from-orange-500 to-yellow-500",
  },
  {
    id: "defi",
    name: "DeFi",
    description: "Decentralized Finance protocols and trends",
    icon: "🔄",
    viewCount: 320,
    tvl: 8200000,
    color: "from-purple-500 to-pink-500",
  },
  {
    id: "tech",
    name: "Tech",
    description: "AI, Web3, and emerging technologies",
    icon: "⚡",
    viewCount: 280,
    tvl: 5100000,
    color: "from-blue-500 to-cyan-500",
  },
  {
    id: "nft",
    name: "NFT",
    description: "NFT markets and digital collectibles",
    icon: "🎨",
    viewCount: 150,
    tvl: 2800000,
    color: "from-red-500 to-rose-500",
  },
  {
    id: "scaling",
    name: "Scaling",
    description: "Layer 2 and scaling solutions",
    icon: "📈",
    viewCount: 50,
    tvl: 1200000,
    color: "from-green-500 to-emerald-500",
  },
  {
    id: "governance",
    name: "Governance",
    description: "DAO governance and voting outcomes",
    icon: "🗳️",
    viewCount: 85,
    tvl: 1800000,
    color: "from-indigo-500 to-blue-500",
  },
];
