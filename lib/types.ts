/**
 * Game state types and interfaces
 */

export interface GameState {
  resources: number
  lastTimestamp: number
  upgrades: UpgradesState
  boosts: BoostState[]
  stats: GameStats
}

export interface UpgradesState {
  generatorLevel: number
  multiplierLevel: number
  miniGameBoosterLevel: number
  offlineGainLevel: number
}

export interface BoostState {
  type: 'income' | 'critical' | 'speed'
  multiplier: number
  startTime: number
  duration: number
}

export interface GameStats {
  bestMiniGameScore: number
  totalMiniGamesPlayed: number
  totalResourcesEarned: number
  currentStreak: number
  bestStreak: number
}

export interface UpgradeDefinition {
  id: keyof UpgradesState
  name: string
  description: string
  baseCost: number
  baseEffect: number
  effectType: 'additive' | 'multiplicative'
  icon: string
}

export const UPGRADE_DEFINITIONS: UpgradeDefinition[] = [
  {
    id: 'generatorLevel',
    name: 'Generator',
    description: 'Increases base resource generation',
    baseCost: 10,
    baseEffect: 1,
    effectType: 'additive',
    icon: '⚡',
  },
  {
    id: 'multiplierLevel',
    name: 'Multiplier',
    description: 'Multiplies all resource gains',
    baseCost: 50,
    baseEffect: 0.1,
    effectType: 'multiplicative',
    icon: '✖️',
  },
  {
    id: 'miniGameBoosterLevel',
    name: 'Game Booster',
    description: 'Increases mini-game rewards',
    baseCost: 100,
    baseEffect: 0.15,
    effectType: 'multiplicative',
    icon: '🎮',
  },
  {
    id: 'offlineGainLevel',
    name: 'Offline Gains',
    description: 'Earn more while away',
    baseCost: 200,
    baseEffect: 0.2,
    effectType: 'multiplicative',
    icon: '💤',
  },
]

export const GAME_CONFIG = {
  baseResourceRate: 1,
  tickInterval: 1000,
  miniGameDuration: 15,
  boostDuration: 60000, // 60 seconds
  saveInterval: 5000,
  targetSpawnInterval: 1000,
  targetLifetime: 2000,
} as const

export const STORAGE_KEY = 'idle-mini-skill-game-state'
