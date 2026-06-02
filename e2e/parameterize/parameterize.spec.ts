import { test, expect} from "@playwright/test";
import { MOCK_DATA, LOGIN_DATA } from "./const";

test.describe('Parameterize test', () => {
    MOCK_DATA.forEach((element) => {
        test(`Should return the same name ${element.name}`, async ({ page }) => {
            await page.goto('https://playwright.dev/');
            console.log(element.name);
            expect(element.name).toBe(element.expected);
        });

        test(`should return the reverse of the name ${element.name}`, async ({ page }) => {
            const reverseName = (name: string) => name.split('').reverse().join('');
            const reversed = reverseName(element.name);
            console.log(reversed);
            expect(reversed).toBe(element.name.split('').reverse().join(''));
        });
    })
});

test.describe('Activity 1: Parameterize login test', () => {
    LOGIN_DATA.forEach((element) => {
        test(`shouldnt login with username ${element.username} and password ${element.password}`, async ({ page}) => {
            await page.goto('https://github.com/login');
            await page.getByRole('textbox', { name: 'Username or email address' }).fill(element.username);
            await page.getByRole('textbox', { name: 'Password' }).fill(element.password);
            await page.getByRole('button', { name: 'Sign in', exact: true }).click();
            
            await expect(page.getByText('Incorrect username or password.')).toBeVisible();
        })
    })
});