import { test, expect } from '@playwright/test';

test('emergency-notification-details', async ({ page }) => {
  await page.goto('https://dashboard-fe-eosin.vercel.app');
  await page.getByPlaceholder('usernamme or email').fill('admin');
  await page.getByPlaceholder('Password').fill('admin');
  await page.getByRole('button', { name: 'Sign In' }).click();

  // Notification page
  await page.getByRole('link', { name: 'Notification' }).click();
  await page.getByRole('link', { name: 'Details' }).first().click();

  // Validate the notification data
  await expect(page.getByRole('button', { name: 'Marker' })).toBeVisible();

  // Click the "Emergency Contact" button and validate redirect
  const [emergencyContact] = await Promise.all([
    page.waitForEvent('popup'), // Wait for new tab or window
    page.getByRole('button', { name: 'Emergency Contact' }).click(), // Click the button
  ]);

  // Validate the URL in the new tab
  await page.waitForTimeout(2000); // Ensure the new tab is fully loaded
  expect(emergencyContact.url()).toBe('https://api.whatsapp.com/send/?phone=6281238798886&text&type=phone_number&app_absent=0'); // Check the WhatsApp URL



  // Click the "User Phone Number" button and validate redirect
  const [userPhoneNumber] = await Promise.all([
    page.waitForEvent('popup'), // Wait for new tab or window
    page.getByRole('button', { name: 'User Phone Number' }).click(), // Click the button
  ]);

  // Validate the URL in the new tab
  await page.waitForTimeout(2000); // Ensure the new tab is fully loaded
  expect(userPhoneNumber.url()).toBe('https://api.whatsapp.com/send/?phone=6281238798886&text&type=phone_number&app_absent=0'); // Check the WhatsApp URL



  // Validate maps url
  const [mapsButton] = await Promise.all([
    page.waitForEvent('popup'), // Wait for new tab or window
    page.getByRole('button', { name: 'Get Direction' }).click(), // Click the button
  ]);

  // Validate the URL in the new tab
  await page.waitForTimeout(2000); // Ensure the new tab is fully loaded
  expect(mapsButton.url()).toContain("https://www.google.com/maps/place/"); // Check the WhatsApp URL
});
