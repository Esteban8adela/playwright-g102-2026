import test,{ BrowserContext, firefox } from '@playwright/test';

test.describe("Browser Context", () => {
    test(" should create a new browser context", async () => {
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

        await page.goto('https://www.mercadolibre.com.mx/');

        await browser.close();
    });

//    test( " page once ", async () => {
//        await page.goto('https://github.com/');
//        await page.once('popup', async (popup) => {
//            console.log('Page Loaded!');
//        });
//    });

    test("Mercado libre", async () => {
        const browser = await firefox.launch();
        console.log('browser context: ', browser.contexts().length);
        const context: BrowserContext = await browser.newContext();
        const page = await context.newPage();
        await page.goto('https://www.mercadolibre.com.mx/');
        // 1
        await page.getByRole('banner').getByRole('link', { name: 'Ayuda' }).click();
        // 2
        await page.screenshot({ path: './e2e/screenshots/mercadolibre.png' });
        await browser.close();
    });

    

});