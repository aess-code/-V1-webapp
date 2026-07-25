# Pulse Protocol V1 - Official Frontend Architecture Proposal

## 核心设计原则

### Protocol First, Not Website First

官方前端的职责是**连接 Pulse Protocol**，而不是运营市场。

- ✅ **Protocol 驱动**：所有业务逻辑来自 Pulse Protocol
- ✅ **数据透明**：突出 Protocol 数据，而不是营销文案
- ✅ **开放生态**：前端设计必须为未来的第三方前端铺路
- ✅ **最小化状态**：前端不保存业务状态，一切来自 Protocol

---

## 1. Information Architecture（信息架构）

### 核心概念

```
Pulse Protocol
├── Views（观点市场）
│   ├── Discover（发现）
│   ├── Trending（热门）
│   ├── Newest（最新）
│   ├── Highest Volume（最高成交量）
│   └── Most Active（最活跃）
├── View Detail（观点详情）
│   ├── 价格 & 成交量
│   ├── Stake Interface
│   ├── Chart & History
│   ├── Activity
│   └── Protocol Data
├── Create View（发布观点）
│   └── "Publish your conviction"
├── Creator Profile（创作者资料）
│   ├── Views
│   ├── Volume
│   ├── Reputation
│   └── History
└── Protocol Statistics（协议统计）
    ├── Total TVL
    ├── Total Volume
    ├── Active Views
    └── Participants
```

### 信息优先级

| 优先级 | 内容                   | 位置              |
| ------ | ---------------------- | ----------------- |
| 1      | Views 列表（Discover） | 首页主区域        |
| 2      | 搜索 & 筛选            | 首页顶部          |
| 3      | 分类（Categories）     | 侧边栏 / 顶部     |
| 4      | Protocol Statistics    | 首页底部 / 侧边栏 |
| 5      | Leaderboard            | 独立页面          |
| 6      | Create View CTA        | 顶部导航          |

---

## 2. Navigation Structure（导航结构）

### 主导航

```
Pulse Protocol Official Interface
├── Discover（首页）
│   └── 所有 Views + 搜索 + 分类
├── Create（发布观点）
│   └── Create View Wizard
├── Leaderboard（排行榜）
│   ├── Top Creators
│   ├── Top Views
│   └── Top Traders
└── Profile（用户资料）
    └── My Views + Activity + Settings
```

### 次级导航

**Discover 页面内部：**

- Trending
- Newest
- Highest Volume
- Most Active
- Categories
- Search

**View 详情页：**

- Chart
- Activity
- Pool Info
- Creator Profile

---

## 3. 页面树（Page Tree）

```
/
├── / (Discover - 首页)
├── /view/:id (View 详情)
├── /create (Create View)
├── /creator/:address (Creator 资料)
├── /leaderboard (排行榜)
│   ├── /leaderboard/creators
│   ├── /leaderboard/views
│   └── /leaderboard/traders
├── /profile (用户资料)
│   ├── /profile/views
│   ├── /profile/activity
│   └── /profile/settings
└── /search (搜索结果)
```

---

## 4. 页面职责（Page Responsibilities）

### / (Discover - 首页)

**职责**：

- 展示所有 Views
- 提供搜索 & 筛选
- 显示分类
- 展示 Protocol 统计数据
- 提供 Create View CTA

**关键数据**：

- Views 列表（带价格、成交量、参与者数）
- 分类列表
- Protocol 统计（TVL、Volume、Active Views）

**交互**：

- 搜索
- 分类筛选
- 排序（Trending、Newest、Volume、Active）
- 点击 View 进入详情

---

### /view/:id (View 详情)

**职责**：

- 展示 View 的完整信息
- 提供 Stake Interface
- 显示价格 Chart
- 展示 Activity History
- 显示 Pool 信息
- 显示创建者信息

**关键数据**：

- View 标题 & 描述
- 创建者信息
- 当前价格（Long & Short）
- 成交量
- TVL
- 参与者数
- Chart 数据
- Activity 历史
- Pool 信息（来自 Protocol）

**交互**：

- Stake Long / Short
- 查看 Chart
- 查看 Activity
- 访问创建者资料

---

### /create (Create View)

**职责**：

- 引导用户发布观点
- 简化创建流程
- 强调 "Publish your conviction"

**流程**：

1. 输入标题
2. 输入描述
3. 选择分类
4. 设置参数（可选）
5. 确认发布

**关键原则**：

- 尽可能简化
- 强调 "Conviction"，而不是 "Prediction"
- 所有业务逻辑由 Protocol 处理

---

### /creator/:address (Creator 资料)

**职责**：

- 展示创建者的所有 Views
- 显示创建者统计数据
- 展示创建者的 Activity

**关键数据**：

- Creator 名称 & 头像
- Views 列表
- 总成交量
- Reputation（预留）
- Activity 历史

**交互**：

- 查看创建者的 Views
- 查看 Activity 历史
- 关注创建者（预留）

---

### /leaderboard (排行榜)

**职责**：

- 展示 Top Creators
- 展示 Top Views
- 展示 Top Traders

**关键数据**：

- Creators 排行（按成交量 / Reputation）
- Views 排行（按 TVL / Volume）
- Traders 排行（按收益 / 活跃度）

**交互**：

- 切换排行榜类型
- 点击进入详情

---

### /profile (用户资料)

**职责**：

- 展示用户的 Views
- 展示用户的 Activity
- 提供设置选项

**关键数据**：

- 用户持仓
- 用户创建的 Views
- 用户的 Activity 历史
- 用户设置

**交互**：

- 查看持仓
- 查看创建的 Views
- 查看 Activity
- 修改设置

---

### /search (搜索结果)

**职责**：

- 展示搜索结果
- 支持多种搜索维度

**搜索维度**：

- View 标题 & 描述
- Creator 名称
- 分类

---

## 5. 组件树（Component Tree）

### 布局组件

```
Layout
├── Header
│   ├── Logo
│   ├── Navigation
│   ├── Search Bar
│   └── Wallet Button (预留)
├── Sidebar (可选)
│   ├── Categories
│   └── Navigation Links
├── Main Content
│   └── Page Content
└── Footer (可选)
    └── Links & Info
```

### 页面组件

#### Discover 页面

```
DiscoverPage
├── SearchBar
├── FilterBar
│   ├── CategoryFilter
│   ├── SortDropdown
│   └── ViewsGrid
├── ViewCard (重复)
│   ├── ViewTitle
│   ├── CreatorInfo
│   ├── PriceDisplay
│   ├── VolumeDisplay
│   └── ParticipantCount
└── ProtocolStats
    ├── TVLStat
    ├── VolumeStat
    └── ActiveViewsStat
```

#### View 详情页

