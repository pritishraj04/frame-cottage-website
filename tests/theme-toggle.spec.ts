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
});
