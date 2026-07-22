# Pulse Protocol V1 前端设计方案

## 项目定位

**Pulse Protocol** 是一个大型 Web3 协议，不是预测市场网站。官网需要传达协议级的专业感和科技感，类似 Uniswap、Aave、Pendle 等顶级协议。

## 品牌标识

- **Protocol 名称**：Pulse Protocol
- **App 名称**：Viewstake
- **品牌 Slogan**：VIEW. ANALYZE. STAKE. BELIEVE.
- **品牌 Logo**：Pulse（极简图形符号）

## 选定设计方向

### 设计理念：Minimalist Protocol Aesthetic

**设计运动**：现代 Web3 协议设计 + 极简主义 + 科技未来感

**核心原则**：
1. **大面积留白** - 呼吸空间，不拥挤
2. **动态渐变背景** - 紫蓝色系渐变，传达未来感
3. **微弱粒子动画** - 细微的科技感，不喧宾夺主
4. **玻璃态效果** - Glassmorphism，现代 Web3 标志

**色彩哲学**：
- **主背景**：深黑色 (`oklch(0.141 0.005 285.823)`)
- **主色调**：紫蓝渐变 (Purple → Blue)
- **强调色**：霓虹紫 (`#A78BFA`)、霓虹蓝 (`#60A5FA`)
- **文字**：白色/浅灰
- **玻璃效果**：白色 10-20% 透明度 + 毛玻璃

**布局范式**：
- Hero 采用中心对齐 + 大面积留白
- Section 采用非对称布局，避免呆板的网格
- 卡片采用玻璃态设计，背景透明度 + 毛玻璃模糊

**标志性元素**：
1. **渐变背景** - 紫蓝色动态渐变，微弱粒子动画
2. **玻璃态卡片** - 所有卡片采用 Glassmorphism
3. **紫蓝强调色** - 按钮、链接、强调文本

**交互哲学**：
- 所有交互都应该有反馈
- 按钮 Hover 时亮度增加，有微弱的缩放动画
- 卡片 Hover 时有浮起效果和背景亮度变化

**动画指南**：
- Hero 加载时：文字从下往上淡入 (300ms)
- Section 进入时：从底部向上滑入 (400ms)
- 卡片 Hover：缩放 1.02 + 背景亮度增加 (200ms ease-out)
- 按钮点击：缩放 0.97 (100ms)

**字体系统**：
- **Display**：Inter Bold (700) - 标题、Hero 文本
- **Body**：Inter Regular (400) - 正文
- **Accent**：Inter SemiBold (600) - 强调、卡片标题

**品牌本质**：
- **定位**：大型 Web3 协议，为专业交易者和开发者服务
- **人格**：专业、前沿、可信赖

**品牌声音**：
- 标题：简洁有力，传达协议级的权威感
- CTA：清晰直接，"Enter App"、"Explore Protocol"
- 示例：
  - ✅ "VIEW. ANALYZE. STAKE. BELIEVE." - 强有力，有节奏
  - ✅ "Permissionless. Fully On-chain. Anyone Can Create." - 简洁有力

**Logo 设计**：
- 极简图形符号（无文字）
- 透明背景 PNG
- 脉冲波纹设计，象征 Pulse 的核心概念
- 颜色：紫蓝渐变或纯白

## 技术栈

- **框架**：Next.js + React 19
- **样式**：TailwindCSS 4 + shadcn/ui
- **动画**：Framer Motion
- **图标**：Lucide React
- **响应式**：Mobile-first 设计
- **主题**：Dark Mode Only

## 项目结构

```
client/src/
├── pages/
│   ├── Home.tsx                 # 官网首页
│   ├── app/
│   │   ├── index.tsx           # DApp 首页
│   │   ├── explore.tsx         # 浏览页面
│   │   ├── view-detail.tsx     # 查看详情
│   │   ├── create-view.tsx     # 创建 View
│   │   ├── portfolio.tsx       # 投资组合
│   │   ├── profile.tsx         # 个人资料
│   │   ├── leaderboard.tsx     # 排行榜
│   │   └── settings.tsx        # 设置
│   └── NotFound.tsx
├── components/
│   ├── layout/
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   └── Sidebar.tsx
│   ├── sections/
│   │   ├── Hero.tsx
│   │   ├── ProtocolOverview.tsx
│   │   ├── WhyPulse.tsx
│   │   ├── ProtocolArchitecture.tsx
│   │   ├── Developers.tsx
│   │   ├── Roadmap.tsx
│   │   └── CTA.tsx
│   ├── dapp/
│   │   ├── MarketCard.tsx
│   │   ├── ViewCard.tsx
│   │   ├── CreateWizard.tsx
│   │   ├── Chart.tsx
│   │   ├── LeaderboardTable.tsx
│   │   ├── SearchBar.tsx
│   │   └── WalletButton.tsx
│   └── ui/
│       └── [shadcn components]
├── hooks/
│   ├── useScrollAnimation.ts
│   └── useMockData.ts
├── lib/
│   ├── services/              # 预留协议接口
│   ├── contracts/             # 预留 ABI 位置
│   └── config/
├── mock/
│   ├── views.ts
│   ├── leaderboard.ts
│   ├── portfolio.ts
│   ├── profile.ts
│   └── categories.ts
└── App.tsx
```

## 数据管理

所有数据使用 Mock Data，统一在 `mock/` 目录管理。未来仅需替换数据源即可。

## 禁止事项

- ❌ 不复制旧版 Viewstake 代码
- ❌ 不引用任何旧协议
- ❌ 不连接真实合约
- ❌ 不连接钱包
- ❌ 不连接 RPC
- ❌ 不连接数据库

## 最终目标

1. 打开首页 → 用户感觉"这是一个大型 Web3 Protocol"
2. 点击 "Enter App" → 进入专业 DApp
3. 整个项目达到生产级质量
4. 未来仅需：放入 ABI → 填写合约地址 → 替换 Mock Data → 直接接入 Pulse Protocol V1