```
ViewDetailPage
├── ViewHeader
│   ├── Title
│   ├── Description
│   └── CreatorCard
├── PriceSection
│   ├── LongPrice
│   ├── ShortPrice
│   └── SpreadDisplay
├── StakeInterface
│   ├── AmountInput
│   ├── LongButton
│   └── ShortButton
├── ChartSection
│   ├── PriceChart
│   └── VolumeChart
├── ActivitySection
│   ├── ActivityList
│   └── ActivityItem (重复)
├── PoolInfoSection
│   ├── TVL
│   ├── Volume
│   ├── Participants
│   └── PoolComposition
└── ProtocolDataSection
    ├── FeeStructure
    ├── SettlementInfo
    └── ProtocolParams
```

#### Create View 页面

```
CreateViewPage
├── StepIndicator
├── FormStep (1-5)
│   ├── TitleInput
│   ├── DescriptionInput
│   ├── CategorySelect
│   ├── ParamsInput (可选)
│   └── ConfirmStep
└── SubmitButton
```

#### Creator 资料页

```
CreatorProfilePage
├── CreatorHeader
│   ├── Avatar
│   ├── Name
│   ├── Stats
│   └── FollowButton (预留)
├── ViewsList
│   └── ViewCard (重复)
├── ActivitySection
│   └── ActivityItem (重复)
└── StatsSection
    ├── TotalVolume
    ├── ViewCount
    └── Reputation (预留)
```

#### Leaderboard 页面

```
LeaderboardPage
├── TabSelector
│   ├── CreatorsTab
│   ├── ViewsTab
│   └── TradersTab
└── LeaderboardTable
    ├── RankColumn
    ├── NameColumn
    ├── ScoreColumn
    └── ActionColumn
```

### 通用组件

```
UI Components
├── Button
├── Card
├── Input
├── Select
├── Modal
├── Tabs
├── Table
├── Chart (Recharts)
├── Avatar
├── Badge
├── Tooltip
├── Toast
└── Loading Spinner

Data Components
├── ViewCard
├── CreatorCard
├── ActivityItem
├── StatCard
├── PriceDisplay
├── VolumeDisplay
└── LeaderboardRow

Layout Components
├── Header
├── Sidebar
├── Footer
├── Container
└── Grid
```

---

## 6. Design System

### 色彩系统

**主色**：

- Primary Purple: `oklch(0.7 0.2 280)`
- Primary Blue: `oklch(0.65 0.18 270)`
- Accent: `oklch(0.7 0.2 280)`

**背景**：

- Background: `oklch(0.08 0.01 280)` (深黑色)
- Card: `oklch(0.12 0.01 280)` (稍浅)
- Hover: `oklch(0.15 0.03 280)`

**文字**：

- Foreground: `oklch(0.95 0.01 280)` (白色)
- Secondary: `oklch(0.7 0.02 280)` (灰色)
- Muted: `oklch(0.5 0.01 280)` (更浅灰)

**状态**：

- Success: Green
- Error: Red
- Warning: Yellow
- Info: Blue

### 字体系统

- **Display**: Inter Bold (700) - 标题
- **Body**: Inter Regular (400) - 正文
- **Accent**: Inter SemiBold (600) - 强调

### 间距系统

- 4px, 8px, 12px, 16px, 24px, 32px, 48px, 64px

### 圆角系统

- sm: 4px
- md: 8px
- lg: 12px
- xl: 16px
- full: 9999px

### 阴影系统

- sm: 0 1px 2px rgba(0,0,0,0.05)
- md: 0 4px 6px rgba(0,0,0,0.1)
- lg: 0 10px 15px rgba(0,0,0,0.1)
- xl: 0 20px 25px rgba(0,0,0,0.1)

### 动画系统

- **快速**: 150ms (UI 反馈)
- **标准**: 300ms (过渡)
- **缓慢**: 500ms (进入/离开)

---

## 7. Information Hierarchy（信息层级）

### View 详情页的信息层级

用户进入 View 页面时，应按照以下优先级展示信息：

#### 第一屏（最重要）：View + Price + Stake

```
┌─────────────────────────────────────────┐
│ View Title                              │
│ Creator Info                            │
├─────────────────────────────────────────┤
│ Long Price: $0.75  │  Short Price: $0.25│
│ Spread: 0.50      │  Volume: $2.5M     │
├─────────────────────────────────────────┤
│ [Stake Long]  [Stake Short]             │
│ Amount Input: ___________                │
└─────────────────────────────────────────┘
```

**关键数据**：

- View 标题
- 创建者信息（名称、头像）
- Long 价格
- Short 价格
- Spread
- 24H 成交量
- Stake 按钮
- 金额输入框

**用户心理**：用户进入页面，第一眼就要看到价格和 Stake 选项。

---

#### 第二屏：Chart + Volume + Protocol Metrics

```
┌─────────────────────────────────────────┐
│ Price Chart (1H / 1D / 1W / 1M)        │
│ [Line Chart with Volume Bars]           │
├─────────────────────────────────────────┤
│ TVL: $5.2M  │  Volume: $2.5M           │
│ Participants: 1,250  │  Holders: 850   │
│ Pool Ratio: 60% Long / 40% Short       │
└─────────────────────────────────────────┘
```

**关键数据**：

- 价格 Chart（支持多个时间框架）
- 成交量 Chart
- TVL
- 24H 成交量
- 参与者数
- Holder 数
- Pool 比例（Long / Short）
- 流动性

**用户心理**：用户想看价格趋势和市场活跃度。

---

#### 第三屏：Activity Feed

```
┌─────────────────────────────────────────┐
│ Recent Activity                         │
├─────────────────────────────────────────┤
│ 0x1234... staked $10k LONG    2 min ago │
│ 0x5678... staked $5k SHORT    5 min ago │
│ 0x9abc... staked $20k LONG   10 min ago │
│ ...                                     │
└─────────────────────────────────────────┘
```

**关键数据**：

- 最近的 Stake 活动
- 交易者地址（缩写）
- Stake 金额
- Stake 方向（Long / Short）
- 时间戳

**用户心理**：用户想看市场的实时活动，判断市场热度。

---

#### 第四屏：Description

```
┌─────────────────────────────────────────┐
│ Description                             │
├─────────────────────────────────────────┤
│ Will Bitcoin reach $100k by end of 2024?│
│                                         │
│ This view explores the possibility of   │
│ Bitcoin reaching $100,000 USD...        │
└─────────────────────────────────────────┘
```

**关键数据**：

- View 描述
- 创建者的观点

**用户心理**：用户已经决定是否参与，现在想了解 View 的详细信息。

---

#### 第五屏：Discussion（未来）

```
┌─────────────────────────────────────────┐
│ Discussion (Coming Soon)                │
├─────────────────────────────────────────┤
│ This feature will be available soon     │
└─────────────────────────────────────────┘
```

