import test,{ BrowserContext, firefox, expect } from '@playwright/test';

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

    // Prueba de Mercado Libre mayo 22
    test("1. Ver Logo", async ( { page } ) => {
        await page.goto('https://www.mercadolibre.com.mx/');
        await expect(page).toHaveTitle(/Mercado Libre/i);
        const logoLink = page.getByRole('link', { name: /Mercado Libre México/i });
        await expect(logoLink).toBeVisible();
    })

    test('2. Buscar un producto usando la barra de búsqueda', async ({ page }) => {
        await page.goto('https://www.mercadolibre.com.mx/');
        const searchInput = page.getByRole('combobox', { name: 'Ingresa lo que quieras' })
        await searchInput.fill('Nintendo Switch');
        await searchInput.press('Enter');
        const resultsTitle = page.getByRole('heading', { name: 'Nintendo Switch', level: 1 });
        await expect(resultsTitle).toBeVisible();
    });

    test('3. Navegar a la sección de Ofertas desde el menú', async ({ page }) => {
        await page.goto('https://www.mercadolibre.com.mx/');
        const ofertasLink = page.getByRole('link', { name: 'Ofertas' });
        await ofertasLink.click();
        await expect(page).toHaveURL(/.*ofertas.*/);
        const titleOfertas = page.getByRole('heading', { name: 'Ofertas', level: 1 });
        await expect(titleOfertas).toBeVisible();
    });

    test('4. Interactuar con el botón del Carrito', async ({ page }) => {
        await page.goto('https://www.mercadolibre.com.mx/');        const carritoLink = page.getByRole('link', { name: 'Carrito' });
        await carritoLink.click();
        const mensajeCarrito = page.getByRole('heading', { name: /carrito/i });
        await expect(mensajeCarrito).toBeVisible();
    });

    test('5. Acceder a la página de inicio de sesión', async ({ page }) => {
        await page.goto('https://www.mercadolibre.com.mx/');
        const ingresaLink = page.getByRole('link', { name: 'Ingresa', exact: true });
        await ingresaLink.click();
        const emailInput = page.getByRole('textbox', { name: /e-mail/i }).or(page.getByRole('textbox').first());
        await expect(emailInput).toBeVisible();
    });

});