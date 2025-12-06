import { useState, useEffect, useCallback, useRef } from 'react'
import { GameState } from '@/lib/types'
import { saveGameState, loadGameState, getInitialGameState } from '@/lib/storage'
import {
  calculateResourceRate,
  calculateOfflineGains,
  isBoostExpired,
} from '@/lib/idleFormulas'
import { GAME_CONFIG } from '@/lib/types'

export function useIdleEngine() {
  const [gameState, setGameState] = useState<GameState>(getInitialGameState())
  const [resourcesPerSecond, setResourcesPerSecond] = useState(0)
  const saveIntervalRef = useRef<NodeJS.Timeout | null>(null)
  const tickIntervalRef = useRef<NodeJS.Timeout | null>(null)

  // Initialize game state from storage
  useEffect(() => {
    const savedState = loadGameState()
    if (savedState) {
      // Calculate offline gains
      const currentTime = Date.now()
      const rps = calculateCurrentResourceRate(savedState)
      const offlineGains = calculateOfflineGains(
        savedState.lastTimestamp,
        currentTime,
        rps
      )

      setGameState({
        ...savedState,
        resources: savedState.resources + offlineGains,
        lastTimestamp: currentTime,
        // Clean expired boosts
        boosts: savedState.boosts.filter(
          (boost) => !isBoostExpired(boost.startTime, boost.duration, currentTime)
        ),
      })
    }
  }, [])

  // Calculate current resource rate based on upgrades and boosts
  const calculateCurrentResourceRate = useCallback((state: GameState) => {
    const baseRate = GAME_CONFIG.baseResourceRate + state.upgrades.generatorLevel
    const upgradeMultiplier = 1 + state.upgrades.multiplierLevel * 0.1
    
    // Calculate active boosts
    const currentTime = Date.now()
    const activeBoosts = state.boosts.filter(
      (boost) => !isBoostExpired(boost.startTime, boost.duration, currentTime)
    )
    
    const boostMultiplier = activeBoosts.reduce((total, boost) => {
      return total * boost.multiplier
    }, 1)

    return calculateResourceRate({
      baseRate,
      upgradeMultiplier,
      boostMultiplier,
    })
  }, [])

  // Resource generation tick
  useEffect(() => {
    tickIntervalRef.current = setInterval(() => {
      setGameState((prevState) => {
        const currentTime = Date.now()
        const rps = calculateCurrentResourceRate(prevState)
        const elapsedSeconds = (currentTime - prevState.lastTimestamp) / 1000
        const resourceGain = rps * elapsedSeconds

        // Clean expired boosts
        const activeBoosts = prevState.boosts.filter(
          (boost) => !isBoostExpired(boost.startTime, boost.duration, currentTime)
        )

        return {
          ...prevState,
          resources: prevState.resources + resourceGain,
          lastTimestamp: currentTime,
          boosts: activeBoosts,
          stats: {
            ...prevState.stats,
            totalResourcesEarned: prevState.stats.totalResourcesEarned + resourceGain,
          },
        }
      })
    }, GAME_CONFIG.tickInterval)

    return () => {
      if (tickIntervalRef.current) {
        clearInterval(tickIntervalRef.current)
      }
    }
  }, [calculateCurrentResourceRate])

  // Auto-save
  useEffect(() => {
    saveIntervalRef.current = setInterval(() => {
      saveGameState(gameState)
    }, GAME_CONFIG.saveInterval)

    return () => {
      if (saveIntervalRef.current) {
        clearInterval(saveIntervalRef.current)
      }
    }
  }, [gameState])

  // Update resources per second display
  useEffect(() => {
    setResourcesPerSecond(calculateCurrentResourceRate(gameState))
  }, [gameState, calculateCurrentResourceRate])

  // Save on unmount
  useEffect(() => {
    return () => {
      saveGameState(gameState)
    }
  }, [gameState])

  return {
    gameState,
    setGameState,
    resourcesPerSecond,
  }
}
