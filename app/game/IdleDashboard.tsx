'use client'

import { useState } from 'react'
import { useIdleEngine } from '@/hooks/useIdleEngine'
import { useUpgrades } from '@/hooks/useUpgrades'
import { useBoosts } from '@/hooks/useBoosts'
import { useMiniGame } from '@/hooks/useMiniGame'
import ResourceCounter from '@/app/components/ResourceCounter'
import UpgradeItem from '@/app/components/UpgradeItem'
import BoostIndicator from '@/app/components/BoostIndicator'
import MiniGame from '@/app/game/MiniGame'
import { UPGRADE_DEFINITIONS, GAME_CONFIG } from '@/lib/types'
import { calculateMiniGameReward } from '@/lib/idleFormulas'
import '@/styles/idle.css'

export default function IdleDashboard() {
  const { gameState, setGameState, resourcesPerSecond } = useIdleEngine()
  const { canAffordUpgrade, purchaseUpgrade, getUpgradeCost, getUpgradeEffect } =
    useUpgrades(gameState, setGameState)
  const { addBoost, getActiveBoosts, getBoostTimeRemaining } = useBoosts(
    gameState,
    setGameState
  )

  const [showMiniGame, setShowMiniGame] = useState(false)

  const handleMiniGameEnd = (score: number) => {
    // Calculate rewards
    const baseReward = 10
    const bonusMultiplier = 1 + gameState.upgrades.miniGameBoosterLevel * 0.15
    const resourceReward = calculateMiniGameReward(score, baseReward, bonusMultiplier)

    // Add resources
    setGameState((prev) => ({
      ...prev,
      resources: prev.resources + resourceReward,
      stats: {
        ...prev.stats,
        bestMiniGameScore: Math.max(prev.stats.bestMiniGameScore, score),
        totalMiniGamesPlayed: prev.stats.totalMiniGamesPlayed + 1,
        currentStreak: score > 0 ? prev.stats.currentStreak + 1 : 0,
        bestStreak: Math.max(
          prev.stats.bestStreak,
          score > 0 ? prev.stats.currentStreak + 1 : prev.stats.currentStreak
        ),
      },
    }))

    // Add boost based on performance
    if (score >= 500) {
      addBoost('income', 3.0, GAME_CONFIG.boostDuration * 3)
    } else if (score >= 300) {
      addBoost('income', 2.5, GAME_CONFIG.boostDuration * 2)
    } else if (score >= 100) {
      addBoost('income', 2.0, GAME_CONFIG.boostDuration)
    } else if (score > 0) {
      addBoost('income', 1.5, GAME_CONFIG.boostDuration / 2)
    }

    setShowMiniGame(false)
  }

  const miniGame = useMiniGame(handleMiniGameEnd)

  if (showMiniGame) {
    return <MiniGame {...miniGame} />
  }

  return (
    <div className="idle-dashboard">
      <header className="dashboard-header">
        <h1>Crystal Clicker</h1>
        <p className="tagline">Idle & Play to Multiply Your Gains</p>
      </header>

      <main className="dashboard-main">
        <section className="dashboard-section">
          <ResourceCounter
            resources={gameState.resources}
            resourcesPerSecond={resourcesPerSecond}
          />
        </section>

        <section className="dashboard-section">
          <div className="action-panel">
            <button
              className="mini-game-button"
              onClick={() => setShowMiniGame(true)}
              data-testid="start-mini-game"
            >
              🎮 Play Mini-Game
            </button>
            <p className="action-hint">
              Test your skills to earn boosts and bonus crystals!
            </p>
          </div>
        </section>

        <section className="dashboard-section">
          <BoostIndicator
            boosts={getActiveBoosts()}
            getTimeRemaining={getBoostTimeRemaining}
          />
        </section>

        <section className="dashboard-section">
          <h2>Upgrades</h2>
          <div className="upgrades-grid">
            {UPGRADE_DEFINITIONS.map((upgrade) => (
              <UpgradeItem
                key={upgrade.id}
                id={upgrade.id}
                name={upgrade.name}
                description={upgrade.description}
                icon={upgrade.icon}
                level={gameState.upgrades[upgrade.id]}
                cost={getUpgradeCost(upgrade.id)}
                effect={getUpgradeEffect(upgrade.id)}
                canAfford={canAffordUpgrade(upgrade.id)}
                onPurchase={() => purchaseUpgrade(upgrade.id)}
              />
            ))}
          </div>
        </section>

        <section className="dashboard-section stats-section">
          <h2>Statistics</h2>
          <div className="stats-grid">
            <div className="stat-item">
              <div className="stat-label">Best Score</div>
              <div className="stat-value" data-testid="best-score">
                {gameState.stats.bestMiniGameScore}
              </div>
            </div>
            <div className="stat-item">
              <div className="stat-label">Games Played</div>
              <div className="stat-value">{gameState.stats.totalMiniGamesPlayed}</div>
            </div>
            <div className="stat-item">
              <div className="stat-label">Current Streak</div>
              <div className="stat-value">{gameState.stats.currentStreak}</div>
            </div>
            <div className="stat-item">
              <div className="stat-label">Best Streak</div>
              <div className="stat-value">{gameState.stats.bestStreak}</div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
