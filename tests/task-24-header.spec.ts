import { test, expect } from "@playwright/test";
import path from "path";
import fs from "fs";

test.describe("TASK-24: Redesign Site Header Navigation to Orthodox Luxury Studio Architecture", () => {
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

  test("verifies redesigned orthodox luxury studio header architecture and captures visual proof screenshots", async ({
    page,
  }) => {
    // 1. Desktop Dark Mode (1440x900)
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("/");
    await page.waitForLoadState("networkidle");

    // Force Dark Mode
    await page.evaluate(() => {
      document.documentElement.classList.add("dark");
      document.documentElement.classList.remove("light");
      localStorage.setItem("frame-cottage-theme", "dark");
    });
    await page.waitForTimeout(300);

    const header = page.locator("header");
    await expect(header).toBeVisible();

    // Verify 1. Left (Brand Anchor)
    const wordmark = page.getByTestId("brand-wordmark");
    await expect(wordmark).toBeVisible();
    await expect(wordmark).toHaveText("FRAMES COTTAGE");

    const subTagline = page.locator("header").getByText("Design & Fabrication Studio");
    await expect(subTagline).toBeVisible();

    // Verify 2. Center (Desktop Navigation)
    const nav = page.getByRole("navigation", { name: "Main Navigation" });
    await expect(nav).toBeVisible();
    await expect(page.getByTestId("nav-service-verticals")).toBeVisible();
    await expect(page.getByTestId("nav-bespoke-framing")).toBeVisible();
    await expect(page.getByTestId("nav-spatial-signage")).toBeVisible();
    await expect(page.getByTestId("nav-industrial-cnc")).toBeVisible();
    await expect(page.getByTestId("nav-civic-projects")).toBeVisible();

    // Verify 3. Right (Actions & Utility)
    const rfqBtn = page.locator('header a[href="/rfq"]').filter({ hasText: "Request RFQ" });
    await expect(rfqBtn).toBeVisible();
    await expect(page.getByTestId("header-theme-toggle")).toBeVisible();
    await expect(page.getByTestId("header-search-btn")).toBeVisible();
    await expect(page.getByTestId("header-wishlist-link")).toBeVisible();
    await expect(page.getByTestId("header-account-link")).toBeVisible();
    await expect(page.getByTestId("header-cart-btn")).toBeVisible();
    await expect(page.getByTestId("cart-badge")).toHaveText("0");

    // Capture Desktop Dark Screenshot of Header
    const darkAgentPath = path.join(screenshotsDir, "task-24-header-redesign-dark.png");
    const darkBrainPath = path.join(parentBrainDir, "task-24-header-redesign-dark.png");
    await header.screenshot({ path: darkAgentPath });
    await header.screenshot({ path: darkBrainPath });
    expect(fs.existsSync(darkAgentPath)).toBe(true);
    expect(fs.existsSync(darkBrainPath)).toBe(true);

    // 2. Desktop Light Mode
    const themeToggle = page.getByTestId("header-theme-toggle");
    await themeToggle.click();
    await expect(page.locator("html")).toHaveClass(/light/);
    await page.waitForTimeout(300);

    const lightAgentPath = path.join(screenshotsDir, "task-24-header-redesign-light.png");
    const lightBrainPath = path.join(parentBrainDir, "task-24-header-redesign-light.png");
    await header.screenshot({ path: lightAgentPath });
    await header.screenshot({ path: lightBrainPath });
    expect(fs.existsSync(lightAgentPath)).toBe(true);
    expect(fs.existsSync(lightBrainPath)).toBe(true);

    // 3. Mobile Viewport (390x844)
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/");
    await page.waitForLoadState("networkidle");

    // Verify zero horizontal overflow
    const { scrollWidth, clientWidth } = await page.evaluate(() => ({
      scrollWidth: document.documentElement.scrollWidth,
      clientWidth: document.documentElement.clientWidth,
    }));
    expect(scrollWidth).toBeLessThanOrEqual(clientWidth);

    // Verify MobileNav hamburger button is visible
    const hamburger = page.getByRole("button", { name: "Open mobile navigation menu" });
    await expect(hamburger).toBeVisible();

    // Verify brand wordmark is visible
    await expect(wordmark).toBeVisible();

    // Verify center desktop nav is hidden on mobile
    await expect(nav).not.toBeVisible();

    // Verify mobile header screenshot
    const mobileHeader = page.locator("header");
    const mobileAgentPath = path.join(screenshotsDir, "task-24-header-redesign-mobile.png");
    const mobileBrainPath = path.join(parentBrainDir, "task-24-header-redesign-mobile.png");
    await mobileHeader.screenshot({ path: mobileAgentPath });
    await mobileHeader.screenshot({ path: mobileBrainPath });
    expect(fs.existsSync(mobileAgentPath)).toBe(true);
    expect(fs.existsSync(mobileBrainPath)).toBe(true);
  });
});