**未来功能**：

- 用户评论
- 讨论线程
- 信号聚合

---

### 其他页面的信息层级

#### Discover 页面

1. **Protocol Dashboard**（最重要）
   - Protocol TVL
   - 24H Volume
   - Active Views
   - New Views (24H)
   - Total Staked
   - Participants

2. **Trending Convictions**
   - 按 Volume 排序的 Views
   - 显示价格、成交量、参与者数

3. **Search & Filter**
   - 搜索框
   - 分类筛选
   - 排序选项

4. **Views Grid**
   - View Card 列表
   - 无限滚动或分页

#### Creator 页面

1. **Creator Stats**（最重要）
   - Total Views Created
   - Total Volume Generated
   - Total TVL Generated
   - Followers（预留）
   - Historical Accuracy（预留）
   - Reputation（预留）

2. **Creator Portfolio**
   - 创建者创建的所有 Views
   - 按 Volume / TVL 排序

3. **Trading Activity**
   - 创建者的交易历史
   - 收益 / 亏损

#### Leaderboard 页面

1. **Top Creators**
   - Volume Generated
   - TVL Generated
   - Followers
   - Reputation Score

2. **Top Views**
   - TVL
   - Volume
   - Participants
   - Performance

3. **Top Traders**
   - Total Staked
   - Total Profit
   - Win Rate
   - Participation Count

---

## 8. 页面之间的数据流

### 数据流向

```
Protocol ← → Frontend
   ↓
   View List
   ├── Discover Page (展示)
   ├── Search Results (过滤)
   └── Creator Profile (创建者的 Views)

   View Detail
   ├── View Detail Page (展示)
   ├── Chart Data (价格历史)
   ├── Activity (交易历史)
   └── Pool Info (来自 Protocol)

   Creator Info
   ├── Creator Profile Page
   ├── Leaderboard (排行)
   └── View Card (创建者信息)

   User Data
   ├── Profile Page (用户持仓)
   ├── Activity (用户交易历史)
   └── My Views (用户创建的 Views)
```

### 数据流原则

1. **单向数据流**：Protocol → Frontend
2. **无状态管理**：前端不保存业务状态
3. **实时更新**：通过 WebSocket 或 Polling 获取最新数据
4. **缓存策略**：短期缓存（1-5 分钟）以优化性能

---

## 8. Protocol 与前端的关系

### 前端职责

- ✅ UI 渲染
- ✅ 用户交互处理
- ✅ 数据展示
- ✅ 搜索 & 筛选（本地）
- ✅ 图表绘制

### Protocol 职责

- ✅ 市场创建
- ✅ 价格计算
- ✅ 交易执行
- ✅ 手续费计算
- ✅ Pool 管理
- ✅ Settlement
- ✅ 数据存储

### 前端不做的事

- ❌ 不计算价格
- ❌ 不管理 Pool
- ❌ 不处理交易逻辑
- ❌ 不保存业务数据
- ❌ 不实现 Settlement 逻辑

### API 接口（示例）

```typescript
// 获取所有 Views
GET /api/views
Query: {
  sort: 'trending' | 'newest' | 'volume' | 'active',
  category?: string,
  search?: string,
  limit?: number,
  offset?: number
}
Response: View[]

// 获取 View 详情
GET /api/views/:id
Response: ViewDetail

// 获取 View 的价格历史
GET /api/views/:id/chart
Query: { timeframe: '1h' | '1d' | '1w' | '1m' }
Response: ChartData[]

// 获取 View 的活动历史
GET /api/views/:id/activity
Query: { limit?: number, offset?: number }
Response: Activity[]

// 获取创建者信息
GET /api/creators/:address
Response: CreatorProfile

// 获取排行榜
GET /api/leaderboard/:type
Query: { type: 'creators' | 'views' | 'traders', limit?: number }
Response: LeaderboardEntry[]

// 创建 View
POST /api/views
Body: { title, description, category, params? }
Response: { id, txHash }

// Stake
POST /api/views/:id/stake
Body: { amount, side: 'long' | 'short' }
Response: { txHash }
```

---

## 9. Component Library（组件库）

### 核心组件

#### 数据展示组件

| 组件              | 用途           | 优先级 |
| ----------------- | -------------- | ------ |
| ViewCard          | 展示 View 摘要 | P0     |
| PriceCard         | 展示价格信息   | P0     |
| PoolCard          | 展示 Pool 信息 | P0     |
| ProtocolStatsCard | 展示协议统计   | P0     |
| MetricCard        | 展示单个指标   | P0     |
| ActivityItem      | 展示活动项     | P0     |
| ActivityFeed      | 活动列表       | P0     |
| CreatorBadge      | 创建者标签     | P1     |
| LeaderboardRow    | 排行榜行       | P1     |
| ChartCard         | 图表卡片       | P0     |

#### 交互组件

| 组件          | 用途       | 优先级 |
| ------------- | ---------- | ------ |
| StakePanel    | Stake 界面 | P0     |
| SearchBar     | 搜索框     | P0     |
| FilterBar     | 筛选栏     | P0     |
| CategoryPills | 分类标签   | P0     |
| SortDropdown  | 排序下拉   | P0     |
| WalletButton  | 钱包按钮   | P0     |
| CreateButton  | 创建按钮   | P0     |

#### 布局组件

| 组件      | 用途     | 优先级 |
| --------- | -------- | ------ |
| Header    | 顶部导航 | P0     |
| Sidebar   | 侧边栏   | P1     |
| Footer    | 底部     | P2     |
| Container | 容器     | P0     |
| Grid      | 网格布局 | P0     |
| Stack     | 堆叠布局 | P0     |

#### 状态组件

| 组件     | 用途     | 优先级 |
| -------- | -------- | ------ |
| Skeleton | 骨架屏   | P0     |
| Loading  | 加载状态 | P0     |
| Empty    | 空状态   | P0     |
| Error    | 错误状态 | P0     |
| Toast    | 提示     | P0     |
| Modal    | 模态框   | P1     |

### 组件设计原则

1. **数据驱动** - 组件接收数据，不管理状态
2. **高度复用** - 组件应该在多个页面中使用
3. **无样式偏见** - 组件应该支持不同的样式变体
4. **可访问性** - 所有组件都应该支持键盘导航和屏幕阅读器
5. **性能优化** - 使用 React.memo 避免不必要的重新渲染

---

## 10. Design Tokens（设计令牌）

### 色彩系统

#### 主色

- Primary Purple: `oklch(0.7 0.2 280)`
- Primary Blue: `oklch(0.65 0.18 270)`
- Accent: `oklch(0.7 0.2 280)`

#### 背景色

- Background: `oklch(0.08 0.01 280)` (深黑色)
- Card: `oklch(0.12 0.01 280)` (稍浅)
- Hover: `oklch(0.15 0.03 280)`
- Overlay: `oklch(0 0 0 / 0.5)` (半透明黑)

