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

test("extract page", async ({ page }) => {
  await page.goto("/extract");
  await expect(page.getByRole("heading", { name: /Image Color Extraction/i })).toBeVisible();
});
