import { test, expect } from '@playwright/test';

test('overview-devices', async ({ page }) => {
  await page.goto('https://dashboard-fe-eosin.vercel.app/login');
  await page.getByPlaceholder('usernamme or email').fill('admin');
  await page.getByPlaceholder('Password').fill('admin');
  await page.getByRole('button', { name: 'Sign In' }).click();
  await expect(page.getByText('Mokura 2Active')).toBeVisible();
  await page.getByRole('button', { name: 'Marker' }).nth(1).click();
  await expect(page.getByText('Mokura 1Inactive')).toBeVisible();
});