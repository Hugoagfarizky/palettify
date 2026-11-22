import { expect, test } from "@playwright/test";

test("home loads", async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveTitle(/Palettify/);
  await expect(
    page.getByRole("heading", { name: /Generate accessible color palettes/i }),
  ).toBeVisible();
});

test("generator shows palette", async ({ page }) => {
  await page.goto("/generator");
  await expect(page.getByText(/Palette \(drag to reorder\)/i)).toBeVisible();
});

test("contrast checker", async ({ page }) => {
  await page.goto("/contrast");
  await expect(page.getByText(/Contrast ratio/i)).toBeVisible();
});

test("extract uploads and extracts", async ({ page }) => {
  await page.goto("/extract");
  const input = page.locator('input[type="file"]');
  await input.setInputFiles("e2e/test.png");
  await expect(page.getByText(/#[0-9a-f]{6}/i).first()).toBeVisible({ timeout: 10000 });
});
