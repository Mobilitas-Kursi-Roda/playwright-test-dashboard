import { test, expect } from '@playwright/test';

test('data-history-devices', async ({ page }) => {
  await page.goto('https://dashboard-fe-eosin.vercel.app');
  await page.getByPlaceholder('usernamme or email').fill('admin');
  await page.getByPlaceholder('Password').fill('admin');
  await page.getByRole('button', { name: 'Sign In' }).click();
``
  await page.getByRole('link', { name: 'Records' }).click();
  await page.getByRole('combobox').selectOption('2');
  await page.getByRole('button', { name: 'Submit' }).click();

  // make sure record is more than 0
  await page.waitForTimeout(1000);
  expect(await page.locator('.col').count()).toBeGreaterThan(0);
  await page.locator('.btn').first().click();

  // check the map
  await expect(page.locator('.leaflet-interactive').first()).toBeVisible();

  // check the graph
  expect(await page.locator('foreignobject').count()).toEqual(3);

});