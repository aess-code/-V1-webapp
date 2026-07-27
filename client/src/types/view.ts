/**
 * Pulse Protocol View 数据模型 - 冻结版本
 *
 * 所有页面（Discover、ViewDetail、Search、Creator、Leaderboard）
 * 都必须使用此统一数据结构。
 *
 * 禁止在不同页面使用不同的 View 数据格式。
 */

/**
 * View 基础信息
 */
export interface ViewBasic {
  /** View 唯一标识 */
  id: string;

  /** View 标题 */
  title: string;

  /** View 描述 */
  description: string;

  /** View 分类 */
  category: string;

  /** View 创建时间 */
  createdAt: string;

  /** View 更新时间 */
  updatedAt: string;
}

/**
 * Creator 信息
 */
export interface Creator {
  /** Creator 地址 */
  address: string;

  /** Creator 名称 */
  name: string;

  /** Creator 头像 */
  avatar?: string;

  /** 是否已验证 */
  verified?: boolean;
}

/**
 * Pool 信息
 */
export interface Pool {
  /** Long 价格 (0-1) */
  longPrice: number;

  /** Short 价格 (0-1) */
  shortPrice: number;

  /** 总流动性 (USD) */
  liquidity: number;

  /** Long 流动性占比 */
  longLiquidity: number;

  /** Short 流动性占比 */
  shortLiquidity: number;
}

/**
 * 协议指标
 */
export interface ProtocolMetrics {
  /** 总锁定价值 (USD) */
  tvl: number;

  /** 24h 成交量 (USD) */
  volume24h: number;

  /** 参与者数量 */
  participants: number;

  /** 24h 价格变化百分比 */
  change24h: number;

  /** 7d 价格变化百分比 */
  change7d?: number;

  /** 30d 价格变化百分比 */
  change30d?: number;
}

/**
 * 统计数据
 */
export interface ViewStats {
  /** 总 Stake 金额 */
  totalStaked: number;

  /** 平均 Stake 金额 */
  averageStake: number;

  /** 最大 Stake 金额 */
  maxStake: number;

  /** 交易笔数 */
  tradeCount: number;

  /** 评论数 */
  commentCount?: number;
}

/**
 * 完整的 View 数据模型
 *
 * 这是 Pulse Protocol 中 View 的完整表示。
 * 所有页面都必须使用此数据结构。
 */
export interface View extends ViewBasic {
  /** Creator 信息 */
  creator: Creator;

  /** Pool 信息 */
  pool: Pool;

  /** 协议指标 */
  metrics: ProtocolMetrics;

  /** 统计数据 */
  stats: ViewStats;

  /** 是否是 Trending View */
  isTrending?: boolean;

  /** 是否是 Featured View */
  isFeatured?: boolean;

  /** 图片 URL */
  image?: string;
}

/**
 * View 列表查询参数
 */
export interface ViewQueryParams {
  /** 排序方式 */
  sort?: "trending" | "newest" | "tvl" | "volume" | "staked" | "participants";

  /** 分类筛选 */
  category?: string;

  /** 搜索关键词 */
  search?: string;

  /** 分页页码 */
  page?: number;

  /** 每页数量 */
  limit?: number;

  /** 排序方向 */
  order?: "asc" | "desc";
}

/**
 * View 列表响应
 */
export interface ViewListResponse {
  /** View 列表 */
  data: View[];

  /** 总数量 */
  total: number;

  /** 当前页码 */
  page: number;

  /** 每页数量 */
  limit: number;

  /** 是否有下一页 */
  hasNextPage: boolean;

  /** 游标（用于无限滚动） */
  cursor?: string;
}

/**
 * View 详情响应
 */
export interface ViewDetailResponse {
  /** View 数据 */
  data: View;

  /** 相关 View 列表 */
  related?: View[];
}

/**
 * 创建 View 的请求
 */
export interface CreateViewRequest {
  /** 标题 */
  title: string;

  /** 描述 */
  description: string;

  /** 分类 */
  category: string;

  /** 初始 Long 流动性 (USD) */
  initialLongLiquidity: number;

  /** 初始 Short 流动性 (USD) */
  initialShortLiquidity: number;
}

/**
 * 创建 View 的响应
 */
export interface CreateViewResponse {
  /** 新创建的 View */
  view: View;

  /** 交易哈希 */
  txHash: string;
}
