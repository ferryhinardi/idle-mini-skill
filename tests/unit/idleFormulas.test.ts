import {
  calculateResourceRate,
  calculateOfflineGains,
  calculateUpgradeCost,
  calculateUpgradeEffect,
  calculateMiniGameReward,
  calculateBoostTimeRemaining,
  isBoostExpired,
  formatNumber,
  formatTime,
} from '@/lib/idleFormulas'

describe('idleFormulas', () => {
  describe('calculateResourceRate', () => {
    it('should calculate resource rate correctly', () => {
      const config = {
        baseRate: 10,
        upgradeMultiplier: 2,
        boostMultiplier: 3,
      }
      expect(calculateResourceRate(config)).toBe(60)
    })

    it('should handle zero values', () => {
      const config = {
        baseRate: 0,
        upgradeMultiplier: 1,
        boostMultiplier: 1,
      }
      expect(calculateResourceRate(config)).toBe(0)
    })
  })

  describe('calculateOfflineGains', () => {
    it('should calculate offline gains correctly', () => {
      const lastTimestamp = Date.now() - 5000 // 5 seconds ago
      const currentTimestamp = Date.now()
      const ratePerSecond = 10

      const gains = calculateOfflineGains(lastTimestamp, currentTimestamp, ratePerSecond)
      expect(gains).toBeGreaterThanOrEqual(40) // At least 4 seconds
      expect(gains).toBeLessThanOrEqual(50) // At most 5 seconds
    })

    it('should return 0 for negative time', () => {
      const lastTimestamp = Date.now()
      const currentTimestamp = Date.now() - 5000
      const ratePerSecond = 10

      expect(calculateOfflineGains(lastTimestamp, currentTimestamp, ratePerSecond)).toBe(0)
    })
  })

  describe('calculateUpgradeCost', () => {
    it('should calculate exponential cost scaling', () => {
      const baseCost = 100
      const scaleFactor = 1.15

      expect(calculateUpgradeCost(baseCost, 0, scaleFactor)).toBe(100)
      expect(calculateUpgradeCost(baseCost, 1, scaleFactor)).toBe(115)
      expect(calculateUpgradeCost(baseCost, 2, scaleFactor)).toBe(132)
    })

    it('should handle level 0', () => {
      expect(calculateUpgradeCost(50, 0)).toBe(50)
    })
  })

  describe('calculateUpgradeEffect', () => {
    it('should calculate additive effect', () => {
      expect(calculateUpgradeEffect(5, 10, 'additive')).toBe(50)
      expect(calculateUpgradeEffect(0, 10, 'additive')).toBe(0)
    })

    it('should calculate multiplicative effect', () => {
      expect(calculateUpgradeEffect(0, 0.1, 'multiplicative')).toBe(1)
      expect(calculateUpgradeEffect(5, 0.1, 'multiplicative')).toBe(1.5)
      expect(calculateUpgradeEffect(10, 0.1, 'multiplicative')).toBe(2)
    })
  })

  describe('calculateMiniGameReward', () => {
    it('should calculate reward correctly', () => {
      expect(calculateMiniGameReward(100, 5, 2)).toBe(1000)
      expect(calculateMiniGameReward(50, 10, 1)).toBe(500)
    })

    it('should floor the result', () => {
      expect(calculateMiniGameReward(33, 3, 1)).toBe(99)
    })
  })

  describe('calculateBoostTimeRemaining', () => {
    it('should calculate time remaining correctly', () => {
      const startTime = Date.now() - 30000 // 30 seconds ago
      const duration = 60000 // 60 seconds
      const currentTime = Date.now()

      const remaining = calculateBoostTimeRemaining(startTime, duration, currentTime)
      expect(remaining).toBeGreaterThanOrEqual(29000)
      expect(remaining).toBeLessThanOrEqual(30000)
    })

    it('should return 0 when expired', () => {
      const startTime = Date.now() - 70000
      const duration = 60000
      const currentTime = Date.now()

      expect(calculateBoostTimeRemaining(startTime, duration, currentTime)).toBe(0)
    })
  })

  describe('isBoostExpired', () => {
    it('should return false when boost is active', () => {
      const startTime = Date.now() - 30000
      const duration = 60000
      const currentTime = Date.now()

      expect(isBoostExpired(startTime, duration, currentTime)).toBe(false)
    })

    it('should return true when boost is expired', () => {
      const startTime = Date.now() - 70000
      const duration = 60000
      const currentTime = Date.now()

      expect(isBoostExpired(startTime, duration, currentTime)).toBe(true)
    })
  })

  describe('formatNumber', () => {
    it('should format small numbers', () => {
      expect(formatNumber(999)).toBe('999')
    })

    it('should format thousands', () => {
      expect(formatNumber(1500)).toBe('1.50K')
    })

    it('should format millions', () => {
      expect(formatNumber(2500000)).toBe('2.50M')
    })

    it('should format billions', () => {
      expect(formatNumber(3500000000)).toBe('3.50B')
    })

    it('should format trillions', () => {
      expect(formatNumber(4500000000000)).toBe('4.50T')
    })
  })

  describe('formatTime', () => {
    it('should format seconds to MM:SS', () => {
      expect(formatTime(0)).toBe('00:00')
      expect(formatTime(30)).toBe('00:30')
      expect(formatTime(90)).toBe('01:30')
      expect(formatTime(125)).toBe('02:05')
    })
  })
})
