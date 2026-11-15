import { test, expect } from "@playwright/test";
import path from "path";
import fs from "fs";

test.describe("TASK-37 Complete Navigation Hash Anchor Navigation & Smooth Scrolling", () => {
  const screenshotsDir = path.resolve(process.cwd(), ".agent/screenshots");
  const brainDir = "/Users/pritish/.gemini/antigravity/brain/85944b2d-354f-4678-b781-4b792d1298ec";
  const parentBrainDir = "/Users/pritish/.gemini/antigravity/brain/91fc1fed-fc5f-495e-88c1-129ef76052af";

  test.beforeAll(() => {
    for (const dir of [screenshotsDir, brainDir, parentBrainDir]) {
      if (!fs.existsSync(dir)) {
        try {
          fs.mkdirSync(dir, { recursive: true });
        } catch {
          // ignore
        }
      }
    }
  });

  const saveScreenshot = async (page: any, name: string) => {
    const shotPath = path.join(screenshotsDir, name);
    await page.screenshot({ path: shotPath });
    try {
      fs.copyFileSync(shotPath, path.join(brainDir, name));
    } catch {
      // ignore
    }
    try {
      fs.copyFileSync(shotPath, path.join(parentBrainDir, name));
    } catch {
      // ignore
    }
  };

  test("1. Cross-page navigation: clicking /services/bespoke-framing#giclee from homepage scrolls target into view without header obscuring", async ({
    page,
  }) => {
    await page.goto("/");
    await page.waitForLoadState("networkidle");

    // Open mega menu
    const serviceMenuBtn = page.getByTestId("nav-service-verticals");
    await serviceMenuBtn.hover();
    await page.waitForTimeout(200);

    const megaMenu = page.getByTestId("mega-menu-dropdown");
    await expect(megaMenu).toBeVisible();

    // Click Archival Giclée Printing link inside the mega menu
    const gicleeLink = page.locator('[data-testid="mega-menu-dropdown"] a[href="/services/bespoke-framing#giclee"]');
    await expect(gicleeLink).toBeVisible();
    await gicleeLink.click();

    // Wait for navigation and scrolling
    await page.waitForURL("**/services/bespoke-framing#giclee");
    await page.waitForTimeout(1000); // Allow smooth scroll animation and settling

    const header = page.locator('header[data-testid="site-header"]').first();
    const headerBox = await header.boundingBox();
    const headerBottom = (headerBox?.y ?? 0) + (headerBox?.height ?? 80);

    const target = page.locator("#giclee");
    await expect(target).toBeVisible();
    const targetBox = await target.boundingBox();
    expect(targetBox).not.toBeNull();
    if (targetBox) {
      expect(targetBox.y).toBeGreaterThanOrEqual(headerBottom - 20);
      expect(targetBox.y).toBeLessThan(768);
    }

    // Capture screenshot in dark mode
    await saveScreenshot(page, "task-37-giclee-scroll-dark.png");

    // Switch to light mode and capture screenshot
    await page.evaluate(() => {
      document.documentElement.classList.remove("dark");
      document.documentElement.classList.add("light");
    });
    await page.waitForTimeout(200);
    await saveScreenshot(page, "task-37-giclee-scroll-light.png");
  });

  test("2. Cross-page navigation: clicking /services/bespoke-framing#canvas-floater scrolls to #canvas-floater", async ({
    page,
  }) => {
    await page.goto("/");
    await page.waitForLoadState("networkidle");

    // Navigate directly with hash to test initial page load hash scrolling
    await page.goto("/services/bespoke-framing#canvas-floater");
    await page.waitForLoadState("networkidle");
    await page.waitForTimeout(1000);

    const header = page.locator('header[data-testid="site-header"]').first();
    const headerBox = await header.boundingBox();
    const headerBottom = (headerBox?.y ?? 0) + (headerBox?.height ?? 80);

    const target = page.locator("#canvas-floater");
    await expect(target).toBeVisible();
    const targetBox = await target.boundingBox();
    expect(targetBox).not.toBeNull();
    if (targetBox) {
      expect(targetBox.y).toBeGreaterThanOrEqual(headerBottom - 20);
      expect(targetBox.y).toBeLessThan(768);
    }

    await saveScreenshot(page, "task-37-canvas-floater-dark.png");
  });

  test("3. Cross-page navigation: clicking /#services from /services/bespoke-framing scrolls to CategoryPills", async ({
    page,
  }) => {
    await page.goto("/services/bespoke-framing");
    await page.waitForLoadState("networkidle");

    // Click link back to homepage #services
    await page.evaluate(() => {
      const link = document.createElement("a");
      link.href = "/#services";
      link.id = "test-home-services-link";
      link.textContent = "Home Services";
      document.body.appendChild(link);
    });

    const homeLink = page.locator("#test-home-services-link");
    await homeLink.click();

    await page.waitForURL("**/#services");
    await page.waitForTimeout(1000);

    const categoryPills = page.getByTestId("category-pills");
    await expect(categoryPills).toBeVisible();

    const header = page.locator('header[data-testid="site-header"]').first();
    const headerBox = await header.boundingBox();
    const headerBottom = (headerBox?.y ?? 0) + (headerBox?.height ?? 80);

    const targetBox = await categoryPills.boundingBox();
    expect(targetBox).not.toBeNull();
    if (targetBox) {
      expect(targetBox.y).toBeGreaterThanOrEqual(headerBottom - 20);
      expect(targetBox.y).toBeLessThan(768);
    }

    await saveScreenshot(page, "task-37-home-services-dark.png");
  });

  test("4. Same-page hash navigation: /services/spatial-signage to #wayfinding and #illuminated-led scrolls smoothly", async ({
    page,
  }) => {
    await page.goto("/services/spatial-signage");
    await page.waitForLoadState("networkidle");

    // Open mega menu and click #wayfinding
    const serviceMenuBtn = page.getByTestId("nav-service-verticals");
    await serviceMenuBtn.hover();
    await page.waitForTimeout(200);

    const wayfindingLink = page.locator('a[href="/services/spatial-signage#wayfinding"]').first();
    await expect(wayfindingLink).toBeVisible();
    await wayfindingLink.click();

    // Verify mega menu closed
    await expect(page.getByTestId("mega-menu-dropdown")).toBeHidden();
    await page.waitForTimeout(800);

    const wayfindingTarget = page.locator("#wayfinding");
    await expect(wayfindingTarget).toBeVisible();
    const targetBox1 = await wayfindingTarget.boundingBox();
    expect(targetBox1).not.toBeNull();

    const header = page.locator('header[data-testid="site-header"]').first();
    const headerBox = await header.boundingBox();
    const headerBottom = (headerBox?.y ?? 0) + (headerBox?.height ?? 80);

    if (targetBox1) {
      expect(targetBox1.y).toBeGreaterThanOrEqual(headerBottom - 20);
      expect(targetBox1.y).toBeLessThan(768);
    }

    // Now click #illuminated-led on same page
    await serviceMenuBtn.hover();
    await page.waitForTimeout(200);
    const ledLink = page.locator('a[href="/services/spatial-signage#illuminated-led"]').first();
    await expect(ledLink).toBeVisible();
    await ledLink.click();

    await expect(page.getByTestId("mega-menu-dropdown")).toBeHidden();
    await page.waitForTimeout(800);

    const ledTarget = page.locator("#illuminated-led");
    await expect(ledTarget).toBeVisible();
    const targetBox2 = await ledTarget.boundingBox();
    expect(targetBox2).not.toBeNull();
    if (targetBox2) {
      expect(targetBox2.y).toBeGreaterThanOrEqual(headerBottom - 20);
      expect(targetBox2.y).toBeLessThan(768);
    }

    await saveScreenshot(page, "task-37-spatial-led-dark.png");
  });

  test("5. Mobile drawer nav hash navigation", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/");
    await page.waitForLoadState("networkidle");

    // Open mobile nav drawer
    const menuBtn = page.getByLabel("Open mobile navigation menu");
    await expect(menuBtn).toBeVisible();
    await menuBtn.click();

    // Mobile nav drawer should open
    const drawer = page.getByRole("dialog");
    await expect(drawer).toBeVisible();

    // Click Archival Giclée Printing under Bespoke Framing in the mobile drawer (expanded by default)
    const gicleeSubLink = page.locator('[role="dialog"] a[href="/services/bespoke-framing#giclee"]');
    await expect(gicleeSubLink).toBeVisible();
    await gicleeSubLink.click();

    // Drawer should close
    await expect(drawer).toBeHidden();
    await page.waitForURL("**/services/bespoke-framing#giclee");
    await page.waitForTimeout(1000);

    const target = page.locator("#giclee");
    await expect(target).toBeVisible();

    const header = page.locator('header[data-testid="site-header"]').first();
    const headerBox = await header.boundingBox();
    const headerBottom = (headerBox?.y ?? 0) + (headerBox?.height ?? 70);

    const targetBox = await target.boundingBox();
    expect(targetBox).not.toBeNull();
    if (targetBox) {
      expect(targetBox.y).toBeGreaterThanOrEqual(headerBottom - 20);
      expect(targetBox.y).toBeLessThan(844);
    }

    await saveScreenshot(page, "task-37-mobile-giclee-scroll.png");
  });
});
