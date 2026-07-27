# Pulse Protocol V1 - Frontend

Official web interface for the Pulse Protocol - an open Opinion Market Protocol.

**Slogan**: VIEW. ANALYZE. STAKE. BELIEVE.

---

## 📋 Project Status

### Current Version: v0.1.0-component-library

**Milestone 2: UI Component Library** ✅ COMPLETED

This release focuses on building a comprehensive, production-ready component library that serves as the foundation for all future pages and features.

---

## 🎯 Development Progress

### Completed Milestones

- ✅ **Milestone 1: Foundation** - Project setup, dependencies, configuration
- ✅ **Milestone 2: UI Component Library** - 19 custom components + 40+ shadcn/ui components

### Upcoming Milestones

- 🔄 **Milestone 3: Layout & Navigation** - Page layouts, routing, navigation system
- ⏳ **Milestone 4: Discover Page** - Main market discovery interface
- ⏳ **Milestone 5: View Detail** - Individual view detail pages
- ⏳ **Milestone 6: Stake Flow** - Staking interaction flow
- ⏳ **Milestone 7: Creator System** - Creator profiles and management
- ⏳ **Milestone 8: Leaderboard & Search** - Rankings and search functionality
- ⏳ **Milestone 9: Protocol Integration** - Real protocol data integration
- ⏳ **Milestone 10: Testing & Optimization** - Comprehensive testing and performance
- ⏳ **Milestone 11: Documentation & Deployment** - Docs and deployment setup
- ⏳ **Milestone 12: Production Ready** - Final polish and launch

---

## 🏗️ Architecture

### Key Documents

- **[ARCHITECTURE_PROPOSAL.md](./ARCHITECTURE_PROPOSAL.md)** - Frozen architecture specification (v1.2)
- **[DEVELOPMENT_PLAN_V1.0.md](./DEVELOPMENT_PLAN_V1.0.md)** - Engineering development plan
- **[MILESTONE_2_REVIEW.md](./MILESTONE_2_REVIEW.md)** - Milestone 2 completion report

### Design Philosophy

**Protocol First** - The frontend is an official interface to the Pulse Protocol, not a standalone product.

Key principles:

- All business logic comes from the Protocol
- Frontend maintains no persistent state
- All data flows through Protocol Data Layer
- Support for third-party interfaces in the future

---

## 📦 Component Library (Milestone 2)

### Component Categories

#### State Components (6)

- `LoadingState` - Loading indicators and skeleton screens
- `EmptyState` - Empty state messaging
- `ErrorState` - Error handling UI
- `CardSkeleton`, `ListSkeleton`, `DetailSkeleton` - Unified skeleton loading

#### Card Components (3)

- `ViewCard` - Configurable View display with extensible metrics
- `CreatorCard` - Creator profile with optional stats and custom content
- `MetricCard` - Universal data display supporting 7 data types

#### Common Components (4)

- `PriceDisplay` - Unified price display with Long/Short coloring
- `VolumeDisplay` - Formatted volume display
- `ActivityItem` - Activity feed items with 8 activity types
- `LeaderboardRow` - Leaderboard row component

#### Layout Components (2)

- `Header` - Navigation header
- `Footer` - Page footer

#### UI Components (40+)

- Complete shadcn/ui component library

### Design Highlights

✨ **Configurable Metrics System** - ViewCard supports flexible metric configuration
✨ **Extensible Content Areas** - Cards support custom children and render functions
✨ **Multi-type Data Display** - MetricCard supports Currency, Percentage, Ratio, Index, Token, Text, Custom
✨ **Unified Skeleton Loading** - Consistent loading experience across all pages
✨ **Protocol First Naming** - Uses View, Stake, Support, Belief instead of Prediction, Bet, Gamble

---

## 🚀 Getting Started

### Prerequisites

- Node.js 22.x
- pnpm 10.x

### Installation

```bash
# Install dependencies
pnpm install

# Start development server
pnpm run dev

# Build for production
pnpm run build

# Run type checking
pnpm run check

# Format code
pnpm run format
```

### Development Server

```bash
pnpm run dev
# Server runs at http://localhost:3000
```

### Production Build

```bash
pnpm run build
# Output in dist/
```

---

## 📁 Project Structure

