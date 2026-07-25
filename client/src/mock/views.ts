export interface View {
  id: string;
  title: string;
  description: string;
  creator: string;
  creatorAvatar: string;
  category: string;
  price: number;
  change24h: number;
  tvl: number;
  volume24h: number;
  participants: number;
  image: string;
  createdAt: string;
  trending: boolean;
  featured: boolean;
}

export const mockViews: View[] = [
  {
    id: "1",
    title: "Bitcoin Price Surge",
    description: "Will Bitcoin reach $100k by end of 2024?",
    creator: "0x1234...5678",
    creatorAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=1",
    category: "Crypto",
    price: 0.75,
    change24h: 12.5,
    tvl: 2500000,
    volume24h: 850000,
    participants: 1250,
    image:
      "https://images.unsplash.com/photo-1516339901601-2e1b62dc0c45?w=500https://images.unsplash.com/photo-1518546305927-30bbc8299301?w=500&h=300&fit=croph=300https://images.unsplash.com/photo-1518546305927-30bbc8299301?w=500&h=300&fit=cropfit=crop",
    createdAt: "2024-07-20T10:30:00Z",
    trending: true,
    featured: true,
  },
  {
    id: "2",
    title: "Ethereum Dominance",
    description: "Will Ethereum maintain >50% of altcoin market cap?",
    creator: "0x2345...6789",
    creatorAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=2",
    category: "Crypto",
    price: 0.62,
    change24h: 8.3,
    tvl: 1800000,
    volume24h: 620000,
    participants: 890,
    image:
      "https://images.unsplash.com/photo-1516339901601-2e1b62dc0c45?w=500https://images.unsplash.com/photo-1621761191319-c6fb62b50faa?w=500&h=300&fit=croph=300https://images.unsplash.com/photo-1621761191319-c6fb62b50faa?w=500&h=300&fit=cropfit=crop",
    createdAt: "2024-07-19T14:20:00Z",
    trending: true,
    featured: true,
  },
  {
    id: "3",
    title: "AI Market Growth",
    description: "Will AI stocks outperform S&P 500 in Q3?",
    creator: "0x3456...7890",
    creatorAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=3",
    category: "Tech",
    price: 0.58,
    change24h: 5.2,
    tvl: 1200000,
    volume24h: 450000,
    participants: 650,
    image:
      "https://images.unsplash.com/photo-1516339901601-2e1b62dc0c45?w=500https://images.unsplash.com/photo-1677442d019cecf8e5004a9b53db39b5f7e3d5d5?w=500&h=300&fit=croph=300https://images.unsplash.com/photo-1677442d019cecf8e5004a9b53db39b5f7e3d5d5?w=500&h=300&fit=cropfit=crop",
    createdAt: "2024-07-18T09:15:00Z",
    trending: false,
    featured: true,
  },
  {
    id: "4",
    title: "DeFi TVL Recovery",
    description: "Will DeFi TVL exceed $100B by Q4 2024?",
    creator: "0x4567...8901",
    creatorAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=4",
    category: "DeFi",
    price: 0.71,
    change24h: 15.8,
    tvl: 3100000,
    volume24h: 920000,
    participants: 1540,
    image:
      "https://images.unsplash.com/photo-1516339901601-2e1b62dc0c45?w=500https://images.unsplash.com/photo-1639762681033-6461a109a4b3?w=500&h=300&fit=croph=300https://images.unsplash.com/photo-1639762681033-6461a109a4b3?w=500&h=300&fit=cropfit=crop",
    createdAt: "2024-07-17T16:45:00Z",
    trending: true,
    featured: false,
  },
  {
    id: "5",
    title: "NFT Market Rebound",
    description: "Will NFT trading volume return to $10B annually?",
    creator: "0x5678...9012",
    creatorAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=5",
    category: "NFT",
    price: 0.45,
    change24h: 2.1,
    tvl: 650000,
    volume24h: 180000,
    participants: 420,
    image:
      "https://images.unsplash.com/photo-1516339901601-2e1b62dc0c45?w=500https://images.unsplash.com/photo-1618005182384-a83a8e7b9b19?w=500&h=300&fit=croph=300https://images.unsplash.com/photo-1618005182384-a83a8e7b9b19?w=500&h=300&fit=cropfit=crop",
    createdAt: "2024-07-16T11:30:00Z",
    trending: false,
    featured: false,
  },
  {
    id: "6",
    title: "Layer 2 Adoption",
    description: "Will Arbitrum TVL exceed Optimism by EOY?",
    creator: "0x6789...0123",
    creatorAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=6",
    category: "Scaling",
    price: 0.68,
    change24h: 9.7,
    tvl: 2200000,
    volume24h: 750000,
    participants: 1100,
    image:
      "https://images.unsplash.com/photo-1516339901601-2e1b62dc0c45?w=500https://images.unsplash.com/photo-1633356122544-f134324ef6db?w=500&h=300&fit=croph=300https://images.unsplash.com/photo-1633356122544-f134324ef6db?w=500&h=300&fit=cropfit=crop",
    createdAt: "2024-07-15T13:20:00Z",
    trending: true,
    featured: false,
  },
];

export const mockCategories = [
  { id: "all", name: "All Categories", count: 1250 },
  { id: "crypto", name: "Crypto", count: 450 },
  { id: "defi", name: "DeFi", count: 320 },
  { id: "tech", name: "Tech", count: 280 },
  { id: "nft", name: "NFT", count: 150 },
  { id: "scaling", name: "Scaling", count: 50 },
];
