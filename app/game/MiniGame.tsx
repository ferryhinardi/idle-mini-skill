'use client'

import { useEffect, useRef } from 'react'
import { MiniGameState, Target } from '@/hooks/useMiniGame'
import { formatTime } from '@/lib/idleFormulas'
import '@/styles/minigame.css'

interface MiniGameProps {
  gameState: MiniGameState
  startGame: () => void
  endGame: () => void
  handleClick: (x: number, y: number) => void
  setContainerSize: (width: number, height: number) => void
}

export default function MiniGame({
  gameState,
  startGame,
  endGame,
  handleClick,
  setContainerSize,
}: MiniGameProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  // Initialize container size
  useEffect(() => {
    if (containerRef.current) {
      const { width, height } = containerRef.current.getBoundingClientRect()
      setContainerSize(width, height)
    }
  }, [setContainerSize])

  // Handle canvas click
  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!canvasRef.current) return

    const rect = canvasRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    handleClick(x, y)
  }

  // Draw game state
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const container = containerRef.current
    if (!container) return

    // Set canvas size
    const { width, height } = container.getBoundingClientRect()
    canvas.width = width
    canvas.height = height

    // Clear canvas
    ctx.clearRect(0, 0, width, height)

    // Draw gradient background
    const gradient = ctx.createLinearGradient(0, 0, 0, height)
    gradient.addColorStop(0, '#1a1a2e')
    gradient.addColorStop(1, '#16213e')
    ctx.fillStyle = gradient
    ctx.fillRect(0, 0, width, height)

    // Draw targets
    gameState.targets.forEach((target: Target) => {
      const age = Date.now() - target.spawnTime
      const lifetime = 2000
      const fadeProgress = age / lifetime

      // Outer glow
      const glowGradient = ctx.createRadialGradient(
        target.x,
        target.y,
        0,
        target.x,
        target.y,
        target.radius * 1.5
      )
      glowGradient.addColorStop(0, `rgba(255, 107, 107, ${0.8 * (1 - fadeProgress)})`)
      glowGradient.addColorStop(1, 'rgba(255, 107, 107, 0)')
      ctx.fillStyle = glowGradient
      ctx.beginPath()
      ctx.arc(target.x, target.y, target.radius * 1.5, 0, Math.PI * 2)
      ctx.fill()

      // Main circle
      const mainGradient = ctx.createRadialGradient(
        target.x,
        target.y,
        0,
        target.x,
        target.y,
        target.radius
      )
      mainGradient.addColorStop(0, '#ff6b6b')
      mainGradient.addColorStop(1, '#ee5a6f')
      ctx.fillStyle = mainGradient
      ctx.beginPath()
      ctx.arc(target.x, target.y, target.radius, 0, Math.PI * 2)
      ctx.fill()

      // Inner circle
      ctx.fillStyle = 'rgba(255, 255, 255, 0.3)'
      ctx.beginPath()
      ctx.arc(target.x, target.y, target.radius * 0.5, 0, Math.PI * 2)
      ctx.fill()

      // Points text
      ctx.fillStyle = 'white'
      ctx.font = 'bold 16px sans-serif'
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
      ctx.fillText(`${target.points}`, target.x, target.y)

      // Fade out ring
      ctx.strokeStyle = `rgba(255, 107, 107, ${1 - fadeProgress})`
      ctx.lineWidth = 2
      ctx.beginPath()
      ctx.arc(target.x, target.y, target.radius + fadeProgress * 20, 0, Math.PI * 2)
      ctx.stroke()
    })
  }, [gameState.targets, gameState.isPlaying])

  if (!gameState.isPlaying) {
    return (
      <div className="minigame-container" ref={containerRef}>
        <div className="minigame-start-screen">
          <h1>Target Practice</h1>
          <p className="game-instructions">
            Click on targets as they appear to earn points!
            <br />
            Chain hits for combo bonuses!
          </p>
          <div className="game-rules">
            <div className="rule-item">
              <span className="rule-icon">🎯</span>
              <span>Hit targets for points</span>
            </div>
            <div className="rule-item">
              <span className="rule-icon">⚡</span>
              <span>Build combos for bonus points</span>
            </div>
            <div className="rule-item">
              <span className="rule-icon">⏱️</span>
              <span>15 seconds to score as much as you can</span>
            </div>
          </div>
          <button className="start-game-button" onClick={startGame} data-testid="start-game">
            Start Game
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="minigame-container" ref={containerRef}>
      <div className="minigame-hud">
        <div className="hud-item">
          <span className="hud-label">Score</span>
          <span className="hud-value score-value" data-testid="game-score">
            {gameState.score}
          </span>
        </div>
        <div className="hud-item">
          <span className="hud-label">Time</span>
          <span className="hud-value time-value" data-testid="game-time">
            {formatTime(gameState.timeRemaining)}
          </span>
        </div>
        <div className="hud-item">
          <span className="hud-label">Combo</span>
          <span className="hud-value combo-value" data-testid="game-combo">
            {gameState.combo > 0 ? `x${gameState.combo}` : '-'}
          </span>
        </div>
      </div>

      <canvas
        ref={canvasRef}
        className="minigame-canvas"
        onClick={handleCanvasClick}
        data-testid="game-canvas"
      />

      <button className="end-game-button" onClick={endGame}>
        End Game
      </button>
    </div>
  )
}