#### 文字色

- Foreground: `oklch(0.95 0.01 280)` (白色)
- Secondary: `oklch(0.7 0.02 280)` (灰色)
- Muted: `oklch(0.5 0.01 280)` (更浅灰)
- Disabled: `oklch(0.4 0.01 280)` (禁用灰)

#### 状态色

- Success: `oklch(0.6 0.15 150)` (绿色)
- Error: `oklch(0.6 0.2 25)` (红色)
- Warning: `oklch(0.7 0.18 70)` (黄色)
- Info: `oklch(0.65 0.18 270)` (蓝色)

#### 数据色

- Long: `oklch(0.6 0.15 150)` (绿色)
- Short: `oklch(0.6 0.2 25)` (红色)
- Neutral: `oklch(0.5 0.01 280)` (灰色)

### 间距系统

```
xs: 4px
sm: 8px
md: 12px
lg: 16px
xl: 24px
2xl: 32px
3xl: 48px
4xl: 64px
```

### 圆角系统

```
sm: 4px
md: 8px
lg: 12px
xl: 16px
2xl: 20px
full: 9999px
```

### 阴影系统

```
sm: 0 1px 2px rgba(0,0,0,0.05)
md: 0 4px 6px rgba(0,0,0,0.1)
lg: 0 10px 15px rgba(0,0,0,0.1)
xl: 0 20px 25px rgba(0,0,0,0.1)
2xl: 0 25px 50px rgba(0,0,0,0.15)
```

### 字体系统

#### 字体族

- Sans: Inter
- Mono: Fira Code (未来)

#### 字体大小

```
xs: 12px (0.75rem)
sm: 14px (0.875rem)
base: 16px (1rem)
lg: 18px (1.125rem)
xl: 20px (1.25rem)
2xl: 24px (1.5rem)
3xl: 30px (1.875rem)
4xl: 36px (2.25rem)
```

#### 字体权重

```
light: 300
regular: 400
medium: 500
semibold: 600
bold: 700
```

#### 行高

```
tight: 1.25
snug: 1.375
normal: 1.5
relaxed: 1.625
loose: 2
```

### 动画系统

#### 时长

```
fast: 100ms
base: 150ms
slow: 300ms
slower: 500ms
```

#### 缓动函数

```
easeIn: cubic-bezier(0.4, 0, 1, 1)
easeOut: cubic-bezier(0, 0, 0.2, 1)
easeInOut: cubic-bezier(0.4, 0, 0.2, 1)
linear: linear
```

### 网格系统

```
Columns: 12
Gutter: 16px
Max Width: 1280px

Breakpoints:
sm: 640px
md: 768px
lg: 1024px
xl: 1280px
2xl: 1536px
```

### 图标系统

- 图标库：Lucide React
- 尺寸：16px, 20px, 24px, 32px
- 权重：regular (默认)
- 颜色：继承文字色

### 状态样式

#### 按钮状态

```
Default: bg-primary text-primary-foreground
Hover: bg-primary/90 shadow-md
Active: bg-primary/80 scale-0.97
Disabled: bg-muted text-muted-foreground cursor-not-allowed
Loading: opacity-0.6 pointer-events-none
```

#### 输入框状态

```
Default: bg-input border-border
Focus: border-ring ring-2 ring-ring/50
Error: border-error bg-error/10
Disabled: bg-muted text-muted-foreground
```

---

## 11. 页面优先级（Development Priority）

### P0（Protocol Core - MVP）

这些页面是 Protocol 的核心，必须在 V1 中完成。

- **Discover** - Protocol 入口，展示所有 Views
- **View Detail** - View 的核心页面，包含 Stake 功能
- **Stake Interface** - Stake 交互
- **Wallet Connection** - 钱包连接（占位符）
- **Search** - 搜索功能
- **Header & Navigation** - 顶部导航

### P1（Creator Economy）

这些页面支持 Creator Economy，应在 V1.1 中完成。

- **Creator Profile** - 创建者资料
- **Leaderboard** - 排行榜
- **User Profile** - 用户资料
- **Create View** - 发布观点

### P2（Social & Engagement）

这些页面增强用户参与度，可在 V2 中完成。

- **Notifications** - 通知系统
- **Discussion** - 讨论功能
- **Bookmarks** - 收藏功能
- **Following** - 关注功能

### P3（Analytics & Developer）

这些功能支持高级用户和开发者，可在 V2+ 中完成。

- **Analytics Dashboard** - 分析仪表板
- **API Documentation** - API 文档
- **Developer Tools** - 开发者工具
- **Governance** - 治理功能

---

## 12. Future Ecosystem（未来生态）

### 官方 Interface（当前）

这是 Pulse Protocol 的官方 Web Interface，用于发现、交易和管理 Views。

**职责**：

- 展示 Protocol 数据
- 提供 Stake 功能
- 支持 Creator Economy
- 连接钱包

---

### Mobile App（未来）

移动版本，支持 iOS 和 Android。

**特点**：

- 原生性能
- 推送通知
- 离线支持
- 生物识别认证

---

### Third-party Interface（未来）

任何人都可以开发自己的 Pulse Protocol Interface。

**例子**：

- 专业交易者界面
- 移动优先界面
- 极简界面
- 高级分析界面

**支持方式**：

- 开放 API
- SDK
- 完整文档
- 示例代码

---

### Analytics Platform（未来）

专门的分析平台，提供深度数据分析。

**功能**：

- 高级图表
- 数据导出
- 自定义指标
- 历史分析

---

### Developer SDK（未来）

为开发者提供 SDK，简化集成。

**支持语言**：

- TypeScript / JavaScript
- Python
- Go
- Rust

---

### API（未来）

完整的 REST 和 GraphQL API，支持所有 Protocol 操作。

**端点**：

- Views API
- Creators API
- Leaderboard API
- Activity API
- Protocol Stats API

---

### Widgets（未来）

可嵌入的 Widget，支持在其他网站上展示 Views。

**Widget 类型**：

- View Card Widget
- Price Ticker Widget
- Leaderboard Widget
- Activity Feed Widget

---

### Embeddable View Cards（未来）

允许在其他网站上嵌入 View Card。

**用途**：

- 新闻网站
- 博客
- 社交媒体
- 论坛

---

### Bot Integration（未来）

支持与 Discord、Telegram 等 Bot 集成。

**功能**：

- 价格提醒
- 活动通知
- 排行榜查询
- Stake 命令

---

### 生态愿景

```
Pulse Protocol
├── Official Web Interface (当前)
├── Mobile App (未来)
├── Third-party Interfaces (未来)
├── Analytics Platform (未来)
├── Developer SDK (未来)
├── API (未来)
├── Widgets (未来)
├── Embeddable Cards (未来)
└── Bot Integration (未来)
```

