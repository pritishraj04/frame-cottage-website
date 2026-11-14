import { test, expect } from "@playwright/test";
import path from "path";
import fs from "fs";

test.describe("TASK-25: Full PNG Hero Carousel with Transparent Cutouts Placed", () => {
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

  test("verifies full PNG hero stage, placed transparent cutouts, and captures visual proofs", async ({
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

    const heroSlide = page.getByTestId("hero-carousel-slide");
    await expect(heroSlide).toBeVisible();

    // Verify Drop Zone & Placement for Slide 1
    const heroDropzone = page.getByTestId("hero-png-dropzone");
    await expect(heroDropzone).toBeVisible();
    await expect(heroDropzone).toContainText("Hero Asset Drop Zone");
    await expect(heroDropzone).toContainText("Format: Transparent PNG • High-Res 300 DPI");
    await expect(heroDropzone).toContainText("/images/hero/hero-cutout-bespoke-framing.png");

    // Verify Next.js Image element with transparent cutout src
    const cutoutImg = heroDropzone.locator("img");
    await expect(cutoutImg).toBeVisible();
    const imgSrc = await cutoutImg.getAttribute("src");
    expect(imgSrc).toContain("hero-cutout-bespoke-framing.png");

    // Verify Headline & CTAs
    const headline = page.getByTestId("hero-headline");
    await expect(headline).toHaveText("Bespoke Art & Archival Custom Framing");
    await expect(page.getByTestId("cta-customise-frame")).toBeVisible();
    await expect(page.getByTestId("cta-explore-collections")).toBeVisible();

    // Capture Desktop Dark Screenshot of Hero Section
    const darkAgentPath = path.join(screenshotsDir, "task-25-hero-full-png-dark.png");
    const darkBrainPath = path.join(parentBrainDir, "task-25-hero-full-png-dark.png");
    await heroSection.screenshot({ path: darkAgentPath });
    await heroSection.screenshot({ path: darkBrainPath });
    expect(fs.existsSync(darkAgentPath)).toBe(true);
    expect(fs.existsSync(darkBrainPath)).toBe(true);

    // Test Slide Navigation to Slide 2: Spatial Design & Signage
    await page.getByTestId("hero-carousel-next").click();
    await expect(headline).toHaveText("Spatial Design & Architectural Signage");
    await expect(heroDropzone).toContainText("/images/hero/hero-cutout-spatial-signage.png");
    const cutoutImg2 = heroDropzone.locator("img");
    const imgSrc2 = await cutoutImg2.getAttribute("src");
    expect(imgSrc2).toContain("hero-cutout-spatial-signage.png");

    // Test Slide Navigation to Slide 3: Industrial Fabrication & Civic Projects
    await page.getByTestId("hero-carousel-next").click();
    await expect(headline).toHaveText("Industrial Fabrication & Civic Projects");
    await expect(heroDropzone).toContainText("/images/hero/hero-cutout-industrial-cnc.png");
    const cutoutImg3 = heroDropzone.locator("img");
    const imgSrc3 = await cutoutImg3.getAttribute("src");
    expect(imgSrc3).toContain("hero-cutout-industrial-cnc.png");

    // Return to Slide 1 via indicator dot
    await page.getByTestId("hero-carousel-indicator-0").click();
    await expect(headline).toHaveText("Bespoke Art & Archival Custom Framing");

    // 2. Desktop Light Mode (1440x900)
    await page.evaluate(() => {
      document.documentElement.classList.add("light");
      document.documentElement.classList.remove("dark");
      localStorage.setItem("frame-cottage-theme", "light");
    });
    await page.waitForTimeout(300);

    // Capture Desktop Light Screenshot of Hero Section
    const lightAgentPath = path.join(screenshotsDir, "task-25-hero-full-png-light.png");
    const lightBrainPath = path.join(parentBrainDir, "task-25-hero-full-png-light.png");
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

    // Verify Hero elements visible on mobile
    await expect(heroSection).toBeVisible();
    await expect(heroDropzone).toBeVisible();
    await expect(page.getByTestId("hero-headline")).toBeVisible();
    await expect(page.getByTestId("cta-customise-frame")).toBeVisible();

    // Capture Mobile Screenshot of Hero Section
    const mobileAgentPath = path.join(screenshotsDir, "task-25-hero-full-png-mobile.png");
    const mobileBrainPath = path.join(parentBrainDir, "task-25-hero-full-png-mobile.png");
    await heroSection.screenshot({ path: mobileAgentPath });
    await heroSection.screenshot({ path: mobileBrainPath });
    expect(fs.existsSync(mobileAgentPath)).toBe(true);
    expect(fs.existsSync(mobileBrainPath)).toBe(true);
  });
});
