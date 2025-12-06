# Crystal Clicker - Idle + Mini-Skill Hybrid Game

An addictive web-based idle game with skill-based mini-games built with Next.js 14+. Passively generate crystals while actively boosting your earnings through precision-based mini-games.

## Features

- **Idle Progression**: Automatically generate resources even when idle
- **Mini-Skill Game**: Test your reflexes with a tap-precision target game
- **Upgrade System**: Exponentially scaling upgrades for generators, multipliers, and bonuses
- **Boost System**: Time-limited boosts earned from mini-game performance
- **Offline Gains**: Accumulate resources even when the browser is closed
- **Persistence**: Game state automatically saved to localStorage
- **Responsive Design**: Works on desktop and mobile devices
- **Smooth Animations**: Polished UI with satisfying feedback

## Tech Stack

- **Framework**: Next.js 14+ (App Router)
- **Language**: TypeScript
- **Styling**: CSS3 with animations
- **Testing**: Jest (unit tests) + Playwright (integration tests)
- **CI/CD**: GitHub Actions
- **State Management**: React Hooks
- **Storage**: Browser localStorage

## Getting Started

### Prerequisites

- Node.js 18.x or 20.x
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <REPO_URL>
cd idle+mini-skill
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint
- `npm test` - Run unit tests
- `npm run test:watch` - Run tests in watch mode
- `npm run test:coverage` - Run tests with coverage report
- `npm run test:integration` - Run Playwright integration tests
- `npm run test:integration:ui` - Run Playwright tests with UI

## Project Structure

```
idle+mini-skill/
├── app/
│   ├── components/          # Reusable UI components
│   │   ├── BoostIndicator.tsx
│   │   ├── ResourceCounter.tsx
│   │   └── UpgradeItem.tsx
│   ├── game/               # Main game components
│   │   ├── IdleDashboard.tsx
│   │   └── MiniGame.tsx
│   ├── layout.tsx          # Root layout (Server Component)
│   └── page.tsx            # Home page
├── hooks/                  # Custom React hooks
│   ├── useBoosts.ts
│   ├── useIdleEngine.ts
│   ├── useMiniGame.ts
│   └── useUpgrades.ts
├── lib/                    # Core game logic
│   ├── idleFormulas.ts     # Game calculations
│   ├── mathUtils.ts        # Math utilities
│   ├── storage.ts          # localStorage management
│   └── types.ts            # TypeScript definitions
├── styles/                 # CSS files
│   ├── globals.css
│   ├── idle.css
│   ├── components.css
│   └── minigame.css
├── tests/
│   ├── unit/              # Jest unit tests
│   └── integration/       # Playwright E2E tests
└── .github/
    └── workflows/
        └── test.yml        # CI/CD pipeline
```

## Game Systems

### Idle Engine

The idle engine uses timestamp-based calculations to ensure accurate resource generation:

- Resources are calculated based on elapsed time between ticks
- Offline gains are computed when the game loads
- Base formula: `resources = baseRate * upgradeMultiplier * boostMultiplier * time`

**Key files:**
- `hooks/useIdleEngine.ts` - Main idle loop
- `lib/idleFormulas.ts:calculateOfflineGains()` - Offline calculation

### Upgrade System

Four upgrade types with exponential cost scaling:

1. **Generator** - Increases base production rate
2. **Multiplier** - Multiplies all resource gains
3. **Game Booster** - Increases mini-game rewards
4. **Offline Gains** - Earn more while away

Cost formula: `cost = baseCost * (1.15 ^ level)`

**Key files:**
- `hooks/useUpgrades.ts`
- `lib/idleFormulas.ts:calculateUpgradeCost()`

### Mini-Game System

A tap-precision game where players click on spawning targets:

- 15-second game sessions
- Targets spawn every second
- Each target has random point values (10-50)
- Combo system: every 3 consecutive hits = +5 bonus points
- Score determines boost reward tier

**Key files:**
- `hooks/useMiniGame.ts` - Game logic with requestAnimationFrame loop
- `app/game/MiniGame.tsx` - Canvas rendering

