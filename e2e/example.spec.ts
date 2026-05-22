import { test, expect } from '@playwright/test';

test.describe("playwright Demo", () => {
  test('has title', async ({ page }) => {
    await page.goto('https://playwright.dev/');

    // Expect a title "to contain" a substring.
    await expect(page).toHaveTitle(/Playwright/);
  });
});

test('get started link', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Click the get started link.
  await page.getByRole('link', { name: 'Get started' }).click();

  // Expects page to have a heading with the name of Installation.
  await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
});

test('GitHub Sign In', async ({ page }) => {
  await page.goto('https://github.com/login');

  // Click the get started link.
  await page.getByLabel('Username or email address').fill('Hiroki@test.com');
  await page.getByLabel('Password').fill('GranChispa!');
  await page.getByRole('button', { name: 'Sign in', exact: true }).click();

  // Check for error message
  await expect(page.getByText('Incorrect username or password.')).toBeVisible();
});