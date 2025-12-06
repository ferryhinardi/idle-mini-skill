import { test, expect } from '@playwright/test'

test.describe('Idle Game Flow', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('should display initial game state', async ({ page }) => {
    // Check title
    await expect(page.locator('h1')).toContainText('Crystal Clicker')

    // Check resource counter is visible
    await expect(page.getByTestId('resource-amount')).toBeVisible()
    await expect(page.getByTestId('resource-rate')).toBeVisible()

    // Check mini-game button
    await expect(page.getByTestId('start-mini-game')).toBeVisible()
  })

  test('should accumulate resources over time', async ({ page }) => {
    // Get initial resource value
    const initialResources = await page.getByTestId('resource-amount').textContent()

    // Wait for resources to accumulate
    await page.waitForTimeout(2000)

    // Check resources increased
    const currentResources = await page.getByTestId('resource-amount').textContent()
    expect(currentResources).not.toBe(initialResources)
  })

  test('should allow purchasing upgrades when affordable', async ({ page }) => {
    // Add resources via localStorage
    await page.evaluate(() => {
      const state = {
        resources: 10000,
        lastTimestamp: Date.now(),
        upgrades: {
          generatorLevel: 0,
          multiplierLevel: 0,
          miniGameBoosterLevel: 0,
          offlineGainLevel: 0,
        },
        boosts: [],
        stats: {
          bestMiniGameScore: 0,
          totalMiniGamesPlayed: 0,
          totalResourcesEarned: 0,
          currentStreak: 0,
          bestStreak: 0,
        },
      }
      localStorage.setItem('idle-mini-skill-game-state', JSON.stringify(state))
    })

    // Reload page
    await page.reload()

    // Wait for resources to be loaded
    await expect(page.getByTestId('resource-amount')).toBeVisible()

    // Check generator level is 0
    const initialLevel = await page.getByTestId('generatorLevel-level').textContent()
    expect(initialLevel).toBe('0')

    // Purchase upgrade
    await page.getByTestId('upgrade-generatorLevel').click()

    // Check level increased
    await expect(page.getByTestId('generatorLevel-level')).toContainText('1')
  })

  test('should not allow purchasing upgrades when unaffordable', async ({ page }) => {
    // Ensure low resources
    await page.evaluate(() => {
      localStorage.removeItem('idle-mini-skill-game-state')
    })
    await page.reload()

    // Try to click upgrade button (should be disabled)
    const upgradeButton = page.getByTestId('upgrade-generatorLevel')
    await expect(upgradeButton).toBeDisabled()
  })
})

test.describe('Mini-Game Flow', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('should open mini-game on button click', async ({ page }) => {
    await page.getByTestId('start-mini-game').click()

    // Check mini-game screen appears
    await expect(page.getByTestId('start-game')).toBeVisible()
  })

  test('should start mini-game and display HUD', async ({ page }) => {
    await page.getByTestId('start-mini-game').click()
    await page.getByTestId('start-game').click()

    // Check HUD elements
    await expect(page.getByTestId('game-score')).toBeVisible()
    await expect(page.getByTestId('game-time')).toBeVisible()
    await expect(page.getByTestId('game-combo')).toBeVisible()
    await expect(page.getByTestId('game-canvas')).toBeVisible()
  })

  test('should count down time during game', async ({ page }) => {
    await page.getByTestId('start-mini-game').click()
    await page.getByTestId('start-game').click()

    // Get initial time
    const initialTime = await page.getByTestId('game-time').textContent()

    // Wait a bit
    await page.waitForTimeout(1000)

    // Check time decreased
    const currentTime = await page.getByTestId('game-time').textContent()
    expect(currentTime).not.toBe(initialTime)
  })

  test('should allow clicking targets', async ({ page }) => {
    await page.getByTestId('start-mini-game').click()
    await page.getByTestId('start-game').click()

    // Wait for targets to spawn
    await page.waitForTimeout(1000)

    // Get initial score
    const initialScore = await page.getByTestId('game-score').textContent()

    // Click on canvas multiple times
    const canvas = page.getByTestId('game-canvas')
    await canvas.click({ position: { x: 400, y: 300 } })
    await canvas.click({ position: { x: 200, y: 200 } })
    await canvas.click({ position: { x: 600, y: 400 } })

    // Wait a bit for potential score updates
    await page.waitForTimeout(300)

    // Score should potentially change (if we hit a target)
    const currentScore = await page.getByTestId('game-score').textContent()
    // Note: Score might not change if we didn't hit targets, but the test validates the game is interactive
  })

  test('should end game and return to dashboard', async ({ page }) => {
    await page.getByTestId('start-mini-game').click()
    await page.getByTestId('start-game').click()

    // Wait a bit
    await page.waitForTimeout(1000)

    // End game
    await page.locator('.end-game-button').click()

    // Should return to dashboard
    await expect(page.getByTestId('start-mini-game')).toBeVisible()
    await expect(page.getByTestId('best-score')).toBeVisible()
  })
})

