import { test, expect } from '@playwright/test';

test.describe("MercadoLibre Locators Activity", () => {
    test.describe("MercadoLibre Locators Activity", () => {
        test('Activity 1: Find elements using 7 recommended locators', async ({ page }) => {
            await page.goto('https://www.mercadolibre.com.mx/');

            //getByRole
            const ofertasLink = page.getByRole('link', { name: 'Ofertas' });

            //getByPlaceholder
            const searchPlaceholder = page.getByPlaceholder('Buscar productos, marcas y más…');

            //getByText
            const categoryText = page.getByText('Categorías');

            //getByAltText
            const logoImage = page.getByAltText('Mercado Libre');

            //getByLabel
            const searchButton = page.getByLabel('Buscar');

            //getByTitle
            const cartIcon = page.getByTitle('Carrito');

            //getByTestId
            const testIdElement = page.getByTestId('search-submit-button');

            await expect.soft(searchPlaceholder).toBeVisible();
        });
    });

    test.describe("Activity 2: TodoMVC Comprehensive Tests", () => {
        test.beforeEach(async ({ page }) => {
            await page.goto('https://demo.playwright.dev/todomvc/#/');
        });

        test('1. Agregar un nuevo elemento a la lista', async ({ page }) => {
            const input = page.getByPlaceholder('What needs to be done?');
            await input.fill('Watch Devil Wears Prada 2');
            await input.press('Enter');
            await expect(page.getByTestId('todo-title')).toHaveText('Watch Devil Wears Prada 2');
            await expect(page.getByText('Learn Cypress')).not.toBeVisible();
        });

        test('2. completar un elemento de la lista', async ({ page }) => {
            await page.getByPlaceholder('What needs to be done?').fill('comprar leche');
            await page.getByPlaceholder('What needs to be done?').press('Enter');
            const checkbox = page.getByRole('checkbox', { name: 'Toggle Todo' });
            await checkbox.check();
            await expect.soft(page.getByTestId('todo-item')).toHaveClass(/completed/);
        });

        test('3. fallar test', async ({ page }) => {
            test.fail();
            const image = page.getByAltText('Non-existent Playwright Logo');
            await expect(image).toBeVisible({ timeout: 1000 }); 
            const currentCount = 0;
            expect(currentCount).toBe(5);
        });

        test('4. editar todo', async ({ page }) => {
            test.fixme();
            await page.getByPlaceholder('What needs to be done?').fill('ver Interestelar');
            await page.getByPlaceholder('What needs to be done?').press('Enter');
            const todoTitle = page.getByTestId('todo-title');
            await todoTitle.dblclick();
            const editInputTitle = page.getByTitle('Edit Todo Input'); 
            await expect(editInputTitle).toBeVisible();
        });

        test('5. eliminar todo', async ({ page }) => {
            await page.getByPlaceholder('What needs to be done?').fill('hacer tarea');
            await page.getByPlaceholder('What needs to be done?').press('Enter');
            const todoItem = page.getByTestId('todo-item');
            await todoItem.hover();
            const deleteBtn = page.getByLabel('Delete'); 
            await deleteBtn.click();
            await expect(todoItem).not.toBeVisible();
        });
    });
});