# Pulse Frontend Development Plan V1.0

**Status**: ✅ Official Development Plan
**Date**: 2026-07-24
**Version**: V1.0
**Based On**: Architecture Proposal V1.2 (Frozen)

---

## 文档目标

将已冻结的 Architecture Proposal V1.2 转化为可执行的工程开发计划。

本文档重点关注：

- 工程结构
- 开发流程
- 技术实现
- 编码规范
- 页面开发顺序

**重要**：不重新讨论产品设计，所有架构决策已冻结。

---

## 第一部分：Tech Stack Freeze

### 核心框架

| 技术         | 版本  | 用途      | 选择原因                           |
| ------------ | ----- | --------- | ---------------------------------- |
| React        | 19.x  | UI 框架   | 最新稳定版，支持 Server Components |
| Next.js      | 15.x  | 全栈框架  | App Router、API Routes、静态生成   |
| TypeScript   | 5.6.x | 类型系统  | 类型安全、开发效率                 |
| Tailwind CSS | 4.x   | 样式系统  | 原子化 CSS、设计令牌               |
| shadcn/ui    | 最新  | UI 组件库 | 高质量组件、完全可定制             |

### 状态管理

| 技术           | 版本 | 用途       | 选择原因                          |
| -------------- | ---- | ---------- | --------------------------------- |
| Zustand        | 4.x  | 全局状态   | 轻量级、易于使用、TypeScript 友好 |
| React Context  | 内置 | 主题/配置  | 简单状态共享                      |
| TanStack Query | 5.x  | 服务器状态 | 数据缓存、同步、重试              |

### 区块链集成

| 技术       | 版本 | 用途        | 选择原因              |
| ---------- | ---- | ----------- | --------------------- |
| wagmi      | 2.x  | 钱包交互    | 完整的 Ethereum 库    |
| viem       | 2.x  | RPC 交互    | 类型安全的 RPC 客户端 |
| RainbowKit | 2.x  | 钱包连接 UI | 开箱即用的钱包连接    |

### 数据可视化

| 技术                           | 版本 | 用途   | 选择原因             |
| ------------------------------ | ---- | ------ | -------------------- |
| Recharts                       | 2.x  | 图表库 | React 友好、响应式   |
| TradingView Lightweight Charts | 最新 | K线图  | 专业交易图表（未来） |

### 动画与交互

| 技术          | 版本 | 用途   | 选择原因                   |
| ------------- | ---- | ------ | -------------------------- |
| Framer Motion | 12.x | 动画库 | 强大的动画能力、React 集成 |

### 开发工具

| 技术       | 版本 | 用途       | 选择原因        |
| ---------- | ---- | ---------- | --------------- |
| ESLint     | 9.x  | 代码检查   | 保证代码质量    |
| Prettier   | 3.x  | 代码格式化 | 统一代码风格    |
| Vitest     | 2.x  | 单元测试   | 快速、Vite 集成 |
| Playwright | 最新 | E2E 测试   | 跨浏览器测试    |

### 包管理

| 技术 | 版本 | 用途   | 选择原因           |
| ---- | ---- | ------ | ------------------ |
| pnpm | 10.x | 包管理 | 快速、节省磁盘空间 |

### 版本冻结声明

**所有技术栈版本已冻结**。后续开发严格按照上述版本进行，不再更新或更换技术栈。

---

## 第二部分：Project Folder Structure

### 完整目录结构

