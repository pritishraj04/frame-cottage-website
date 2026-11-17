import { test, expect } from "@playwright/test";
import path from "path";
import fs from "fs";

test.describe("TASK-45: Fix Account Button Visibility & Resilience", () => {
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

  test("verifies account button on desktop (1440x900) has rendered svg icon and captures screenshot", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("/");
    await page.waitForLoadState("networkidle");

    const accountLink = page.getByTestId("header-account-link");
    await expect(accountLink).toBeVisible();

    // Verify it is NOT an empty HTML tag and has an inner SVG icon
    const svgIcon = accountLink.locator("svg");
    await expect(svgIcon).toBeVisible();

    const box = await accountLink.boundingBox();
    expect(box).not.toBeNull();
    expect(box!.width).toBeGreaterThan(15);
    expect(box!.height).toBeGreaterThan(15);

    // Capture desktop header screenshot focusing on right side actions
    const header = page.locator("header");
    const desktopAgentPath = path.join(
      screenshotsDir,
      "task-45-header-account-desktop.png"
    );
    const desktopBrainPath = path.join(
      parentBrainDir,
      "task-45-header-account-desktop.png"
    );

    await header.screenshot({ path: desktopAgentPath });
    await header.screenshot({ path: desktopBrainPath });
    expect(fs.existsSync(desktopAgentPath)).toBe(true);
    expect(fs.existsSync(desktopBrainPath)).toBe(true);
  });

  test("verifies account button on mobile (390x844) is visible in header with svg icon and captures screenshot", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/");
    await page.waitForLoadState("networkidle");

    const accountLink = page.getByTestId("header-account-link");
    await expect(accountLink).toBeVisible();

    // Verify it has inner SVG icon
    const svgIcon = accountLink.locator("svg");
    await expect(svgIcon).toBeVisible();

    const box = await accountLink.boundingBox();
    expect(box).not.toBeNull();
    expect(box!.width).toBeGreaterThan(15);
    expect(box!.height).toBeGreaterThan(15);

    // Capture mobile header screenshot showing account icon visible in top nav
    const header = page.locator("header");
    const mobileAgentPath = path.join(
      screenshotsDir,
      "task-45-header-account-mobile.png"
    );
    const mobileBrainPath = path.join(
      parentBrainDir,
      "task-45-header-account-mobile.png"
    );

    await header.screenshot({ path: mobileAgentPath });
    await header.screenshot({ path: mobileBrainPath });
    expect(fs.existsSync(mobileAgentPath)).toBe(true);
    expect(fs.existsSync(mobileBrainPath)).toBe(true);

    // Also test mobile drawer account link
    const hamburger = page.getByRole("button", {
      name: "Open mobile navigation menu",
    });
    await expect(hamburger).toBeVisible();
    await hamburger.click();

    const drawer = page.getByRole("dialog");
    await expect(drawer).toBeVisible();

    const drawerAccountLink = drawer.locator('a[href="/account"]');
    await expect(drawerAccountLink).toBeVisible();
    await expect(drawerAccountLink).toContainText("Account");
    await expect(drawerAccountLink.locator("svg")).toBeVisible();
  });
});
