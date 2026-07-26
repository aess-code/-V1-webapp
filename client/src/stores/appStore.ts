import { create } from "zustand";

/**
 * 应用全局状态
 *
 * 使用 Zustand 管理应用级别的全局状态。
 * 包括：钱包连接、用户资料、主题、导航等。
 */

interface AppState {
  /**
   * 钱包连接状态
   */
  wallet: {
    /**
     * 是否已连接
     */
    isConnected: boolean;

    /**
     * 钱包地址
     */
    address: string | null;

    /**
     * 钱包类型
     */
    type: "metamask" | "walletconnect" | "coinbase" | null;

    /**
     * 是否正在连接
     */
    isConnecting: boolean;
  };

  /**
   * 用户资料
   */
  user: {
    /**
     * 用户地址
     */
    address: string | null;

    /**
     * 用户名
     */
    name: string | null;

    /**
     * 用户头像
     */
    avatar: string | null;

    /**
     * 用户 Bio
     */
    bio: string | null;
  };

  /**
   * 应用主题
   */
  theme: "light" | "dark";

  /**
   * 导航状态
   */
  navigation: {
    /**
     * 移动端菜单是否打开
     */
    mobileMenuOpen: boolean;

    /**
     * 当前活跃的导航项
     */
    activeNav: string;
  };

  /**
   * 全局加载状态
   */
  isLoading: boolean;

  /**
   * 全局错误信息
   */
  error: string | null;
}

interface AppActions {
  /**
   * 连接钱包
   */
  connectWallet: (address: string, type: "metamask" | "walletconnect" | "coinbase") => void;

  /**
   * 断开钱包连接
   */
  disconnectWallet: () => void;

  /**
   * 设置钱包连接中状态
   */
  setWalletConnecting: (isConnecting: boolean) => void;

  /**
   * 设置用户资料
   */
  setUser: (user: Partial<AppState["user"]>) => void;

  /**
   * 切换主题
   */
  toggleTheme: () => void;

  /**
   * 设置主题
   */
  setTheme: (theme: "light" | "dark") => void;

  /**
   * 切换移动端菜单
   */
  toggleMobileMenu: () => void;

  /**
   * 关闭移动端菜单
   */
  closeMobileMenu: () => void;

  /**
   * 设置活跃导航项
   */
  setActiveNav: (nav: string) => void;

  /**
   * 设置加载状态
   */
  setLoading: (isLoading: boolean) => void;

  /**
   * 设置错误信息
   */
  setError: (error: string | null) => void;

  /**
   * 重置状态
   */
  reset: () => void;
}

const initialState: AppState = {
  wallet: {
    isConnected: false,
    address: null,
    type: null,
    isConnecting: false,
  },
  user: {
    address: null,
    name: null,
    avatar: null,
    bio: null,
  },
  theme: "dark",
  navigation: {
    mobileMenuOpen: false,
    activeNav: "discover",
  },
  isLoading: false,
  error: null,
};

/**
 * 应用全局状态 Store
 */
export const useAppStore = create<AppState & AppActions>((set) => ({
  ...initialState,

  // Wallet Actions
  connectWallet: (address: string, type: "metamask" | "walletconnect" | "coinbase") =>
    set((state: AppState) => ({
      wallet: {
        ...state.wallet,
        isConnected: true,
        address,
        type,
        isConnecting: false,
      },
      user: {
        ...state.user,
        address,
      },
    })),

  disconnectWallet: () =>
    set((state: AppState) => ({
      wallet: {
        ...state.wallet,
        isConnected: false,
        address: null,
        type: null,
      },
      user: {
        ...state.user,
        address: null,
      },
    })),

  setWalletConnecting: (isConnecting: boolean) =>
    set((state: AppState) => ({
      wallet: {
        ...state.wallet,
        isConnecting,
      },
    })),

  // User Actions
  setUser: (user: Partial<AppState["user"]>) =>
    set((state: AppState) => ({
      user: {
        ...state.user,
        ...user,
      },
    })),

  // Theme Actions
  toggleTheme: () =>
    set((state: AppState) => ({
      theme: state.theme === "light" ? "dark" : "light",
    })),

  setTheme: (theme: "light" | "dark") => set({ theme }),

  // Navigation Actions
  toggleMobileMenu: () =>
    set((state: AppState) => ({
      navigation: {
        ...state.navigation,
        mobileMenuOpen: !state.navigation.mobileMenuOpen,
      },
    })),

  closeMobileMenu: () =>
    set((state: AppState) => ({
      navigation: {
        ...state.navigation,
        mobileMenuOpen: false,
      },
    })),

  setActiveNav: (activeNav: string) =>
    set((state: AppState) => ({
      navigation: {
        ...state.navigation,
        activeNav,
      },
    })),

  // Loading & Error Actions
  setLoading: (isLoading: boolean) => set({ isLoading }),

  setError: (error: string | null) => set({ error }),

  // Reset
  reset: () => set(() => initialState),
}));

/**
 * 选择器：获取钱包连接状态
 */
export const selectWallet = (state: AppState) => state.wallet;

/**
 * 选择器：获取用户资料
 */
export const selectUser = (state: AppState) => state.user;

/**
 * 选择器：获取主题
 */
export const selectTheme = (state: AppState) => state.theme;

/**
 * 选择器：获取导航状态
 */
export const selectNavigation = (state: AppState) => state.navigation;
