import { test, expect } from '@playwright/test';

test('monitor-active-device', async ({ page }) => {
  await page.goto('https://dashboard-fe-eosin.vercel.app');
  await page.getByPlaceholder('usernamme or email').fill('admin');
  await page.getByPlaceholder('Password').fill('admin');
  await page.getByRole('button', { name: 'Sign In' }).click();

  // get active device
  await page.getByRole('link', { name: 'Devices' }).click();
  await page.waitForTimeout(1000);
  await page.getByRole('link', { name: 'Details' }).click();

  // get values & delays for the socket connected
  await page.waitForTimeout(1500);

  // speed
  const speedText = await page.getByRole('heading', { name: 'km/h' }).nth(0).innerText();
  console.log('SpeedText:', speedText);

  // Extract the number before '%'
  const speedValue = parseFloat(speedText.split('km/h')[0].trim());

  // Check if the value is a number and assert conditions
  expect(!isNaN(speedValue)).toBe(true); // Ensure it's a valid number
  console.log('Speed Value:', speedValue);
  expect(speedValue).toBeGreaterThanOrEqual(0); // Example condition: Check if it's greater than 0

  // rpm
  const rpmText = await page.getByText('RPM').nth(0).innerText();
  console.log('rpmText:', rpmText);

  // Extract the number before '%'
  const rpmValue = parseFloat(rpmText.split('RPM')[0].trim());

  // Check if the value is a number and assert conditions
  expect(!isNaN(rpmValue)).toBe(true); // Ensure it's a valid number
  console.log('RPM Value:', rpmValue);
  expect(rpmValue).toBeGreaterThanOrEqual(0); // Example condition: Check if it's greater than 0

  // battery
  const battery = await page.locator('div').filter({ hasText: / Battery$/ }).nth(4);
  expect(battery.getByText('Battery')).toBeVisible();

  const batteryText = await page.getByRole('heading', { name: /%/ }).innerText();
  console.log('Battery Text:', batteryText);

  // Extract the number before '%'
  const batteryValue = parseFloat(batteryText.split('%')[0].trim());

  // Check if the value is a number and assert conditions
  expect(!isNaN(batteryValue)).toBe(true); // Ensure it's a valid number
  console.log('Battery Value:', batteryValue);
  expect(batteryValue).toBeGreaterThan(0); // Example condition: Check if it's greater than 0

});