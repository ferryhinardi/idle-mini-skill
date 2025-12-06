import {
  clamp,
  lerp,
  randomInt,
  randomFloat,
  circlesCollide,
  pointInCircle,
  easeOutCubic,
  easeInCubic,
  percentage,
} from '@/lib/mathUtils'

describe('mathUtils', () => {
  describe('clamp', () => {
    it('should clamp values within range', () => {
      expect(clamp(5, 0, 10)).toBe(5)
      expect(clamp(-5, 0, 10)).toBe(0)
      expect(clamp(15, 0, 10)).toBe(10)
    })
  })

  describe('lerp', () => {
    it('should interpolate between values', () => {
      expect(lerp(0, 100, 0)).toBe(0)
      expect(lerp(0, 100, 0.5)).toBe(50)
      expect(lerp(0, 100, 1)).toBe(100)
    })
  })

  describe('randomInt', () => {
    it('should generate random integers within range', () => {
      for (let i = 0; i < 100; i++) {
        const result = randomInt(1, 10)
        expect(result).toBeGreaterThanOrEqual(1)
        expect(result).toBeLessThanOrEqual(10)
        expect(Number.isInteger(result)).toBe(true)
      }
    })
  })

  describe('randomFloat', () => {
    it('should generate random floats within range', () => {
      for (let i = 0; i < 100; i++) {
        const result = randomFloat(1.5, 5.5)
        expect(result).toBeGreaterThanOrEqual(1.5)
        expect(result).toBeLessThanOrEqual(5.5)
      }
    })
  })

  describe('circlesCollide', () => {
    it('should detect colliding circles', () => {
      expect(circlesCollide(0, 0, 5, 8, 0, 5)).toBe(true)
    })

    it('should detect non-colliding circles', () => {
      expect(circlesCollide(0, 0, 5, 20, 0, 5)).toBe(false)
    })
  })

  describe('pointInCircle', () => {
    it('should detect point inside circle', () => {
      expect(pointInCircle(0, 0, 0, 0, 10)).toBe(true)
      expect(pointInCircle(5, 0, 0, 0, 10)).toBe(true)
    })

    it('should detect point outside circle', () => {
      expect(pointInCircle(15, 0, 0, 0, 10)).toBe(false)
    })
  })

  describe('easeOutCubic', () => {
    it('should calculate ease out cubic', () => {
      expect(easeOutCubic(0)).toBe(0)
      expect(easeOutCubic(1)).toBe(1)
      expect(easeOutCubic(0.5)).toBeGreaterThan(0.5)
    })
  })

  describe('easeInCubic', () => {
    it('should calculate ease in cubic', () => {
      expect(easeInCubic(0)).toBe(0)
      expect(easeInCubic(1)).toBe(1)
      expect(easeInCubic(0.5)).toBeLessThan(0.5)
    })
  })

  describe('percentage', () => {
    it('should calculate percentage correctly', () => {
      expect(percentage(50, 100)).toBe(50)
      expect(percentage(25, 100)).toBe(25)
      expect(percentage(100, 100)).toBe(100)
    })

    it('should handle zero total', () => {
      expect(percentage(50, 0)).toBe(0)
    })
  })
})
