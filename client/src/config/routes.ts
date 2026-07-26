/**
 * 应用路由配置
 *
 * 定义所有应用路由及其属性。
 */

export interface RouteConfig {
  /**
   * 路由路径
   */
  path: string;

  /**
   * 路由名称
   */
  name: string;

  /**
   * 路由标签（用于导航菜单）
   */
  label?: string;

  /**
   * 是否需要钱包连接
   */
  requiresWallet?: boolean;

  /**
   * 是否在导航菜单中显示
   */
  showInNav?: boolean;

  /**
   * 导航菜单顺序
   */
  navOrder?: number;

  /**
   * 路由描述
   */
  description?: string;
}

/**
 * 所有应用路由
 */
export const ROUTES: Record<string, RouteConfig> = {
  // 公开路由
  HOME: {
    path: "/",
    name: "home",
    label: "Discover",
    showInNav: true,
    navOrder: 1,
    description: "发现市场中的观点",
  },

  VIEW_DETAIL: {
    path: "/view/:id",
    name: "viewDetail",
    description: "查看观点详情",
  },

  CREATOR_PROFILE: {
    path: "/creator/:address",
    name: "creatorProfile",
    description: "查看创建者资料",
  },

  LEADERBOARD: {
    path: "/leaderboard",
    name: "leaderboard",
    label: "Leaderboard",
    showInNav: true,
    navOrder: 2,
    description: "查看排行榜",
  },

  SEARCH: {
    path: "/search",
    name: "search",
    description: "搜索结果",
  },

  // 需要钱包连接的路由
  CREATE_VIEW: {
    path: "/create",
    name: "createView",
    label: "Create",
    showInNav: true,
    navOrder: 3,
    requiresWallet: true,
    description: "发布新观点",
  },

  PROFILE: {
    path: "/profile",
    name: "profile",
    label: "Profile",
    showInNav: true,
    navOrder: 4,
    requiresWallet: true,
    description: "用户资料",
  },

  // 错误页面
  NOT_FOUND: {
    path: "/404",
    name: "notFound",
    description: "页面未找到",
  },
};

/**
 * 获取导航菜单项
 */
export function getNavMenuItems(): RouteConfig[] {
  return Object.values(ROUTES)
    .filter((route) => route.showInNav)
    .sort((a, b) => (a.navOrder || 0) - (b.navOrder || 0));
}

/**
 * 检查路由是否需要钱包连接
 */
export function isRouteProtected(path: string): boolean {
  const route = Object.values(ROUTES).find((r) => r.path === path);
  return route?.requiresWallet || false;
}

/**
 * 获取路由配置
 */
export function getRouteConfig(name: string): RouteConfig | undefined {
  return ROUTES[name];
}
