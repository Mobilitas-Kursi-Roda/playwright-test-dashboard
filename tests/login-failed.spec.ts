import { test, expect } from '@playwright/test';

test('login-failed', async ({ page }) => {
  await page.goto('https://dashboard-fe-eosin.vercel.app');
  await page.getByPlaceholder('usernamme or email').fill('admin');
  await page.getByPlaceholder('Password').fill('salah-password');
  await page.getByRole('button', { name: 'Sign In' }).click();
  const dialog = await page.waitForEvent('dialog');
  expect(dialog.message()).toBe('Username or Password Incorrect');
  await dialog.dismiss();
});