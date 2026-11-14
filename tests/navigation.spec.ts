import { test, expect } from "@playwright/test";
import * as fs from "fs";

test.describe("Sticky Header, Announcement Bar, and India Circus Mega-Menu", () => {
  test("renders announcement bar with guarantees and can be dismissed", async ({ page }) => {
    await page.goto("/");

    const announcement = page.getByRole("region", { name: "Announcement" });
    await expect(announcement).toBeVisible();
    await expect(announcement).toContainText("Handcrafted in 5–7 Days");
    await expect(announcement).toContainText("Free White-Glove Shipping on Orders $150+");
    await expect(announcement).toContainText("100% Solid Hardwood Guarantee");

    // Test dismiss button
    const dismissButton = page.getByRole("button", { name: "Dismiss announcement" });
    await expect(dismissButton).toBeVisible();
    await dismissButton.click();
    await expect(announcement).not.toBeVisible();
  });

  test("renders sticky header with brand wordmark and quick actions", async ({ page }) => {
    await page.goto("/");

    const header = page.locator("header");
    await expect(header).toBeVisible();

    // Wordmark
    const wordmark = page.getByTestId("brand-wordmark");
    await expect(wordmark).toBeVisible();
    await expect(wordmark).toHaveText("FRAME COTTAGE");

    // Desktop nav items
    await expect(page.getByTestId("nav-custom-framing")).toBeVisible();
    await expect(page.getByTestId("nav-ready-made")).toBeVisible();
    await expect(page.getByTestId("nav-gallery-walls")).toBeVisible();
    await expect(page.getByTestId("nav-atelier")).toBeVisible();

    // Right actions
    await expect(page.getByTestId("header-search-btn")).toBeVisible();
    await expect(page.getByTestId("header-wishlist-link")).toBeVisible();
    await expect(page.getByTestId("header-account-link")).toBeVisible();
    const cartBtn = page.getByTestId("header-cart-btn");
    await expect(cartBtn).toBeVisible();
    await expect(page.getByTestId("cart-badge")).toHaveText("0");
  });

  test("reveals India Circus-inspired mega-menu on hover with all 4 columns", async ({ page }) => {
    await page.goto("/");

    const megaMenu = page.getByTestId("mega-menu-dropdown");
    await expect(megaMenu).not.toBeVisible();

    // Hover on Custom Framing trigger
    const customFramingTrigger = page.getByTestId("nav-custom-framing");
    await customFramingTrigger.hover();

    // Verify mega menu appears
    await expect(megaMenu).toBeVisible();

    // Column 1: Custom Framing
    await expect(megaMenu.getByRole("heading", { name: "Custom Framing", exact: true })).toBeVisible();
    await expect(megaMenu).toContainText("Upload & Frame");
    await expect(megaMenu).toContainText("Canvas Floating");
    await expect(megaMenu).toContainText("Document & Diploma");
    await expect(megaMenu).toContainText("Shadowboxes");

    // Column 2: By Wood & Material
    await expect(megaMenu.getByRole("heading", { name: "By Wood & Material" })).toBeVisible();
    await expect(megaMenu).toContainText("American Walnut");
    await expect(megaMenu).toContainText("Nordic White Oak");
    await expect(megaMenu).toContainText("Gallery Matte Black");
    await expect(megaMenu).toContainText("Brushed Brass");
    await expect(megaMenu).toContainText("Florentine Gold");

    // Column 3: Gallery Walls & Sets
    await expect(megaMenu.getByRole("heading", { name: "Gallery Walls & Sets" })).toBeVisible();
    await expect(megaMenu).toContainText("3-Piece Triptych");
    await expect(megaMenu).toContainText("Staircase Flow");
    await expect(megaMenu).toContainText("9-Frame Grid");
    await expect(megaMenu).toContainText("Eclectic Salon Wall");

    // Column 4: Featured Collection
    await expect(megaMenu).toContainText("The Heritage Oak Collection");
    await expect(megaMenu).toContainText("Hand-stained solid timber");

    // Capture screenshot of expanded mega-menu as required
    await page.screenshot({
      path: ".agent/screenshots/task-3-header-megamenu.png",
      fullPage: false,
    });
  });

  test("supports mobile navigation drawer on small screens", async ({ page }) => {
    // Set viewport to mobile size
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/");

    const menuButton = page.getByRole("button", { name: "Open mobile navigation menu" });
    await expect(menuButton).toBeVisible();
    await menuButton.click();

    // Dialog should open
    const drawer = page.getByRole("dialog");
    await expect(drawer).toBeVisible();
    await expect(drawer.getByText("FRAME COTTAGE")).toBeVisible();
    await expect(drawer.getByText("Custom Framing")).toBeVisible();
    await expect(drawer.getByText("Ready-Made Frames")).toBeVisible();

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

    // c) Hover over Custom Framing while scrolled: assert mega-menu appears and is visible below the sticky header
    const customFramingTrigger = page.getByTestId("nav-custom-framing");
    await customFramingTrigger.hover();

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
    await expect(drawer.getByText("FRAME COTTAGE")).toBeVisible();
    await expect(drawer.getByText("Custom Framing")).toBeVisible();

    const closeButton = page.getByRole("button", { name: "Close menu" });
    await closeButton.click();
    await expect(drawer).not.toBeVisible();
  });
});
