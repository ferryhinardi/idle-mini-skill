# 📚 Documentation Index

Welcome to Crystal Clicker! This index will help you find the right documentation for your needs.

## 🚀 Quick Access

| I want to... | Read this file |
|--------------|----------------|
| **Get started in 3 steps** | [GETTING_STARTED.md](GETTING_STARTED.md) |
| **See what's implemented** | [CHECKLIST.md](CHECKLIST.md) |
| **Understand the project** | [PROJECT_SUMMARY.md](PROJECT_SUMMARY.md) |
| **Learn the architecture** | [ARCHITECTURE.md](ARCHITECTURE.md) |
| **Navigate the code** | [PROJECT_STRUCTURE.md](PROJECT_STRUCTURE.md) |
| **Read full docs** | [README.md](README.md) |
| **Get setup instructions** | [QUICKSTART.md](QUICKSTART.md) |

---

## 📖 Documentation Files

### 1. GETTING_STARTED.md
**Purpose**: Fastest way to get the game running  
**Time to read**: 2 minutes  
**Best for**: First-time setup

**Contains**:
- 3-step installation guide
- What to try first
- Git setup commands
- Troubleshooting tips

[→ Read GETTING_STARTED.md](GETTING_STARTED.md)

---

### 2. README.md
**Purpose**: Complete project documentation  
**Time to read**: 15 minutes  
**Best for**: Understanding everything

**Contains**:
- Feature overview
- Tech stack details
- Game systems explained
- Testing guide
- CI/CD pipeline info
- Future expansion ideas

[→ Read README.md](README.md)

---

### 3. ARCHITECTURE.md
**Purpose**: Technical design decisions  
**Time to read**: 20 minutes  
**Best for**: Developers wanting to understand "why"

**Contains**:
- Design principles
- Key architecture decisions
- Data flow diagrams
- Performance optimizations
- Scalability considerations
- Best practices

[→ Read ARCHITECTURE.md](ARCHITECTURE.md)

---

### 4. QUICKSTART.md
**Purpose**: Detailed setup and customization  
**Time to read**: 5 minutes  
**Best for**: Getting hands-on quickly

**Contains**:
- Installation steps
- Running commands
- Git setup
- Customization examples
- Troubleshooting guide

[→ Read QUICKSTART.md](QUICKSTART.md)

---

### 5. PROJECT_SUMMARY.md
**Purpose**: High-level project overview  
**Time to read**: 10 minutes  
**Best for**: Understanding scope and completeness

**Contains**:
- What's implemented
- File statistics
- Key features list
- Performance characteristics
- Testing coverage
- Production readiness checklist

[→ Read PROJECT_SUMMARY.md](PROJECT_SUMMARY.md)

---

### 6. PROJECT_STRUCTURE.md
**Purpose**: Visual guide to codebase organization  
**Time to read**: 5 minutes  
**Best for**: Navigating the code

**Contains**:
- File tree diagram
- Component hierarchy
- Hook dependencies
- Data flow visualization
- Import patterns

[→ Read PROJECT_STRUCTURE.md](PROJECT_STRUCTURE.md)

---

### 7. CHECKLIST.md
**Purpose**: Comprehensive implementation verification  
**Time to read**: 10 minutes  
**Best for**: Verifying completeness

**Contains**:
- Feature checklist (✅ all complete)
- Technical implementation verification
- Quality metrics
- Final verification commands
- Expected test results

[→ Read CHECKLIST.md](CHECKLIST.md)

---

## 🎯 Reading Path by Role

### For Players
1. [GETTING_STARTED.md](GETTING_STARTED.md) - Get playing in 3 steps

### For Developers (New to Project)
1. [GETTING_STARTED.md](GETTING_STARTED.md) - Setup
2. [README.md](README.md) - Overview
3. [PROJECT_STRUCTURE.md](PROJECT_STRUCTURE.md) - Navigation
4. Start coding!

### For Developers (Deep Dive)
1. [README.md](README.md) - Complete overview
2. [ARCHITECTURE.md](ARCHITECTURE.md) - Design decisions
3. [PROJECT_STRUCTURE.md](PROJECT_STRUCTURE.md) - Code organization
4. [CHECKLIST.md](CHECKLIST.md) - Implementation details

### For Project Managers
1. [PROJECT_SUMMARY.md](PROJECT_SUMMARY.md) - Scope and metrics
2. [CHECKLIST.md](CHECKLIST.md) - Completeness verification
3. [README.md](README.md) - Full capabilities

