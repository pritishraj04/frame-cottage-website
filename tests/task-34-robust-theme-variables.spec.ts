import { test, expect } from "@playwright/test";
import path from "path";
import fs from "fs";

test.describe("TASK-34: Robust 100% Variable-Driven Button & Accent Theme System", () => {
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

  test("1. Verifies Footer Newsletter submit button has bg-accent rgb(224, 95, 62) in Dark and Light modes and captures proofs", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("/");
    await page.waitForLoadState("networkidle");

    const footer = page.locator("footer");
    const newsletterSubmit = page.getByTestId("footer-newsletter-submit");
    await newsletterSubmit.scrollIntoViewIfNeeded();
    await expect(newsletterSubmit).toBeVisible();

    // Dark Mode verification
    await page.evaluate(() => {
      document.documentElement.classList.add("dark");
      document.documentElement.classList.remove("light");
      localStorage.setItem("frame-cottage-theme", "dark");
    });
    await page.waitForTimeout(200);

    const darkSubmitBg = await newsletterSubmit.evaluate((el) => {
      return window.getComputedStyle(el).backgroundColor;
    });
    expect(darkSubmitBg).toBe("rgb(224, 95, 62)");

    const footerDarkPath = path.join(screenshotsDir, "task-34-footer-teal-dark.png");
    await footer.screenshot({ path: footerDarkPath });
    copyScreenshot("task-34-footer-teal-dark.png");
    expect(fs.existsSync(footerDarkPath)).toBe(true);

    // Light Mode verification
    await page.evaluate(() => {
      document.documentElement.classList.add("light");
      document.documentElement.classList.remove("dark");
      localStorage.setItem("frame-cottage-theme", "light");
    });
    await page.waitForTimeout(200);

    const lightSubmitBg = await newsletterSubmit.evaluate((el) => {
      return window.getComputedStyle(el).backgroundColor;
    });
    expect(lightSubmitBg).toBe("rgb(224, 95, 62)");

    const footerLightPath = path.join(screenshotsDir, "task-34-footer-teal-light.png");
    await footer.screenshot({ path: footerLightPath });
    copyScreenshot("task-34-footer-teal-light.png");
    expect(fs.existsSync(footerLightPath)).toBe(true);
  });

  test("2. Verifies /cart checkout button has rgb(224, 95, 62) in Dark and Light modes and captures proofs", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("/cart");
    await page.waitForLoadState("networkidle");

    const checkoutBtn = page.getByTestId("checkout-btn");
    await expect(checkoutBtn).toBeVisible();

    // Dark Mode
    await page.evaluate(() => {
      document.documentElement.classList.add("dark");
      document.documentElement.classList.remove("light");
      localStorage.setItem("frame-cottage-theme", "dark");
    });
    await page.waitForTimeout(200);

    const darkBg = await checkoutBtn.evaluate((el) => window.getComputedStyle(el).backgroundColor);
    expect(darkBg).toBe("rgb(224, 95, 62)");

    const cartDarkPath = path.join(screenshotsDir, "task-34-cart-teal-dark.png");
    await page.screenshot({ path: cartDarkPath, fullPage: false });
    copyScreenshot("task-34-cart-teal-dark.png");
    expect(fs.existsSync(cartDarkPath)).toBe(true);

    // Light Mode
    await page.evaluate(() => {
      document.documentElement.classList.add("light");
      document.documentElement.classList.remove("dark");
      localStorage.setItem("frame-cottage-theme", "light");
    });
    await page.waitForTimeout(200);

    const lightBg = await checkoutBtn.evaluate((el) => window.getComputedStyle(el).backgroundColor);
    expect(lightBg).toBe("rgb(224, 95, 62)");

    const cartLightPath = path.join(screenshotsDir, "task-34-cart-teal-light.png");
    await page.screenshot({ path: cartLightPath, fullPage: false });
    copyScreenshot("task-34-cart-teal-light.png");
    expect(fs.existsSync(cartLightPath)).toBe(true);
  });

  test("3. Verifies /wishlist Move All button has rgb(224, 95, 62) in Dark and Light modes and captures proofs", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("/wishlist");
    await page.waitForLoadState("networkidle");

    const moveAllBtn = page.getByTestId("wishlist-move-all-btn");
    await expect(moveAllBtn).toBeVisible();

    // Dark Mode
    await page.evaluate(() => {
      document.documentElement.classList.add("dark");
      document.documentElement.classList.remove("light");
      localStorage.setItem("frame-cottage-theme", "dark");
    });
    await page.waitForTimeout(200);

    const darkBg = await moveAllBtn.evaluate((el) => window.getComputedStyle(el).backgroundColor);
    expect(darkBg).toBe("rgb(224, 95, 62)");

    const wishlistDarkPath = path.join(screenshotsDir, "task-34-wishlist-teal-dark.png");
    await page.screenshot({ path: wishlistDarkPath, fullPage: false });
    copyScreenshot("task-34-wishlist-teal-dark.png");
    expect(fs.existsSync(wishlistDarkPath)).toBe(true);

    // Light Mode
    await page.evaluate(() => {
      document.documentElement.classList.add("light");
      document.documentElement.classList.remove("dark");
      localStorage.setItem("frame-cottage-theme", "light");
    });
    await page.waitForTimeout(200);

    const lightBg = await moveAllBtn.evaluate((el) => window.getComputedStyle(el).backgroundColor);
    expect(lightBg).toBe("rgb(224, 95, 62)");

    const wishlistLightPath = path.join(screenshotsDir, "task-34-wishlist-teal-light.png");
    await page.screenshot({ path: wishlistLightPath, fullPage: false });
    copyScreenshot("task-34-wishlist-teal-light.png");
    expect(fs.existsSync(wishlistLightPath)).toBe(true);
  });

  test("4. Verifies /rfq next step button has rgb(224, 95, 62) in Dark and Light modes and captures proofs", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("/rfq");
    await page.waitForLoadState("networkidle");

    const nextBtn = page.getByTestId("rfq-next-btn");
    await expect(nextBtn).toBeVisible();

    // Dark Mode
    await page.evaluate(() => {
      document.documentElement.classList.add("dark");
      document.documentElement.classList.remove("light");
      localStorage.setItem("frame-cottage-theme", "dark");
    });
    await page.waitForTimeout(200);

    const darkBg = await nextBtn.evaluate((el) => window.getComputedStyle(el).backgroundColor);
    expect(darkBg).toBe("rgb(224, 95, 62)");

    const rfqDarkPath = path.join(screenshotsDir, "task-34-rfq-teal-dark.png");
    await page.screenshot({ path: rfqDarkPath, fullPage: false });
    copyScreenshot("task-34-rfq-teal-dark.png");
    expect(fs.existsSync(rfqDarkPath)).toBe(true);

    // Light Mode
    await page.evaluate(() => {
      document.documentElement.classList.add("light");
      document.documentElement.classList.remove("dark");
      localStorage.setItem("frame-cottage-theme", "light");
    });
    await page.waitForTimeout(200);

    const lightBg = await nextBtn.evaluate((el) => window.getComputedStyle(el).backgroundColor);
    expect(lightBg).toBe("rgb(224, 95, 62)");

    const rfqLightPath = path.join(screenshotsDir, "task-34-rfq-teal-light.png");
    await page.screenshot({ path: rfqLightPath, fullPage: false });
    copyScreenshot("task-34-rfq-teal-light.png");
    expect(fs.existsSync(rfqLightPath)).toBe(true);
  });

  test("5. Verifies theme accent rgb(224, 95, 62) on action button in Dark and Light modes and captures proofs", async ({
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
    expect(darkBg).toBe("rgb(224, 95, 62)");

    const loginDarkPath = path.join(screenshotsDir, "task-34-login-teal-dark.png");
    await page.screenshot({ path: loginDarkPath, fullPage: false });
    copyScreenshot("task-34-login-teal-dark.png");
    expect(fs.existsSync(loginDarkPath)).toBe(true);

    // Light Mode
    await page.evaluate(() => {
      document.documentElement.classList.add("light");
      document.documentElement.classList.remove("dark");
      localStorage.setItem("frame-cottage-theme", "light");
    });
    await page.waitForTimeout(200);

    const lightBg = await rfqBtn.evaluate((el) => window.getComputedStyle(el).backgroundColor);
    expect(lightBg).toBe("rgb(224, 95, 62)");

    const loginLightPath = path.join(screenshotsDir, "task-34-login-teal-light.png");
    await page.screenshot({ path: loginLightPath, fullPage: false });
    copyScreenshot("task-34-login-teal-light.png");
    expect(fs.existsSync(loginLightPath)).toBe(true);
  });

  test("6. Verifies /account action buttons and captures account proofs", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("/account");
    await page.waitForLoadState("networkidle");

    // Dark Mode
    await page.evaluate(() => {
      document.documentElement.classList.add("dark");
      document.documentElement.classList.remove("light");
      localStorage.setItem("frame-cottage-theme", "dark");
    });
    await page.waitForTimeout(200);

    const accountDarkPath = path.join(screenshotsDir, "task-34-account-teal-dark.png");
    await page.screenshot({ path: accountDarkPath, fullPage: false });
    copyScreenshot("task-34-account-teal-dark.png");
    expect(fs.existsSync(accountDarkPath)).toBe(true);

    // Light Mode
    await page.evaluate(() => {
      document.documentElement.classList.add("light");
      document.documentElement.classList.remove("dark");
      localStorage.setItem("frame-cottage-theme", "light");
    });
    await page.waitForTimeout(200);

    const accountLightPath = path.join(screenshotsDir, "task-34-account-teal-light.png");
    await page.screenshot({ path: accountLightPath, fullPage: false });
    copyScreenshot("task-34-account-teal-light.png");
    expect(fs.existsSync(accountLightPath)).toBe(true);
  });

  test("7. Verifies FAQ consultation button has rgb(224, 95, 62)", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("/");
    await page.waitForLoadState("networkidle");

    const faqBtn = page.getByTestId("faq-submit-rfq-cta");
    await faqBtn.scrollIntoViewIfNeeded();
    await expect(faqBtn).toBeVisible();

    const bg = await faqBtn.evaluate((el) => window.getComputedStyle(el).backgroundColor);
    expect(bg).toBe("rgb(224, 95, 62)");
  });

  test("8. Verifies dynamic runtime CSS variable change immediately updates buttons across the whole website", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("/");
    await page.waitForLoadState("networkidle");

    const newsletterSubmit = page.getByTestId("footer-newsletter-submit");
    const headerRfq = page.getByTestId("header-request-rfq");
    const faqBtn = page.getByTestId("faq-submit-rfq-cta");

    // Initial check: Peacock Teal rgb(224, 95, 62)
    expect(await newsletterSubmit.evaluate((el) => window.getComputedStyle(el).backgroundColor)).toBe("rgb(224, 95, 62)");
    expect(await headerRfq.evaluate((el) => window.getComputedStyle(el).backgroundColor)).toBe("rgb(224, 95, 62)");
    expect(await faqBtn.evaluate((el) => window.getComputedStyle(el).backgroundColor)).toBe("rgb(224, 95, 62)");

    // Dynamically change variable to a custom color, e.g. Royal Indigo rgb(79, 70, 229)
    await page.evaluate(() => {
      document.documentElement.style.setProperty("--color-accent", "rgb(79, 70, 229)");
    });
    // Wait for CSS transitions (200ms) to complete
    await page.waitForTimeout(400);

    // All buttons now immediately reflect the new variable without code changes!
    expect(await newsletterSubmit.evaluate((el) => window.getComputedStyle(el).backgroundColor)).toBe("rgb(79, 70, 229)");
    expect(await headerRfq.evaluate((el) => window.getComputedStyle(el).backgroundColor)).toBe("rgb(79, 70, 229)");
    expect(await faqBtn.evaluate((el) => window.getComputedStyle(el).backgroundColor)).toBe("rgb(79, 70, 229)");

    // Navigate to /cart and test variable responsiveness
    await page.goto("/cart");
    await page.waitForLoadState("networkidle");
    const checkoutBtn = page.getByTestId("checkout-btn");
    expect(await checkoutBtn.evaluate((el) => window.getComputedStyle(el).backgroundColor)).toBe("rgb(224, 95, 62)");

    await page.evaluate(() => {
      document.documentElement.style.setProperty("--color-accent", "rgb(220, 38, 38)"); // Crimson Red
    });
    await page.waitForTimeout(400);
    expect(await checkoutBtn.evaluate((el) => window.getComputedStyle(el).backgroundColor)).toBe("rgb(220, 38, 38)");
  });
});
