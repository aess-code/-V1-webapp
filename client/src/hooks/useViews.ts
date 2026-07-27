import { useQuery } from "@tanstack/react-query";
import * as viewService from "@/services/viewService";
import { View } from "@/types/view";

/**
 * View 查询选项
 */
export interface ViewQueryOptions {
  /**
   * 排序方式
   * - trending: 趋势排序
   * - newest: 最新排序
   * - tvl: 按 TVL 排序
   * - volume: 按成交量排序
   * - staked: 按质押金额排序
   */
  sort?: "trending" | "newest" | "tvl" | "volume" | "staked";

  /**
   * 分类筛选
   */
  category?: string;

  /**
   * 搜索关键词
   */
  search?: string;

  /**
   * 分页 - 页码
   */
  page?: number;

  /**
   * 分页 - 每页数量
   */
  pageSize?: number;
}

/**
 * 获取 Views 列表
 *
 * @param options 查询选项
 * @returns Views 列表和加载状态
 *
 * @example
 * const { data, isLoading, error } = useViews({
 *   sort: "trending",
 *   category: "crypto",
 *   page: 1,
 *   pageSize: 20,
 * });
 */
export function useViews(options: ViewQueryOptions = {}) {
  return useQuery({
    queryKey: ["views", options],
    queryFn: async () => {
      // 调用 Service Layer
      const views = await viewService.getViews(options);
      return views;
    },
    staleTime: 5 * 60 * 1000, // 5 分钟
    gcTime: 10 * 60 * 1000, // 10 分钟（原 cacheTime）
  });
}

/**
 * 获取单个 View 详情
 *
 * @param viewId View ID
 * @returns View 详情和加载状态
 *
 * @example
 * const { data: view, isLoading } = useViewDetail("view-123");
 */
export function useViewDetail(viewId: string) {
  return useQuery({
    queryKey: ["view", viewId],
    queryFn: async () => {
      const view = await viewService.getViewDetail(viewId);
      return view;
    },
    enabled: !!viewId,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });
}

/**
 * 搜索 Views
 *
 * @param query 搜索关键词
 * @returns 搜索结果和加载状态
 *
 * @example
 * const { data: results, isLoading } = useSearchViews("bitcoin");
 */
export function useSearchViews(query: string) {
  return useQuery({
    queryKey: ["search-views", query],
    queryFn: async () => {
      if (!query) return [];
      const results = await viewService.searchViews(query);
      return results;
    },
    enabled: !!query,
    staleTime: 3 * 60 * 1000,
    gcTime: 5 * 60 * 1000,
  });
}

/**
 * 获取 Creator 的 Views
 *
 * @param creatorAddress Creator 地址
 * @returns Creator 的 Views 列表
 *
 * @example
 * const { data: views } = useCreatorViews("0x1234...5678");
 */
export function useCreatorViews(creatorAddress: string) {
  return useQuery({
    queryKey: ["creator-views", creatorAddress],
    queryFn: async () => {
      const response = await viewService.getViews({
        search: creatorAddress,
        limit: 100,
      });
      return response.data;
    },
    enabled: !!creatorAddress,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });
}

/**
 * 获取排行榜 Views
 *
 * @param type 排行榜类型 - 'top-creators' | 'top-views' | 'trending'
 * @returns 排行榜数据
 *
 * @example
 * const { data: leaderboard } = useLeaderboard("top-views");
 */
export function useLeaderboard(
  type: "top-creators" | "top-views" | "trending"
) {
  return useQuery({
    queryKey: ["leaderboard", type],
    queryFn: async () => {
      if (type === "trending") {
        const data = await viewService.getTrendingViews();
        return data;
      } else if (type === "top-views") {
        const response = await viewService.getViews({
          sort: "volume",
          limit: 20,
        });
        return response.data;
      } else {
        const data = await viewService.getFeaturedViews();
        return data;
      }
    },
    staleTime: 10 * 60 * 1000,
    gcTime: 20 * 60 * 1000,
  });
}