**核心原则**：

- 官方 Interface 是 Protocol 的入口
- 但不是唯一的入口
- 未来任何人都可以构建自己的 Interface
- 所有 Interface 共享同一个 Protocol

---

## 13. 后续可扩展模块

### Phase 1 (MVP)

- ✅ Discover Views
- ✅ View Detail
- ✅ Create View
- ✅ Creator Profile
- ✅ Leaderboard
- ✅ Basic Search

### Phase 2

- 🔄 Advanced Filtering
- 🔄 User Notifications
- 🔄 Favorites / Watchlist
- 🔄 Social Features (Follow, Comment)
- 🔄 Advanced Analytics

### Phase 3

- 🔮 Portfolio Management
- 🔮 Risk Analysis
- 🔮 Signal Aggregation
- 🔮 API for Third-party Frontends
- 🔮 Mobile App

### Phase 4+

- 🌐 Multi-chain Support
- 🌐 Cross-protocol Integration
- 🌐 Advanced Derivatives
- 🌐 DAO Governance

---

## 10. 设计原则总结

### Protocol First

- 前端是 Protocol 的 Interface，不是独立产品
- 所有业务逻辑来自 Protocol
- 前端只负责展示和交互

### 极简主义

- 避免营销文案
- 突出数据
- 大量留白
- 卡片式布局

### 开放生态

- 前端设计为第三方前端铺路
- 提供清晰的 API 接口
- 不锁定用户

### 用户至上

- 清晰的信息架构
- 直观的交互
- 快速的性能
- 响应式设计

---

## 11. 技术栈

- **框架**: Next.js + React 19
- **样式**: TailwindCSS 4 + shadcn/ui
- **动画**: Framer Motion
- **图表**: Recharts
- **图标**: Lucide React
- **状态管理**: React Context (最小化)
- **数据获取**: React Query / SWR
- **路由**: Wouter
- **类型**: TypeScript

---

## 12. 文件结构

```
client/src/
├── pages/
│   ├── discover.tsx
│   ├── view/[id].tsx
│   ├── create.tsx
│   ├── creator/[address].tsx
│   ├── leaderboard.tsx
│   ├── profile/
│   │   ├── index.tsx
│   │   ├── views.tsx
│   │   ├── activity.tsx
│   │   └── settings.tsx
│   └── search.tsx
├── components/
│   ├── layout/
│   │   ├── Header.tsx
│   │   ├── Sidebar.tsx
│   │   └── Footer.tsx
│   ├── sections/
│   │   ├── DiscoverSection.tsx
│   │   ├── ViewDetailSection.tsx
│   │   ├── CreateViewSection.tsx
│   │   └── ...
│   ├── cards/
│   │   ├── ViewCard.tsx
│   │   ├── CreatorCard.tsx
│   │   └── StatCard.tsx
│   ├── ui/
│   │   └── [shadcn components]
│   └── common/
│       ├── Header.tsx
│       ├── Footer.tsx
│       └── ...
├── hooks/
│   ├── useViews.ts
│   ├── useViewDetail.ts
│   ├── useCreator.ts
│   └── ...
├── lib/
│   ├── api/
│   │   ├── views.ts
│   │   ├── creators.ts
│   │   └── ...
│   ├── types/
│   │   ├── view.ts
│   │   ├── creator.ts
│   │   └── ...
│   └── utils/
│       ├── format.ts
│       ├── calculate.ts
│       └── ...
├── mock/
│   ├── views.ts
│   ├── creators.ts
│   └── ...
└── App.tsx
```

---

## 14. 总结

这份 Architecture Proposal 遵循 **Protocol First** 的设计原则，确保：

1. ✅ **前端是 Protocol 的 Interface**，而不是独立产品
2. ✅ **数据驱动**，而不是营销驱动
3. ✅ **开放生态**，为第三方前端铺路
4. ✅ **极简设计**，突出核心功能
5. ✅ **清晰的信息架构**，用户能快速找到所需信息
6. ✅ **可扩展**，为未来的功能预留空间

## 15. Protocol Status Layer

### 概述

Protocol Status Layer 是整个前端的统一信息入口。

所有页面都应该实时获取并显示 Protocol 的当前状态。

### 核心指标

| 指标              | 描述                                      | 数据来源 |
| ----------------- | ----------------------------------------- | -------- |
| Network           | 当前网络（Mainnet / Testnet）             | RPC      |
| Contract Version  | 主合约版本                                | RPC      |
| Factory Version   | Factory 合约版本                          | RPC      |
| Protocol Status   | 协议状态（Active / Paused / Maintenance） | RPC      |
| Treasury Status   | 金库余额                                  | RPC      |
| Fee Configuration | 手续费配置                                | RPC      |
| Current Epoch     | 当前 Epoch（预留）                        | RPC      |
| Oracle Status     | Oracle 状态（预留）                       | RPC      |
| Maintenance Mode  | 维护模式（预留）                          | RPC      |

### 数据流

```
Protocol Status Layer
│
├─ Network Status
│  ├─ Chain ID
│  ├─ RPC Health
│  └─ Gas Price
│
├─ Contract Status
│  ├─ Factory Address
│  ├─ Factory Version
│  ├─ Protocol Version
│  └─ Upgrade Status
│
├─ Protocol Configuration
│  ├─ Fee Configuration
│  ├─ Settlement Rules
│  ├─ Pool Parameters
│  └─ Limits
│
├─ Treasury Status
│  ├─ Total Treasury
│  ├─ Collected Fees
│  └─ Reserves
│
└─ System Status
   ├─ Maintenance Mode
   ├─ Emergency Status
   └─ Last Updated
```

### 应用场景

1. **Header 中沈默显示** - Network 和 Protocol Status
2. **Dashboard 中突出显示** - 完整的 Protocol Status
3. **错误处理** - 当 Protocol 处于 Maintenance 或 Emergency 状态时显示提示
4. **交易提示** - 根据 Protocol Status 提示是否可以交易

---

## 16. Universal Search Architecture

### 概述

Universal Search 是统一的搜索入口，支持多维度搜索。

### 搜索维度

| 维度           | 描述                   | 示例                |
| -------------- | ---------------------- | ------------------- |
| View           | 按 View 标题、描述搜索 | "Bitcoin $100k"     |
| Creator        | 按 Creator 名称搜索    | "Alice"             |
| Wallet Address | 按钱包地址搜索         | "0x1234..."         |
| ENS            | 按 ENS 名称搜索        | "vitalik.eth"       |
| Topic          | 按主题搜索             | "Crypto", "AI"      |
| Category       | 按分类搜索             | "Finance", "Tech"   |
| Tag            | 按标签搜索             | "#Bitcoin", "#DeFi" |
| Contract       | 按合约地址搜索         | "0x..."             |

