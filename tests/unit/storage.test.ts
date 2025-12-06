import { saveGameState, loadGameState, clearGameState, getInitialGameState } from '@/lib/storage'
import { GameState } from '@/lib/types'

// Mock localStorage before imports
const mockGetItem = jest.fn()
const mockSetItem = jest.fn()
const mockRemoveItem = jest.fn()
const mockClear = jest.fn()

Object.defineProperty(global, 'localStorage', {
  value: {
    getItem: mockGetItem,
    setItem: mockSetItem,
    removeItem: mockRemoveItem,
    clear: mockClear,
  },
  writable: true,
})

describe('storage', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('getInitialGameState', () => {
    it('should return initial game state', () => {
      const state = getInitialGameState()
      expect(state.resources).toBe(0)
      expect(state.upgrades.generatorLevel).toBe(0)
      expect(state.boosts).toEqual([])
      expect(state.stats.bestMiniGameScore).toBe(0)
    })
  })

  describe('saveGameState', () => {
    it('should save game state to localStorage', () => {
      const state = getInitialGameState()
      state.resources = 1000

      saveGameState(state)

      expect(mockSetItem).toHaveBeenCalledWith(
        'idle-mini-skill-game-state',
        expect.any(String)
      )
    })
  })

  describe('loadGameState', () => {
    it('should load game state from localStorage', () => {
      const state = getInitialGameState()
      state.resources = 1000
      
      const serialized = JSON.stringify(state)
      mockGetItem.mockReturnValue(serialized)

      const loaded = loadGameState()
      expect(loaded).not.toBeNull()
      expect(loaded?.resources).toBe(1000)
    })

    it('should return null when no saved state exists', () => {
      mockGetItem.mockReturnValue(null)

      const loaded = loadGameState()
      expect(loaded).toBeNull()
    })

    it('should return null when localStorage throws error', () => {
      mockGetItem.mockImplementation(() => {
        throw new Error('Storage error')
      })

      const loaded = loadGameState()
      expect(loaded).toBeNull()
    })
  })

  describe('clearGameState', () => {
    it('should clear game state from localStorage', () => {
      clearGameState()
      expect(mockRemoveItem).toHaveBeenCalledWith('idle-mini-skill-game-state')
    })
  })
})
