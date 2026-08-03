export interface UserProfile {
  address: string;
  username: string;
  avatar: string;
  bio: string;
  followers: number;
  following: number;
  joinedDate: string;
  totalViews: number;
  totalTrades: number;
  totalPnL: number;
  winRate: number;
  verified: boolean;
}

export interface UserView {
  id: string;
  title: string;
  description: string;
  category: string;
  createdAt: string;
  tvl: number;
  volume: number;
  participants: number;
  status: "active" | "resolved" | "cancelled";
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlockedAt: string;
  rarity: "common" | "rare" | "epic" | "legendary";
}

export const mockUserProfile: UserProfile = {
  address: "0x1234...5678",
  username: "CryptoVisioneer",
  avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=profile",
  bio: "Web3 analyst, opinion analyst, and protocol enthusiast. Building the future of decentralized markets.",
  followers: 12500,
  following: 450,
  joinedDate: "2023-06-15T00:00:00Z",
  totalViews: 45,
  totalTrades: 2850,
  totalPnL: 285000,
  winRate: 68,
  verified: true,
};

export const mockUserViews: UserView[] = [
  {
    id: "1",
    title: "Bitcoin Price Surge",
    description: "Will Bitcoin reach $100k by end of 2024?",
    category: "Crypto",
    createdAt: "2024-07-20T10:30:00Z",
    tvl: 2500000,
    volume: 850000,
    participants: 1250,
    status: "active",
  },
  {
    id: "2",
    title: "Ethereum Scalability",
    description: "Will Ethereum TPS exceed 10k on mainnet?",
    category: "Tech",
    createdAt: "2024-07-15T14:20:00Z",
    tvl: 1200000,
    volume: 420000,
    participants: 650,
    status: "active",
  },
  {
    id: "3",
    title: "DeFi Innovation",
    description: "Will new DeFi primitive emerge in Q3?",
    category: "DeFi",
    createdAt: "2024-07-10T09:15:00Z",
    tvl: 800000,
    volume: 280000,
    participants: 420,
    status: "resolved",
  },
];

export const mockAchievements: Achievement[] = [
  {
    id: "1",
    title: "First View Creator",
    description: "Created your first View",
    icon: "🎯",
    unlockedAt: "2024-06-15T00:00:00Z",
    rarity: "common",
  },
  {
    id: "2",
    title: "Trending Creator",
    description: "Created a View that reached trending",
    icon: "🔥",
    unlockedAt: "2024-07-05T00:00:00Z",
    rarity: "rare",
  },
  {
    id: "3",
    title: "Million Dollar TVL",
    description: "Created a View with $1M+ TVL",
    icon: "💰",
    unlockedAt: "2024-07-18T00:00:00Z",
    rarity: "epic",
  },
  {
    id: "4",
    title: "Legendary Participant",
    description: "Achieved 80%+ win rate",
    icon: "⭐",
    unlockedAt: "2024-07-20T00:00:00Z",
    rarity: "legendary",
  },
];
