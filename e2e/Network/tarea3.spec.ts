import {test, expect} from "@playwright/test";

//Interceptar request que pida jpg y png en pagina de playwright y no haga nada y aborte
test.describe("Interceptar imagenes", () => {
    test("No hacer nada con imagenes", async ({ page }) => {
        await page.route("**/*.{jpg,png,jpeg}", async (route) => {
            await route.abort();
        });
        await page.goto("https://playwright.dev/");
        expect(
            page.getByRole("heading", {name: "Playwright enables reliable" } )
        ).toBeVisible();
    });
});