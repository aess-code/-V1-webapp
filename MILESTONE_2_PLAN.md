# Milestone 2: UI Component Library - 实现计划

**Status**: In Progress
**Date**: 2026-07-24
**Target**: 构建完整的 UI 组件库

---

## 工作内容

### 第 1 层：基础 UI 组件（Week 1）

这些组件已由 shadcn/ui 提供，需要验证和集成：

- ✅ Button
- ✅ Input
- ✅ Card
- ✅ Badge
- ✅ Avatar
- ✅ Spinner
- ✅ Skeleton
- ✅ Modal / Dialog
- ✅ Toast / Sonner
- ✅ Tooltip

**工作**：

1. 验证所有基础组件可用
2. 创建统一的导出文件 `components/index.ts`
3. 编写基础组件的使用文档

### 第 2 层：通用业务组件（Week 1-2）

需要新建的通用组件：

#### Cards 组件

```typescript
// components/cards/ViewCard.tsx
- 显示 View 基本信息
- 支持响应式
- 支持点击事件

// components/cards/CreatorCard.tsx
- 显示 Creator 信息
- 支持头像、名称、统计数据

// components/cards/PoolCard.tsx
- 显示 Pool 信息
- 显示 Long/Short 价格

// components/cards/MetricCard.tsx
- 显示单个指标
- 支持标题、数值、变化趋势

// components/cards/StatCard.tsx
- 显示统计数据
- 支持图标、标题、数值
```

#### States 组件

```typescript
// components/states/LoadingState.tsx
- Skeleton Loading
- Loading Spinner

// components/states/EmptyState.tsx
- 空状态提示
- 支持图标和建议操作

// components/states/ErrorState.tsx
- 错误状态提示
- 支持错误信息和重试按钮
```

#### Common 组件

```typescript
// components/common/PriceDisplay.tsx
- 显示价格
- 支持 Long/Short 颜色区分

// components/common/VolumeDisplay.tsx
- 显示成交量
- 支持格式化

// components/common/ActivityItem.tsx
- 显示单条活动记录
- 支持不同类型的活动

// components/common/LeaderboardRow.tsx
- 排行榜行组件
- 支持排名、名称、数据
```

### 第 3 层：业务组件（Week 2）

需要新建的业务组件：

```typescript
// components/panels/StakePanel.tsx
- Long/Short 选择
- 金额输入
- 确认按钮

// components/panels/FilterPanel.tsx
- 筛选选项
- 排序选项

// components/panels/SearchBar.tsx
- 搜索输入框
- 搜索建议

// components/sections/ProtocolStatsSection.tsx
- 协议统计数据展示
- 多个指标卡片

// components/sections/TrendingViewsSection.tsx
- 热门 Views 列表
- 可滚动
```

---

## 实现顺序

### Phase 1: 基础组件验证和导出（Day 1）

1. 验证 shadcn/ui 组件可用
2. 创建 `components/index.ts` 统一导出
3. 创建组件使用指南

### Phase 2: 状态组件（Day 2-3）

1. 实现 LoadingState
2. 实现 EmptyState
3. 实现 ErrorState
4. 编写单元测试

### Phase 3: 卡片组件（Day 4-5）

1. 实现 ViewCard
2. 实现 CreatorCard
3. 实现 PoolCard
4. 实现 MetricCard
5. 编写单元测试

### Phase 4: 通用组件（Day 6-7）

1. 实现 PriceDisplay
2. 实现 VolumeDisplay
3. 实现 ActivityItem
4. 实现 LeaderboardRow
5. 编写单元测试

### Phase 5: 业务组件（Day 8-10）

1. 实现 StakePanel
2. 实现 FilterPanel
3. 实现 SearchBar
4. 实现 ProtocolStatsSection
5. 实现 TrendingViewsSection
6. 编写单元测试

---

## 完成标准

- [ ] 所有组件有 TypeScript 类型
- [ ] 所有组件支持响应式设计
- [ ] 所有组件有完整的 JSDoc 文档
- [ ] 单元测试覆盖率 > 80%
- [ ] 没有 TypeScript 错误
- [ ] 没有 ESLint 错误
- [ ] Prettier 格式统一
- [ ] 所有组件可以正确导入和使用

---

## 验收标准

- ✅ 所有组件可以在 Storybook 中查看
- ✅ 所有组件可以正确渲染
- ✅ 所有组件支持各种响应式断点
- ✅ 所有组件有完整的文档

---

## 下一步

完成 Milestone 2 后，进入 Milestone 3：Layout & Navigation