### 搜索建议（Search Suggestions）

```
Search Input: "bit"
│
├─ Views
│  ├─ "Bitcoin will reach $100k"
│  └─ "Bitcoin dominance > 50%"
│
├─ Creators
│  └─ "BitcoinMaximalist"
│
├─ Topics
│  ├─ "#Bitcoin"
│  └─ "#Bitwise"
│
└─ Recent Searches
   └─ "Bitcoin"
```

### 搜索结果页

```
Search Results: "bitcoin"
│
├─ Views (12)
│  ├─ View Card 1
│  ├─ View Card 2
│  └─ View Card 3
│
├─ Creators (3)
│  ├─ Creator Card 1
│  └─ Creator Card 2
│
├─ Topics (5)
│  ├─ "#Bitcoin"
│  └─ "#BitcoinPrice"
│
└─ Addresses (2)
   ├─ "0x1234..."
   └─ "0x5678..."
```

### 实现特点

1. **实时建议** - 用户输入时实时显示建议
2. **搜索历史** - 保存最近的 10 条搜索
3. **滚动加载** - 搜索结果支持无限滚动
4. **筛选** - 支持按维度筛选结果
5. **性能** - 搜索应在 200ms 内完成

---

## 17. Global Filter System

### 概述

所有页面共享同一套 Filter 系统，确保一致的用户体验。

### 统一 Filter 选项

| Filter           | 描述              | 应用页面              |
| ---------------- | ----------------- | --------------------- |
| Trending         | 按热度排序        | Discover, Leaderboard |
| Newest           | 按创建时间排序    | Discover              |
| Highest TVL      | 按 TVL 排序       | Discover, Leaderboard |
| Highest Volume   | 按成交量排序      | Discover, Leaderboard |
| Highest Activity | 按活跃度排序      | Discover              |
| Most Staked      | 按 Stake 金额排序 | Discover              |
| Category         | 按分类筛选        | Discover, Creator     |
| Creator          | 按创建者筛选      | Discover              |
| Language         | 按语言筛选        | Discover              |
| Tag              | 按标签筛选        | Discover              |

### Filter 状态管理

```
Global Filter State
│
├─ Sort: 'trending' | 'newest' | 'tvl' | 'volume' | 'activity' | 'staked'
├─ Category: string[]
├─ Creator: string[]
├─ Language: string[]
├─ Tag: string[]
├─ DateRange: { start, end }
├─ PriceRange: { min, max }
└─ VolumeRange: { min, max }
```

### Filter 持久化

- Filter 状态保存到 URL Query Parameters
- 支持分享带有 Filter 的链接
- 用户返回时恢复之前的 Filter 状态

---

## 18. URL Architecture（Routing Design）

### 概述

完整的 URL 结构设计，作为永久 Routing 规范。

### 路由表

| 路由                    | 描述               | 参数                             |
| ----------------------- | ------------------ | -------------------------------- |
| `/`                     | 首页（Discover）   | -                                |
| `/discover`             | 发现页面           | `?sort=trending&category=...`    |
| `/view/:id`             | View 详情页        | `id`: View ID                    |
| `/creator/:address`     | Creator 资料页     | `address`: Creator 地址          |
| `/leaderboard`          | 排行榜             | `?type=creators\|views\|traders` |
| `/leaderboard/creators` | Creator 排行榜     | -                                |
| `/leaderboard/views`    | View 排行榜        | -                                |
| `/leaderboard/traders`  | Trader 排行榜      | -                                |
| `/create`               | 创建 View          | -                                |
| `/profile`              | 用户资料           | -                                |
| `/profile/views`        | 我的 Views         | -                                |
| `/profile/activity`     | 我的活动           | -                                |
| `/profile/settings`     | 设置               | -                                |
| `/search`               | 搜索结果           | `?q=...&type=...`                |
| `/analytics`            | 分析仪表板（预留） | -                                |
| `/settings`             | 全局设置           | -                                |
| `/notifications`        | 通知（预留）       | -                                |
| `/docs`                 | 文档（预留）       | -                                |
| `/api`                  | API 文档（预留）   | -                                |

### Query Parameters 规范

```
/discover?sort=trending&category=crypto&language=en&page=1&limit=20

参数说明：
- sort: 排序方式
- category: 分类（支持多个，用逗号分隔）
- language: 语言
- page: 页码
- limit: 每页数量
- search: 搜索关键词
```

### 路由守卫

- `/profile/*` - 需要钱包连接
- `/create` - 需要钱包连接
- `/settings` - 需要钱包连接
- 其他页面 - 公开访问

---

## 19. Data Source Architecture

### 概述

明确每一类数据的来源，便于未来更换数据源而无需重构页面。

### 数据来源分类

| 来源            | 描述             | 用途               |
| --------------- | ---------------- | ------------------ |
| RPC             | 直接 RPC 调用    | 链上数据、合约状态 |
| Indexer         | 链上数据索引服务 | 历史数据、聚合数据 |
| Subgraph        | The Graph 子图   | 复杂查询、关系数据 |
| Wallet          | 钱包 Provider    | 用户余额、持仓     |
| Cache           | 本地缓存         | 性能优化           |
| Realtime Events | WebSocket 事件   | 实时更新           |
| Local Storage   | 浏览器本地存储   | 用户偏好、历史记录 |

### 数据类型与来源映射

| 数据类型       | 主要来源 | 备选来源 | 更新频率 |
| -------------- | -------- | -------- | -------- |
| Price          | Indexer  | Subgraph | 实时     |
| TVL            | Indexer  | Subgraph | 1 分钟   |
| Liquidity      | RPC      | Indexer  | 实时     |
| Volume         | Indexer  | Subgraph | 1 分钟   |
| Activity       | Subgraph | Indexer  | 实时     |
| Transactions   | Indexer  | RPC      | 实时     |
| User Balance   | Wallet   | RPC      | 实时     |
| User Portfolio | Wallet   | Subgraph | 实时     |
| Creator Stats  | Subgraph | Indexer  | 5 分钟   |
| Leaderboard    | Indexer  | Subgraph | 5 分钟   |

### 缓存策略

```
Data Caching Strategy
│
├─ Real-time Data (0-5s)
│  ├─ Price
│  ├─ Liquidity
│  └─ User Balance
│
├─ Short-term Cache (1-5 min)
│  ├─ TVL
│  ├─ Volume
│  └─ Activity
│
├─ Medium-term Cache (5-30 min)
│  ├─ Creator Stats
│  ├─ Leaderboard
│  └─ View Metadata
│
└─ Long-term Cache (1+ hour)
   ├─ Categories
   ├─ Tags
   └─ Static Content
```

### 数据一致性

