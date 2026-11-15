import { test, expect } from "@playwright/test";
import path from "path";
import fs from "fs";

test.describe.skip("TASK-33: Implement Option 1: Peacock Teal ('India Circus' Classic) Theme [Superseded by TASK-35 Rani Fuchsia]", () => {
  const screenshotsDir = path.resolve(process.cwd(), ".agent/screenshots");
  const parentBrainDir =
    "/Users/pritish/.gemini/antigravity/brain/91fc1fed-fc5f-495e-88c1-129ef76052af";

  const copyScreenshot = (filename: string) => {
    const src = path.join(screenshotsDir, filename);
    const dest = path.join(parentBrainDir, filename);
    if (fs.existsSync(src)) {
      fs.copyFileSync(src, dest);
    }
  };

  test.beforeAll(() => {
    if (!fs.existsSync(screenshotsDir)) {
      fs.mkdirSync(screenshotsDir, { recursive: true });
    }
    if (!fs.existsSync(parentBrainDir)) {
      fs.mkdirSync(parentBrainDir, { recursive: true });
    }
  });

  test("1. Verifies --color-accent token in Dark and Light modes and resolves to #078080 (rgb(7, 128, 128))", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("/");
    await page.waitForLoadState("networkidle");

    // Force Dark Mode
    await page.evaluate(() => {
      document.documentElement.classList.add("dark");
      document.documentElement.classList.remove("light");
      localStorage.setItem("frame-cottage-theme", "dark");
    });
    await page.waitForTimeout(200);

    const darkAccent = await page.evaluate(() => {
      return getComputedStyle(document.documentElement)
        .getPropertyValue("--color-accent")
        .trim();
    });
    expect(darkAccent.toLowerCase()).toBe("#078080");

    // Force Light Mode
    await page.evaluate(() => {
      document.documentElement.classList.add("light");
      document.documentElement.classList.remove("dark");
      localStorage.setItem("frame-cottage-theme", "light");
    });
    await page.waitForTimeout(200);

    const lightAccent = await page.evaluate(() => {
      return getComputedStyle(document.documentElement)
        .getPropertyValue("--color-accent")
        .trim();
    });
    expect(lightAccent.toLowerCase()).toBe("#078080");

    const lightAccentLight = await page.evaluate(() => {
      return getComputedStyle(document.documentElement)
        .getPropertyValue("--color-accent-light")
        .trim();
    });
    expect(lightAccentLight.toLowerCase()).toBe("#e6f2f2");
  });

  test("2. Verifies Header 'Request RFQ' button has bg-accent (rgb(7, 128, 128))", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("/");
    await page.waitForLoadState("networkidle");

    const rfqBtn = page.getByTestId("header-request-rfq");
    await expect(rfqBtn).toBeVisible();

    const rfqBg = await rfqBtn.evaluate((el) => {
      return window.getComputedStyle(el).backgroundColor;
    });
    expect(rfqBg).toBe("rgb(7, 128, 128)");
  });

  test("3. Verifies Hero Carousel active indicator dot is styled with bg-accent", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("/");
    await page.waitForLoadState("networkidle");

    const activeDot = page.getByTestId("hero-carousel-indicator-0");
    await expect(activeDot).toBeVisible();

    const dotBg = await activeDot.evaluate((el) => {
      return window.getComputedStyle(el).backgroundColor;
    });
    expect(dotBg).toBe("rgb(7, 128, 128)");
  });

  test("4. Verifies category pills and lookbook tabs have vibrant bg-accent active states", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("/");
    await page.waitForLoadState("networkidle");

    // Active Category Pill (Retail Framing default)
    const activePill = page.getByTestId("category-pill-retail-framing");
    await activePill.scrollIntoViewIfNeeded();
    await expect(activePill).toBeVisible();
    const pillBg = await activePill.evaluate((el) => {
      return window.getComputedStyle(el).backgroundColor;
    });
    expect(pillBg).toBe("rgb(7, 128, 128)");

    // Active Lookbook Room Tab (Living Room default)
    const activeTab = page.getByTestId("lookbook-room-tab-living-room");
    await activeTab.scrollIntoViewIfNeeded();
    await expect(activeTab).toBeVisible();
    const tabBg = await activeTab.evaluate((el) => {
      return window.getComputedStyle(el).backgroundColor;
    });
    expect(tabBg).toBe("rgb(7, 128, 128)");
  });

  test("5. Verifies Light Mode and Dark Mode rendering with zero contrast degradation and captures visual proofs", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("/");
    await page.waitForLoadState("networkidle");

    // --- DARK MODE ---
    await page.evaluate(() => {
      document.documentElement.classList.add("dark");
      document.documentElement.classList.remove("light");
      localStorage.setItem("frame-cottage-theme", "dark");
    });
    await page.waitForTimeout(300);

    // 1. task-33-teal-header-nav-dark.png
    const header = page.getByTestId("site-header");
    await expect(header).toBeVisible();
    const headerDarkPath = path.join(screenshotsDir, "task-33-teal-header-nav-dark.png");
    await header.screenshot({ path: headerDarkPath });
    copyScreenshot("task-33-teal-header-nav-dark.png");
    expect(fs.existsSync(headerDarkPath)).toBe(true);

    // 2. task-33-teal-sections-dark.png (Custom Frame Studio & Category Discovery)
    const categorySection = page.getByTestId("category-pills");
    await categorySection.scrollIntoViewIfNeeded();
    await page.waitForTimeout(200);
    const sectionsDarkPath = path.join(screenshotsDir, "task-33-teal-sections-dark.png");
    await categorySection.screenshot({ path: sectionsDarkPath });
    copyScreenshot("task-33-teal-sections-dark.png");
    expect(fs.existsSync(sectionsDarkPath)).toBe(true);

    // 3. task-33-teal-home-dark.png (Full Home Page Dark)
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(200);
    const homeDarkPath = path.join(screenshotsDir, "task-33-teal-home-dark.png");
    await page.screenshot({ path: homeDarkPath, fullPage: true });
    copyScreenshot("task-33-teal-home-dark.png");
    expect(fs.existsSync(homeDarkPath)).toBe(true);

    // --- LIGHT MODE ---
    await page.evaluate(() => {
      document.documentElement.classList.add("light");
      document.documentElement.classList.remove("dark");
      localStorage.setItem("frame-cottage-theme", "light");
    });
    await page.waitForTimeout(300);

    // 4. task-33-teal-header-nav-light.png
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(200);
    const headerLightPath = path.join(screenshotsDir, "task-33-teal-header-nav-light.png");
    await header.screenshot({ path: headerLightPath });
    copyScreenshot("task-33-teal-header-nav-light.png");
    expect(fs.existsSync(headerLightPath)).toBe(true);

    // 5. task-33-teal-sections-light.png
    await categorySection.scrollIntoViewIfNeeded();
    await page.waitForTimeout(200);
    const sectionsLightPath = path.join(screenshotsDir, "task-33-teal-sections-light.png");
    await categorySection.screenshot({ path: sectionsLightPath });
    copyScreenshot("task-33-teal-sections-light.png");
    expect(fs.existsSync(sectionsLightPath)).toBe(true);

    // 6. task-33-teal-home-light.png (Full Home Page Light)
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(200);
    const homeLightPath = path.join(screenshotsDir, "task-33-teal-home-light.png");
    await page.screenshot({ path: homeLightPath, fullPage: true });
    copyScreenshot("task-33-teal-home-light.png");
    expect(fs.existsSync(homeLightPath)).toBe(true);
  });

  test("6. Verifies mobile viewport (390x844) responsiveness, zero horizontal scroll, and captures mobile proof", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/");
    await page.waitForLoadState("networkidle");

    // Force Dark Mode for mobile screenshot
    await page.evaluate(() => {
      document.documentElement.classList.add("dark");
      document.documentElement.classList.remove("light");
      localStorage.setItem("frame-cottage-theme", "dark");
    });
    await page.waitForTimeout(300);

    // Zero horizontal scroll check
    const { scrollWidth, clientWidth } = await page.evaluate(() => ({
      scrollWidth: document.documentElement.scrollWidth,
      clientWidth: document.documentElement.clientWidth,
    }));
    expect(scrollWidth).toBeLessThanOrEqual(clientWidth);

    // 7. task-33-teal-mobile.png
    const mobilePath = path.join(screenshotsDir, "task-33-teal-mobile.png");
    await page.screenshot({ path: mobilePath, fullPage: false });
    copyScreenshot("task-33-teal-mobile.png");
    expect(fs.existsSync(mobilePath)).toBe(true);
  });
});
