/**
 * Core formulas for idle game progression
 */

export interface IdleConfig {
  baseRate: number
  upgradeMultiplier: number
  boostMultiplier: number
}

/**
 * Calculate resources generated per second
 */
export function calculateResourceRate(config: IdleConfig): number {
  return config.baseRate * config.upgradeMultiplier * config.boostMultiplier
}

/**
 * Calculate resources generated over time using timestamps
 */
export function calculateOfflineGains(
  lastTimestamp: number,
  currentTimestamp: number,
  ratePerSecond: number
): number {
  const elapsedSeconds = Math.floor((currentTimestamp - lastTimestamp) / 1000)
  return Math.max(0, elapsedSeconds * ratePerSecond)
}

/**
 * Calculate upgrade cost with exponential scaling
 * Formula: baseCost * (scaleFactor ^ level)
 */
export function calculateUpgradeCost(
  baseCost: number,
  level: number,
  scaleFactor: number = 1.15
): number {
  return Math.floor(baseCost * Math.pow(scaleFactor, level))
}

/**
 * Calculate upgrade effect
 * Different upgrade types have different formulas
 */
export function calculateUpgradeEffect(
  level: number,
  baseEffect: number,
  type: 'additive' | 'multiplicative'
): number {
  if (type === 'additive') {
    return baseEffect * level
  }
  // multiplicative: 1 + (0.1 * level) = 1, 1.1, 1.2, 1.3...
  return 1 + (baseEffect * level)
}

/**
 * Calculate mini-game reward based on score
 */
export function calculateMiniGameReward(
  score: number,
  baseReward: number,
  bonusMultiplier: number = 1
): number {
  return Math.floor(score * baseReward * bonusMultiplier)
}

/**
 * Calculate boost duration remaining
 */
export function calculateBoostTimeRemaining(
  boostStartTime: number,
  boostDuration: number,
  currentTime: number
): number {
  const elapsed = currentTime - boostStartTime
  return Math.max(0, boostDuration - elapsed)
}

/**
 * Check if boost is expired
 */
export function isBoostExpired(
  boostStartTime: number,
  boostDuration: number,
  currentTime: number
): boolean {
  return calculateBoostTimeRemaining(boostStartTime, boostDuration, currentTime) <= 0
}

/**
 * Format large numbers for display
 */
export function formatNumber(num: number): string {
  if (num < 1000) return num.toFixed(0)
  if (num < 1000000) return (num / 1000).toFixed(2) + 'K'
  if (num < 1000000000) return (num / 1000000).toFixed(2) + 'M'
  if (num < 1000000000000) return (num / 1000000000).toFixed(2) + 'B'
  return (num / 1000000000000).toFixed(2) + 'T'
}

/**
 * Format time in seconds to MM:SS
 */
export function formatTime(seconds: number): string {
  const mins = Math.floor(seconds / 60)
  const secs = Math.floor(seconds % 60)
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
}