```
pulse-v1-frontend/
├── client/
│   ├── src/
│   │   ├── app/                 # Next.js routes (future)
│   │   ├── components/          # React components
│   │   │   ├── cards/           # Card components
│   │   │   ├── common/          # Common business components
│   │   │   ├── states/          # State components
│   │   │   ├── layout/          # Layout components
│   │   │   ├── ui/              # shadcn/ui components
│   │   │   └── index.ts         # Unified exports
│   │   ├── contexts/            # React contexts
│   │   ├── hooks/               # Custom hooks
│   │   ├── lib/                 # Utility functions
│   │   ├── mock/                # Mock data
│   │   ├── pages/               # Page components
│   │   ├── App.tsx              # Root component
│   │   ├── main.tsx             # Entry point
│   │   └── index.css            # Global styles
│   ├── public/                  # Static assets
│   └── index.html               # HTML template
├── server/                      # Express server (placeholder)
├── shared/                      # Shared types
├── ARCHITECTURE_PROPOSAL.md     # Architecture specification (frozen)
├── DEVELOPMENT_PLAN_V1.0.md     # Development plan (frozen)
├── MILESTONE_2_REVIEW.md        # Milestone 2 report
├── package.json                 # Dependencies
├── tsconfig.json                # TypeScript config
└── vite.config.ts               # Vite config
```

---

## 🛠️ Tech Stack

- **React** 19.x - UI library
- **Vite** 7.x - Build tool
- **TypeScript** 5.6 - Type safety
- **Tailwind CSS** 4.x - Styling
- **shadcn/ui** - Component library
- **Framer Motion** - Animations
- **Wouter** - Routing
- **Zustand** - State management (planned)
- **TanStack Query** - Server state (planned)
- **wagmi** - Wallet integration (planned)

---

## 📋 Quality Standards

### Code Quality

- ✅ **TypeScript Strict Mode** - 100% type safe
- ✅ **ESLint** - Code linting
- ✅ **Prettier** - Code formatting
- ✅ **JSDoc** - Component documentation
- ✅ **Responsive Design** - Mobile-first approach

### Testing (Planned for Milestone 10)

- Unit tests with Vitest (target > 80% coverage)
- Integration tests with MSW
- E2E tests with Playwright
- Responsive testing across devices
- Accessibility testing (WCAG 2.1 AA)

---

## 🔄 Component Extensibility

### ViewCard - Configurable Metrics

```typescript
// Default metrics
<ViewCard view={viewData} />

// Custom metrics
<ViewCard
  view={viewData}
  metrics={[
    { id: 'long', label: 'Long', value: 0.65, type: 'price', color: 'green' },
    { id: 'belief', label: 'Belief Index', value: 8.5, type: 'index' },
  ]}
/>
```

### CreatorCard - Extensible Content

```typescript
// With custom content
<CreatorCard creator={creatorData}>
  <CustomReputationBadge />
</CreatorCard>
```

### MetricCard - Multi-type Data Display

```typescript
// Currency
<MetricCard label="TVL" value={1000000} dataType="currency" />

// Percentage
<MetricCard label="Accuracy" value={85.5} dataType="percentage" />

// Custom
<MetricCard label="Status" value="Active" dataType="custom" render={renderStatus} />
```

---

## 🚀 Future Roadmap

### Phase 1: Pages (Milestone 3-5)

- Layout system and navigation
- Discover page with filtering and search
- View detail page with charts and activity
- Stake flow and transaction handling

### Phase 2: Creator System (Milestone 6-7)

- Creator profiles
- Creator analytics
- Leaderboards and rankings

### Phase 3: Protocol Integration (Milestone 8-9)

- Real Protocol data integration
- Wallet connection
- Transaction signing and broadcasting

### Phase 4: Polish & Launch (Milestone 10-12)

- Comprehensive testing
- Performance optimization
- Documentation
- Production deployment

---

## 📚 Documentation

- **[ARCHITECTURE_PROPOSAL.md](./ARCHITECTURE_PROPOSAL.md)** - Complete system architecture
- **[DEVELOPMENT_PLAN_V1.0.md](./DEVELOPMENT_PLAN_V1.0.md)** - Development execution plan
- **[MILESTONE_2_REVIEW.md](./MILESTONE_2_REVIEW.md)** - Component library review
- **[ideas.md](./ideas.md)** - Design philosophy and brand guidelines

---

## 🤝 Contributing

This is the official Pulse Protocol frontend. Development follows strict architectural guidelines:

1. **Protocol First** - All changes must align with Protocol First principles
2. **Architecture Frozen** - ARCHITECTURE_PROPOSAL.md v1.2 is the single source of truth
3. **Development Plan** - Follow DEVELOPMENT_PLAN_V1.0.md execution order
4. **Code Quality** - All code must pass TypeScript, ESLint, and Prettier checks
5. **Testing** - All components must have adequate test coverage

---

## 📄 License

MIT

---

## 🔗 Links

- **GitHub**: https://github.com/aess-code/-V1-webapp
- **Protocol Docs**: (Coming soon)
- **Live Demo**: (Coming soon)

---

## 📞 Support

For issues, questions, or contributions, please open an issue on GitHub.

---

**Last Updated**: 2026-07-24
**Current Version**: v0.1.0-component-library
**Next Milestone**: Milestone 3 - Layout & Navigation
