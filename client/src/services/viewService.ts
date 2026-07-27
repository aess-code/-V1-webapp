/**
 * View Service Layer
 *
 * 所有 View 数据访问必须通过此 Service。
 * 未来可以无缝切换到真实 Protocol 数据源。
 *
 * 数据源优先级：
 * 1. RPC (实时数据)
 * 2. Indexer (历史数据)
 * 3. Subgraph (聚合数据)
 * 4. Mock Data (开发阶段)
 */

import {
  View,
  ViewQueryParams,
  ViewListResponse,
  ViewDetailResponse,
  CreateViewRequest,
  CreateViewResponse,
} from "@/types/view";
import { mockViews } from "@/mock/views";

/**
 * 获取 View 列表
 *
 * @param params 查询参数
 * @returns View 列表
 */
export async function getViews(
  params?: ViewQueryParams
): Promise<ViewListResponse> {
  // 模拟网络延迟
  await new Promise(resolve => setTimeout(resolve, 300));

  // 当前阶段使用 Mock 数据
  let filtered = [...mockViews];

  // 应用搜索筛选
  if (params?.search) {
    const searchLower = params.search.toLowerCase();
    filtered = filtered.filter(
      view =>
        view.title.toLowerCase().includes(searchLower) ||
        view.description.toLowerCase().includes(searchLower)
    );
  }

  // 应用分类筛选
  if (params?.category) {
    filtered = filtered.filter(view => view.category === params.category);
  }

  // 应用排序
  if (params?.sort) {
    switch (params.sort) {
      case "trending":
        filtered.sort(
          (a, b) => (b.metrics?.change24h || 0) - (a.metrics?.change24h || 0)
        );
        break;
      case "newest":
        filtered.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        break;
      case "tvl":
        filtered.sort((a, b) => (b.metrics?.tvl || 0) - (a.metrics?.tvl || 0));
        break;
      case "volume":
        filtered.sort(
          (a, b) => (b.metrics?.volume24h || 0) - (a.metrics?.volume24h || 0)
        );
        break;
      case "staked":
        filtered.sort(
          (a, b) => (b.stats?.totalStaked || 0) - (a.stats?.totalStaked || 0)
        );
        break;
      case "participants":
        filtered.sort(
          (a, b) =>
            (b.metrics?.participants || 0) - (a.metrics?.participants || 0)
        );
        break;
    }
  }

  // 应用排序方向
  if (params?.order === "asc") {
    filtered.reverse();
  }

  // 应用分页
  const page = params?.page || 1;
  const limit = params?.limit || 20;
  const start = (page - 1) * limit;
  const end = start + limit;
  const paginatedData = filtered.slice(start, end);

  return {
    data: paginatedData,
    total: filtered.length,
    page,
    limit,
    hasNextPage: end < filtered.length,
    cursor: end < filtered.length ? `cursor_${end}` : undefined,
  };
}

/**
 * 获取单个 View 详情
 *
 * @param viewId View ID
 * @returns View 详情
 */
export async function getViewDetail(
  viewId: string
): Promise<ViewDetailResponse> {
  // 模拟网络延迟
  await new Promise(resolve => setTimeout(resolve, 300));

  const view = mockViews.find(v => v.id === viewId);

  if (!view) {
    throw new Error(`View not found: ${viewId}`);
  }

  // 获取相关 View（同分类的其他 View）
  const related = mockViews
    .filter(v => v.category === view.category && v.id !== viewId)
    .slice(0, 3);

  return {
    data: view,
    related,
  };
}

/**
 * 搜索 View
 *
 * @param query 搜索关键词
 * @returns 搜索结果
 */
export async function searchViews(query: string): Promise<ViewListResponse> {
  return getViews({
    search: query,
    limit: 50,
  });
}

/**
 * 获取 Trending View
 *
 * @returns Trending View 列表
 */
export async function getTrendingViews(): Promise<View[]> {
  const response = await getViews({
    sort: "trending",
    limit: 10,
  });
  return response.data;
}

/**
 * 获取 Featured View
 *
 * @returns Featured View 列表
 */
export async function getFeaturedViews(): Promise<View[]> {
  // 模拟网络延迟
  await new Promise(resolve => setTimeout(resolve, 300));

  return mockViews.filter(v => v.isFeatured).slice(0, 6);
}

/**
 * 按分类获取 View
 *
 * @param category 分类名称
 * @returns View 列表
 */
export async function getViewsByCategory(
  category: string
): Promise<ViewListResponse> {
  return getViews({
    category,
    limit: 20,
  });
}

/**
 * 创建 View
 *
 * @param request 创建请求
 * @returns 创建结果
 */
export async function createView(
  request: CreateViewRequest
): Promise<CreateViewResponse> {
  // 模拟网络延迟
  await new Promise(resolve => setTimeout(resolve, 1000));

  // 模拟创建新 View
  const newView: View = {
    id: `view_${Date.now()}`,
    title: request.title,
    description: request.description,
    category: request.category,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    creator: {
      address: "0x1234...5678", // 实际应从钱包获取
      name: "Creator",
      verified: false,
    },
    pool: {
      longPrice: 0.5,
      shortPrice: 0.5,
      liquidity: request.initialLongLiquidity + request.initialShortLiquidity,
      longLiquidity: request.initialLongLiquidity,
      shortLiquidity: request.initialShortLiquidity,
    },
    metrics: {
      tvl: request.initialLongLiquidity + request.initialShortLiquidity,
      volume24h: 0,
      participants: 1,
      change24h: 0,
    },
    stats: {
      totalStaked: 0,
      averageStake: 0,
      maxStake: 0,
      tradeCount: 0,
      commentCount: 0,
    },
    isTrending: false,
    isFeatured: false,
  };

  return {
    view: newView,
    txHash: `0x${Math.random().toString(16).slice(2)}`,
  };
}

/**
 * 获取 View 的活动记录
 *
 * @param viewId View ID
 * @returns 活动记录列表
 */
export async function getViewActivity(viewId: string) {
  // 模拟网络延迟
  await new Promise(resolve => setTimeout(resolve, 300));

  // Mock 活动数据
  return [
    {
      id: "activity_1",
      type: "stake",
      actor: { address: "0x1234...5678", name: "User 1" },
      action: "Staked $1,234 on Long",
      timestamp: new Date(Date.now() - 3600000).toISOString(),
      value: "$1,234",
    },
    {
      id: "activity_2",
      type: "stake",
      actor: { address: "0x2345...6789", name: "User 2" },
      action: "Staked $567 on Short",
      timestamp: new Date(Date.now() - 7200000).toISOString(),
      value: "$567",
    },
    {
      id: "activity_3",
      type: "create",
      actor: { address: "0x3456...7890", name: "Creator" },
      action: "Created this view",
      timestamp: new Date(Date.now() - 86400000).toISOString(),
      value: "",
    },
  ];
}

/**
 * 获取协议统计数据
 *
 * @returns 协议统计
 */
export async function getProtocolStats() {
  // 模拟网络延迟
  await new Promise(resolve => setTimeout(resolve, 300));

  const allViews = mockViews;

  return {
    totalTVL: allViews.reduce((sum, v) => sum + (v.metrics?.tvl || 0), 0),
    total24hVolume: allViews.reduce(
      (sum, v) => sum + (v.metrics?.volume24h || 0),
      0
    ),
    activeViews: allViews.length,
    totalCreators: new Set(allViews.map(v => v.creator.address)).size,
    totalParticipants: allViews.reduce(
      (sum, v) => sum + (v.metrics?.participants || 0),
      0
    ),
  };
}
