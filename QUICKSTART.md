# Quick Start Guide

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

This will install all required dependencies including:
- Next.js 14.2.0
- React 18.3.0
- TypeScript 5.4.0
- Jest & Testing Library
- Playwright
- ESLint

### 2. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the game.

### 3. Run Tests

```bash
# Unit tests
npm test

# Integration tests
npm run test:integration

# Tests with coverage
npm run test:coverage
```

### 4. Build for Production

```bash
npm run build
npm start
```

## Git Setup

When you're ready to push to GitHub:

```bash
# Initialize git repository
git init

# Add all files
git add .

# Create initial commit
git commit -m "Initial commit - Crystal Clicker idle mini-skill hybrid game"

# Add your remote repository
git remote add origin <YOUR_REPO_URL>

# Push to main branch
git push -u origin main
```

## Project Overview

### Game Mechanics

1. **Idle System**: Crystals generate automatically every second
2. **Upgrades**: Purchase upgrades to boost production
3. **Mini-Game**: Play a 15-second target game for bonuses
4. **Boosts**: Earn temporary multipliers from mini-game scores
5. **Persistence**: Progress saves automatically

### Key Files

- `app/page.tsx` - Entry point
- `app/game/IdleDashboard.tsx` - Main game interface
- `app/game/MiniGame.tsx` - Mini-game component
- `hooks/useIdleEngine.ts` - Core game loop
- `lib/idleFormulas.ts` - Game calculations

### Customization

#### Change Base Resource Rate
Edit in `lib/types.ts`:
```typescript
export const GAME_CONFIG = {
  baseResourceRate: 1, // Change this value
  // ...
}
```

#### Add New Upgrade
Add to `lib/types.ts`:
```typescript
export const UPGRADE_DEFINITIONS: UpgradeDefinition[] = [
  {
    id: 'newUpgrade',
    name: 'New Upgrade',
    description: 'Does something cool',
    baseCost: 500,
    baseEffect: 0.2,
    effectType: 'multiplicative',
    icon: '🎯',
  },
  // ...
]
```

#### Adjust Mini-Game Duration
Edit in `lib/types.ts`:
```typescript
export const GAME_CONFIG = {
  miniGameDuration: 15, // Seconds
  // ...
}
```

## Troubleshooting

### Port Already in Use

```bash
# Kill process on port 3000
npx kill-port 3000

# Or run on different port
PORT=3001 npm run dev
```

### Tests Failing

```bash
# Clear cache
npm test -- --clearCache

# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

### Playwright Installation Issues

```bash
# Install browsers manually
npx playwright install --with-deps
```

## Next Steps

1. Play the game to understand mechanics
2. Read `README.md` for detailed documentation
3. Review `ARCHITECTURE.md` for design decisions
4. Check `tests/` folder for test examples
5. Customize game parameters to your liking

## Need Help?

- Check `README.md` for comprehensive documentation
- Review `ARCHITECTURE.md` for technical details
- Look at test files for usage examples
- Examine TypeScript types in `lib/types.ts`

---

**Enjoy building your idle game!** 💎