- 使用 Timestamp 标记数据时间
- 支持数据过期提示
- 提供手动刷新选项
- 异常时显示错误状态

---

## 20. Wallet Architecture

### 概述

完整的钱包集成架构，统一定义所有交易流程。

### 钱包连接流程

```
Wallet Connection Flow
│
├─ 1. 检测钱包
│  └─ MetaMask / WalletConnect / Coinbase Wallet
│
├─ 2. 连接钱包
│  ├─ 请求权限
│  ├─ 获取地址
│  └─ 获取余额
│
├─ 3. 验证网络
│  ├─ 检查 Chain ID
│  └─ 提示切换网络（如需要）
│
└─ 4. 建立会话
   ├─ 保存连接状态
   └─ 监听账户变化
```

### 支持的钱包

- MetaMask
- WalletConnect
- Coinbase Wallet
- Trust Wallet
- Ledger Live
- Trezor Connect（预留）

### 网络切换

```
Network Switching
│
├─ 检测当前网络
├─ 如果网络不匹配
│  ├─ 显示提示
│  └─ 提供切换按钮
└─ 用户确认后
   └─ 调用 wallet_switchEthereumChain
```

### Gas 估算

```
Gas Estimation Flow
│
├─ 1. 用户输入参数
├─ 2. 调用 eth_estimateGas
├─ 3. 获取当前 Gas Price
├─ 4. 计算总费用
└─ 5. 显示费用预览
```

### Approval Flow

```
Approval Flow (ERC20)
│
├─ 1. 检查当前 Allowance
├─ 2. 如果不足
│  ├─ 显示 Approve 按钮
│  ├─ 用户签署 Approve 交易
│  └─ 等待确认
├─ 3. Allowance 充足
│  └─ 继续主交易
└─ 4. 显示交易状态
```

### 交易队列

```
Transaction Queue
│
├─ Pending Transactions
│  ├─ 显示待确认交易
│  ├─ 显示 Gas 费用
│  └─ 支持加速 / 取消
│
├─ Confirmed Transactions
│  ├─ 显示已确认交易
│  └─ 提供 Etherscan 链接
│
└─ Failed Transactions
   ├─ 显示失败原因
   └─ 支持重试
```

### 交易历史

- 保存所有交易记录
- 支持按类型筛选（Stake / Unstake / Claim）
- 支持按日期筛选
- 提供导出功能

---

## 21. Loading / Empty / Error States

### 概述

统一定义所有页面的状态表现，提供一致的用户体验。

### Loading 状态

#### Skeleton Loading

```
┌─────────────────────────┐
│ ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓ │ (Skeleton)
│ ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓ │
│ ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓ │
└─────────────────────────┘
```

- 使用 Skeleton 而不是 Spinner
- 显示内容的大致形状
- 动画缓慢（300-500ms）

#### Loading Spinner

- 用于全屏加载
- 显示加载提示文本
- 支持取消操作

### Empty 状态

```
┌─────────────────────────┐
│                         │
│      📭 No Views        │
│                         │
│  Try adjusting your     │
│  filters or search      │
│                         │
│   [Clear Filters]       │
│                         │
└─────────────────────────┘
```

- 显示相关图标
- 提供友好的提示文本
- 提供建议操作（如清除筛选）

### Error 状态

#### 网络错误

```
┌─────────────────────────┐
│      ⚠️ Network Error    │
│                         │
│  Failed to load data    │
│  Please check your      │
│  connection             │
│                         │
│   [Retry]  [Go Back]    │
└─────────────────────────┘
```

#### RPC 错误

```
┌─────────────────────────┐
│    ❌ RPC Error         │
│                         │
│  Unable to connect to   │
│  the blockchain         │
│                         │
│   [Retry]  [Settings]   │
└─────────────────────────┘
```

#### 钱包未连接

```
┌─────────────────────────┐
│   🔗 Wallet Required    │
│                         │
│  Please connect your    │
│  wallet to continue     │
│                         │
│  [Connect Wallet]       │
└─────────────────────────┘
```

#### 交易失败

```
┌─────────────────────────┐
│   ❌ Transaction Failed  │
│                         │
│  Error: Insufficient    │
│  balance                │
│                         │
│  [Retry]  [Details]     │
└─────────────────────────┘
```

### 交易状态

#### Pending

```
⏳ Transaction Pending
Waiting for confirmation...
[View on Etherscan]
```

#### Success

```
✅ Transaction Successful
Your stake has been recorded.
[View on Etherscan]
```

#### Failed

```
❌ Transaction Failed
Error: Reverted
[View on Etherscan] [Retry]
```

---

## 22. Responsive Strategy

### 概述

明确定义不同设备上的响应式设计策略。

### 断点定义

| 设备    | 宽度           | 特点                   |
| ------- | -------------- | ---------------------- |
| Mobile  | < 640px        | 单列布局、Drawer 导航  |
| Tablet  | 640px - 1024px | 两列布局、可折叠侧边栏 |
| Desktop | > 1024px       | 三列布局、固定侧边栏   |

### 组件响应式变化

#### Header

**Desktop**

```
┌─────────────────────────────────────┐
│ Logo  Nav1  Nav2  Nav3  [Wallet]    │
└─────────────────────────────────────┘
```

**Tablet**

```
┌──────────────────────────────┐
│ Logo  Nav1  Nav2  [Menu]     │
└──────────────────────────────┘
```

**Mobile**

```
┌─────────────────────┐
│ Logo          [Menu]│
└─────────────────────┘
```

#### Sidebar

**Desktop** - 固定左侧边栏
**Tablet** - 可折叠侧边栏
**Mobile** - Drawer（从左侧滑出）

#### Chart

**Desktop** - 完整图表，支持多个时间框架
**Tablet** - 简化图表，隐藏部分指标
**Mobile** - 迷你图表，仅显示价格线

#### Stake Panel

**Desktop** - 侧边栏面板
**Tablet** - 侧边栏面板（可折叠）
**Mobile** - 底部 Sheet / Modal

#### Cards

**Desktop** - 3 列网格
**Tablet** - 2 列网格
**Mobile** - 1 列网格

#### Navigation

**Desktop** - 顶部导航栏 + 侧边栏
**Tablet** - 顶部导航栏 + 可折叠侧边栏
**Mobile** - 底部标签栏 + 顶部导航栏

### 性能优化

- 移动设备上禁用复杂动画
- 图表使用响应式库（Recharts）
- 支持触摸手势（滑动、长按）
- 优化字体大小和间距

---

## 23. Permission Matrix（角色权限）

### 概述

定义不同用户角色的权限矩阵。

### 角色定义

