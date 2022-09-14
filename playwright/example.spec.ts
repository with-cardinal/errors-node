import { test, expect } from "@playwright/test";

test("uncaught exception", async ({ page }) => {
  await page.goto("./uncaught-exception.html");
  await expect(page).toHaveTitle("Uncaught Exception");

  const p = page.locator("p");
  await expect(p).toHaveText("Something broke");
});

test("unhandled rejection", async ({ page }) => {
  await page.goto("./unhandled-rejection.html");
  await expect(page).toHaveTitle("Unhandled Rejection");

  const p = page.locator("p");
  await expect(p).toHaveText("Unhandled rejection");
});
