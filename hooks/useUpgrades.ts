import { useCallback } from 'react'
import { GameState, UPGRADE_DEFINITIONS } from '@/lib/types'
import { calculateUpgradeCost, calculateUpgradeEffect } from '@/lib/idleFormulas'

export function useUpgrades(
  gameState: GameState,
  setGameState: (state: GameState | ((prev: GameState) => GameState)) => void
) {
  const canAffordUpgrade = useCallback(
    (upgradeId: keyof GameState['upgrades']) => {
      const upgrade = UPGRADE_DEFINITIONS.find((u) => u.id === upgradeId)
      if (!upgrade) return false

      const currentLevel = gameState.upgrades[upgradeId]
      const cost = calculateUpgradeCost(upgrade.baseCost, currentLevel)
      return gameState.resources >= cost
    },
    [gameState.resources, gameState.upgrades]
  )

  const purchaseUpgrade = useCallback(
    (upgradeId: keyof GameState['upgrades']) => {
      const upgrade = UPGRADE_DEFINITIONS.find((u) => u.id === upgradeId)
      if (!upgrade) return false

      const currentLevel = gameState.upgrades[upgradeId]
      const cost = calculateUpgradeCost(upgrade.baseCost, currentLevel)

      if (gameState.resources >= cost) {
        setGameState((prevState) => ({
          ...prevState,
          resources: prevState.resources - cost,
          upgrades: {
            ...prevState.upgrades,
            [upgradeId]: currentLevel + 1,
          },
        }))
        return true
      }

      return false
    },
    [gameState.resources, gameState.upgrades, setGameState]
  )

  const getUpgradeCost = useCallback(
    (upgradeId: keyof GameState['upgrades']) => {
      const upgrade = UPGRADE_DEFINITIONS.find((u) => u.id === upgradeId)
      if (!upgrade) return 0

      const currentLevel = gameState.upgrades[upgradeId]
      return calculateUpgradeCost(upgrade.baseCost, currentLevel)
    },
    [gameState.upgrades]
  )

  const getUpgradeEffect = useCallback(
    (upgradeId: keyof GameState['upgrades']) => {
      const upgrade = UPGRADE_DEFINITIONS.find((u) => u.id === upgradeId)
      if (!upgrade) return 0

      const currentLevel = gameState.upgrades[upgradeId]
      return calculateUpgradeEffect(currentLevel, upgrade.baseEffect, upgrade.effectType)
    },
    [gameState.upgrades]
  )

  return {
    canAffordUpgrade,
    purchaseUpgrade,
    getUpgradeCost,
    getUpgradeEffect,
  }
}