```
pulse-v1-frontend/
├── src/
│   ├── app/                          # Next.js App Router
│   │   ├── layout.tsx               # 根布局
│   │   ├── page.tsx                 # 首页 (Discover)
│   │   ├── (auth)/                  # 认证相关路由组
│   │   │   └── layout.tsx
│   │   ├── discover/                # Discover 页面
│   │   │   └── page.tsx
│   │   ├── view/                    # View 详情页
│   │   │   ├── [id]/
│   │   │   │   └── page.tsx
│   │   │   └── layout.tsx
│   │   ├── creator/                 # Creator 资料页
│   │   │   ├── [address]/
│   │   │   │   └── page.tsx
│   │   │   └── layout.tsx
│   │   ├── leaderboard/             # 排行榜
│   │   │   ├── page.tsx
│   │   │   ├── creators/
│   │   │   ├── views/
│   │   │   └── traders/
│   │   ├── create/                  # 创建 View
│   │   │   └── page.tsx
│   │   ├── profile/                 # 用户资料
│   │   │   ├── page.tsx
│   │   │   ├── views/
│   │   │   ├── activity/
│   │   │   └── settings/
│   │   ├── search/                  # 搜索结果
│   │   │   └── page.tsx
│   │   ├── analytics/               # 分析（预留）
│   │   │   └── page.tsx
│   │   ├── settings/                # 全局设置
│   │   │   └── page.tsx
│   │   ├── notifications/           # 通知（预留）
│   │   │   └── page.tsx
│   │   ├── api/                     # API Routes
│   │   │   ├── protocol/            # Protocol 数据代理
│   │   │   ├── wallet/              # 钱包相关
│   │   │   └── health/              # 健康检查
│   │   └── error.tsx                # 错误页面
│   │
│   ├── components/                  # React 组件
│   │   ├── layout/                  # 布局组件
│   │   │   ├── Header.tsx
│   │   │   ├── Sidebar.tsx
│   │   │   ├── Footer.tsx
│   │   │   ├── MainLayout.tsx
│   │   │   └── DashboardLayout.tsx
│   │   │
│   │   ├── cards/                   # 卡片组件
│   │   │   ├── ViewCard.tsx
│   │   │   ├── CreatorCard.tsx
│   │   │   ├── PoolCard.tsx
│   │   │   ├── MetricCard.tsx
│   │   │   └── StatCard.tsx
│   │   │
│   │   ├── panels/                  # 面板组件
│   │   │   ├── StakePanel.tsx
│   │   │   ├── SettingsPanel.tsx
│   │   │   └── FilterPanel.tsx
│   │   │
│   │   ├── sections/                # 页面 Section
│   │   │   ├── HeroSection.tsx
│   │   │   ├── ProtocolStatsSection.tsx
│   │   │   ├── ViewDetailSection.tsx
│   │   │   └── LeaderboardSection.tsx
│   │   │
│   │   ├── forms/                   # 表单组件
│   │   │   ├── CreateViewForm.tsx
│   │   │   ├── StakeForm.tsx
│   │   │   └── SearchForm.tsx
│   │   │
│   │   ├── states/                  # 状态组件
│   │   │   ├── LoadingState.tsx
│   │   │   ├── EmptyState.tsx
│   │   │   ├── ErrorState.tsx
│   │   │   └── SkeletonLoader.tsx
│   │   │
│   │   ├── common/                  # 通用组件
│   │   │   ├── Button.tsx           # 基础按钮
│   │   │   ├── Input.tsx            # 基础输入框
│   │   │   ├── Modal.tsx            # 模态框
│   │   │   ├── Toast.tsx            # 提示
│   │   │   ├── Badge.tsx            # 标签
│   │   │   └── Avatar.tsx           # 头像
│   │   │
│   │   ├── ui/                      # shadcn/ui 组件
│   │   │   ├── button.tsx
│   │   │   ├── input.tsx
│   │   │   ├── card.tsx
│   │   │   ├── dialog.tsx
│   │   │   ├── dropdown-menu.tsx
│   │   │   ├── tabs.tsx
│   │   │   ├── select.tsx
│   │   │   ├── table.tsx
│   │   │   ├── chart.tsx
│   │   │   └── ... (其他 shadcn 组件)
│   │   │
│   │   └── providers/               # 提供者组件
│   │       ├── WalletProvider.tsx
│   │       ├── ThemeProvider.tsx
│   │       ├── QueryProvider.tsx
│   │       └── ToastProvider.tsx
│   │
│   ├── features/                    # 功能模块
│   │   ├── discover/                # Discover 功能
│   │   │   ├── components/
│   │   │   ├── hooks/
│   │   │   ├── services/
│   │   │   └── types/
│   │   │
│   │   ├── view/                    # View 功能
│   │   │   ├── components/
│   │   │   ├── hooks/
│   │   │   ├── services/
│   │   │   └── types/
│   │   │
│   │   ├── stake/                   # Stake 功能
│   │   │   ├── components/
│   │   │   ├── hooks/
│   │   │   ├── services/
│   │   │   └── types/
│   │   │
│   │   ├── creator/                 # Creator 功能
│   │   │   ├── components/
│   │   │   ├── hooks/
│   │   │   ├── services/
│   │   │   └── types/
│   │   │
│   │   ├── wallet/                  # 钱包功能
│   │   │   ├── components/
│   │   │   ├── hooks/
│   │   │   ├── services/
│   │   │   └── types/
│   │   │
│   │   └── search/                  # 搜索功能
│   │       ├── components/
│   │       ├── hooks/
│   │       ├── services/
│   │       └── types/
│   │
│   ├── hooks/                       # 全局 Hooks
│   │   ├── useProtocol.ts          # Protocol 数据
│   │   ├── useWallet.ts            # 钱包交互
│   │   ├── useTheme.ts             # 主题切换
│   │   ├── useQuery.ts             # 数据查询
│   │   ├── usePagination.ts        # 分页
│   │   ├── useDebounce.ts          # 防抖
│   │   ├── useLocalStorage.ts      # 本地存储
│   │   └── useAsync.ts             # 异步操作
│   │
│   ├── lib/                         # 工具库
│   │   ├── api/                     # API 客户端
│   │   │   ├── client.ts           # API 基础客户端
│   │   │   ├── protocol.ts         # Protocol API
│   │   │   ├── wallet.ts           # Wallet API
│   │   │   └── indexer.ts          # Indexer API
│   │   │
│   │   ├── services/                # 业务逻辑层
│   │   │   ├── ProtocolService.ts  # Protocol 服务
│   │   │   ├── WalletService.ts    # Wallet 服务
│   │   │   ├── ViewService.ts      # View 服务
│   │   │   ├── CreatorService.ts   # Creator 服务
│   │   │   ├── SearchService.ts    # Search 服务
│   │   │   └── CacheService.ts     # 缓存服务
│   │   │
│   │   ├── utils/                   # 工具函数
│   │   │   ├── format.ts           # 格式化函数
│   │   │   ├── calculate.ts        # 计算函数
│   │   │   ├── validate.ts         # 验证函数
│   │   │   ├── constants.ts        # 常量
│   │   │   ├── helpers.ts          # 辅助函数
│   │   │   └── errors.ts           # 错误处理
│   │   │
│   │   ├── types/                   # 全局类型定义
│   │   │   ├── index.ts            # 导出所有类型
│   │   │   ├── protocol.ts         # Protocol 类型
│   │   │   ├── view.ts             # View 类型
│   │   │   ├── creator.ts          # Creator 类型
│   │   │   ├── wallet.ts           # Wallet 类型
│   │   │   ├── api.ts              # API 类型
│   │   │   └── common.ts           # 通用类型
│   │   │
│   │   ├── config/                  # 配置文件
│   │   │   ├── env.ts              # 环境变量
│   │   │   ├── contracts.ts        # 合约配置
│   │   │   ├── networks.ts         # 网络配置
│   │   │   ├── rpc.ts              # RPC 配置
│   │   │   └── chains.ts           # 链配置
│   │   │
│   │   └── wagmi/                   # wagmi 配置
│   │       ├── config.ts           # wagmi 配置
│   │       └── hooks.ts            # wagmi hooks
│   │
│   ├── stores/                      # Zustand 状态存储
│   │   ├── index.ts                # 导出所有 store
│   │   ├── walletStore.ts          # 钱包状态
│   │   ├── themeStore.ts           # 主题状态
│   │   ├── uiStore.ts              # UI 状态
│   │   ├── filterStore.ts          # 筛选状态
│   │   ├── notificationStore.ts    # 通知状态
│   │   └── appStore.ts             # 应用全局状态
│   │
│   ├── styles/                      # 全局样式
│   │   ├── globals.css             # 全局样式
│   │   ├── variables.css           # CSS 变量
│   │   ├── animations.css          # 动画
│   │   └── responsive.css          # 响应式
│   │
│   ├── mock/                        # Mock 数据
│   │   ├── views.ts                # Mock View 数据
│   │   ├── creators.ts             # Mock Creator 数据
│   │   ├── leaderboard.ts          # Mock 排行榜数据
│   │   ├── portfolio.ts            # Mock 投资组合数据
│   │   ├── activities.ts           # Mock Activity 数据
│   │   └── handlers.ts             # MSW handlers
│   │
│   ├── middleware.ts               # Next.js 中间件
│   ├── env.ts                      # 环境变量验证
│   └── main.tsx                    # 应用入口
│
├── public/                         # 静态资源
│   ├── favicon.ico
│   ├── robots.txt
│   └── manifest.json
│
├── tests/                          # 测试文件
│   ├── unit/                       # 单元测试
│   │   ├── utils/
│   │   ├── hooks/
│   │   └── services/
│   │
│   ├── integration/                # 集成测试
│   │   ├── api/
│   │   ├── wallet/
│   │   └── protocol/
│   │
│   ├── e2e/                        # E2E 测试
│   │   ├── discover.spec.ts
│   │   ├── view.spec.ts
│   │   ├── stake.spec.ts
│   │   └── wallet.spec.ts
│   │
│   └── setup.ts                    # 测试配置
│
├── .env.example                    # 环境变量示例
├── .env.local                      # 本地环境变量
├── .env.development                # 开发环境变量
├── .env.production                 # 生产环境变量
├── .eslintrc.json                  # ESLint 配置
├── .prettierrc.json                # Prettier 配置
├── tsconfig.json                   # TypeScript 配置
├── next.config.js                  # Next.js 配置
├── tailwind.config.js              # Tailwind 配置
├── vitest.config.ts                # Vitest 配置
├── playwright.config.ts            # Playwright 配置
├── package.json                    # 依赖管理
└── README.md                       # 项目文档
```

### 目录职责说明

#### 禁止直接引用的目录

❌ **禁止跨模块直接引用**：

- `src/features/*/services` - 只能通过 hooks 访问
- `src/lib/api` - 只能通过 services 访问
- `src/stores` - 只能通过 hooks 访问
- `src/mock` - 只能在开发/测试中使用

#### 可以跨模块引用的目录

✅ **允许跨模块引用**：

- `src/lib/types` - 所有类型定义
- `src/lib/utils` - 工具函数
- `src/lib/config` - 配置常量
- `src/components/ui` - shadcn/ui 组件
- `src/components/common` - 通用组件
- `src/hooks` - 全局 hooks

