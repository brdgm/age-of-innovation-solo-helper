import { test, expect } from '@playwright/test'

test('smoke test', async ({ page }) => {
  await page.goto('/')

  // app home
  await expect(page.locator('h1')).toHaveText('Age of Innovation Solo Helper')
  await page.getByRole('link', { name: 'Play Game' }).click()

  // setup game
  await page.getByRole('button', { name: 'Next' }).click()
  await page.getByRole('link', { name: 'Next' }).click()
  await page.getByTestId('terrain-player').getByTestId('terrain-lake').getByLabel('').check()
  await page.getByTestId('terrain-bot').getByTestId('terrain-plains').getByLabel('').check()
  await page.getByRole('button', { name: 'Start Game' }).click()

  // play a few rounds
  await page.getByRole('link', { name: 'Next' }).click()
  await page.getByRole('button', { name: 'Next' }).click()
  await page.getByRole('button', { name: 'Next' }).click()
  await page.getByRole('button', { name: 'Pass' }).click()
  await page.locator('#passModal').getByRole('button', { name: 'Pass' }).click()
  await page.getByRole('button', { name: 'Next' }).click()

  // abort game
  await page.getByRole('button', { name: 'Abort Game' }).click()
  await page.locator('#endGameModal').getByRole('button', { name: 'Abort Game' }).click()

  // app home
  await expect(page.locator('h1')).toHaveText('Age of Innovation Solo Helper')
})