### Boost System

Time-limited multipliers earned from mini-game performance:

- **Score 500+**: 3.0x income for 180 seconds
- **Score 300-499**: 2.5x income for 120 seconds
- **Score 100-299**: 2.0x income for 60 seconds
- **Score 1-99**: 1.5x income for 30 seconds

Boosts stack multiplicatively and expire automatically.

**Key files:**
- `hooks/useBoosts.ts`
- `lib/idleFormulas.ts:isBoostExpired()`

## Testing

### Unit Tests

Located in `tests/unit/`, covering:
- Idle formulas and calculations
- Math utilities
- Storage operations
- Upgrade cost scaling
- Boost expiration logic

Run with:
```bash
npm test
```

### Integration Tests

Located in `tests/integration/`, covering:
- Complete game flow
- Resource accumulation
- Upgrade purchases
- Mini-game interaction
- Persistence across reloads
- Offline gains

Run with:
```bash
npm run test:integration
```

## CI/CD Pipeline

GitHub Actions workflow (`.github/workflows/test.yml`):

- Triggers on push/PR to main/develop branches
- Tests on Node.js 18.x and 20.x
- Runs linting, unit tests, and integration tests
- Caches dependencies for faster builds
- Uploads test reports and build artifacts
- Cancels outdated runs on new pushes

## Architecture Highlights

### State Management

Uses React hooks for modular, testable state:
- `useIdleEngine` - Resource generation & persistence
- `useUpgrades` - Upgrade purchases & effects
- `useBoosts` - Boost activation & expiration
- `useMiniGame` - Game loop & scoring

### Performance Optimizations

- `requestAnimationFrame` for smooth 60 FPS mini-game
- Memoized calculations with `useCallback`
- Efficient localStorage auto-save (every 5 seconds)
- Timestamp-based idle calculations (no continuous timers)

### Type Safety

Full TypeScript coverage with:
- Strict mode enabled
- Interfaces for all game state
- Type-safe hook APIs
- No `any` types in production code

## Future Expansions

### Prestige System
- Reset progress for permanent multipliers
- Unlock new upgrade tiers
- Prestige currency and meta-progression

### Multiple Mini-Games
- Swipe combo game
- Rhythm-based tapper
- Memory pattern game

### Automation
- Auto-clicker upgrades
- Worker automation for passive generation
- Research tree for automation bonuses

### Social Features
- Global leaderboards
- Daily challenges
- Achievement system
- Share progress

### Seasonal Events
- Limited-time boosts
- Exclusive upgrades
- Event-specific mini-games
- Cosmetic rewards

### Advanced Progression
- Multiple resource types
- Crafting system
- Building/base management
- Skill trees

## Git Setup

After creating your repository on GitHub:

```bash
# Initialize git repository
git init

# Add all files
git add .

# Create initial commit
git commit -m "Initial commit - Crystal Clicker idle mini-skill hybrid game"

# Add remote origin
git remote add origin <YOUR_REPO_URL>

# Push to main branch
git push -u origin main
```

## Performance Considerations

- Game state saves automatically every 5 seconds
- Resource calculations use integer math to prevent floating-point errors
- Canvas rendering is optimized with gradient caching
- Event listeners properly cleaned up on unmount

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

Requires:
- localStorage support
- requestAnimationFrame support
- ES2020+ features

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Write tests for new functionality
4. Ensure all tests pass (`npm test && npm run test:integration`)
5. Commit changes (`git commit -m 'Add amazing feature'`)
6. Push to branch (`git push origin feature/amazing-feature`)
7. Open a Pull Request

## License

This project is created as a demonstration of senior-level Next.js and game development practices.

## Acknowledgments

Built with modern web technologies and game development best practices, featuring:
- Clean, modular architecture
- Comprehensive test coverage
- Production-ready CI/CD
- Scalable state management
- Smooth animations and feedback
- Mobile-responsive design

---

**Happy Clicking!** 💎
