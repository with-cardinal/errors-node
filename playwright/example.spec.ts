import { test, expect } from "@playwright/test";

test("homepage has Playwright in title and get started link linking to the intro page", async ({
  page,
}) => {
  await page.goto("./uncaught-exception.html");

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle("Uncaught Exception");

  const p = page.locator("p");
  await expect(p).toHaveText("Something broke");
});
