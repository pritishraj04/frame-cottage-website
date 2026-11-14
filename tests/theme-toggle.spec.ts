import { test, expect } from "@playwright/test";
import * as fs from "fs";

test.describe("Theme System & Light/Dark Mode Switcher", () => {
  test("renders ThemeToggle in header and toggles between Museum Dark and Warm Light modes with state persistence", async ({
    page,
  }) => {
    // Navigate to homepage with clean state
    await page.goto("/");

    // 1. Verify ThemeToggle presence in Header
    const headerToggle = page.getByTestId("header-theme-toggle");
    await expect(headerToggle).toBeVisible();

    // 2. Verify Initial Default Mode is Dark
    await expect(page.locator("html")).toHaveClass(/dark/);
    await expect(page.locator("html")).not.toHaveClass(/light/);
    await expect(page.locator("body")).toHaveCSS("background-color", "rgb(26, 26, 26)"); // #1A1A1A
    await expect(page.locator("body")).toHaveCSS("color", "rgb(244, 241, 234)"); // #F4F1EA
    await expect(headerToggle).toHaveAttribute("aria-label", "Switch to light theme");

    // Capture initial dark mode screenshot
    await page.screenshot({
      path: ".agent/screenshots/task-11-dark-mode.png",
      fullPage: true,
    });
    expect(fs.existsSync(".agent/screenshots/task-11-dark-mode.png")).toBe(true);

    // 3. Click ThemeToggle to Switch to Light Mode
    await headerToggle.click();

    // Verify Light Mode applied on <html> and <body>
    await expect(page.locator("html")).toHaveClass(/light/);
    await expect(page.locator("html")).not.toHaveClass(/dark/);
    await expect(page.locator("body")).toHaveCSS("background-color", "rgb(250, 248, 245)"); // #FAF8F5
    await expect(page.locator("body")).toHaveCSS("color", "rgb(26, 26, 26)"); // #1A1A1A
    await expect(headerToggle).toHaveAttribute("aria-label", "Switch to dark theme");

    const lightStorage = await page.evaluate(() =>
      localStorage.getItem("frame-cottage-theme")
    );
    expect(lightStorage).toBe("light");

    // Capture Light Mode Verification Screenshot
    await page.screenshot({
      path: ".agent/screenshots/task-11-light-mode.png",
      fullPage: true,
    });
    expect(fs.existsSync(".agent/screenshots/task-11-light-mode.png")).toBe(true);
    expect(fs.statSync(".agent/screenshots/task-11-light-mode.png").size).toBeGreaterThan(40000);

    // Capture Task-12 Light Mode Fixed Screenshot
    await page.screenshot({
      path: ".agent/screenshots/task-12-light-mode-fixed.png",
      fullPage: true,
    });
    expect(fs.existsSync(".agent/screenshots/task-12-light-mode-fixed.png")).toBe(true);
    expect(fs.statSync(".agent/screenshots/task-12-light-mode-fixed.png").size).toBeGreaterThan(40000);

    // 4. Verify LocalStorage Persistence across Page Reload (Light Mode)
    await page.reload();
    await expect(page.locator("html")).toHaveClass(/light/);
    await expect(page.locator("body")).toHaveCSS("background-color", "rgb(250, 248, 245)");
    const reloadedStorage = await page.evaluate(() =>
      localStorage.getItem("frame-cottage-theme")
    );
    expect(reloadedStorage).toBe("light");

    // 5. Click ThemeToggle to Switch Back to Dark Mode
    await page.getByTestId("header-theme-toggle").click();
    await expect(page.locator("html")).toHaveClass(/dark/);
    await expect(page.locator("html")).not.toHaveClass(/light/);
    await expect(page.locator("body")).toHaveCSS("background-color", "rgb(26, 26, 26)");
    await expect(page.locator("body")).toHaveCSS("color", "rgb(244, 241, 234)");

    const darkStorage = await page.evaluate(() =>
      localStorage.getItem("frame-cottage-theme")
    );
    expect(darkStorage).toBe("dark");

    // 6. Verify LocalStorage Persistence across Page Reload (Dark Mode)
    await page.reload();
    await expect(page.locator("html")).toHaveClass(/dark/);
    await expect(page.locator("body")).toHaveCSS("background-color", "rgb(26, 26, 26)");
    const persistedDarkStorage = await page.evaluate(() =>
      localStorage.getItem("frame-cottage-theme")
    );
    expect(persistedDarkStorage).toBe("dark");
  });

  test("supports ThemeToggle in mobile navigation drawer", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto("/");

    // Open mobile navigation menu
    const menuButton = page.getByRole("button", {
      name: "Open mobile navigation menu",
    });
    await expect(menuButton).toBeVisible();
    await menuButton.click();

    // Verify ThemeToggle inside mobile drawer
    const mobileToggle = page.getByTestId("mobile-theme-toggle");
    await expect(mobileToggle).toBeVisible();

    // Toggle theme from mobile drawer
    await mobileToggle.click();
    await expect(page.locator("html")).toHaveClass(/light/);
    await expect(page.locator("body")).toHaveCSS("background-color", "rgb(250, 248, 245)");

    const isLightInStorage = await page.evaluate(() =>
      localStorage.getItem("frame-cottage-theme")
    );
    expect(isLightInStorage).toBe("light");
  });

  test("adapts Animated Storefront cards and spatial containers cleanly to light mode", async ({
    page,
  }) => {
    await page.goto("/");
    // Switch to light mode
    await page.getByTestId("header-theme-toggle").click();
    await expect(page.locator("html")).toHaveClass(/light/);

    // 6 Service Verticals cards - verify card surface color is #FFFFFF (rgb(255, 255, 255))
    const verticalCard = page.getByTestId("service-vertical-card-bespoke-framing");
    await verticalCard.scrollIntoViewIfNeeded();
    await expect(verticalCard).toBeVisible();
    await expect(verticalCard).toHaveCSS("background-color", "rgb(255, 255, 255)"); // #FFFFFF (canvas-surface)

    // Featured Product Highlight adaptation in Light Mode
    const featuredSection = page.getByTestId("featured-product-highlight");
    await featuredSection.scrollIntoViewIfNeeded();
    await expect(featuredSection).toBeVisible();

    const leftDropzone = page.getByTestId("featured-product-canvas-dropzone");
    await expect(leftDropzone).toBeVisible();
    const dropzoneBg = await leftDropzone.evaluate((el) => window.getComputedStyle(el).backgroundColor);
    expect(dropzoneBg).toBeTruthy();
  });

  test("adapts site footer cleanly to light mode and dark mode with high contrast", async ({
    page,
  }) => {
    await page.goto("/");

    const footer = page.locator("#site-footer");
    await footer.scrollIntoViewIfNeeded();
    await expect(footer).toBeVisible();

    // 1. Verify Dark Mode initial styles
    await expect(page.locator("html")).toHaveClass(/dark/);
    await expect(footer).toHaveCSS("background-color", "rgb(20, 20, 20)"); // #141414
    await expect(footer).toHaveCSS("color", "rgb(244, 241, 234)"); // #F4F1EA

    // Dark mode bottom bar
    const bottomBar = page.getByTestId("footer-bottom-bar");
    await expect(bottomBar).toHaveCSS("background-color", "rgb(42, 42, 42)"); // #2A2A2A

    // Capture Dark Mode Footer Screenshot
    await footer.screenshot({
      path: "/Users/pritish/.gemini/antigravity/brain/91fc1fed-fc5f-495e-88c1-129ef76052af/task-13-footer-dark-mode.png",
    });
    await footer.screenshot({
      path: ".agent/screenshots/task-13-footer-dark-mode.png",
    });
    expect(
      fs.existsSync(
        "/Users/pritish/.gemini/antigravity/brain/91fc1fed-fc5f-495e-88c1-129ef76052af/task-13-footer-dark-mode.png"
      )
    ).toBe(true);
    expect(fs.existsSync(".agent/screenshots/task-13-footer-dark-mode.png")).toBe(true);

    // 2. Switch to Light Mode
    const headerToggle = page.getByTestId("header-theme-toggle");
    await headerToggle.click();
    await expect(page.locator("html")).toHaveClass(/light/);

    // Allow CSS transition to settle
    await page.waitForTimeout(300);

    // 3. Verify Light Mode footer styles
    // Must NOT be dark #141414 (rgb(20, 20, 20))
    await expect(footer).not.toHaveCSS("background-color", "rgb(20, 20, 20)");
    // Must be warm ivory #FAF8F5 (rgb(250, 248, 245))
    await expect(footer).toHaveCSS("background-color", "rgb(250, 248, 245)");
    // Must have dark ink text #1A1A1A (rgb(26, 26, 26))
    await expect(footer).toHaveCSS("color", "rgb(26, 26, 26)");

    // Bottom bar in light mode must be #F0ECE1 (rgb(240, 236, 225))
    await expect(bottomBar).toHaveCSS("background-color", "rgb(240, 236, 225)");

    // Newsletter input in light mode
    const newsletterInput = page.getByTestId("footer-newsletter-input");
    await expect(newsletterInput).toBeVisible();
    await expect(newsletterInput).toHaveCSS("background-color", "rgb(255, 255, 255)");
    await expect(newsletterInput).toHaveCSS("color", "rgb(26, 26, 26)");

    // Newsletter submit button
    const newsletterSubmit = page.getByTestId("footer-newsletter-submit");
    await expect(newsletterSubmit).toBeVisible();
    await expect(newsletterSubmit).toHaveCSS("color", "rgb(26, 26, 26)");

    // Capture Light Mode Footer Screenshot
    await footer.screenshot({
      path: "/Users/pritish/.gemini/antigravity/brain/91fc1fed-fc5f-495e-88c1-129ef76052af/task-13-footer-light-mode.png",
    });
    await footer.screenshot({
      path: ".agent/screenshots/task-13-footer-light-mode.png",
    });
    expect(
      fs.existsSync(
        "/Users/pritish/.gemini/antigravity/brain/91fc1fed-fc5f-495e-88c1-129ef76052af/task-13-footer-light-mode.png"
      )
    ).toBe(true);
    expect(fs.existsSync(".agent/screenshots/task-13-footer-light-mode.png")).toBe(true);
  });
});