### For Code Reviewers
1. [ARCHITECTURE.md](ARCHITECTURE.md) - Design rationale
2. [PROJECT_STRUCTURE.md](PROJECT_STRUCTURE.md) - Organization
3. [CHECKLIST.md](CHECKLIST.md) - Quality verification
4. Review actual code in /app, /hooks, /lib

---

## 📁 Code Documentation

### Core Game Logic
- **lib/idleFormulas.ts** - All game calculations (JSDoc comments)
- **lib/mathUtils.ts** - Math helper functions (JSDoc comments)
- **lib/types.ts** - Type definitions with descriptions

### React Hooks
- **hooks/useIdleEngine.ts** - Core game loop
- **hooks/useUpgrades.ts** - Upgrade system
- **hooks/useBoosts.ts** - Boost management
- **hooks/useMiniGame.ts** - Mini-game logic

### Components
- **app/game/IdleDashboard.tsx** - Main interface
- **app/game/MiniGame.tsx** - Canvas game
- **app/components/** - Reusable UI pieces

### Tests
- **tests/unit/** - Unit test examples
- **tests/integration/** - E2E test examples

---

## 🔍 Find Specific Information

### Game Mechanics
- **Idle system**: README.md → "Idle Engine" section
- **Upgrades**: README.md → "Upgrade System" section
- **Mini-game**: README.md → "Mini-Game System" section
- **Boosts**: README.md → "Boost System" section

### Technical Details
- **Timestamp calculations**: ARCHITECTURE.md → "Timestamp-Based Idle"
- **State management**: ARCHITECTURE.md → "Custom Hooks"
- **Performance**: ARCHITECTURE.md → "Performance Optimizations"
- **Testing strategy**: ARCHITECTURE.md → "Testing Strategy"

### Setup & Configuration
- **Initial setup**: GETTING_STARTED.md or QUICKSTART.md
- **Git commands**: Any guide → "Git Setup" section
- **Customization**: QUICKSTART.md → "Customization" section
- **Troubleshooting**: GETTING_STARTED.md → "Troubleshooting"

### Implementation Details
- **What's complete**: CHECKLIST.md
- **File purposes**: PROJECT_STRUCTURE.md
- **Code metrics**: PROJECT_SUMMARY.md
- **Future plans**: README.md → "Future Expansions"

---

## 🎓 Learning Resources

### Learn by Example
1. Read **hooks/useIdleEngine.ts** to see timestamp-based idle
2. Read **hooks/useMiniGame.ts** to see requestAnimationFrame usage
3. Read **tests/unit/idleFormulas.test.ts** to see Jest patterns
4. Read **tests/integration/game.spec.ts** to see Playwright patterns

### Best Practices Demonstrated
- TypeScript strict mode usage → All .ts/.tsx files
- React hooks patterns → All files in /hooks
- Pure function design → All files in /lib
- Test-driven patterns → All files in /tests
- Component composition → Files in /app/components

---

## 📞 Quick Reference

### Commands
```bash
npm install              # Install dependencies
npm run dev             # Start dev server
npm test                # Run unit tests
npm run test:integration # Run E2E tests
npm run lint            # Check code style
npm run build           # Build for production
```

### File Locations
```
Game Logic:        lib/
React Hooks:       hooks/
UI Components:     app/components/
Main Game:         app/game/
Styles:            styles/
Tests:             tests/
Config:            Root directory
Docs:              Root directory (*.md files)
```

### Important Numbers
- Base resource rate: 1/second (lib/types.ts)
- Tick interval: 1000ms (lib/types.ts)
- Mini-game duration: 15 seconds (lib/types.ts)
- Auto-save interval: 5 seconds (lib/types.ts)
- Upgrade cost scaling: 1.15^level (lib/idleFormulas.ts)

---

## 🆘 Get Help

### For Setup Issues
→ See GETTING_STARTED.md "Troubleshooting" section

### For Understanding Code
→ Read ARCHITECTURE.md for design decisions
→ Check PROJECT_STRUCTURE.md for file locations

### For Testing
→ See README.md "Testing" section
→ Check test files in tests/ for examples

### For Customization
→ See QUICKSTART.md "Customization" section
→ Modify lib/types.ts for game balance

---

**Choose your path above and start exploring!** 🎮

All documentation is comprehensive, well-organized, and designed to get you productive quickly.
