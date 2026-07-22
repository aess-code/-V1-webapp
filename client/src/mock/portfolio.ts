export interface PortfolioPosition {
  id: string;
  viewTitle: string;
  viewId: string;
  type: "long" | "short";
  shares: number;
  entryPrice: number;
  currentPrice: number;
  pnl: number;
  pnlPercent: number;
  value: number;
}

export interface PortfolioActivity {
  id: string;
  type: "buy" | "sell" | "claim";
  viewTitle: string;
  amount: number;
  price: number;
  timestamp: string;
  status: "completed" | "pending";
}

export const mockPortfolioPositions: PortfolioPosition[] = [
  {
    id: "1",
    viewTitle: "Bitcoin Price Surge",
    viewId: "1",
    type: "long",
    shares: 150,
    entryPrice: 0.65,
    currentPrice: 0.75,
    pnl: 15000,
    pnlPercent: 15.4,
    value: 112500,
  },
  {
    id: "2",
    viewTitle: "Ethereum Dominance",
    viewId: "2",
    type: "long",
    shares: 200,
    entryPrice: 0.58,
    currentPrice: 0.62,
    pnl: 8000,
    pnlPercent: 6.9,
    value: 124000,
  },
  {
    id: "3",
    viewTitle: "DeFi TVL Recovery",
    viewId: "4",
    type: "long",
    shares: 100,
    entryPrice: 0.62,
    currentPrice: 0.71,
    pnl: 9000,
    pnlPercent: 14.5,
    value: 71000,
  },
  {
    id: "4",
    viewTitle: "AI Market Growth",
    viewId: "3",
    type: "short",
    shares: 80,
    entryPrice: 0.62,
    currentPrice: 0.58,
    pnl: 3200,
    pnlPercent: 6.5,
    value: 46400,
  },
];

export const mockPortfolioActivity: PortfolioActivity[] = [
  {
    id: "1",
    type: "buy",
    viewTitle: "Bitcoin Price Surge",
    amount: 150,
    price: 0.65,
    timestamp: "2024-07-20T14:30:00Z",
    status: "completed",
  },
  {
    id: "2",
    type: "sell",
    viewTitle: "Layer 2 Adoption",
    amount: 50,
    price: 0.68,
    timestamp: "2024-07-19T10:15:00Z",
    status: "completed",
  },
  {
    id: "3",
    type: "claim",
    viewTitle: "Ethereum Dominance",
    amount: 2500,
    price: 0,
    timestamp: "2024-07-18T16:45:00Z",
    status: "completed",
  },
  {
    id: "4",
    type: "buy",
    viewTitle: "DeFi TVL Recovery",
    amount: 100,
    price: 0.62,
    timestamp: "2024-07-17T09:20:00Z",
    status: "completed",
  },
  {
    id: "5",
    type: "buy",
    viewTitle: "AI Market Growth",
    amount: 80,
    price: 0.62,
    timestamp: "2024-07-16T13:50:00Z",
    status: "completed",
  },
];

export const portfolioStats = {
  totalValue: 353900,
  totalPnL: 35200,
  totalPnLPercent: 11.0,
  totalPositions: 4,
  winRate: 75,
};