#### 目录职责

| 目录            | 职责               | 谁可以访问          |
| --------------- | ------------------ | ------------------- |
| `app/`          | Next.js 路由和页面 | 路由层              |
| `components/`   | React 组件         | 页面、其他组件      |
| `features/`     | 功能模块           | 页面、其他 features |
| `hooks/`        | React hooks        | 组件、features      |
| `lib/services/` | 业务逻辑           | hooks、features     |
| `lib/api/`      | API 调用           | services            |
| `stores/`       | 全局状态           | hooks               |
| `mock/`         | Mock 数据          | 开发/测试           |

---

## 第三部分：State Management

### 状态分类

#### 1. Global State（全局状态）

**使用 Zustand**

```typescript
// 钱包状态
walletStore:
  - address: string | null
  - isConnected: boolean
  - chainId: number
  - balance: bigint
  - isConnecting: boolean

// 主题状态
themeStore:
  - theme: 'light' | 'dark'
  - toggleTheme: () => void

// UI 状态
uiStore:
  - isSidebarOpen: boolean
  - isSearchOpen: boolean
  - toggleSidebar: () => void

// 筛选状态
filterStore:
  - sort: 'trending' | 'newest' | 'volume' | 'activity' | 'staked'
  - categories: string[]
  - language: string
  - setSortBy: (sort) => void
  - addCategory: (category) => void

// 通知状态
notificationStore:
  - notifications: Notification[]
  - addNotification: (notification) => void
  - removeNotification: (id) => void

// 应用全局状态
appStore:
  - protocolStatus: ProtocolStatus
  - lastUpdated: number
  - updateProtocolStatus: (status) => void
```

#### 2. Local State（本地状态）

**使用 React useState**

```typescript
// 组件内部状态
- 表单输入值
- 模态框打开/关闭状态
- 本地 UI 状态（展开/折叠）
- 临时计算结果
```

#### 3. Server State（服务器状态）

**使用 TanStack Query**

```typescript
// 缓存 Protocol 数据
useQuery({
  queryKey: ["views", filters],
  queryFn: () => ProtocolService.getViews(filters),
  staleTime: 1 * 60 * 1000, // 1 分钟
});

// 缓存 Creator 数据
useQuery({
  queryKey: ["creator", address],
  queryFn: () => ProtocolService.getCreator(address),
  staleTime: 5 * 60 * 1000, // 5 分钟
});

// 缓存 View 详情
useQuery({
  queryKey: ["view", viewId],
  queryFn: () => ProtocolService.getViewDetail(viewId),
  staleTime: 2 * 60 * 1000, // 2 分钟
});

// 缓存排行榜
useQuery({
  queryKey: ["leaderboard", type],
  queryFn: () => ProtocolService.getLeaderboard(type),
  staleTime: 5 * 60 * 1000, // 5 分钟
});
```

### 状态访问规则

```
UI Component
    ↓
Custom Hook (useXxx)
    ↓
Zustand Store / TanStack Query / React Context
    ↓
Service Layer
    ↓
API Layer
    ↓
External Data Source
```

**禁止**：

- ❌ 组件直接访问 stores
- ❌ 组件直接调用 services
- ❌ 组件直接调用 API
- ❌ hooks 直接访问 stores（应该通过自定义 hooks）

**允许**：

- ✅ 组件使用 hooks
- ✅ hooks 访问 stores
- ✅ hooks 调用 services
- ✅ services 调用 API

---

## 第四部分：Protocol Data Layer

### 数据访问架构

```
UI Components
    ↓
Custom Hooks (useProtocol, useView, useCreator, etc.)
    ↓
Service Layer (ProtocolService, ViewService, etc.)
    ↓
API Client Layer (protocol.ts, wallet.ts, etc.)
    ↓
Data Sources (RPC, Indexer, Subgraph, Wallet, Cache)
```

### 禁止直接访问

❌ **组件不能直接访问**：

- RPC
- Indexer
- Subgraph
- Wallet Provider
- Local Storage
- Session Storage

### 必须经过的层

✅ **所有数据必须经过**：

1. **Protocol Data Layer** - 统一入口
2. **Service Layer** - 业务逻辑
3. **Hooks** - React 集成
4. **UI Components** - 展示

### 实现示例

#### 1. Service 层

```typescript
// lib/services/ProtocolService.ts
export class ProtocolService {
  static async getViews(filters: ViewFilters): Promise<View[]> {
    // 先检查缓存
    const cached = CacheService.get("views", filters);
    if (cached) return cached;

    // 从 Indexer 获取数据
    const data = await IndexerAPI.getViews(filters);

    // 缓存结果
    CacheService.set("views", filters, data);

    return data;
  }

  static async getViewDetail(viewId: string): Promise<ViewDetail> {
    // 先检查缓存
    const cached = CacheService.get("view", viewId);
    if (cached) return cached;

    // 从 RPC 和 Indexer 获取数据
    const [poolInfo, activity] = await Promise.all([
      RpcAPI.getPoolInfo(viewId),
      IndexerAPI.getActivity(viewId),
    ]);

    const detail = { ...poolInfo, activity };

    // 缓存结果
    CacheService.set("view", viewId, detail);

    return detail;
  }

  static async stake(viewId: string, amount: bigint, side: "long" | "short") {
    // 调用钱包
    const tx = await WalletService.stake(viewId, amount, side);

    // 等待确认
    const receipt = await RpcAPI.waitForTransaction(tx.hash);

    // 清除缓存
    CacheService.invalidate("views");
    CacheService.invalidate("view", viewId);

    return receipt;
  }
}
```

#### 2. Hook 层

```typescript
// hooks/useProtocolViews.ts
export function useProtocolViews(filters: ViewFilters) {
  return useQuery({
    queryKey: ["views", filters],
    queryFn: () => ProtocolService.getViews(filters),
    staleTime: 1 * 60 * 1000,
  });
}

// hooks/useViewDetail.ts
export function useViewDetail(viewId: string) {
  return useQuery({
    queryKey: ["view", viewId],
    queryFn: () => ProtocolService.getViewDetail(viewId),
    staleTime: 2 * 60 * 1000,
  });
}

// hooks/useStake.ts
export function useStake() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (params: StakeParams) =>
      ProtocolService.stake(params.viewId, params.amount, params.side),
    onSuccess: () => {
      // 清除相关缓存
      queryClient.invalidateQueries({ queryKey: ["views"] });
      queryClient.invalidateQueries({ queryKey: ["view"] });
    },
  });
}
```

#### 3. Component 层

```typescript
// components/ViewCard.tsx
export function ViewCard({ viewId }: { viewId: string }) {
  const { data: view, isLoading, error } = useViewDetail(viewId);

  if (isLoading) return <Skeleton />;
  if (error) return <ErrorState />;
  if (!view) return <EmptyState />;

  return (
    <Card>
      <h3>{view.title}</h3>
      <p>{view.description}</p>
      <Price long={view.longPrice} short={view.shortPrice} />
    </Card>
  );
}
```

### 缓存策略

| 数据类型     | 缓存时间 | 更新策略       |
| ------------ | -------- | -------------- |
| Views 列表   | 1 分钟   | 用户操作后清除 |
| View 详情    | 2 分钟   | Stake 后清除   |
| Creator 信息 | 5 分钟   | 手动刷新       |
| 排行榜       | 5 分钟   | 定时更新       |
| 用户余额     | 实时     | 每次交易后更新 |
| 价格         | 实时     | WebSocket 推送 |

