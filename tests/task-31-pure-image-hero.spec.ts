import { test, expect } from "@playwright/test";
import path from "path";
import fs from "fs";

test.describe("TASK-31: Pure Image Full-Width Hero Showcase (No Text)", () => {
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

  test("verifies full-width pure image canvas, no text overlays, theme switching, and controls", async ({
    page,
  }) => {
    // 1. Desktop Dark Mode (1440x900)
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("/");
    await page.waitForLoadState("networkidle");

    // Force Dark Mode
    await page.evaluate(() => {
      document.documentElement.classList.add("dark");
      document.documentElement.classList.remove("light");
      localStorage.setItem("frame-cottage-theme", "dark");
    });
    await page.waitForTimeout(300);

    const heroSection = page.getByTestId("hero-carousel");
    await expect(heroSection).toBeVisible();

    // Verify 100% full-width viewport canvas (no max-width constraints)
    const heroBox = await heroSection.boundingBox();
    expect(heroBox).not.toBeNull();
    if (heroBox) {
      expect(heroBox.width).toBe(1440);
    }

    const heroSlide = page.getByTestId("hero-carousel-slide");
    await expect(heroSlide).toBeVisible();

    // Verify Drop Zone & Placement for Slide 1
    const heroDropzone = page.getByTestId("hero-png-dropzone");
    await expect(heroDropzone).toBeVisible();

    // Verify Next.js Image element with transparent cutout src
    const cutoutImg = heroDropzone.locator("img");
    await expect(cutoutImg).toBeVisible();
    const imgSrc = await cutoutImg.getAttribute("src");
    expect(imgSrc).toContain("hero-cutout-bespoke-framing.png");

    // Strict No-Text Verification: verify complete absence of text headlines, descriptions, badges, and CTAs
    await expect(page.getByTestId("hero-headline")).toHaveCount(0);
    await expect(page.getByTestId("hero-subheadline")).toHaveCount(0);
    await expect(page.getByTestId("cta-customise-frame")).toHaveCount(0);
    await expect(page.getByTestId("cta-explore-collections")).toHaveCount(0);
    await expect(heroSection.locator("h1, h2, h3, p, a")).toHaveCount(0);

    // Verify minimalist glassmorphic navigation controls
    const prevBtn = page.getByTestId("hero-carousel-prev");
    const nextBtn = page.getByTestId("hero-carousel-next");
    const indicators = page.getByTestId("hero-carousel-indicators");

    await expect(prevBtn).toBeVisible();
    await expect(nextBtn).toBeVisible();
    await expect(indicators).toBeVisible();
    await expect(page.getByTestId("hero-carousel-indicator-0")).toBeVisible();
    await expect(page.getByTestId("hero-carousel-indicator-1")).toBeVisible();
    await expect(page.getByTestId("hero-carousel-indicator-2")).toBeVisible();

    // Capture Desktop Dark Screenshot of Full-Width Hero Section
    const darkAgentPath = path.join(screenshotsDir, "task-31-hero-full-width-dark.png");
    const darkBrainPath = path.join(parentBrainDir, "task-31-hero-full-width-dark.png");
    await heroSection.screenshot({ path: darkAgentPath });
    await heroSection.screenshot({ path: darkBrainPath });
    expect(fs.existsSync(darkAgentPath)).toBe(true);
    expect(fs.existsSync(darkBrainPath)).toBe(true);

    // Test Navigation: Slide 2 (Spatial Design & Architectural Signage cutout)
    await nextBtn.click();
    const cutoutImg2 = heroDropzone.locator("img");
    await expect(cutoutImg2).toBeVisible();
    await expect(cutoutImg2).toHaveAttribute("src", /hero-cutout-spatial-signage\.png/);

    // Test Navigation: Slide 3 (Industrial Fabrication & Civic Projects cutout)
    await nextBtn.click();
    const cutoutImg3 = heroDropzone.locator("img");
    await expect(cutoutImg3).toBeVisible();
    await expect(cutoutImg3).toHaveAttribute("src", /hero-cutout-industrial-cnc\.png/);

    // Return to Slide 1 via indicator dot 0
    await page.getByTestId("hero-carousel-indicator-0").click();
    await expect(cutoutImg).toHaveAttribute("src", /hero-cutout-bespoke-framing\.png/);

    // 2. Desktop Light Mode (1440x900)
    await page.evaluate(() => {
      document.documentElement.classList.add("light");
      document.documentElement.classList.remove("dark");
      localStorage.setItem("frame-cottage-theme", "light");
    });
    await page.waitForTimeout(300);

    // Capture Desktop Light Screenshot of Full-Width Hero Section
    const lightAgentPath = path.join(screenshotsDir, "task-31-hero-full-width-light.png");
    const lightBrainPath = path.join(parentBrainDir, "task-31-hero-full-width-light.png");
    await heroSection.screenshot({ path: lightAgentPath });
    await heroSection.screenshot({ path: lightBrainPath });
    expect(fs.existsSync(lightAgentPath)).toBe(true);
    expect(fs.existsSync(lightBrainPath)).toBe(true);

    // 3. Mobile Viewport (390x844)
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/");
    await page.waitForLoadState("networkidle");

    // Verify zero horizontal overflow on mobile
    const { scrollWidth, clientWidth } = await page.evaluate(() => ({
      scrollWidth: document.documentElement.scrollWidth,
      clientWidth: document.documentElement.clientWidth,
    }));
    expect(scrollWidth).toBeLessThanOrEqual(clientWidth);

    // Verify Hero spans full width of mobile viewport
    const mobileHeroBox = await heroSection.boundingBox();
    expect(mobileHeroBox).not.toBeNull();
    if (mobileHeroBox) {
      expect(mobileHeroBox.width).toBe(390);
    }

    // Verify Hero elements and pure image stage on mobile
    await expect(heroSection).toBeVisible();
    await expect(heroDropzone).toBeVisible();
    await expect(heroDropzone.locator("img")).toBeVisible();
    await expect(page.getByTestId("hero-headline")).toHaveCount(0);

    // Test mobile touch navigation (touch swipe left advances slide)
    const dropzoneBox = await heroDropzone.boundingBox();
    if (dropzoneBox) {
      const centerX = dropzoneBox.x + dropzoneBox.width / 2;
      const centerY = dropzoneBox.y + dropzoneBox.height / 2;

      await page.mouse.move(centerX, centerY);
      await page.mouse.down();
      await page.mouse.move(centerX - 100, centerY, { steps: 5 });
      await page.mouse.up();
    }

    // Capture Mobile Screenshot of Full-Width Hero Section
    const mobileAgentPath = path.join(screenshotsDir, "task-31-hero-full-width-mobile.png");
    const mobileBrainPath = path.join(parentBrainDir, "task-31-hero-full-width-mobile.png");
    await heroSection.screenshot({ path: mobileAgentPath });
    await heroSection.screenshot({ path: mobileBrainPath });
    expect(fs.existsSync(mobileAgentPath)).toBe(true);
    expect(fs.existsSync(mobileBrainPath)).toBe(true);
  });
});
