import {test, expect} from "@playwright/test";

interface IFruit {
    name: string;
    id: number;
}

test.describe("Network tests", () => {
    test("mocks a fruit does not call API", async ({ page }) => {
        // Step 1: Mock API call before navigation
        await page.route("*/**/api-mocking/api/v1/fruits", async (route) => {
            // Step 2: Provide mock response
            const json: IFruit[] = [
                { name: "Maria", id: 105 },
                { name: "Melon", id: 10 }
            ];
            // Step 3: Replace response with mock
            await route.fulfill({ json: json, status: 201 });
        });

        await page.goto("https://demo.playwright.dev/api-mocking/");
        await expect(page.getByText("Maria")).toBeVisible();

    });

    test("Gets the json from the API and adds a new fruit", async ({ page}) => {
        let resolveIntercept!: () => void;
        const interceptDone = new Promise<void>((resolve) => {
            resolveIntercept = resolve;
        });
        await page.route("*/**/api-mocking/api/v1/fruits", async (route) => {
            const response = await route.fetch();
            const json = await response.json();
            json.push({ name: "Playwright", id: 100 });
            await route.fulfill({ response, json });
            resolveIntercept();
        });
        try{
            await page.goto("https://demo.playwright.dev/api-mocking");
            await interceptDone;
            await expect(page.getByText("Playwright", { exact: true })).toBeVisible();
        } finally {
            await page.unrouteAll({ behavior: "ignoreErrors" });
        }
    });
});

test.describe('Mocking with HAR files', () => {
    test('Records or updates the HAR file', async ({page}) => {
        await page.routeFromHAR('./hars/fruit.har', {
            url: '*/**/api-mocking/api/v1/fruits',
            update: true,
        });
        await page.goto("https://demo.playwright.dev/api-mocking/");
        await expect(page.getByText("Strawberry")).toBeVisible();
    });

    test('gets the json from the HAR file and checks the new fruit has been added', async ({page}) => {
        await page.routeFromHAR('./hars/fruit.har', {
            url: '*/**/api-mocking/api/v1/fruits',
            update: false,
        });
        await page.goto("https://demo.playwright.dev/api-mocking/");
        await expect(page.getByText("Strawberry")).toBeVisible();
    })
});