---

## 第五部分：Mock Data Strategy

### Mock 数据层次

```
Mock Data
    ↓
Fake Service (返回 Mock 数据)
    ↓
Real Protocol (返回真实数据)
```

### 实现方式

#### 1. 环境变量控制

```typescript
// lib/config/env.ts
export const USE_MOCK_DATA = process.env.NEXT_PUBLIC_USE_MOCK_DATA === "true";
export const MOCK_DELAY = parseInt(process.env.NEXT_PUBLIC_MOCK_DELAY || "300");
```

#### 2. Service 层判断

```typescript
// lib/services/ProtocolService.ts
export class ProtocolService {
  static async getViews(filters: ViewFilters): Promise<View[]> {
    if (USE_MOCK_DATA) {
      // 使用 Mock 数据
      await delay(MOCK_DELAY); // 模拟网络延迟
      return MockViewService.getViews(filters);
    }

    // 使用真实 Protocol 数据
    return RealProtocolService.getViews(filters);
  }
}
```

#### 3. Mock 数据文件

```typescript
// mock/views.ts
export const MOCK_VIEWS: View[] = [
  {
    id: "1",
    title: "Bitcoin will reach $100k by end of 2024",
    description: "...",
    creator: { address: "0x...", name: "Alice" },
    longPrice: 0.75,
    shortPrice: 0.25,
    tvl: 5200000,
    volume24h: 2500000,
    participants: 1250,
    // ... 其他字段
  },
  // ... 更多 Mock Views
];

export class MockViewService {
  static async getViews(filters: ViewFilters): Promise<View[]> {
    // 根据 filters 过滤 Mock 数据
    return MOCK_VIEWS.filter(view => {
      if (filters.category && view.category !== filters.category) return false;
      if (filters.search && !view.title.includes(filters.search)) return false;
      return true;
    });
  }
}
```

#### 4. 环境变量配置

```bash
# .env.development
NEXT_PUBLIC_USE_MOCK_DATA=true
NEXT_PUBLIC_MOCK_DELAY=300

# .env.production
NEXT_PUBLIC_USE_MOCK_DATA=false
```

### 切换流程

**开发阶段**：

1. 使用 Mock 数据开发 UI
2. 测试各种状态（Loading、Empty、Error）
3. 验证交互逻辑

**集成阶段**：

1. 将 `USE_MOCK_DATA` 改为 `false`
2. 连接真实 Protocol
3. 验证数据流

**无缝切换**：

- 无需修改组件代码
- 只需修改环境变量
- Service 层自动切换

---

## 第六部分：Component Development Order

### 开发顺序

#### 第 1 层：基础组件（Week 1）

```
基础 UI 组件
├── Button
├── Input
├── Card
├── Badge
├── Avatar
├── Spinner
├── Skeleton
├── Modal
├── Toast
└── Tooltip
```

**完成标准**：

- ✅ 所有组件有 TypeScript 类型
- ✅ 所有组件支持响应式
- ✅ 所有组件有 Storybook 文档
- ✅ 单元测试覆盖率 > 80%

#### 第 2 层：通用组件（Week 2）

```
通用业务组件
├── ViewCard
├── CreatorCard
├── PoolCard
├── MetricCard
├── StatCard
├── ActivityItem
├── LeaderboardRow
├── PriceDisplay
├── VolumeDisplay
└── LoadingState / EmptyState / ErrorState
```

**完成标准**：

- ✅ 接收 Mock 数据并正确渲染
- ✅ 支持所有响应式断点
- ✅ 集成 Framer Motion 动画
- ✅ 集成测试通过

#### 第 3 层：业务组件（Week 3）

```
特定功能组件
├── StakePanel
├── SearchBar
├── FilterBar
├── CategoryPills
├── SortDropdown
├── WalletButton
├── CreateButton
├── ProtocolStatusBadge
└── ChartCard
```

**完成标准**：

- ✅ 与 hooks 集成
- ✅ 状态管理正确
- ✅ 错误处理完善
- ✅ 集成测试通过

#### 第 4 层：复杂组件（Week 4）

```
复杂交互组件
├── StakeInterface (完整 Stake 流程)
├── CreateViewWizard (多步骤表单)
├── SearchInterface (搜索 + 结果)
├── LeaderboardTable (排序 + 分页)
├── ViewDetailChart (图表 + 交互)
└── ProtocolDashboard (多个指标)
```

**完成标准**：

- ✅ 完整的用户交互流程
- ✅ 错误处理和重试机制
- ✅ 性能优化（虚拟滚动、懒加载）
- ✅ E2E 测试通过

#### 第 5 层：完整页面（Week 5-6）

```
完整页面
├── Layout (Header + Sidebar + Footer)
├── Discover 页面
├── View Detail 页面
├── Creator Profile 页面
├── Leaderboard 页面
├── Create View 页面
├── User Profile 页面
└── Search Results 页面
```

**完成标准**：

- ✅ 所有组件集成
- ✅ 路由正确
- ✅ 数据流正确
- ✅ 响应式完美
- ✅ 性能指标达标

### 组件开发检查清单

每个组件完成时需要检查：

- [ ] TypeScript 类型完整
- [ ] Props 文档完整
- [ ] 响应式设计完成
- [ ] 动画/过渡实现
- [ ] 无障碍支持（a11y）
- [ ] 单元测试 > 80%
- [ ] Storybook 文档
- [ ] 代码审查通过
- [ ] 性能测试通过

---

## 第七部分：Page Development Roadmap

### Phase 1：基础框架（Week 1-2）

#### 工作内容

1. **Layout 系统**
   - MainLayout（主布局）
   - DashboardLayout（仪表板布局）
   - AuthLayout（认证布局）

2. **Navigation**
   - Header 组件
   - Sidebar 组件
   - Mobile Navigation
   - Breadcrumb

3. **Wallet 集成**
   - WalletProvider 配置
   - WalletButton 组件
   - 钱包连接流程
   - 网络切换

4. **Theme 系统**
   - ThemeProvider
   - 深色/浅色主题
   - CSS 变量

#### 完成标准

- [ ] Header 和 Sidebar 在所有设备上正确显示
- [ ] Wallet 连接流程完整
- [ ] 主题切换正常工作
- [ ] 响应式导航正确
- [ ] 所有布局组件有单元测试

#### 验收标准

- ✅ 能够正确连接钱包
- ✅ 能够切换主题
- ✅ 导航在所有设备上可用
- ✅ 没有控制台错误

---

### Phase 2：核心功能（Week 3-4）

#### 工作内容

1. **Discover 页面**
   - Views 列表
   - 搜索功能
   - 筛选功能
   - 排序功能
   - 分页

2. **View Detail 页面**
   - View 信息展示
   - 价格图表
   - Activity Feed
   - Pool 信息
   - Description

3. **Stake Panel**
   - Long/Short 选择
   - 金额输入
   - Gas 估算
   - 确认流程
   - 交易状态

#### 完成标准

- [ ] Discover 页面可以加载和显示 Views
- [ ] 搜索和筛选功能正常
- [ ] View Detail 页面显示完整信息
- [ ] Stake 流程可以完成
- [ ] 所有页面有集成测试

#### 验收标准

