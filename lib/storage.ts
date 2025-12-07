import { GameState, STORAGE_KEY } from './types'

/**
 * Storage utilities for persisting game state
 */

export function saveGameState(state: GameState): void {
  try {
    // Check if we're in a browser environment
    if (typeof window === 'undefined' || typeof localStorage === 'undefined') {
      return
    }
    
    const serialized = JSON.stringify(state)
    localStorage.setItem(STORAGE_KEY, serialized)
  } catch (error) {
    console.error('Failed to save game state:', error)
  }
}

export function loadGameState(): GameState | null {
  try {
    // Check if we're in a browser environment
    if (typeof window === 'undefined' || typeof localStorage === 'undefined') {
      return null
    }
    
    const serialized = localStorage.getItem(STORAGE_KEY)
    if (!serialized) return null
    
    const state = JSON.parse(serialized) as GameState
    return state
  } catch (error) {
    console.error('Failed to load game state:', error)
    return null
  }
}

export function clearGameState(): void {
  try {
    localStorage.removeItem(STORAGE_KEY)
  } catch (error) {
    console.error('Failed to clear game state:', error)
  }
}

export function getInitialGameState(): GameState {
  return {
    resources: 0,
    lastTimestamp: Date.now(),
    upgrades: {
      generatorLevel: 0,
      multiplierLevel: 0,
      miniGameBoosterLevel: 0,
      offlineGainLevel: 0,
    },
    boosts: [],
    stats: {
      bestMiniGameScore: 0,
      totalMiniGamesPlayed: 0,
      totalResourcesEarned: 0,
      currentStreak: 0,
      bestStreak: 0,
    },
  }
}
