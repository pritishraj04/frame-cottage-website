import { test, expect } from "@playwright/test";
import * as fs from "fs";

test.describe("Sticky Header, Announcement Bar, and Service Verticals Mega-Menu", () => {
  test("renders announcement bar with studio proposition and can be dismissed", async ({ page }) => {
    await page.goto("/");

    const announcement = page.getByRole("region", { name: "Announcement" });
    await expect(announcement).toBeVisible();
    await expect(announcement).toContainText("Multi-Disciplinary Design, Fabrication & Framing Studio");
    await expect(announcement).toContainText("Delivering End-to-End Solutions for B2C, B2B & Public Sector");
    await expect(announcement).toContainText("Request Project RFP");

    // Test dismiss button
    const dismissButton = page.getByRole("button", { name: "Dismiss announcement" });
    await expect(dismissButton).toBeVisible();
    await dismissButton.click();
    await expect(announcement).not.toBeVisible();
  });

  test("renders sticky header with brand wordmark and all 5 core navigation items", async ({ page }) => {
    await page.goto("/");

    const header = page.locator("header");
    await expect(header).toBeVisible();

    // Wordmark
    const wordmark = page.getByTestId("brand-wordmark");
    await expect(wordmark).toBeVisible();
    await expect(wordmark).toHaveText("FRAMES COTTAGE");

    // Desktop nav items for service verticals
    await expect(page.getByTestId("nav-service-verticals")).toBeVisible();
    await expect(page.getByTestId("nav-bespoke-framing")).toBeVisible();
    await expect(page.getByTestId("nav-spatial-signage")).toBeVisible();
    await expect(page.getByTestId("nav-industrial-cnc")).toBeVisible();
    await expect(page.getByTestId("nav-civic-projects")).toBeVisible();

    // Right actions
    await expect(page.getByTestId("header-search-btn")).toBeVisible();
    await expect(page.getByTestId("header-wishlist-link")).toBeVisible();
    const cartBtn = page.getByTestId("header-cart-btn");
    await expect(cartBtn).toBeVisible();
    await expect(page.getByTestId("cart-badge")).toHaveText("0");
  });

  test("reveals service verticals mega-menu on hover with all 6 core verticals and RFQ CTA box", async ({ page }) => {
    await page.goto("/");

    const megaMenu = page.getByTestId("mega-menu-dropdown");
    await expect(megaMenu).not.toBeVisible();

    // Hover on Service Verticals trigger
    const serviceVerticalsTrigger = page.getByTestId("nav-service-verticals");
    await serviceVerticalsTrigger.hover();

    // Verify mega menu appears
    await expect(megaMenu).toBeVisible();

    // Verify all 6 core service verticals in mega menu
    await expect(megaMenu.getByRole("heading", { name: "Retail & Standard Framing" })).toBeVisible();
    await expect(megaMenu.getByRole("heading", { name: "Bespoke Art & Custom Framing" })).toBeVisible();
    await expect(megaMenu.getByRole("heading", { name: "Spatial Design & Signage" })).toBeVisible();
    await expect(megaMenu.getByRole("heading", { name: "Industrial Fabrication & CNC Metalworks" })).toBeVisible();
    await expect(megaMenu.getByRole("heading", { name: "Custom Gifting & Mementos" })).toBeVisible();
    await expect(megaMenu.getByRole("heading", { name: "Government & Civic Projects" })).toBeVisible();

    // Column 4: Prominent RFQ CTA Box
    await expect(megaMenu.getByRole("heading", { name: "Request a Project Quote (RFQ)" })).toBeVisible();
    await expect(megaMenu.getByTestId("mega-menu-rfq-btn")).toBeVisible();
    await expect(megaMenu).toContainText("Enterprise & Civic");
    await expect(megaMenu).toContainText("Turnkey RFQ");

    // Capture screenshot of expanded mega-menu as required
    await page.screenshot({
      path: ".agent/screenshots/task-3-header-megamenu.png",
      fullPage: false,
    });
  });

  test("supports mobile navigation drawer on small screens with all 6 core service verticals", async ({ page }) => {
    // Set viewport to mobile size
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/");

    const menuButton = page.getByRole("button", { name: "Open mobile navigation menu" });
    await expect(menuButton).toBeVisible();
    await menuButton.click();

    // Dialog should open
    const drawer = page.getByRole("dialog");
    await expect(drawer).toBeVisible();
    await expect(drawer.getByRole("heading", { name: "FRAMES COTTAGE" })).toBeVisible();
    await expect(drawer.getByText("Retail & Standard Framing")).toBeVisible();
    await expect(drawer.getByText("Bespoke Art & Custom Framing")).toBeVisible();
    await expect(drawer.getByText("Spatial Design & Signage")).toBeVisible();
    await expect(drawer.getByText("Industrial Fabrication & CNC")).toBeVisible();
    await expect(drawer.getByText("Custom Gifting & Mementos")).toBeVisible();
    await expect(drawer.getByText("Government & Civic Projects")).toBeVisible();
    await expect(drawer.getByText("Request Project RFP / RFQ")).toBeVisible();

    // Close mobile drawer
    const closeButton = page.getByRole("button", { name: "Close menu" });
    await closeButton.click();
    await expect(drawer).not.toBeVisible();
  });

  test("maintains sticky header pinned to top of viewport on scroll and supports mega menu and theme switching", async ({
    page,
  }) => {
    await page.goto("/");

    // a) Initial load: header is visible, announcement bar is visible
    const announcement = page.getByRole("region", { name: "Announcement" });
    await expect(announcement).toBeVisible();
    const header = page.locator("header");
    await expect(header).toBeVisible();

    // b) Scroll down by 800px
    await page.evaluate(() => window.scrollTo(0, 800));
    await page.waitForFunction(() => window.scrollY >= 800);

    // Assert that header is visible
    await expect(header).toBeVisible();

    // Assert that header bounding box y is 0 (pinned to top)
    const box = await header.boundingBox();
    expect(box).not.toBeNull();
    expect(box?.y).toBe(0);

    // Assert that brand wordmark, search button, and cart button are visible and interactable
    const wordmark = page.getByTestId("brand-wordmark");
    await expect(wordmark).toBeVisible();

    const searchBtn = page.getByTestId("header-search-btn");
    await expect(searchBtn).toBeVisible();
    await expect(searchBtn).toBeEnabled();

    const cartBtn = page.getByTestId("header-cart-btn");
    await expect(cartBtn).toBeVisible();
    await expect(cartBtn).toBeEnabled();

    // c) Hover over Service Verticals while scrolled: assert mega-menu appears and is visible below the sticky header
    const serviceVerticalsTrigger = page.getByTestId("nav-service-verticals");
    await serviceVerticalsTrigger.hover();

    const megaMenu = page.getByTestId("mega-menu-dropdown");
    await expect(megaMenu).toBeVisible();

    const menuBox = await megaMenu.boundingBox();
    expect(menuBox).not.toBeNull();
    if (box && menuBox) {
      expect(Math.abs(menuBox.y - box.height)).toBeLessThanOrEqual(2);
    }

    // Dismiss mega-menu by moving mouse completely below the mega-menu area
    const dismissY = (menuBox?.y ?? 0) + (menuBox?.height ?? 500) + 100;
    await page.mouse.move(100, dismissY);
    await expect(megaMenu).not.toBeVisible();

    // e) Capture Dark Mode Scrolled Screenshot
    const darkBrainPath =
      "/Users/pritish/.gemini/antigravity/brain/91fc1fed-fc5f-495e-88c1-129ef76052af/task-14-sticky-header-scrolled-dark.png";
    const darkAgentPath = ".agent/screenshots/task-14-sticky-header-scrolled-dark.png";

    await page.screenshot({ path: darkBrainPath });
    await page.screenshot({ path: darkAgentPath });
    expect(fs.existsSync(darkBrainPath)).toBe(true);
    expect(fs.existsSync(darkAgentPath)).toBe(true);

    // Toggle theme to Light Mode while scrolled
    const themeToggle = page.getByTestId("header-theme-toggle");
    await expect(themeToggle).toBeVisible();
    await themeToggle.click();
    await expect(page.locator("html")).toHaveClass(/light/);
    await page.waitForTimeout(300);

    // Verify header remains pinned at top in Light Mode
    const lightBox = await header.boundingBox();
    expect(lightBox?.y).toBe(0);

    // Capture Light Mode Scrolled Screenshot
    const lightBrainPath =
      "/Users/pritish/.gemini/antigravity/brain/91fc1fed-fc5f-495e-88c1-129ef76052af/task-14-sticky-header-scrolled-light.png";
    const lightAgentPath = ".agent/screenshots/task-14-sticky-header-scrolled-light.png";

    await page.screenshot({ path: lightBrainPath });
    await page.screenshot({ path: lightAgentPath });
    expect(fs.existsSync(lightBrainPath)).toBe(true);
    expect(fs.existsSync(lightAgentPath)).toBe(true);
  });

  test("maintains sticky header pinned to top when scrolled on mobile viewport (390x844)", async ({
    page,
  }) => {
    // d) Test on mobile viewport (390x844):
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/");

    const header = page.locator("header");
    await expect(header).toBeVisible();

    // Scroll down by 600px
    await page.evaluate(() => window.scrollTo(0, 600));
    await page.waitForFunction(() => window.scrollY >= 600);

    // Verify sticky header is visible at y: 0
    await expect(header).toBeVisible();
    const box = await header.boundingBox();
    expect(box).not.toBeNull();
    expect(box?.y).toBe(0);

    // Click hamburger menu
    const menuButton = page.getByRole("button", { name: "Open mobile navigation menu" });
    await expect(menuButton).toBeVisible();
    await menuButton.click();

    // Verify mobile nav drawer opens cleanly
    const drawer = page.getByRole("dialog");
    await expect(drawer).toBeVisible();
    await expect(drawer.getByRole("heading", { name: "FRAMES COTTAGE" })).toBeVisible();
    await expect(drawer.getByText("Retail & Standard Framing")).toBeVisible();

    const closeButton = page.getByRole("button", { name: "Close menu" });
    await closeButton.click();
    await expect(drawer).not.toBeVisible();
  });
});
