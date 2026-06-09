import { test, expect } from '@playwright/test';

test.describe('Manipulate and contro time', () => {
    test('set fixed time', async ({ page }) => {
        await page.clock.setFixedTime( new Date('2026-03-25T10:00:00'));
        await page.goto('https://demo.playwright.dev/clock/');
        const clockTime = await page.getByTestId('clock');
        await expect(clockTime).toHaveText('10:00:00');
    });

    test('manually avance time', async({page}) => {
        // Initialize clock with some time before the test time
        // and let the page load naturally, date.now will progress as timers
        await page.clock.install({time: new Date('2024-02-02T08:00:00') });
        await page.goto('https://demo.playwright.dev/clock/');

        //pretend the user closed the laptop lid and opened it agan at 10am
        await page.clock.pauseAt(new Date('2026-03-25T10:00:00'));
        const clockTime = page.getByTestId('clock');
        await expect(clockTime).toHaveText('10:00:00');

        //simulate user closes again the lid and opens it at 10:30am
        await page.clock.fastForward('30:00');
        await expect(clockTime).toHaveText('10:30:00');
    });

    test('test inactivity monitoring', async ({page}) => {
        await page.clock.install();
        await page.goto('https://demo.playwright.dev/timer/');
        const flashText = page.getByText('Flash offer');
        await expect(flashText).toBeVisible();

        await page.clock.fastForward('05:00');
        await expect(flashText).not.toBeVisible();
        await expect(page.getByText("Offer expired")).toBeVisible();
    });
})