# Project Structure

```
idle+mini-skill/
├── .github/
│   └── workflows/
│       └── test.yml                    # CI/CD pipeline configuration
│
├── app/                                # Next.js App Router
│   ├── components/                     # Reusable UI components
│   │   ├── BoostIndicator.tsx         # Active boosts display
│   │   ├── ResourceCounter.tsx        # Main resource display
│   │   └── UpgradeItem.tsx            # Individual upgrade card
│   │
│   ├── game/                          # Main game components
│   │   ├── IdleDashboard.tsx          # Main game dashboard (Client)
│   │   └── MiniGame.tsx               # Mini-game canvas component
│   │
│   ├── layout.tsx                     # Root layout (Server)
│   └── page.tsx                       # Home page entry point
│
├── hooks/                             # Custom React hooks
│   ├── useBoosts.ts                   # Boost system management
│   ├── useIdleEngine.ts               # Core idle game loop
│   ├── useMiniGame.ts                 # Mini-game state & logic
│   └── useUpgrades.ts                 # Upgrade purchase logic
│
├── lib/                               # Core game logic (pure functions)
│   ├── idleFormulas.ts                # Game calculation formulas
│   ├── mathUtils.ts                   # Math helper functions
│   ├── storage.ts                     # localStorage persistence
│   └── types.ts                       # TypeScript type definitions
│
├── styles/                            # CSS stylesheets
│   ├── components.css                 # Component-specific styles
│   ├── globals.css                    # Global styles & animations
│   ├── idle.css                       # Dashboard styles
│   └── minigame.css                   # Mini-game styles
│
├── tests/                             # Test suites
│   ├── integration/                   # E2E tests with Playwright
│   │   └── game.spec.ts              # Full game flow tests
│   │
│   └── unit/                         # Unit tests with Jest
│       ├── idleFormulas.test.ts      # Formula calculations
│       ├── mathUtils.test.ts         # Math utilities
│       └── storage.test.ts           # Storage operations
│
├── .eslintrc.json                    # ESLint configuration
├── .gitignore                        # Git ignore patterns
├── jest.config.js                    # Jest configuration
├── jest.setup.js                     # Jest setup & mocks
├── next.config.js                    # Next.js configuration
├── package.json                      # Dependencies & scripts
├── playwright.config.ts              # Playwright configuration
├── tsconfig.json                     # TypeScript configuration
│
├── ARCHITECTURE.md                   # Architecture documentation
├── PROJECT_SUMMARY.md                # Complete project summary
├── QUICKSTART.md                     # Quick start guide
└── README.md                         # Main documentation

```

## File Counts

- **TypeScript/TSX Files**: 20
- **CSS Files**: 4
- **Test Files**: 4
- **Config Files**: 6
- **Documentation Files**: 4
- **Total**: 38 files

## Component Hierarchy

```
App (layout.tsx)
  └── Home (page.tsx)
        └── IdleDashboard (Client Component)
              ├── ResourceCounter
              ├── BoostIndicator
              ├── UpgradeItem (×4)
              └── MiniGame (conditional)
```

## Hook Dependencies

```
IdleDashboard
  ├── useIdleEngine()
  │     └── Uses: storage.ts, idleFormulas.ts, types.ts
  │
  ├── useUpgrades(gameState, setGameState)
  │     └── Uses: idleFormulas.ts, types.ts
  │
  ├── useBoosts(gameState, setGameState)
  │     └── Uses: idleFormulas.ts, types.ts
  │
  └── useMiniGame(onGameEnd)
        └── Uses: mathUtils.ts, types.ts
```

## Data Flow

```
localStorage
    ↓
useIdleEngine
    ↓
gameState (React State)
    ↓
├── useUpgrades ────→ Upgrade Components
├── useBoosts ──────→ Boost Components
└── useMiniGame ────→ Mini-Game Component
    ↓
UI Components
```

## Test Coverage Map

```
lib/idleFormulas.ts      → tests/unit/idleFormulas.test.ts
lib/mathUtils.ts         → tests/unit/mathUtils.test.ts
lib/storage.ts           → tests/unit/storage.test.ts

Full Game Flow           → tests/integration/game.spec.ts
```

## Key File Purposes

### Core Game Files
- `useIdleEngine.ts` - Heart of the game, manages resource generation
- `idleFormulas.ts` - All game calculations and formulas
- `types.ts` - Central type definitions for game state

### UI Files
- `IdleDashboard.tsx` - Main game interface, orchestrates all systems
- `MiniGame.tsx` - Canvas-based mini-game rendering
- `ResourceCounter.tsx` - Displays current resources and rate

### Configuration Files
- `package.json` - Dependencies and npm scripts
- `tsconfig.json` - TypeScript compiler settings
- `jest.config.js` - Unit test configuration
- `playwright.config.ts` - Integration test configuration
- `next.config.js` - Next.js build settings

### Documentation Files
- `README.md` - Complete project documentation
- `ARCHITECTURE.md` - Technical design decisions
- `QUICKSTART.md` - Setup and running instructions
- `PROJECT_SUMMARY.md` - Implementation overview

## File Size Estimates

```
Small  (<100 lines):  Config files, types.ts
Medium (100-300 lines): Most components, hooks, tests
Large  (300+ lines):   IdleDashboard.tsx, game.spec.ts
```

## Import Pattern

```typescript
// External dependencies
import { useState, useEffect } from 'react'

// Internal libraries
import { calculateResourceRate } from '@/lib/idleFormulas'
import { GameState } from '@/lib/types'

// Hooks
import { useIdleEngine } from '@/hooks/useIdleEngine'

// Components
import ResourceCounter from '@/app/components/ResourceCounter'

// Styles
import '@/styles/idle.css'
```

---

This structure supports scalability, testability, and maintainability while keeping the codebase organized and easy to navigate.