| 角色           | 描述               | 权限                              |
| -------------- | ------------------ | --------------------------------- |
| Visitor        | 未连接钱包的访客   | 查看、搜索                        |
| Wallet User    | 已连接钱包的用户   | 查看、搜索、Stake、查看资料       |
| Creator        | 创建过 View 的用户 | 所有 Wallet User 权限 + 创建 View |
| Moderator      | 内容审核员（预留） | 所有权限 + 审核内容               |
| Protocol Admin | 协议管理员（预留） | 所有权限 + 管理协议               |
| Governance     | 治理参与者（预留） | 所有权限 + 投票                   |

### 权限矩阵

| 功能              | Visitor | Wallet User | Creator | Moderator | Admin | Governance |
| ----------------- | ------- | ----------- | ------- | --------- | ----- | ---------- |
| 查看 Views        | ✅      | ✅          | ✅      | ✅        | ✅    | ✅         |
| 搜索              | ✅      | ✅          | ✅      | ✅        | ✅    | ✅         |
| 查看 Creator 资料 | ✅      | ✅          | ✅      | ✅        | ✅    | ✅         |
| Stake             | ❌      | ✅          | ✅      | ✅        | ✅    | ✅         |
| 创建 View         | ❌      | ❌          | ✅      | ✅        | ✅    | ✅         |
| 编辑 View         | ❌      | ❌          | ✅      | ✅        | ✅    | ✅         |
| 删除 View         | ❌      | ❌          | ✅      | ✅        | ✅    | ✅         |
| 查看用户资料      | ❌      | ✅          | ✅      | ✅        | ✅    | ✅         |
| 审核内容          | ❌      | ❌          | ❌      | ✅        | ✅    | ❌         |
| 管理协议          | ❌      | ❌          | ❌      | ❌        | ✅    | ❌         |
| 投票治理          | ❌      | ❌          | ❌      | ❌        | ❌    | ✅         |

### 权限检查

```typescript
// 示例：检查用户是否可以创建 View
const canCreateView = (userRole: Role) => {
  return ["creator", "moderator", "admin", "governance"].includes(userRole);
};
```

---

## 24. Future Protocol Modules（预留模块）

### 概述

预留未来可能的 Protocol 模块和功能。

### 预留模块

| 模块                  | 描述             | 预计时间 | 状态        |
| --------------------- | ---------------- | -------- | ----------- |
| Governance            | 治理投票         | V2       | 🔮 Reserved |
| Reputation            | 信誉系统         | V2       | 🔮 Reserved |
| Achievements          | 成就系统         | V2       | 🔮 Reserved |
| Referral              | 邀请返利         | V2       | 🔮 Reserved |
| Developer SDK         | 开发者 SDK       | V2       | 🔮 Reserved |
| Public API            | 公开 API         | V2       | 🔮 Reserved |
| Widget                | 可嵌入 Widget    | V2       | 🔮 Reserved |
| Embeddable View       | 可嵌入 View Card | V2       | 🔮 Reserved |
| Bot Integration       | Bot 集成         | V2       | 🔮 Reserved |
| Analytics Platform    | 分析平台         | V2       | 🔮 Reserved |
| Mobile App            | 移动应用         | V2+      | 🔮 Reserved |
| Third-party Interface | 第三方前端       | V2+      | 🔮 Reserved |

### 预留接口

所有预留模块都应该预留相应的：

- **API 端点** - 在 Backend 中预留
- **数据结构** - 在 Database Schema 中预留
- **UI 占位符** - 在 Frontend 中预留（可选）
- **文档** - 在 API 文档中预留

---

## 25. Component Naming Convention（组件命名规范）

### 概述

坚持 Protocol First 的命名原则，避免业务化命名。

### 命名原则

✅ **使用 Protocol 术语**

- ViewCard
- PoolCard
- StakePanel
- CreatorCard
- ProtocolMetrics
- AssetCard
- LiquidityCard

❌ **避免业务化术语**

- PredictionCard
- MarketPanel
- PredictionInfo
- BetCard
- GamblingPanel

### 命名规范

#### 数据展示组件

```
[Entity]Card / [Entity]Item / [Entity]Row

示例：
- ViewCard
- CreatorCard
- PoolCard
- ActivityItem
- LeaderboardRow
```

#### 交互组件

```
[Action]Panel / [Action]Dialog / [Action]Modal

示例：
- StakePanel
- CreateDialog
- SettingsModal
```

#### 数据组件

```
[Entity]Metrics / [Entity]Stats / [Entity]Info

示例：
- ProtocolMetrics
- ViewStats
- CreatorInfo
```

#### 布局组件

```
[Layout]Layout / [Section]Section

示例：
- MainLayout
- HeroSection
- DashboardLayout
```

#### 状态组件

```
[State]State / [State]Placeholder

示例：
- LoadingState
- EmptyState
- ErrorState
```

### 文件命名

```
components/
├── cards/
│   ├── ViewCard.tsx
│   ├── CreatorCard.tsx
│   └── PoolCard.tsx
├── panels/
│   ├── StakePanel.tsx
│   └── SettingsPanel.tsx
├── sections/
│   ├── HeroSection.tsx
│   └── ProtocolStatsSection.tsx
├── layout/
│   ├── MainLayout.tsx
│   └── DashboardLayout.tsx
└── states/
    ├── LoadingState.tsx
    ├── EmptyState.tsx
    └── ErrorState.tsx
```

---

## 26. Architecture Freeze Checklist

### 概述

确认所有架构组件已完成，准备冻结 Architecture Proposal V1.2。

### 检查清单

- ✅ **Information Architecture** - 信息架构和优先级已定义
- ✅ **Routing** - 完整的 URL 结构已定义
- ✅ **Component Library** - 30+ 组件已列出
- ✅ **Design Tokens** - 完整的设计系统已定义
- ✅ **Wallet Architecture** - 钱包集成流程已定义
- ✅ **Data Architecture** - 数据来源和缓存策略已定义
- ✅ **Responsive Strategy** - 三种设备的响应式策略已定义
- ✅ **State Management** - 状态管理原则已定义
- ✅ **Future Extension** - 预留模块和接口已定义
- ✅ **Protocol Status Layer** - 协议状态层已定义
- ✅ **Universal Search** - 统一搜索架构已定义
- ✅ **Global Filter System** - 全局筛选系统已定义
- ✅ **Loading/Empty/Error States** - 完整的状态表现已定义
- ✅ **Permission Matrix** - 角色权限矩阵已定义
- ✅ **Component Naming Convention** - 组件命名规范已定义

### 架构冻结确认

**Architecture Proposal V1.2 — Frozen ✅**

从此之后，不再进行架构层调整。

所有后续工作进入 **UI 实现与代码开发阶段**。

---

## 27. 下一步

1. ✅ Architecture Proposal V1.2 已冻结
2. 📝 开始 UI 重构
3. 📝 开始前端代码开发
4. 📝 集成 Protocol 数据
5. 📝 测试和优化