- ✅ 用户可以浏览 Views
- ✅ 用户可以查看 View 详情
- ✅ 用户可以执行 Stake 操作
- ✅ 交易状态正确显示

---

### Phase 3：Creator 系统（Week 5）

#### 工作内容

1. **Creator Profile 页面**
   - Creator 信息
   - Creator 创建的 Views
   - Creator 统计数据
   - Creator Activity

2. **Create View 页面**
   - 多步骤表单
   - 表单验证
   - 预览
   - 发布

3. **User Profile 页面**
   - 用户信息
   - 用户的 Views
   - 用户的 Activity
   - 用户设置

#### 完成标准

- [ ] Creator Profile 页面显示正确
- [ ] Create View 流程可以完成
- [ ] User Profile 页面显示正确
- [ ] 所有页面有 E2E 测试

#### 验收标准

- ✅ 用户可以查看 Creator 信息
- ✅ 用户可以创建 View
- ✅ 用户可以查看自己的资料

---

### Phase 4：高级功能（Week 6）

#### 工作内容

1. **Leaderboard 页面**
   - Creators 排行榜
   - Views 排行榜
   - Traders 排行榜
   - 排序和筛选

2. **Search Results 页面**
   - 多维度搜索结果
   - 结果分类
   - 分页

3. **Analytics 页面（预留）**
   - 用户数据分析
   - 性能指标

#### 完成标准

- [ ] Leaderboard 页面显示正确
- [ ] Search 功能完整
- [ ] 所有页面有 E2E 测试

#### 验收标准

- ✅ 排行榜数据正确显示
- ✅ 搜索结果准确
- ✅ 分页正常工作

---

### Phase 5：Protocol 集成（Week 7）

#### 工作内容

1. **连接真实 Protocol**
   - 配置 RPC
   - 配置 Indexer
   - 配置 Subgraph
   - 配置缓存

2. **数据同步**
   - 实时价格更新
   - 活动推送
   - 余额更新

3. **错误处理**
   - 网络错误
   - RPC 错误
   - 交易失败

#### 完成标准

- [ ] 所有数据来自真实 Protocol
- [ ] 实时更新正常工作
- [ ] 错误处理完善

#### 验收标准

- ✅ 数据与 Protocol 同步
- ✅ 实时更新正常
- ✅ 错误处理正确

---

### Phase 6：测试和优化（Week 8）

#### 工作内容

1. **性能优化**
   - 代码分割
   - 懒加载
   - 缓存优化
   - 图片优化

2. **完整测试**
   - 单元测试
   - 集成测试
   - E2E 测试
   - 性能测试

3. **浏览器兼容性**
   - Chrome
   - Firefox
   - Safari
   - Edge

#### 完成标准

- [ ] Lighthouse 评分 > 90
- [ ] 测试覆盖率 > 80%
- [ ] 所有浏览器兼容

#### 验收标准

- ✅ 性能指标达标
- ✅ 所有测试通过
- ✅ 跨浏览器兼容

---

## 第八部分：Coding Standards

### TypeScript 规范

#### 类型定义

```typescript
// ✅ 好的做法
interface ViewProps {
  id: string;
  title: string;
  description: string;
  creator: Creator;
  longPrice: bigint;
  shortPrice: bigint;
  tvl: bigint;
}

type ViewFilters = {
  sort: "trending" | "newest" | "volume" | "activity" | "staked";
  category?: string;
  language?: string;
  limit?: number;
  offset?: number;
};

// ❌ 避免
interface ViewProps {
  [key: string]: any;
}

type ViewFilters = any;
```

#### 泛型使用

```typescript
// ✅ 好的做法
function useQuery<T>(key: string[], fn: () => Promise<T>): UseQueryResult<T> {
  // ...
}

// ❌ 避免
function useQuery(key, fn) {
  // ...
}
```

### Component 结构

#### 函数组件规范

```typescript
// ✅ 好的做法
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  children: React.ReactNode;
}

export function Button({
  variant = 'primary',
  size = 'md',
  isLoading = false,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        'px-4 py-2 rounded-md transition-colors',
        variantStyles[variant],
        sizeStyles[size],
        isLoading && 'opacity-50 cursor-not-allowed',
      )}
      disabled={isLoading}
      {...props}
    >
      {isLoading ? <Spinner /> : children}
    </button>
  );
}

// ❌ 避免
export function Button(props: any) {
  return <button {...props}>{props.children}</button>;
}
```

#### Hooks 规范

```typescript
// ✅ 好的做法
export function useViewDetail(viewId: string) {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ["view", viewId],
    queryFn: () => ProtocolService.getViewDetail(viewId),
    enabled: !!viewId,
    staleTime: 2 * 60 * 1000,
  });

  const refresh = useCallback(() => {
    queryClient.invalidateQueries({ queryKey: ["view", viewId] });
  }, [queryClient, viewId]);

  return { ...query, refresh };
}

// ❌ 避免
export function useViewDetail(viewId) {
  return fetch(`/api/view/${viewId}`).then(r => r.json());
}
```

### Naming Convention

#### 文件命名

```typescript
// ✅ 好的做法
-ViewCard.tsx - // 组件
  useViewDetail.ts - // Hook
  viewService.ts - // Service
  view.types.ts - // 类型定义
  view.constants.ts - // 常量
  // ❌ 避免
  viewcard.tsx -
  use_view_detail.ts -
  ViewService.ts - // Service 不用大写开头
  types.ts; // 不够具体
```

#### 变量命名

```typescript
// ✅ 好的做法
const isLoading = true;
const viewList: View[] = [];
const handleStake = () => {};
const formatPrice = (price: bigint) => {};

// ❌ 避免
const loading = true;
const list = [];
const stake = () => {};
const price = price => {};
```

#### 常量命名

```typescript
// ✅ 好的做法
const CACHE_DURATION = 5 * 60 * 1000;
const DEFAULT_PAGE_SIZE = 20;
const SUPPORTED_CHAINS = ["ethereum", "polygon"];

// ❌ 避免
const cacheDuration = 5 * 60 * 1000;
const pageSize = 20;
const chains = ["ethereum", "polygon"];
```

### Import 顺序

```typescript
// ✅ 好的做法
// 1. React 和第三方库
import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";

// 2. 本地类型
import type { View, ViewFilters } from "@/lib/types";

// 3. 本地组件
import { Button } from "@/components/ui/button";
import { ViewCard } from "@/components/cards/ViewCard";

// 4. 本地 hooks
import { useViewDetail } from "@/hooks/useViewDetail";

// 5. 本地 utils
import { formatPrice } from "@/lib/utils/format";

// 6. 样式
import styles from "./View.module.css";
```

### Error Handling

#### 异步操作

```typescript
// ✅ 好的做法
export async function getViewDetail(viewId: string): Promise<ViewDetail> {
  try {
    const response = await fetch(`/api/views/${viewId}`);

    if (!response.ok) {
      throw new ApiError(
        `Failed to fetch view: ${response.statusText}`,
        response.status
      );
    }

    return response.json();
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    throw new ApiError("Unknown error occurred", 500);
  }
}

// ❌ 避免
export async function getViewDetail(viewId: string) {
  const response = await fetch(`/api/views/${viewId}`);
  return response.json();
}
```

#### 组件错误边界

