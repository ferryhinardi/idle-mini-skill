# Architecture & Design Decisions

## Overview

Crystal Clicker is built with a clean, modular architecture that separates concerns and ensures testability, scalability, and maintainability.

## Core Principles

1. **Separation of Concerns**: Game logic, UI, and data management are separate
2. **Single Responsibility**: Each module has one clear purpose
3. **Testability**: Pure functions and dependency injection enable comprehensive testing
4. **Type Safety**: Full TypeScript coverage prevents runtime errors
5. **Performance**: Optimized calculations and rendering for smooth gameplay

## Layer Architecture

```
┌─────────────────────────────────────┐
│         UI Components (TSX)          │
│   Dashboard, MiniGame, Upgrades     │
└─────────────┬───────────────────────┘
              │
┌─────────────▼───────────────────────┐
│       Custom Hooks (State)          │
│  useIdleEngine, useUpgrades, etc.   │
└─────────────┬───────────────────────┘
              │
┌─────────────▼───────────────────────┐
│      Game Logic (Pure Functions)     │
│   idleFormulas, mathUtils, types    │
└─────────────┬───────────────────────┘
              │
┌─────────────▼───────────────────────┐
│        Storage & Persistence         │
│          localStorage API            │
└─────────────────────────────────────┘
```

## Key Design Decisions

### 1. Timestamp-Based Idle Calculation

**Decision**: Use timestamps instead of continuous timers for idle gains.

**Rationale**:
- Accurate offline gain calculation
- Lower CPU usage (no continuous timers)
- Prevents timing drift
- Works across browser refreshes

**Implementation**:
```typescript
// Store last update time
lastTimestamp: Date.now()

// Calculate on next tick
const elapsedSeconds = (currentTime - lastTimestamp) / 1000
const gains = ratePerSecond * elapsedSeconds
```

### 2. Custom Hooks for State Management

**Decision**: Use custom hooks instead of Redux/Zustand.

**Rationale**:
- Simpler for this scope
- Better encapsulation
- Easier testing with React Testing Library
- Reduced bundle size
- Natural React patterns

**Hook Responsibilities**:
- `useIdleEngine`: Core game loop and resource generation
- `useUpgrades`: Purchase logic and cost calculations
- `useBoosts`: Time-limited effect management
- `useMiniGame`: Game loop with requestAnimationFrame

### 3. Exponential Upgrade Scaling

**Decision**: Use exponential formula: `cost = base * (1.15 ^ level)`

**Rationale**:
- Creates meaningful progression curve
- Prevents early-game resource explosion
- Maintains late-game challenge
- Standard in idle game design
- 1.15 factor provides balanced growth rate

### 4. Canvas-Based Mini-Game

**Decision**: Use HTML5 Canvas instead of DOM elements for mini-game.

**Rationale**:
- Smooth 60 FPS rendering
- Better performance with many targets
- Custom rendering control
- Particle effects capability
- Reduced DOM manipulation overhead

### 5. localStorage for Persistence

**Decision**: Use browser localStorage instead of backend database.

**Rationale**:
- Zero backend cost
- Instant save/load
- Works offline
- Simple implementation
- Sufficient for single-player game

**Trade-offs**:
- Data limited to one browser
- No cloud sync
- No anti-cheat protection
- Acceptable for this scope

### 6. Component Structure

**Decision**: Client Components for game, Server Components for layout.

**Rationale**:
- Game requires interactivity (Client)
- Layout benefits from SSR (Server)
- Optimal Next.js 14 App Router usage
- SEO benefits for static content
- Clear component boundaries

### 7. Test Strategy

**Decision**: Unit tests for logic, integration tests for flows.

**Rationale**:
- Unit tests catch logic errors early
- Integration tests verify user experience
- Playwright tests real browser behavior
- Jest tests pure functions faster
- Comprehensive coverage with both approaches

## Data Flow

### Idle Resource Generation

```
Timer Tick (1000ms)
    ↓
Calculate elapsed time since last tick
    ↓
Apply formula: baseRate × upgradeMultiplier × boostMultiplier
    ↓
Add resources to state
    ↓
Update lastTimestamp
    ↓
Auto-save to localStorage (every 5 seconds)
```

### Mini-Game Interaction

