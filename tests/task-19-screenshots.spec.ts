import { test, expect } from "@playwright/test";
import path from "path";
import fs from "fs";

test.describe("TASK-19 Restored Complete Home Suite Visual Proof", () => {
  const screenshotsDir = path.resolve(process.cwd(), ".agent/screenshots");
  const parentBrainDir =
    "/Users/pritish/.gemini/antigravity/brain/91fc1fed-fc5f-495e-88c1-129ef76052af";

  test("captures desktop dark, desktop light, and mobile complete restored homepage screenshots", async ({
    page,
  }) => {
    if (!fs.existsSync(screenshotsDir)) {
      fs.mkdirSync(screenshotsDir, { recursive: true });
    }
    if (!fs.existsSync(parentBrainDir)) {
      fs.mkdirSync(parentBrainDir, { recursive: true });
    }

    // 1. Desktop Dark Mode (1440x900)
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("/");
    await page.waitForLoadState("networkidle");

    // Ensure dark mode
    await page.evaluate(() => {
      document.documentElement.classList.add("dark");
      document.documentElement.classList.remove("light");
      localStorage.setItem("frame-cottage-theme", "dark");
    });

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

    const darkAgentPath = path.join(screenshotsDir, "task-19-complete-home-dark.png");
    const darkBrainPath = path.join(parentBrainDir, "task-19-complete-home-dark.png");
    await page.screenshot({ path: darkAgentPath, fullPage: true });
    await page.screenshot({ path: darkBrainPath, fullPage: true });

    expect(fs.existsSync(darkAgentPath)).toBe(true);
    expect(fs.existsSync(darkBrainPath)).toBe(true);
    expect(fs.statSync(darkAgentPath).size).toBeGreaterThan(50000);

    // 2. Desktop Light Mode (1440x900)
    await page.evaluate(() => {
      document.documentElement.classList.add("light");
      document.documentElement.classList.remove("dark");
      localStorage.setItem("frame-cottage-theme", "light");
    });
    await page.waitForTimeout(600);

    const lightAgentPath = path.join(screenshotsDir, "task-19-complete-home-light.png");
    const lightBrainPath = path.join(parentBrainDir, "task-19-complete-home-light.png");
    await page.screenshot({ path: lightAgentPath, fullPage: true });
    await page.screenshot({ path: lightBrainPath, fullPage: true });

    expect(fs.existsSync(lightAgentPath)).toBe(true);
    expect(fs.existsSync(lightBrainPath)).toBe(true);
    expect(fs.statSync(lightAgentPath).size).toBeGreaterThan(50000);

    // 3. Mobile Viewport (390x844) Dark Mode
    await page.setViewportSize({ width: 390, height: 844 });
    await page.evaluate(() => {
      document.documentElement.classList.add("dark");
      document.documentElement.classList.remove("light");
      localStorage.setItem("frame-cottage-theme", "dark");
    });
    // Scroll through mobile page
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

    const mobileAgentPath = path.join(screenshotsDir, "task-19-complete-home-mobile.png");
    const mobileBrainPath = path.join(parentBrainDir, "task-19-complete-home-mobile.png");
    await page.screenshot({ path: mobileAgentPath, fullPage: true });
    await page.screenshot({ path: mobileBrainPath, fullPage: true });

    expect(fs.existsSync(mobileAgentPath)).toBe(true);
    expect(fs.existsSync(mobileBrainPath)).toBe(true);
    expect(fs.statSync(mobileAgentPath).size).toBeGreaterThan(40000);
  });
});
