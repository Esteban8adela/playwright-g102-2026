import { test, expect } from "@playwright/test";

test.describe("Understanding the test generator feature", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("https://playwright.dev/");
  });

  test(
    "should redirect to playwright intro page",
    { tag: ["@Anechis"] },
    async ({ page }) => {
      //El usuario le da click al login button y deapues checa qye en su pantalla tenga ppermisos de desarrollo
      //Pantalla de desarrollador
      await page.goto("https://playwright.dev/");
      await expect(
        page.getByRole("link", { name: "Get started" }),
      ).toBeVisible();
      await expect(page.getByRole("main")).toContainText(
        "npm init playwright@latest",
      );

      await page.getByRole("link", { name: "Get started" }).click();
      await page.goto("https://playwright.dev/");
      await page.getByRole("button", { name: "Search (Meta+k)" }).click();
      await expect(page.getByRole("searchbox", { name: "Search" })).toBeEmpty();
      await page.getByRole("button", { name: "Cancel" }).click();
      await expect(page.getByRole("main")).toMatchAriaSnapshot(`
      - heading "Playwright Test" [level=3]
      - paragraph: Full-featured test runner with auto-waiting, assertions, tracing, and parallelism across Chromium, Firefox, and WebKit.
      - code: npm init playwright@latest
      - link "Testing documentation":
        - /url: /docs/intro
      - heading "Playwright CLI" [level=3]
      - paragraph: Token-efficient browser automation for coding agents like Claude Code and GitHub Copilot. Skill-based workflows without large context overhead.
      - code: npm i -g @playwright/cli@latest
      - link "CLI documentation":
        - /url: /docs/getting-started-cli
      - heading "Playwright MCP" [level=3]
      - paragraph: Model Context Protocol server that gives AI agents full browser control through structured accessibility snapshots.
      - code: npx @playwright/mcp@latest
      - link "MCP documentation":
        - /url: /docs/getting-started-mcp
      `);
    },
  );
});
