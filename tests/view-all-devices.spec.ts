import { test, expect } from '@playwright/test';

test('view-all-devices', async ({ page }) => {
  await page.goto('https://dashboard-fe-eosin.vercel.app');
  await page.getByPlaceholder('usernamme or email').fill('admin');
  await page.getByPlaceholder('Password').fill('admin');
  await page.getByRole('button', { name: 'Sign In' }).click();
  await page.getByRole('link', { name: 'Devices' }).click();
  await page.waitForTimeout(1000);
  // count the number of devices should 2
  const devices = await page.locator('text=Mokura').count();
  expect(devices).toBe(2);
  
  // check the devices
  // Mokura 2 should be active
  await expect(page.locator('div').filter({ hasText: /^Mokura 2Active/ }).nth(1)).toBeVisible();

  // Mokura 1 should be inactive
  await expect(page.locator('div').filter({ hasText: /^Mokura 1Inactive/ }).nth(1)).toBeVisible();

});