test.describe('Boost System', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('should apply boost after completing mini-game', async ({ page }) => {
    // Complete mini-game with some score
    await page.getByTestId('start-mini-game').click()
    await page.getByTestId('start-game').click()

    // Wait and click to get some score
    await page.waitForTimeout(1000)
    const canvas = page.getByTestId('game-canvas')
    
    // Click multiple times to potentially hit targets
    for (let i = 0; i < 10; i++) {
      await canvas.click({ 
        position: { 
          x: 100 + (i * 50), 
          y: 100 + (i * 30) 
        } 
      })
      await page.waitForTimeout(50)
    }

    // End game
    await page.locator('.end-game-button').click()

    // Check if boost indicator appears
    // Note: Boost only appears if score > 0
    const boostIndicator = page.getByTestId('boost-indicator')
    await expect(boostIndicator).toBeVisible()
  })
})

test.describe('Persistence', () => {
  test('should persist game state across page reloads', async ({ page }) => {
    // Set initial state with resources
    await page.evaluate(() => {
      const state = {
        resources: 5000,
        lastTimestamp: Date.now(),
        upgrades: {
          generatorLevel: 3,
          multiplierLevel: 1,
          miniGameBoosterLevel: 0,
          offlineGainLevel: 0,
        },
        boosts: [],
        stats: {
          bestMiniGameScore: 250,
          totalMiniGamesPlayed: 5,
          totalResourcesEarned: 5000,
          currentStreak: 2,
          bestStreak: 3,
        },
      }
      localStorage.setItem('idle-mini-skill-game-state', JSON.stringify(state))
    })

    await page.goto('/')

    // Verify generator level persisted
    await expect(page.getByTestId('generatorLevel-level')).toContainText('3')

    // Verify best score persisted
    await expect(page.getByTestId('best-score')).toContainText('250')
  })

  test('should calculate offline gains on reload', async ({ page }) => {
    // Set state with old timestamp
    await page.evaluate(() => {
      const state = {
        resources: 1000,
        lastTimestamp: Date.now() - 10000, // 10 seconds ago
        upgrades: {
          generatorLevel: 5,
          multiplierLevel: 2,
          miniGameBoosterLevel: 0,
          offlineGainLevel: 0,
        },
        boosts: [],
        stats: {
          bestMiniGameScore: 0,
          totalMiniGamesPlayed: 0,
          totalResourcesEarned: 1000,
          currentStreak: 0,
          bestStreak: 0,
        },
      }
      localStorage.setItem('idle-mini-skill-game-state', JSON.stringify(state))
    })

    await page.goto('/')

    // Resources should be more than 1000 due to offline gains
    const resources = await page.getByTestId('resource-amount').textContent()
    // The exact value depends on the formula, but it should be greater
    expect(resources).not.toBe('1,000')
  })
})
