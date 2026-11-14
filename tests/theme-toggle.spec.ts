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

  test("adapts Atelier 50/50 slider and Customer Lookbook cards cleanly to light mode", async ({
    page,
  }) => {
    await page.goto("/");
    // Switch to light mode
    await page.getByTestId("header-theme-toggle").click();
    await expect(page.locator("html")).toHaveClass(/light/);

    // Lookbook room cards - verify card title color is dark ink #1A1A1A (rgb(26, 26, 26))
    const lookbook = page.getByTestId("customer-lookbook");
    await lookbook.scrollIntoViewIfNeeded();
    await expect(lookbook).toBeVisible();

    const lookbookCardTitle = lookbook.locator("h5").first();
    await expect(lookbookCardTitle).toHaveCSS("color", "rgb(26, 26, 26)");

    // Atelier Materials slider stage
    const atelier = page.getByTestId("atelier-materials");
    await atelier.scrollIntoViewIfNeeded();
    await expect(atelier).toBeVisible();
    const standardPanel = page.getByTestId("standard-glass-panel");
    await expect(standardPanel).toBeVisible();
    await expect(standardPanel).toHaveCSS("background-color", "rgb(240, 236, 225)"); // #F0ECE1 (canvas-subtle)
  });
});
