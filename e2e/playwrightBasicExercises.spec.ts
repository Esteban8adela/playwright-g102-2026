import { test, expect, firefox, BrowserContext, chromium } from '@playwright/test';

test.describe ("playwright Basic Exercises", () => {
    test('Activity 1: GitHub Sign In', async ({ page }) => {
        await page.goto('https://github.com/login');
        await page.getByLabel('Username or email address').fill('Hiroki@test.com');
        await page.getByLabel('Password').fill('GranChispa!');
        await page.getByRole('button', { name: 'Sign in', exact: true }).click();
        await expect(page.getByText('Incorrect username or password.')).toBeVisible();
    });

    test("Activity 2: Browsers & Browser context", async () => {
        const browser = await firefox.launch();
        console.log('browser context: ', browser.contexts().length);
        const context: BrowserContext = await browser.newContext();
        const page = await context.newPage();
        await page.goto('https://www.playwright.dev/');

        const page2 = await context.newPage();
        await page2.goto('https://www.google.com/');
        await page.screenshot({ path: './e2e/screenshots/page1.png' });
        await page2.screenshot({ path: './e2e/screenshots/page2.png' });
        console.log('browser context: ', context.pages().length);

        await browser.close();
    });

    test("Activity 3: Multiple pages", async () => {
        const browser = await chromium.launch();
        const context: BrowserContext = await browser.newContext();
        const page = await context.newPage();
        await page.goto('https://playwright.dev/agent-cli/installation');

        const page2 = await context.newPage();
        await page2.goto('https://playwright.dev/docs/writing-tests');

        await browser.close();
    });

    test("Activity 4: Pages Methods", async () => {
        const browser = await firefox.launch();
        console.log('browser context: ', browser.contexts().length);
        const context: BrowserContext = await browser.newContext();
        const page = await context.newPage();
        await page.goto('https://www.playwright.dev/');
        await page.screenshot({ path: './e2e/screenshots/page1.png' });

        page.once('load', () => {console.log('Page loaded!');});
        await page.goto('https://www.google.com/');
        await page.screenshot({ path: './e2e/screenshots/page2.png' });
        await page.goto('https://github.com/');
        await page.goBack();
        
        await browser.close();
    });
});