```typescript
// ✅ 好的做法
export function ViewDetail({ viewId }: { viewId: string }) {
  const { data, isLoading, error } = useViewDetail(viewId);

  if (isLoading) return <SkeletonLoader />;
  if (error) return <ErrorState error={error} />;
  if (!data) return <EmptyState />;

  return <div>{/* 内容 */}</div>;
}

// ❌ 避免
export function ViewDetail({ viewId }: { viewId: string }) {
  const { data } = useViewDetail(viewId);
  return <div>{data.title}</div>; // 可能崩溃
}
```

### Loading 策略

```typescript
// ✅ 好的做法
// 1. 首次加载：显示 Skeleton
// 2. 后续加载：保持旧数据，显示更新指示器
// 3. 错误：显示错误状态，提供重试选项

export function ViewList() {
  const { data, isLoading, isPending, error } = useQuery({
    queryKey: ['views'],
    queryFn: getViews,
  });

  if (isLoading) return <SkeletonList />;
  if (error) return <ErrorState onRetry={() => refetch()} />;

  return (
    <div>
      {data?.map(view => (
        <ViewCard key={view.id} view={view} />
      ))}
      {isPending && <LoadingIndicator />}
    </div>
  );
}
```

### 文件夹规则

#### 循环依赖

```typescript
// ❌ 禁止循环依赖
// features/view/hooks.ts → features/view/services.ts
// features/view/services.ts → features/view/hooks.ts

// ✅ 正确的依赖方向
// components → hooks → services → api
```

#### 跨模块引用

```typescript
// ✅ 允许
import { ViewCard } from "@/components/cards/ViewCard";
import type { View } from "@/lib/types";
import { formatPrice } from "@/lib/utils/format";

// ❌ 禁止
import { ViewService } from "@/features/view/services"; // 应该通过 hook
import { viewStore } from "@/stores/viewStore"; // 应该通过 hook
```

### Commit 规范

```bash
# ✅ 好的提交信息
git commit -m "feat: add view detail page"
git commit -m "fix: correct price calculation in stake panel"
git commit -m "refactor: extract common card component"
git commit -m "test: add unit tests for useViewDetail hook"
git commit -m "docs: update component documentation"

# ❌ 避免
git commit -m "update"
git commit -m "fix bug"
git commit -m "changes"
```

---

## 第九部分：Git Workflow

### 分支策略

```
main (生产分支)
  ↑
  ├─ release/v1.0 (发布分支)
  │   ↑
  │   └─ develop (开发分支)
  │       ↑
  │       ├─ feature/discover (功能分支)
  │       ├─ feature/view-detail
  │       ├─ bugfix/price-calculation
  │       └─ ...
```

### 分支命名规范

```bash
# 功能分支
feature/discover-page
feature/stake-panel
feature/wallet-integration

# Bug 修复分支
bugfix/price-calculation
bugfix/responsive-layout

# 发布分支
release/v1.0
release/v1.1

# 热修复分支
hotfix/critical-bug
```

### 开发流程

#### 1. 创建功能分支

```bash
git checkout develop
git pull origin develop
git checkout -b feature/discover-page
```

#### 2. 开发和提交

```bash
# 定期提交
git add .
git commit -m "feat: add view list component"

# 保持与 develop 同步
git fetch origin
git rebase origin/develop
```

#### 3. 创建 Pull Request

```bash
git push origin feature/discover-page
# 在 GitHub 上创建 PR
# - 标题：feat: add discover page
# - 描述：完整的功能描述
# - 关联 Issue
```

#### 4. Code Review

- 至少 2 个 Reviewer 批准
- 所有 CI 检查通过
- 无冲突

#### 5. Merge 到 Develop

```bash
# 使用 Squash Merge 保持历史清晰
git checkout develop
git pull origin develop
git merge --squash feature/discover-page
git commit -m "feat: add discover page"
git push origin develop
```

#### 6. 发布到 Main

```bash
# 创建发布分支
git checkout -b release/v1.0 develop

# 更新版本号
# 更新 CHANGELOG

git commit -m "chore: bump version to 1.0.0"
git push origin release/v1.0

# 创建 PR 到 main
# 审查和合并
git checkout main
git merge release/v1.0
git tag v1.0.0
git push origin main --tags

# 合并回 develop
git checkout develop
git merge main
git push origin develop
```

### Merge 规则

- ✅ 允许 Squash Merge（保持历史清晰）
- ❌ 禁止 Fast-forward Merge（丢失分支信息）
- ✅ 需要 PR Review
- ✅ 需要 CI 通过
- ✅ 需要分支保护规则

### Tag 规范

```bash
# 语义化版本
v1.0.0      # 主版本.次版本.修订版本
v1.0.0-rc1  # Release Candidate
v1.0.0-beta # Beta 版本

# 创建 tag
git tag -a v1.0.0 -m "Release version 1.0.0"
git push origin v1.0.0

# 删除 tag
git tag -d v1.0.0
git push origin :refs/tags/v1.0.0
```

---

## 第十部分：Testing Strategy

### 测试金字塔

```
        /\
       /E2E\
      /------\
     /Integration\
    /-------------\
   /   Unit Tests   \
  /-------------------\
```

### 单元测试（Unit Tests）

**覆盖范围**：

- 工具函数
- 业务逻辑
- 简单组件

**工具**：Vitest

```typescript
// lib/utils/format.test.ts
import { describe, it, expect } from "vitest";
import { formatPrice } from "./format";

describe("formatPrice", () => {
  it("should format price correctly", () => {
    expect(formatPrice(BigInt("1000000000000000000"))).toBe("1.00");
  });

  it("should handle small numbers", () => {
    expect(formatPrice(BigInt("100000000000000000"))).toBe("0.10");
  });
});
```

**目标**：> 80% 覆盖率

### 集成测试（Integration Tests）

**覆盖范围**：

- API 集成
- 钱包交互
- 数据流

**工具**：Vitest + MSW

```typescript
// tests/integration/stake.test.ts
import { describe, it, expect, beforeAll } from "vitest";
import { server } from "@/mock/handlers";
import { ProtocolService } from "@/lib/services/ProtocolService";

describe("Stake Flow", () => {
  beforeAll(() => server.listen());

  it("should stake successfully", async () => {
    const result = await ProtocolService.stake("view1", BigInt("1000"), "long");
    expect(result.status).toBe("success");
  });
});
```

**目标**：关键业务流程 100% 覆盖

### E2E 测试（End-to-End Tests）

**覆盖范围**：

- 完整用户流程
- 跨页面导航
- 真实交互

**工具**：Playwright

```typescript
// tests/e2e/discover.spec.ts
import { test, expect } from "@playwright/test";

test("should discover and view a view", async ({ page }) => {
  await page.goto("http://localhost:3000");

  // 搜索 View
  await page.fill('[data-testid="search-input"]', "Bitcoin");
  await page.click('[data-testid="search-button"]');

  // 验证结果
  await expect(page.locator('[data-testid="view-card"]')).toBeVisible();

  // 点击 View
  await page.click('[data-testid="view-card"]');

  // 验证详情页
  await expect(page.locator('[data-testid="view-title"]')).toBeVisible();
});
```

**目标**：关键用户路径 100% 覆盖

### 钱包测试（Wallet Tests）

