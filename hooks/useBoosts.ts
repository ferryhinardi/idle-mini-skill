import { useCallback, useEffect } from 'react'
import { GameState, BoostState } from '@/lib/types'
import { calculateBoostTimeRemaining, isBoostExpired } from '@/lib/idleFormulas'

export function useBoosts(
  gameState: GameState,
  setGameState: (state: GameState | ((prev: GameState) => GameState)) => void
) {
  const addBoost = useCallback(
    (type: BoostState['type'], multiplier: number, duration: number) => {
      const newBoost: BoostState = {
        type,
        multiplier,
        startTime: Date.now(),
        duration,
      }

      setGameState((prevState) => ({
        ...prevState,
        boosts: [...prevState.boosts, newBoost],
      }))
    },
    [setGameState]
  )

  const removeExpiredBoosts = useCallback(() => {
    const currentTime = Date.now()
    setGameState((prevState) => ({
      ...prevState,
      boosts: prevState.boosts.filter(
        (boost) => !isBoostExpired(boost.startTime, boost.duration, currentTime)
      ),
    }))
  }, [setGameState])

  const getActiveBoosts = useCallback(() => {
    const currentTime = Date.now()
    return gameState.boosts.filter(
      (boost) => !isBoostExpired(boost.startTime, boost.duration, currentTime)
    )
  }, [gameState.boosts])

  const getBoostTimeRemaining = useCallback(
    (boost: BoostState) => {
      return calculateBoostTimeRemaining(boost.startTime, boost.duration, Date.now())
    },
    []
  )

  const getTotalBoostMultiplier = useCallback(() => {
    const activeBoosts = getActiveBoosts()
    return activeBoosts.reduce((total, boost) => total * boost.multiplier, 1)
  }, [getActiveBoosts])

  // Periodically clean up expired boosts
  useEffect(() => {
    const interval = setInterval(removeExpiredBoosts, 1000)
    return () => clearInterval(interval)
  }, [removeExpiredBoosts])

  return {
    addBoost,
    removeExpiredBoosts,
    getActiveBoosts,
    getBoostTimeRemaining,
    getTotalBoostMultiplier,
  }
}
