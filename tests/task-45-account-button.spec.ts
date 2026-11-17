import { test, expect } from "@playwright/test";
import path from "path";
import fs from "fs";

test.describe("TASK-45: Streamlined Studio Header (No Login/Signup/WhatsApp in Header)", () => {
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

  test("verifies clean header on desktop (1440x900) has no account/whatsapp buttons and captures screenshot", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("/");
    await page.waitForLoadState("networkidle");

    // Verify removed account link and header whatsapp button
    const accountLink = page.getByTestId("header-account-link");
    await expect(accountLink).not.toBeVisible();

    const whatsappBtn = page.getByTestId("header-whatsapp-btn");
    await expect(whatsappBtn).not.toBeVisible();

    // Verify required right-side actions
    const searchBtn = page.getByTestId("header-search-btn");
    await expect(searchBtn).toBeVisible();

    const wishlistLink = page.getByTestId("header-wishlist-link");
    await expect(wishlistLink).toBeVisible();

    const cartBtn = page.getByTestId("header-cart-btn");
    await expect(cartBtn).toBeVisible();

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

  test("verifies clean header and mobile drawer on mobile (390x844) without account/whatsapp and captures screenshot", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/");
    await page.waitForLoadState("networkidle");

    // Verify account and whatsapp not in header
    const accountLink = page.getByTestId("header-account-link");
    await expect(accountLink).not.toBeVisible();

    const whatsappBtn = page.getByTestId("header-whatsapp-btn");
    await expect(whatsappBtn).not.toBeVisible();

    // Capture mobile header screenshot
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

    // Test mobile drawer
    const hamburger = page.getByRole("button", {
      name: "Open mobile navigation menu",
    });
    await expect(hamburger).toBeVisible();
    await hamburger.click();

    const drawer = page.getByRole("dialog");
    await expect(drawer).toBeVisible();

    // Ensure account link and whatsapp are NOT in drawer
    const drawerAccountLink = drawer.locator('a[href="/account"]');
    await expect(drawerAccountLink).not.toBeVisible();

    const drawerWhatsapp = drawer.getByTestId("mobile-whatsapp-btn");
    await expect(drawerWhatsapp).not.toBeVisible();

    // Ensure Saved Items, Cart, and RFQ exist in drawer
    await expect(drawer.locator('a[href="/wishlist"]')).toBeVisible();
    await expect(drawer.locator('a[href="/cart"]')).toBeVisible();
    await expect(drawer.locator('a[href="/rfq"]')).toBeVisible();
  });
});