```typescript
// tests/integration/wallet.test.ts
describe("Wallet Integration", () => {
  it("should connect wallet", async () => {
    // 模拟钱包连接
    const { result } = renderHook(() => useAccount());

    // 验证连接
    expect(result.current.isConnected).toBe(true);
  });

  it("should handle transaction", async () => {
    // 模拟交易
    const { result } = renderHook(() => useStake());

    act(() => {
      result.current.mutate({
        viewId: "view1",
        amount: BigInt("1000"),
        side: "long",
      });
    });

    // 验证交易状态
    expect(result.current.isPending).toBe(true);
  });
});
```

### 响应式测试（Responsive Tests）

```typescript
// tests/e2e/responsive.spec.ts
test("should be responsive on mobile", async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 });

  await page.goto("http://localhost:3000");

  // 验证移动布局
  await expect(page.locator('[data-testid="sidebar"]')).not.toBeVisible();
  await expect(page.locator('[data-testid="mobile-menu"]')).toBeVisible();
});
```

### 无障碍测试（Accessibility Tests）

```typescript
// tests/unit/accessibility.test.ts
import { render } from '@testing-library/react';
import { axe } from 'jest-axe';

test('should have no accessibility violations', async () => {
  const { container } = render(<ViewCard view={mockView} />);
  const results = await axe(container);
  expect(results).toHaveNoViolations();
});
```

### 性能测试（Performance Tests）

```typescript
// tests/performance/lighthouse.spec.ts
test("should meet performance targets", async ({ page }) => {
  const metrics = await page.metrics();

  expect(metrics.JSHeapUsedSize).toBeLessThan(50 * 1024 * 1024); // 50MB
  expect(metrics.LayoutCount).toBeLessThan(100);
});
```

### 测试执行

```bash
# 运行所有测试
npm test

# 运行单元测试
npm run test:unit

# 运行集成测试
npm run test:integration

# 运行 E2E 测试
npm run test:e2e

# 生成覆盖率报告
npm run test:coverage

# 监听模式
npm run test:watch
```

### 测试阶段要求

| 阶段    | 单元测试 | 集成测试 | E2E 测试 | 覆盖率 |
| ------- | -------- | -------- | -------- | ------ |
| Phase 1 | ✅       | -        | -        | > 70%  |
| Phase 2 | ✅       | ✅       | -        | > 75%  |
| Phase 3 | ✅       | ✅       | ✅       | > 80%  |
| Phase 4 | ✅       | ✅       | ✅       | > 85%  |
| Phase 5 | ✅       | ✅       | ✅       | > 90%  |

---

## 第十一部分：Deployment Strategy

### 环境定义

| 环境        | 用途     | 分支       | 部署触发   |
| ----------- | -------- | ---------- | ---------- |
| Development | 本地开发 | feature/\* | 手动       |
| Preview     | 预览环境 | develop    | 自动 (PR)  |
| Staging     | 测试环境 | release/\* | 自动 (Tag) |
| Production  | 生产环境 | main       | 手动 (Tag) |

### 环境变量管理

#### .env.example

```bash
# API 配置
NEXT_PUBLIC_API_URL=http://localhost:3000
NEXT_PUBLIC_RPC_URL=http://localhost:8545

# Protocol 配置
NEXT_PUBLIC_PROTOCOL_ADDRESS=0x...
NEXT_PUBLIC_FACTORY_ADDRESS=0x...

# 第三方服务
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=...
NEXT_PUBLIC_ALCHEMY_API_KEY=...

# 特性开关
NEXT_PUBLIC_USE_MOCK_DATA=true
NEXT_PUBLIC_MOCK_DELAY=300

# 分析
NEXT_PUBLIC_GA_ID=...
```

#### 环境变量配置

```bash
# .env.development
NEXT_PUBLIC_API_URL=http://localhost:3000
NEXT_PUBLIC_USE_MOCK_DATA=true

# .env.production
NEXT_PUBLIC_API_URL=https://api.pulse.protocol
NEXT_PUBLIC_USE_MOCK_DATA=false
```

### Vercel 部署

#### 配置 vercel.json

```json
{
  "buildCommand": "pnpm build",
  "devCommand": "pnpm dev",
  "installCommand": "pnpm install",
  "env": {
    "NEXT_PUBLIC_API_URL": "@next_public_api_url",
    "NEXT_PUBLIC_RPC_URL": "@next_public_rpc_url"
  },
  "regions": ["sfo1"],
  "functions": {
    "api/**": {
      "maxDuration": 30
    }
  }
}
```

#### 部署流程

```bash
# 开发环境
git push origin feature/xxx
# Vercel 自动部署预览环境

# 生产环境
git tag v1.0.0
git push origin v1.0.0
# Vercel 自动部署生产环境
```

### CI/CD 流程

#### GitHub Actions

```yaml
# .github/workflows/deploy.yml
name: Deploy

on:
  push:
    branches: [main, develop]
    tags: [v*]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: pnpm/action-setup@v2
      - uses: actions/setup-node@v3
        with:
          node-version: "20"
          cache: "pnpm"

      - run: pnpm install
      - run: pnpm lint
      - run: pnpm test
      - run: pnpm build

  deploy:
    needs: test
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main' || startsWith(github.ref, 'refs/tags/v')
    steps:
      - uses: actions/checkout@v3
      - uses: vercel/action@main
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
```

### 部署检查清单

部署前需要检查：

- [ ] 所有测试通过
- [ ] 代码审查完成
- [ ] 没有 console 错误
- [ ] 性能指标达标
- [ ] 环境变量正确
- [ ] 数据库迁移完成（如需要）
- [ ] 文档更新
- [ ] CHANGELOG 更新

### 部署后验证

```bash
# 检查部署状态
curl https://pulse.protocol/api/health

# 检查关键功能
- [ ] 页面加载正常
- [ ] Wallet 连接正常
- [ ] 数据显示正确
- [ ] 交易流程正常
- [ ] 错误处理正确
```

---

## 第十二部分：Development Milestones

### Milestone 1：基础框架（Week 1-2）

**目标**：建立完整的项目框架和基础设施

**工作内容**：

- ✅ 项目初始化和依赖安装
- ✅ TypeScript 和 ESLint 配置
- ✅ Tailwind CSS 和 shadcn/ui 集成
- ✅ Next.js App Router 配置
- ✅ 环境变量配置
- ✅ Git 工作流设置

**完成标准**：

- [ ] 项目可以正常启动
- [ ] 没有构建错误
- [ ] 代码检查通过
- [ ] 文档完整

**验收标准**：

- ✅ `npm run dev` 可以启动
- ✅ `npm run lint` 通过
- ✅ `npm run build` 成功

---

### Milestone 2：UI 组件库（Week 3-4）

**目标**：构建完整的 UI 组件库

**工作内容**：

- ✅ 基础 UI 组件（Button、Input、Card 等）
- ✅ 通用业务组件（ViewCard、CreatorCard 等）
- ✅ 状态组件（Loading、Empty、Error）
- ✅ Storybook 文档
- ✅ 单元测试

**完成标准**：

- [ ] 所有组件有 TypeScript 类型
- [ ] 所有组件有文档
- [ ] 单元测试覆盖率 > 80%
- [ ] 响应式设计完成

**验收标准**：

- ✅ Storybook 可以正常运行
- ✅ 所有组件可以正确渲染
- ✅ 测试覆盖率达标

---

### Milestone 3：Layout 和 Navigation（Week 5）

**目标**：完成主要布局和导航系统

**工作内容**：

