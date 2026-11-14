import { test, expect } from "@playwright/test";
import path from "path";
import fs from "fs";

test.describe("TASK-29: Full Search Functionality (Global Command Palette Modal & Dedicated Search Page)", () => {
  const screenshotsDir = path.resolve(process.cwd(), ".agent/screenshots");
  const parentBrainDir =
    "/Users/pritish/.gemini/antigravity/brain/91fc1fed-fc5f-495e-88c1-129ef76052af";

  test.beforeAll(() => {
    if (!fs.existsSync(screenshotsDir)) {
      fs.mkdirSync(screenshotsDir, { recursive: true });
    }
    if (!fs.existsSync(parentBrainDir)) {
      fs.mkdirSync(parentBrainDir, { recursive: true });
    }
  });

  const saveScreenshots = async (locatorOrPage: any, filename: string) => {
    const agentPath = path.join(screenshotsDir, filename);
    const brainPath = path.join(parentBrainDir, filename);
    await locatorOrPage.screenshot({ path: agentPath });
    try {
      fs.copyFileSync(agentPath, brainPath);
    } catch {
      await locatorOrPage.screenshot({ path: brainPath });
    }
  };

  test("1. Clicking header-search-btn opens the global search modal", async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("/");
    await page.waitForLoadState("networkidle");

    // Force Museum Dark Mode
    await page.evaluate(() => {
      document.documentElement.classList.add("dark");
      document.documentElement.classList.remove("light");
      localStorage.setItem("frame-cottage-theme", "dark");
    });
    await page.waitForTimeout(200);

    const searchBtn = page.getByTestId("header-search-btn");
    await expect(searchBtn).toBeVisible();
    await searchBtn.click();

    // Verify modal is open
    const modal = page.getByTestId("search-modal");
    await expect(modal).toBeVisible();

    // Verify input is focused and trending pills are shown
    const input = page.getByTestId("search-modal-input");
    await expect(input).toBeVisible();

    // Verify trending pills
    await expect(page.getByTestId("trending-pill-walnut")).toBeVisible();
    await expect(page.getByTestId("trending-pill-truvue")).toBeVisible();
    await expect(page.getByTestId("trending-pill-signage")).toBeVisible();

    // Capture task-29-search-modal-dark.png
    await saveScreenshots(page, "task-29-search-modal-dark.png");

    // Test Esc key closes modal
    await page.keyboard.press("Escape");
    await expect(modal).not.toBeVisible();
  });

  test("2. Keyboard shortcut Cmd+K / Ctrl+K opens and toggles search modal", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("/");
    await page.waitForLoadState("networkidle");

    // Set Light Mode
    await page.evaluate(() => {
      document.documentElement.classList.add("light");
      document.documentElement.classList.remove("dark");
      localStorage.setItem("frame-cottage-theme", "light");
    });
    await page.waitForTimeout(200);

    // Trigger Meta+k or Control+k
    const isMac = process.platform === "darwin";
    await page.keyboard.press(isMac ? "Meta+k" : "Control+k");

    const modal = page.getByTestId("search-modal");
    await expect(modal).toBeVisible();

    // Type into input
    const input = page.getByTestId("search-modal-input");
    await input.fill("TruVue");
    await page.waitForTimeout(300);

    // Verify matching items in search results list
    const resultsList = page.getByTestId("search-results-list");
    await expect(resultsList).toBeVisible();
    await expect(page.getByTestId("search-result-item-material-truvue-optium")).toBeVisible();

    // Capture task-29-search-modal-light.png
    await saveScreenshots(page, "task-29-search-modal-light.png");

    // Press Escape to close
    await page.keyboard.press("Escape");
    await expect(modal).not.toBeVisible();
  });

  test("3. Search modal: typing 'Walnut' returns matching products and verticals", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("/");
    await page.waitForLoadState("networkidle");

    await page.getByTestId("header-search-btn").click();
    const modal = page.getByTestId("search-modal");
    await expect(modal).toBeVisible();

    const input = page.getByTestId("search-modal-input");
    await input.fill("Walnut");
    await page.waitForTimeout(300);

    // Should match products and materials
    await expect(page.getByTestId("search-result-item-product-heritage-walnut")).toBeVisible();
    await expect(page.getByTestId("search-result-item-material-appalachian-walnut")).toBeVisible();

    // Test filter pills inside modal (e.g., Products)
    await page.getByTestId("modal-filter-products").click();
    await page.waitForTimeout(200);
    await expect(page.getByTestId("search-result-item-product-heritage-walnut")).toBeVisible();
    await expect(page.getByTestId("search-result-item-material-appalachian-walnut")).not.toBeVisible();

    // Switch back to All
    await page.getByTestId("modal-filter-all").click();
    await page.waitForTimeout(200);
    await expect(page.getByTestId("search-result-item-material-appalachian-walnut")).toBeVisible();
  });

  test("4. Clicking a search result navigates to target page", async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("/");
    await page.waitForLoadState("networkidle");

    await page.getByTestId("header-search-btn").click();
    const input = page.getByTestId("search-modal-input");
    await input.fill("Retail");
    await page.waitForTimeout(300);

    const retailResult = page.getByTestId("search-result-item-vertical-retail-framing");
    await expect(retailResult).toBeVisible();
    await retailResult.click();

    // Verify URL navigated to retail framing
    await page.waitForURL("**/services/retail-framing");
    expect(page.url()).toContain("/services/retail-framing");
  });

  test("5. Dedicated Search Page (/search?q=Signage): renders filtered results in spatial canvas", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("/search?q=Signage");
    await page.waitForLoadState("networkidle");

    // Force Dark Mode
    await page.evaluate(() => {
      document.documentElement.classList.add("dark");
      document.documentElement.classList.remove("light");
      localStorage.setItem("frame-cottage-theme", "dark");
    });
    await page.waitForTimeout(200);

    // Assert search input value reflected
    const searchInput = page.getByTestId("search-page-input");
    await expect(searchInput).toHaveValue("Signage");

    // Assert results counter badge
    const counter = page.getByTestId("search-results-counter");
    await expect(counter).toBeVisible();
    const counterText = await counter.textContent();
    expect(counterText).toMatch(/\d+\s+Studio Records Found/);

    // Assert cards in results grid
    await expect(page.getByTestId("search-card-vertical-spatial-signage")).toBeVisible();
    await expect(page.getByTestId("search-card-product-wayfinding-pylon")).toBeVisible();

    // Capture task-29-search-results-page-dark.png
    await saveScreenshots(page, "task-29-search-results-page-dark.png");
  });

  test("6. Category filter tabs on /search and Light Mode rendering", async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("/search?q=Walnut");
    await page.waitForLoadState("networkidle");

    // Force Light Mode
    await page.evaluate(() => {
      document.documentElement.classList.add("light");
      document.documentElement.classList.remove("dark");
      localStorage.setItem("frame-cottage-theme", "light");
    });
    await page.waitForTimeout(200);

    // Click "Materials & Specs" filter pill
    await page.getByTestId("search-filter-materials").click();
    await page.waitForTimeout(200);

    // Solid Appalachian Walnut should be visible, heritage walnut product should not
    await expect(page.getByTestId("search-card-material-appalachian-walnut")).toBeVisible();
    await expect(page.getByTestId("search-card-product-heritage-walnut")).not.toBeVisible();

    // Click "Products & Frames" filter pill
    await page.getByTestId("search-filter-products").click();
    await page.waitForTimeout(200);

    await expect(page.getByTestId("search-card-product-heritage-walnut")).toBeVisible();
    await expect(page.getByTestId("search-card-material-appalachian-walnut")).not.toBeVisible();

    // Reset to "All Records"
    await page.getByTestId("search-filter-all").click();
    await page.waitForTimeout(200);
    await expect(page.getByTestId("search-card-product-heritage-walnut")).toBeVisible();
    await expect(page.getByTestId("search-card-material-appalachian-walnut")).toBeVisible();

    // Capture task-29-search-results-page-light.png
    await saveScreenshots(page, "task-29-search-results-page-light.png");
  });

  test("7. Empty search state with query 'xyznonexistent'", async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("/search?q=xyznonexistent");
    await page.waitForLoadState("networkidle");

    const emptyState = page.getByTestId("search-empty-state");
    await expect(emptyState).toBeVisible();
    await expect(emptyState).toContainText("No studio records found matching");
    await expect(emptyState).toContainText("xyznonexistent");

    // WhatsApp CTA button and RFQ button visible
    await expect(emptyState.getByText("Consult with Studio Expert on WhatsApp")).toBeVisible();
    await expect(emptyState.getByText("Request Custom RFQ")).toBeVisible();
  });

  test("8. Mobile Viewport (390×844) Responsiveness & Zero Horizontal Overflow", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/search?q=Walnut");
    await page.waitForLoadState("networkidle");

    // Assert zero horizontal overflow on /search
    const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
    const clientWidth = await page.evaluate(() => document.documentElement.clientWidth);
    expect(scrollWidth).toBeLessThanOrEqual(clientWidth + 1);

    // Verify search input and results are visible on mobile
    await expect(page.getByTestId("search-page-input")).toBeVisible();
    await expect(page.getByTestId("search-card-product-heritage-walnut")).toBeVisible();

    // Capture task-29-search-mobile.png
    await saveScreenshots(page, "task-29-search-mobile.png");

    // Also test mobile nav search submission
    await page.goto("/");
    await page.waitForLoadState("networkidle");

    const mobileMenuTrigger = page.locator('button[aria-label="Open mobile navigation menu"]');
    await expect(mobileMenuTrigger).toBeVisible();
    await mobileMenuTrigger.click();

    const mobileSearchInput = page.getByTestId("mobile-search-input");
    await expect(mobileSearchInput).toBeVisible();
    await mobileSearchInput.fill("Brass");
    await mobileSearchInput.press("Enter");

    // Should navigate to /search?q=Brass
    await page.waitForURL("**/search?q=Brass");
    expect(page.url()).toContain("search?q=Brass");
  });
});
