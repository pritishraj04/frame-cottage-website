import { test, expect } from "@playwright/test";
import path from "path";
import fs from "fs";

test.describe("TASK-23: True PNG Asset Drop Zones Across Storefront", () => {
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

  test("verifies all PNG drop zones and captures high-res visual proofs", async ({
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
    await page.waitForTimeout(400);

    // Verify Drop Zone test IDs
    const heroDropzone = page.getByTestId("hero-png-dropzone");
    await expect(heroDropzone).toBeVisible();
    await expect(heroDropzone).toContainText("Hero Asset Drop Zone");
    await expect(heroDropzone).toContainText("Format: Transparent PNG • High-Res 300 DPI");

    // Capture Hero specific screenshot in Dark Mode
    const heroSection = page.getByTestId("hero-carousel");
    const heroDarkAgentPath = path.join(screenshotsDir, "task-23-hero-png-dropzones-dark.png");
    const heroDarkBrainPath = path.join(parentBrainDir, "task-23-hero-png-dropzones-dark.png");
    await heroSection.screenshot({ path: heroDarkAgentPath });
    await heroSection.screenshot({ path: heroDarkBrainPath });

    // Verify Live Frame Switcher Drop Zone
    const frameDropzone = page.getByTestId("frame-png-dropzone");
    await frameDropzone.scrollIntoViewIfNeeded();
    await expect(frameDropzone).toBeVisible();
    await expect(frameDropzone).toContainText("Interactive Frame & Artwork PNG Drop Zone");

    // Verify Customer Lookbook Scene Drop Zone
    const lookbookSceneDropzone = page.getByTestId("lookbook-scene-dropzone");
    await lookbookSceneDropzone.scrollIntoViewIfNeeded();
    await expect(lookbookSceneDropzone).toBeVisible();
    await expect(lookbookSceneDropzone).toContainText("Architectural Interior Scene PNG Drop Zone");

    // Verify Framing Journey Process Step Drop Zones
    const journeyDropzone1 = page.getByTestId("journey-step-dropzone-01");
    await journeyDropzone1.scrollIntoViewIfNeeded();
    await expect(journeyDropzone1).toBeVisible();
    await expect(journeyDropzone1).toContainText("Step 01 Diagram PNG Drop Zone");

    // Verify Featured Highlight Canvas Drop Zone
    const featuredHighlightDropzone = page.getByTestId("featured-product-canvas-dropzone");
    await featuredHighlightDropzone.scrollIntoViewIfNeeded();
    await expect(featuredHighlightDropzone).toBeVisible();
    await expect(featuredHighlightDropzone).toContainText("Floating / Shadow Frame & CNC Design Drop Zone");

    // Scroll smoothly through entire page to trigger whileInView animations
    await page.evaluate(async () => {
      const scrollStep = window.innerHeight;
      let currentPosition = 0;
      while (currentPosition < document.body.scrollHeight) {
        window.scrollTo(0, currentPosition);
        currentPosition += scrollStep;
        await new Promise((r) => setTimeout(r, 100));
      }
      window.scrollTo(0, 0);
    });
    await page.waitForTimeout(600);

    // Capture Full Page Desktop Dark
    const allDarkAgentPath = path.join(screenshotsDir, "task-23-all-sections-dropzones-dark.png");
    const allDarkBrainPath = path.join(parentBrainDir, "task-23-all-sections-dropzones-dark.png");
    await page.screenshot({ path: allDarkAgentPath, fullPage: true });
    await page.screenshot({ path: allDarkBrainPath, fullPage: true });

    expect(fs.existsSync(heroDarkAgentPath)).toBe(true);
    expect(fs.existsSync(allDarkAgentPath)).toBe(true);
    expect(fs.existsSync(allDarkBrainPath)).toBe(true);

    // 2. Desktop Light Mode (1440x900)
    await page.evaluate(() => {
      document.documentElement.classList.add("light");
      document.documentElement.classList.remove("dark");
      localStorage.setItem("frame-cottage-theme", "light");
    });
    await page.waitForTimeout(600);

    // Capture Hero specific screenshot in Light Mode
    const heroLightAgentPath = path.join(screenshotsDir, "task-23-hero-png-dropzones-light.png");
    const heroLightBrainPath = path.join(parentBrainDir, "task-23-hero-png-dropzones-light.png");
    await heroSection.screenshot({ path: heroLightAgentPath });
    await heroSection.screenshot({ path: heroLightBrainPath });

    // Capture Full Page Desktop Light
    const allLightAgentPath = path.join(screenshotsDir, "task-23-all-sections-dropzones-light.png");
    const allLightBrainPath = path.join(parentBrainDir, "task-23-all-sections-dropzones-light.png");
    await page.screenshot({ path: allLightAgentPath, fullPage: true });
    await page.screenshot({ path: allLightBrainPath, fullPage: true });

    expect(fs.existsSync(heroLightAgentPath)).toBe(true);
    expect(fs.existsSync(allLightAgentPath)).toBe(true);
    expect(fs.existsSync(allLightBrainPath)).toBe(true);

    // 3. Mobile Viewport (390x844)
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/");
    await page.waitForLoadState("networkidle");
    await page.evaluate(() => {
      document.documentElement.classList.add("dark");
      document.documentElement.classList.remove("light");
    });

    await page.evaluate(async () => {
      const scrollStep = window.innerHeight;
      let currentPosition = 0;
      while (currentPosition < document.body.scrollHeight) {
        window.scrollTo(0, currentPosition);
        currentPosition += scrollStep;
        await new Promise((r) => setTimeout(r, 100));
      }
      window.scrollTo(0, 0);
    });
    await page.waitForTimeout(600);

    const mobileAgentPath = path.join(screenshotsDir, "task-23-all-sections-dropzones-mobile.png");
    const mobileBrainPath = path.join(parentBrainDir, "task-23-all-sections-dropzones-mobile.png");
    await page.screenshot({ path: mobileAgentPath, fullPage: true });
    await page.screenshot({ path: mobileBrainPath, fullPage: true });

    expect(fs.existsSync(mobileAgentPath)).toBe(true);
    expect(fs.existsSync(mobileBrainPath)).toBe(true);
  });
});