- ✅ Header 组件
- ✅ Sidebar 组件
- ✅ Footer 组件
- ✅ 主布局（MainLayout）
- ✅ 响应式导航
- ✅ Wallet 集成

**完成标准**：

- [ ] Layout 在所有设备上正确显示
- [ ] 导航可以正常工作
- [ ] Wallet 连接流程完整
- [ ] 集成测试通过

**验收标准**：

- ✅ 页面可以正确加载
- ✅ 导航可以正常使用
- ✅ Wallet 可以正常连接

---

### Milestone 4：Discover 页面（Week 6）

**目标**：完成 Discover 页面的完整功能

**工作内容**：

- ✅ Views 列表展示
- ✅ 搜索功能
- ✅ 筛选功能
- ✅ 排序功能
- ✅ 分页功能
- ✅ Mock 数据集成

**完成标准**：

- [ ] 页面可以正常加载
- [ ] 所有交互功能正常
- [ ] 响应式设计完成
- [ ] E2E 测试通过

**验收标准**：

- ✅ 用户可以浏览 Views
- ✅ 搜索和筛选正常工作
- ✅ 分页正常工作

---

### Milestone 5：View Detail 页面（Week 7）

**目标**：完成 View 详情页的完整功能

**工作内容**：

- ✅ View 信息展示
- ✅ 价格图表
- ✅ Activity Feed
- ✅ Pool 信息
- ✅ Description
- ✅ Stake Panel

**完成标准**：

- [ ] 页面可以正常加载
- [ ] 所有信息正确显示
- [ ] 图表正常渲染
- [ ] E2E 测试通过

**验收标准**：

- ✅ 用户可以查看 View 详情
- ✅ 图表可以正常交互
- ✅ 信息更新正常

---

### Milestone 6：Stake 流程（Week 8）

**目标**：完成完整的 Stake 交易流程

**工作内容**：

- ✅ Stake Panel 组件
- ✅ 金额输入和验证
- ✅ Gas 估算
- ✅ 交易签名
- ✅ 交易状态跟踪
- ✅ 错误处理

**完成标准**：

- [ ] Stake 流程可以完成
- [ ] 交易状态正确显示
- [ ] 错误处理完善
- [ ] E2E 测试通过

**验收标准**：

- ✅ 用户可以执行 Stake
- ✅ 交易状态正确显示
- ✅ 错误提示清晰

---

### Milestone 7：Creator 系统（Week 9）

**目标**：完成 Creator 相关功能

**工作内容**：

- ✅ Creator Profile 页面
- ✅ Create View 页面
- ✅ User Profile 页面
- ✅ 用户设置
- ✅ Activity 历史

**完成标准**：

- [ ] 所有页面可以正常加载
- [ ] 所有功能正常工作
- [ ] E2E 测试通过

**验收标准**：

- ✅ 用户可以查看 Creator 信息
- ✅ 用户可以创建 View
- ✅ 用户可以查看自己的资料

---

### Milestone 8：Leaderboard 和 Search（Week 10）

**目标**：完成排行榜和搜索功能

**工作内容**：

- ✅ Leaderboard 页面
- ✅ 多维度排行榜
- ✅ Search Results 页面
- ✅ 搜索建议
- ✅ 搜索历史

**完成标准**：

- [ ] 排行榜数据正确显示
- [ ] 搜索功能完整
- [ ] E2E 测试通过

**验收标准**：

- ✅ 排行榜可以正常查看
- ✅ 搜索功能正常工作
- ✅ 结果准确

---

### Milestone 9：Protocol 集成（Week 11）

**目标**：连接真实 Protocol 数据

**工作内容**：

- ✅ RPC 配置
- ✅ Indexer 集成
- ✅ Subgraph 集成
- ✅ 缓存策略
- ✅ 实时更新
- ✅ 错误处理

**完成标准**：

- [ ] 所有数据来自真实 Protocol
- [ ] 实时更新正常工作
- [ ] 错误处理完善
- [ ] 集成测试通过

**验收标准**：

- ✅ 数据与 Protocol 同步
- ✅ 实时更新正常
- ✅ 错误处理正确

---

### Milestone 10：测试和优化（Week 12）

**目标**：完整的测试覆盖和性能优化

**工作内容**：

- ✅ 单元测试补充
- ✅ 集成测试补充
- ✅ E2E 测试补充
- ✅ 性能优化
- ✅ 浏览器兼容性测试
- ✅ 无障碍测试

**完成标准**：

- [ ] 测试覆盖率 > 90%
- [ ] Lighthouse 评分 > 90
- [ ] 所有浏览器兼容
- [ ] 无障碍检查通过

**验收标准**：

- ✅ 所有测试通过
- ✅ 性能指标达标
- ✅ 跨浏览器兼容

---

### Milestone 11：文档和部署（Week 13）

**目标**：完成文档和部署准备

**工作内容**：

- ✅ API 文档
- ✅ 组件文档
- ✅ 部署文档
- ✅ 贡献指南
- ✅ CHANGELOG
- ✅ 发布准备

**完成标准**：

- [ ] 文档完整
- [ ] 部署流程清晰
- [ ] 发布检查清单完成

**验收标准**：

- ✅ 文档可以正常访问
- ✅ 部署流程可以执行
- ✅ 发布准备完成

---

### Milestone 12：Production Ready（Week 14）

**目标**：项目达到生产就绪状态

**工作内容**：

- ✅ 最终测试
- ✅ 性能调优
- ✅ 安全检查
- ✅ 用户反馈收集
- ✅ 发布

**完成标准**：

- [ ] 所有测试通过
- [ ] 没有已知 bug
- [ ] 性能指标达标
- [ ] 安全检查通过

**验收标准**：

- ✅ 项目可以上线
- ✅ 用户可以正常使用
- ✅ 性能和稳定性达标

---

## 总结

### 开发时间表

| Milestone                | 周数     | 状态      |
| ------------------------ | -------- | --------- |
| 1. 基础框架              | Week 1-2 | 🔲 待开始 |
| 2. UI 组件库             | Week 3-4 | 🔲 待开始 |
| 3. Layout 和 Navigation  | Week 5   | 🔲 待开始 |
| 4. Discover 页面         | Week 6   | 🔲 待开始 |
| 5. View Detail 页面      | Week 7   | 🔲 待开始 |
| 6. Stake 流程            | Week 8   | 🔲 待开始 |
| 7. Creator 系统          | Week 9   | 🔲 待开始 |
| 8. Leaderboard 和 Search | Week 10  | 🔲 待开始 |
| 9. Protocol 集成         | Week 11  | 🔲 待开始 |
| 10. 测试和优化           | Week 12  | 🔲 待开始 |
| 11. 文档和部署           | Week 13  | 🔲 待开始 |
| 12. Production Ready     | Week 14  | 🔲 待开始 |

**总计**：14 周

### 关键成功因素

1. ✅ 严格遵循 Architecture Proposal V1.2
2. ✅ 按照开发顺序逐步推进
3. ✅ 保持高测试覆盖率
4. ✅ 定期代码审查
5. ✅ 及时沟通和反馈
6. ✅ 性能和用户体验优先

### 下一步行动

1. 确认 Development Plan V1.0
2. 建立开发环境
3. 开始 Milestone 1（基础框架）
4. 每周进行进度检查

---

**文档版本**：V1.0
**最后更新**：2026-07-24
**状态**：✅ 准备就绪
