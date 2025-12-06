import { useState, useEffect, useCallback, useRef } from 'react'
import { randomInt, randomFloat, pointInCircle } from '@/lib/mathUtils'
import { GAME_CONFIG } from '@/lib/types'

export interface Target {
  id: number
  x: number
  y: number
  radius: number
  points: number
  spawnTime: number
}

export interface MiniGameState {
  isPlaying: boolean
  score: number
  timeRemaining: number
  targets: Target[]
  combo: number
}

export function useMiniGame(onGameEnd: (score: number) => void) {
  const [gameState, setGameState] = useState<MiniGameState>({
    isPlaying: false,
    score: 0,
    timeRemaining: GAME_CONFIG.miniGameDuration,
    targets: [],
    combo: 0,
  })

  const gameLoopRef = useRef<number | null>(null)
  const lastUpdateRef = useRef<number>(0)
  const lastSpawnRef = useRef<number>(0)
  const targetIdCounter = useRef(0)
  const containerRef = useRef<{ width: number; height: number }>({ width: 800, height: 600 })

  const startGame = useCallback(() => {
    setGameState({
      isPlaying: true,
      score: 0,
      timeRemaining: GAME_CONFIG.miniGameDuration,
      targets: [],
      combo: 0,
    })
    lastUpdateRef.current = Date.now()
    lastSpawnRef.current = Date.now()
  }, [])

  const endGame = useCallback(() => {
    setGameState((prev) => ({
      ...prev,
      isPlaying: false,
    }))
    if (gameLoopRef.current) {
      cancelAnimationFrame(gameLoopRef.current)
      gameLoopRef.current = null
    }
    onGameEnd(gameState.score)
  }, [gameState.score, onGameEnd])

  const spawnTarget = useCallback(() => {
    const margin = 50
    const maxRadius = 40
    const minRadius = 20

    const newTarget: Target = {
      id: targetIdCounter.current++,
      x: randomInt(margin + maxRadius, containerRef.current.width - margin - maxRadius),
      y: randomInt(margin + maxRadius, containerRef.current.height - margin - maxRadius),
      radius: randomInt(minRadius, maxRadius),
      points: randomInt(10, 50),
      spawnTime: Date.now(),
    }

    setGameState((prev) => ({
      ...prev,
      targets: [...prev.targets, newTarget],
    }))
  }, [])

  const handleTargetHit = useCallback((target: Target) => {
    setGameState((prev) => {
      const newCombo = prev.combo + 1
      const comboBonus = Math.floor(newCombo / 3) * 5
      const totalPoints = target.points + comboBonus

      return {
        ...prev,
        score: prev.score + totalPoints,
        combo: newCombo,
        targets: prev.targets.filter((t) => t.id !== target.id),
      }
    })
  }, [])

  const handleClick = useCallback(
    (x: number, y: number) => {
      if (!gameState.isPlaying) return

      let hit = false
      for (const target of gameState.targets) {
        if (pointInCircle(x, y, target.x, target.y, target.radius)) {
          handleTargetHit(target)
          hit = true
          break
        }
      }

      if (!hit) {
        setGameState((prev) => ({
          ...prev,
          combo: 0,
        }))
      }
    },
    [gameState.isPlaying, gameState.targets, handleTargetHit]
  )

  const setContainerSize = useCallback((width: number, height: number) => {
    containerRef.current = { width, height }
  }, [])

  // Game loop
  useEffect(() => {
    if (!gameState.isPlaying) return

    const gameLoop = () => {
      const now = Date.now()
      const deltaTime = (now - lastUpdateRef.current) / 1000
      lastUpdateRef.current = now

      setGameState((prev) => {
        const newTimeRemaining = Math.max(0, prev.timeRemaining - deltaTime)

        if (newTimeRemaining <= 0) {
          return { ...prev, timeRemaining: 0, isPlaying: false }
        }

        // Remove expired targets
        const currentTargets = prev.targets.filter(
          (target) => now - target.spawnTime < GAME_CONFIG.targetLifetime
        )

        // Reset combo if targets expired
        const comboReset = currentTargets.length < prev.targets.length ? 0 : prev.combo

        return {
          ...prev,
          timeRemaining: newTimeRemaining,
          targets: currentTargets,
          combo: comboReset,
        }
      })

      // Spawn new targets
      if (now - lastSpawnRef.current > GAME_CONFIG.targetSpawnInterval) {
        spawnTarget()
        lastSpawnRef.current = now
      }

      gameLoopRef.current = requestAnimationFrame(gameLoop)
    }

    gameLoopRef.current = requestAnimationFrame(gameLoop)

    return () => {
      if (gameLoopRef.current) {
        cancelAnimationFrame(gameLoopRef.current)
      }
    }
  }, [gameState.isPlaying, spawnTarget])

  // End game when time runs out
  useEffect(() => {
    if (gameState.isPlaying && gameState.timeRemaining <= 0) {
      endGame()
    }
  }, [gameState.isPlaying, gameState.timeRemaining, endGame])

  return {
    gameState,
    startGame,
    endGame,
    handleClick,
    setContainerSize,
  }
}
