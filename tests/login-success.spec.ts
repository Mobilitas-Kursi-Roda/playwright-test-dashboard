import { test, expect } from '@playwright/test';

test('login-success', async ({ page }) => {
  await page.goto('https://dashboard-fe-eosin.vercel.app/login');
  await page.getByPlaceholder('usernamme or email').fill('admin');
  await page.getByPlaceholder('Password').fill('admin');
  await page.getByRole('button', { name: 'Sign In' }).click();
  await expect(page.getByRole('link', { name: 'Home' })).toBeInViewport();
});