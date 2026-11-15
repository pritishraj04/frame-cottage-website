import { test, expect } from "@playwright/test";
import path from "path";
import fs from "fs";

test.describe.skip("TASK-35: Option 2: Rani Fuchsia (Bold & Textural) Theme System [Superseded by TASK-36 Marigold & Terracotta]", () => {
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

  test("1. Verifies --color-accent token computed value is #D81159 (rgb(216, 17, 89)) in Dark and Light modes", async ({
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
    expect(darkAccent.toLowerCase()).toBe("#d81159");

    const darkAccentHover = await page.evaluate(() => {
      return getComputedStyle(document.documentElement)
        .getPropertyValue("--color-accent-hover")
        .trim();
    });
    expect(darkAccentHover.toLowerCase()).toBe("#a30d43");

    const darkAccentContrast = await page.evaluate(() => {
      return getComputedStyle(document.documentElement)
        .getPropertyValue("--color-accent-contrast")
        .trim();
    });
    expect(["#ffffff", "#fff"]).toContain(darkAccentContrast.toLowerCase());

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
    expect(lightAccent.toLowerCase()).toBe("#d81159");

    const lightAccentHover = await page.evaluate(() => {
      return getComputedStyle(document.documentElement)
        .getPropertyValue("--color-accent-hover")
        .trim();
    });
    expect(lightAccentHover.toLowerCase()).toBe("#a30d43");

    const lightAccentLight = await page.evaluate(() => {
      return getComputedStyle(document.documentElement)
        .getPropertyValue("--color-accent-light")
        .trim();
    });
    expect(lightAccentLight.toLowerCase()).toBe("#fdf0f4");
  });

  test("2. Verifies Header 'Request RFQ' button has rgb(216, 17, 89) in Dark and Light modes", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("/");
    await page.waitForLoadState("networkidle");

    const rfqBtn = page.getByTestId("header-request-rfq");
    await expect(rfqBtn).toBeVisible();

    // Dark Mode
    await page.evaluate(() => {
      document.documentElement.classList.add("dark");
      document.documentElement.classList.remove("light");
      localStorage.setItem("frame-cottage-theme", "dark");
    });
    await page.waitForTimeout(200);
    const darkBg = await rfqBtn.evaluate((el) => window.getComputedStyle(el).backgroundColor);
    expect(darkBg).toBe("rgb(216, 17, 89)");

    // Light Mode
    await page.evaluate(() => {
      document.documentElement.classList.add("light");
      document.documentElement.classList.remove("dark");
      localStorage.setItem("frame-cottage-theme", "light");
    });
    await page.waitForTimeout(200);
    const lightBg = await rfqBtn.evaluate((el) => window.getComputedStyle(el).backgroundColor);
    expect(lightBg).toBe("rgb(216, 17, 89)");
  });

  test("3. Verifies Footer newsletter submit button has rgb(216, 17, 89) and captures footer screenshots", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("/");
    await page.waitForLoadState("networkidle");

    const footer = page.locator("footer");
    const newsletterSubmit = page.getByTestId("footer-newsletter-submit");
    await newsletterSubmit.scrollIntoViewIfNeeded();
    await expect(newsletterSubmit).toBeVisible();

    // Dark Mode
    await page.evaluate(() => {
      document.documentElement.classList.add("dark");
      document.documentElement.classList.remove("light");
      localStorage.setItem("frame-cottage-theme", "dark");
    });
    await page.waitForTimeout(200);

    const darkBg = await newsletterSubmit.evaluate((el) => window.getComputedStyle(el).backgroundColor);
    expect(darkBg).toBe("rgb(216, 17, 89)");

    const footerDarkPath = path.join(screenshotsDir, "task-35-fuchsia-footer-dark.png");
    await footer.screenshot({ path: footerDarkPath });
    copyScreenshot("task-35-fuchsia-footer-dark.png");
    expect(fs.existsSync(footerDarkPath)).toBe(true);

    // Light Mode
    await page.evaluate(() => {
      document.documentElement.classList.add("light");
      document.documentElement.classList.remove("dark");
      localStorage.setItem("frame-cottage-theme", "light");
    });
    await page.waitForTimeout(200);

    const lightBg = await newsletterSubmit.evaluate((el) => window.getComputedStyle(el).backgroundColor);
    expect(lightBg).toBe("rgb(216, 17, 89)");

    const footerLightPath = path.join(screenshotsDir, "task-35-fuchsia-footer-light.png");
    await footer.screenshot({ path: footerLightPath });
    copyScreenshot("task-35-fuchsia-footer-light.png");
    expect(fs.existsSync(footerLightPath)).toBe(true);
  });

  test("4. Verifies Cart checkout button has rgb(216, 17, 89) and captures cart screenshot", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("/cart");
    await page.waitForLoadState("networkidle");

    const checkoutBtn = page.getByTestId("checkout-btn");
    await expect(checkoutBtn).toBeVisible();

    // Light Mode verification & screenshot
    await page.evaluate(() => {
      document.documentElement.classList.add("light");
      document.documentElement.classList.remove("dark");
      localStorage.setItem("frame-cottage-theme", "light");
    });
    await page.waitForTimeout(200);

    const lightBg = await checkoutBtn.evaluate((el) => window.getComputedStyle(el).backgroundColor);
    expect(lightBg).toBe("rgb(216, 17, 89)");

    const cartLightPath = path.join(screenshotsDir, "task-35-fuchsia-cart-light.png");
    await page.screenshot({ path: cartLightPath, fullPage: false });
    copyScreenshot("task-35-fuchsia-cart-light.png");
    expect(fs.existsSync(cartLightPath)).toBe(true);

    // Dark Mode verification
    await page.evaluate(() => {
      document.documentElement.classList.add("dark");
      document.documentElement.classList.remove("light");
      localStorage.setItem("frame-cottage-theme", "dark");
    });
    await page.waitForTimeout(200);

    const darkBg = await checkoutBtn.evaluate((el) => window.getComputedStyle(el).backgroundColor);
    expect(darkBg).toBe("rgb(216, 17, 89)");
  });

  test("5. Verifies RFQ progression buttons have rgb(216, 17, 89) and captures RFQ screenshot", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("/rfq");
    await page.waitForLoadState("networkidle");

    const nextBtn = page.getByTestId("rfq-next-btn");
    await expect(nextBtn).toBeVisible();

    // Light Mode verification & screenshot
    await page.evaluate(() => {
      document.documentElement.classList.add("light");
      document.documentElement.classList.remove("dark");
      localStorage.setItem("frame-cottage-theme", "light");
    });
    await page.waitForTimeout(200);

    const lightBg = await nextBtn.evaluate((el) => window.getComputedStyle(el).backgroundColor);
    expect(lightBg).toBe("rgb(216, 17, 89)");

    const rfqLightPath = path.join(screenshotsDir, "task-35-fuchsia-rfq-light.png");
    await page.screenshot({ path: rfqLightPath, fullPage: false });
    copyScreenshot("task-35-fuchsia-rfq-light.png");
    expect(fs.existsSync(rfqLightPath)).toBe(true);

    // Dark Mode verification
    await page.evaluate(() => {
      document.documentElement.classList.add("dark");
      document.documentElement.classList.remove("light");
      localStorage.setItem("frame-cottage-theme", "dark");
    });
    await page.waitForTimeout(200);

    const darkBg = await nextBtn.evaluate((el) => window.getComputedStyle(el).backgroundColor);
    expect(darkBg).toBe("rgb(216, 17, 89)");
  });

  test("6. Captures Home and Sections screenshots in Light and Dark modes", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("/");
    await page.waitForLoadState("networkidle");

    const categorySection = page.getByTestId("category-pills");

    // --- LIGHT MODE ---
    await page.evaluate(() => {
      document.documentElement.classList.add("light");
      document.documentElement.classList.remove("dark");
      localStorage.setItem("frame-cottage-theme", "light");
    });
    await page.waitForTimeout(300);

    // 1. task-35-fuchsia-home-light.png (Full Home Page)
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(200);
    const homeLightPath = path.join(screenshotsDir, "task-35-fuchsia-home-light.png");
    await page.screenshot({ path: homeLightPath, fullPage: true });
    copyScreenshot("task-35-fuchsia-home-light.png");
    expect(fs.existsSync(homeLightPath)).toBe(true);

    // 2. task-35-fuchsia-sections-light.png (Sections / Discovery)
    await categorySection.scrollIntoViewIfNeeded();
    await page.waitForTimeout(200);
    const sectionsLightPath = path.join(screenshotsDir, "task-35-fuchsia-sections-light.png");
    await categorySection.screenshot({ path: sectionsLightPath });
    copyScreenshot("task-35-fuchsia-sections-light.png");
    expect(fs.existsSync(sectionsLightPath)).toBe(true);

    // --- DARK MODE ---
    await page.evaluate(() => {
      document.documentElement.classList.add("dark");
      document.documentElement.classList.remove("light");
      localStorage.setItem("frame-cottage-theme", "dark");
    });
    await page.waitForTimeout(300);

    // 3. task-35-fuchsia-home-dark.png (Full Home Page)
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(200);
    const homeDarkPath = path.join(screenshotsDir, "task-35-fuchsia-home-dark.png");
    await page.screenshot({ path: homeDarkPath, fullPage: true });
    copyScreenshot("task-35-fuchsia-home-dark.png");
    expect(fs.existsSync(homeDarkPath)).toBe(true);

    // 4. task-35-fuchsia-sections-dark.png (Sections / Discovery)
    await categorySection.scrollIntoViewIfNeeded();
    await page.waitForTimeout(200);
    const sectionsDarkPath = path.join(screenshotsDir, "task-35-fuchsia-sections-dark.png");
    await categorySection.screenshot({ path: sectionsDarkPath });
    copyScreenshot("task-35-fuchsia-sections-dark.png");
    expect(fs.existsSync(sectionsDarkPath)).toBe(true);
  });

  test("7. Verifies mobile viewport (390x844) responsiveness, zero horizontal overflow, and captures mobile proof", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/");
    await page.waitForLoadState("networkidle");

    // Set Light Mode for mobile view or default theme
    await page.evaluate(() => {
      document.documentElement.classList.add("light");
      document.documentElement.classList.remove("dark");
      localStorage.setItem("frame-cottage-theme", "light");
    });
    await page.waitForTimeout(300);

    // Zero horizontal scroll check
    const { scrollWidth, clientWidth } = await page.evaluate(() => ({
      scrollWidth: document.documentElement.scrollWidth,
      clientWidth: document.documentElement.clientWidth,
    }));
    expect(scrollWidth).toBeLessThanOrEqual(clientWidth);

    // Capture task-35-fuchsia-mobile.png
    const mobilePath = path.join(screenshotsDir, "task-35-fuchsia-mobile.png");
    await page.screenshot({ path: mobilePath, fullPage: false });
    copyScreenshot("task-35-fuchsia-mobile.png");
    expect(fs.existsSync(mobilePath)).toBe(true);
  });
});