```
User clicks "Play Mini-Game"
    ↓
Enter game state (isPlaying = true)
    ↓
requestAnimationFrame loop starts
    ↓
Spawn targets periodically
    ↓
User clicks on targets
    ↓
Calculate score with combo bonuses
    ↓
Game ends after 15 seconds
    ↓
Calculate rewards based on score
    ↓
Apply boost to idle system
    ↓
Return to dashboard
```

### Upgrade Purchase

```
User clicks upgrade button
    ↓
Check if resources >= cost
    ↓
Deduct resources
    ↓
Increment upgrade level
    ↓
Recalculate resource rate
    ↓
Update UI
    ↓
Auto-save state
```

## Performance Optimizations

### 1. Memoization

Use `useCallback` for expensive functions:
```typescript
const calculateCurrentResourceRate = useCallback((state: GameState) => {
  // Expensive calculation
}, [dependencies])
```

### 2. Efficient Rendering

- Canvas rendering instead of DOM manipulation
- CSS animations instead of JavaScript animations
- Conditional rendering with early returns

### 3. Optimized State Updates

- Functional updates for state that depends on previous state
- Minimal re-renders with proper dependency arrays
- Cleanup of intervals and event listeners

### 4. Resource Calculation

- Integer math to prevent floating-point errors
- Floor operations for displayed values
- Batch calculations in single tick

## Scalability Considerations

### Adding New Upgrades

1. Add to `UPGRADE_DEFINITIONS` in `lib/types.ts`
2. Add to `UpgradesState` interface
3. No code changes required in hooks/components

### Adding New Mini-Games

1. Create new hook: `useMiniGameX.ts`
2. Create new component: `MiniGameX.tsx`
3. Add selection logic in `IdleDashboard`
4. Reuse boost system

### Adding Prestige System

1. Create `usePrestige.ts` hook
2. Add prestige currency to GameState
3. Implement reset logic with permanent bonuses
4. Add prestige UI component

## Security Considerations

### Current State

- No authentication required
- Client-side only (no API)
- localStorage is user-modifiable
- No sensitive data stored

### Future Enhancements

If adding multiplayer/leaderboards:
- Server-side score validation
- Encrypted game state
- Rate limiting on submissions
- Anti-cheat measures

## Testing Strategy

### Unit Tests (Jest)

Test pure functions in isolation:
- Game formulas
- Math utilities
- Cost calculations
- Time calculations

**Coverage Target**: 90%+

### Integration Tests (Playwright)

Test user workflows:
- Complete game session
- Upgrade purchases
- Persistence across reloads
- Offline gains

**Coverage Target**: All critical paths

### Manual Testing

- Cross-browser compatibility
- Mobile responsiveness
- Performance profiling
- User experience flow

## Deployment Strategy

### Development
```bash
npm run dev
```

### Production Build
```bash
npm run build
npm start
```

### Recommended Hosting
- Vercel (optimal Next.js support)
- Netlify
- AWS Amplify
- GitHub Pages (with static export)

### Environment Variables
None required for current implementation.

## Future Architectural Improvements

### 1. Server-Side State

For multiplayer features:
- WebSocket connection for real-time updates
- PostgreSQL for persistent storage
- Redis for session management

### 2. Service Worker

For better offline support:
- Cache game assets
- Queue state saves when offline
- Background resource generation

### 3. Web Workers

For heavy calculations:
- Move simulation to worker thread
- Prevent UI blocking
- Calculate complex formulas in background

### 4. State Management Library

If complexity grows:
- Zustand for global state
- Immer for immutable updates
- DevTools integration

## Code Quality Standards

### TypeScript
- Strict mode enabled
- No `any` types
- Explicit return types for functions

### React
- Functional components only
- Custom hooks for reusable logic
- Proper cleanup in useEffect

### Testing
- Unit tests for all utilities
- Integration tests for flows
- Minimum 80% coverage

### Documentation
- JSDoc for complex functions
- README for setup
- Architecture docs for design decisions

## Lessons & Best Practices

1. **Start with types**: Define interfaces before implementation
2. **Pure functions**: Keep game logic separate from React
3. **Test first**: Write tests alongside features
4. **Performance monitoring**: Profile before optimizing
5. **User feedback**: Add visual feedback for all actions
6. **Save often**: Auto-save prevents data loss
7. **Mobile first**: Design for touch interactions

---

This architecture supports rapid iteration while maintaining code quality and testability. The modular design allows features to be added without touching existing systems.
