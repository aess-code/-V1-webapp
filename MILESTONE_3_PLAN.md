# Milestone 3: Layout & Navigation - 开发计划

**Status**: 🔄 IN PROGRESS
**Start Date**: 2026-07-25
**Target Completion**: 2026-08-01

---

## 📋 工作内容

### 1. 页面布局系统

#### 1.1 主布局组件 (MainLayout)

- 固定 Header
- 可选 Sidebar（用于未来的管理面板）
- Main Content 区域
- Footer

#### 1.2 响应式设计

- Desktop (1024px+)
- Tablet (768px - 1023px)
- Mobile (< 768px)

#### 1.3 布局变体

- `FullLayout` - 全屏布局（Hero、登陆页）
- `MainLayout` - 标准布局（大多数页面）
- `DetailLayout` - 详情页布局（View Detail、Creator Profile）
- `AdminLayout` - 管理面板布局（预留）

### 2. 导航系统

#### 2.1 主导航 (Header Navigation)

- Logo + Brand Name
- 主菜单项：Discover、Leaderboard、Creator、Profile
- 钱包连接按钮（占位符）
- 移动端汉堡菜单

#### 2.2 次级导航 (Breadcrumb)

- 显示当前页面位置
- 支持返回上一级

#### 2.3 移动端导航

- 底部标签栏（Tab Bar）
- 或侧边抽屉菜单（Drawer）

### 3. 路由系统

#### 3.1 路由配置

```
/                    → Discover (首页)
/view/:id            → View Detail
/create              → Create View
/creator/:address    → Creator Profile
/leaderboard         → Leaderboard
/profile             → User Profile
/search              → Search Results
/404                 → Not Found
```

#### 3.2 路由守卫

- 需要钱包连接的路由：/create、/profile、/stake
- 公开路由：/、/view/:id、/creator/:address、/leaderboard

### 4. 状态管理

#### 4.1 全局状态 (Zustand)

- 用户钱包连接状态
- 用户资料信息
- 应用主题（深色/浅色）
- 导航状态

#### 4.2 本地状态 (React useState)

- 表单输入
- 模态框打开/关闭
- 加载状态

#### 4.3 服务器状态 (TanStack Query - 预留)

- Protocol 数据
- 用户数据
- 市场数据

### 5. 页面模板

#### 5.1 Discover 页面模板

```
Header
├─ Logo + Navigation
└─ Wallet Connect Button

Main Content
├─ Protocol Stats Section
├─ Search Bar + Filters
├─ Trending Views Section
├─ Featured Views Section
└─ Categories Section

Footer
```

#### 5.2 View Detail 页面模板

```
Header
├─ Logo + Navigation
└─ Wallet Connect Button

Breadcrumb
└─ Discover > View Title

Main Content
├─ View + Price + Stake (第一屏)
├─ Chart + Volume + Protocol Metrics (第二屏)
├─ Activity Feed (第三屏)
├─ Description (第四屏)
└─ Discussion (第五屏 - 预留)

Footer
```

#### 5.3 Creator Profile 页面模板

```
Header
├─ Logo + Navigation
└─ Wallet Connect Button

Creator Header
├─ Avatar
├─ Name + Bio
├─ Stats (Views, Volume, Followers)
└─ Follow Button

Tabs
├─ Views
├─ Activity
└─ Statistics

Footer
```

---

## 🎯 完成标准

### 代码质量

- ✅ TypeScript 类型检查通过
- ✅ ESLint 检查无错误
- ✅ Prettier 格式统一
- ✅ 没有重复代码
- ✅ 所有组件有 JSDoc 文档

### 功能完整

- ✅ 所有路由可访问
- ✅ 导航可正常切换
- ✅ 响应式设计正常工作
- ✅ 移动端菜单正常工作
- ✅ 所有页面模板已创建

### 性能指标

- ✅ 构建成功
- ✅ 没有控制台错误
- ✅ 没有性能警告

### 文档完整

- ✅ 路由文档
- ✅ 布局文档
- ✅ 导航文档
- ✅ 状态管理文档

---

## 📝 验收标准

### 功能验收

- [ ] 所有路由都能正常访问
- [ ] 导航切换流畅
- [ ] 响应式设计在所有断点都正常
- [ ] 移动端菜单可用
- [ ] 所有页面模板都已实现

### 质量验收

- [ ] TypeScript 检查通过
- [ ] ESLint 检查通过
- [ ] Prettier 格式统一
- [ ] 构建成功
- [ ] 没有控制台错误

### 文档验收

- [ ] README 已更新
- [ ] 路由文档已完成
- [ ] 布局文档已完成
- [ ] 导航文档已完成

---

## 🔄 开发步骤

### Step 1: 布局系统（1 天）

1. 创建 `FullLayout` 组件
2. 创建 `MainLayout` 组件
3. 创建 `DetailLayout` 组件
4. 测试响应式设计

### Step 2: 导航系统（1 天）

1. 更新 `Header` 组件
2. 创建 `Breadcrumb` 组件
3. 创建 `MobileNav` 组件
4. 测试导航切换

### Step 3: 路由系统（1 天）

1. 配置 Wouter 路由
2. 创建路由守卫
3. 创建 NotFound 页面
4. 测试所有路由

### Step 4: 页面模板（2 天）

1. 创建 Discover 页面模板
2. 创建 View Detail 页面模板
3. 创建 Creator Profile 页面模板
4. 创建其他页面模板

### Step 5: 状态管理（1 天）

1. 创建 Zustand store
2. 实现全局状态
3. 集成到页面中
4. 测试状态管理

### Step 6: 测试与优化（1 天）

1. 响应式测试
2. 导航测试
3. 性能测试
4. 代码审查

---

## 📊 预期成果

### 新增文件

- `client/src/layouts/FullLayout.tsx`
- `client/src/layouts/MainLayout.tsx`
- `client/src/layouts/DetailLayout.tsx`
- `client/src/components/Breadcrumb.tsx`
- `client/src/components/MobileNav.tsx`
- `client/src/stores/appStore.ts`
- `client/src/pages/Discover.tsx`
- `client/src/pages/ViewDetail.tsx`
- `client/src/pages/CreatorProfile.tsx`
- `client/src/pages/Leaderboard.tsx`
- `client/src/pages/Profile.tsx`
- `client/src/pages/Search.tsx`
- `MILESTONE_3_REVIEW.md`

### 代码行数

- 预期新增：~3000-4000 行代码

### 组件数量

- 新增布局组件：3 个
- 新增页面组件：6 个
- 新增导航组件：2 个

---

## 🚀 下一步

完成 Milestone 3 后，进入 **Milestone 4: Discover Page**

- 实现完整的 Discover 页面功能
- 添加搜索和筛选
- 集成 Mock 数据
- 实现页面交互

---

**Milestone 3 Status**: 🔄 IN PROGRESS
**Next Review**: 2026-08-01
