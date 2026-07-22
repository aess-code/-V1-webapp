export interface LeaderboardEntry {
  rank: number;
  address: string;
  username: string;
  avatar: string;
  score: number;
  views?: number;
  trades?: number;
  pnl?: number;
  followers?: number;
}

export const mockTopCreators: LeaderboardEntry[] = [
  {
    rank: 1,
    address: "0x1234...5678",
    username: "CryptoVisioneer",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=creator1",
    score: 9850,
    views: 45,
    followers: 12500,
  },
  {
    rank: 2,
    address: "0x2345...6789",
    username: "DataMaster",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=creator2",
    score: 8920,
    views: 38,
    followers: 10200,
  },
  {
    rank: 3,
    address: "0x3456...7890",
    username: "MarketAnalyst",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=creator3",
    score: 8450,
    views: 32,
    followers: 8900,
  },
  {
    rank: 4,
    address: "0x4567...8901",
    username: "TrendSpotter",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=creator4",
    score: 7890,
    views: 28,
    followers: 7200,
  },
  {
    rank: 5,
    address: "0x5678...9012",
    username: "InsightGuru",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=creator5",
    score: 7340,
    views: 25,
    followers: 6100,
  },
];

export const mockTopTraders: LeaderboardEntry[] = [
  {
    rank: 1,
    address: "0x6789...0123",
    username: "ProTrader",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=trader1",
    score: 15600,
    trades: 1250,
    pnl: 2850000,
  },
  {
    rank: 2,
    address: "0x7890...1234",
    username: "SwiftExecutor",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=trader2",
    score: 14200,
    trades: 1100,
    pnl: 2450000,
  },
  {
    rank: 3,
    address: "0x8901...2345",
    username: "VolatilityHunter",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=trader3",
    score: 13450,
    trades: 980,
    pnl: 2120000,
  },
  {
    rank: 4,
    address: "0x9012...3456",
    username: "RiskMaster",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=trader4",
    score: 12800,
    trades: 850,
    pnl: 1890000,
  },
  {
    rank: 5,
    address: "0xa123...4567",
    username: "PatternFinder",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=trader5",
    score: 11950,
    trades: 750,
    pnl: 1650000,
  },
];

export const mockTopViews: LeaderboardEntry[] = [
  {
    rank: 1,
    address: "0xb234...5678",
    username: "Bitcoin Surge",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=view1",
    score: 8950,
    trades: 3200,
    pnl: 5200000,
  },
  {
    rank: 2,
    address: "0xc345...6789",
    username: "Ethereum Dominance",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=view2",
    score: 7620,
    trades: 2800,
    pnl: 4100000,
  },
  {
    rank: 3,
    address: "0xd456...7890",
    username: "DeFi TVL Recovery",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=view3",
    score: 6840,
    trades: 2400,
    pnl: 3200000,
  },
  {
    rank: 4,
    address: "0xe567...8901",
    username: "AI Market Growth",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=view4",
    score: 5920,
    trades: 1950,
    pnl: 2100000,
  },
  {
    rank: 5,
    address: "0xf678...9012",
    username: "Layer 2 Adoption",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=view5",
    score: 5340,
    trades: 1650,
    pnl: 1800000,
  },
];
