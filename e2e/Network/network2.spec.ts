import { test, expect } from "@playwright/test";

test.describe("Handling HTTP requests and fallbacks", () => {
    test("Handle GET and POST requests", async ({ page }) => {
        await page.route("https://api.example.com/secure-data", async (route) => {
            if (route.request().method() === "GET") {
                route.fulfill({
                    status: 200,
                    contentType: "application/json",
                    body: JSON.stringify({ message: "GET request successful" }),
                });
            } else{
                route.fallback();
            }
        });
        await page.route("https://api.example.com/secure-data", async (route) => {
            if (route.request().method() === "POST") {
                route.fulfill({
                    status: 200,
                    contentType: "application/json",
                    body: JSON.stringify({ message: "POST request successful" }),
                });
            } else{
                route.fallback();
            }
        });
        await page.goto("https://example.com");
    });

    
});