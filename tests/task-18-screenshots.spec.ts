import { test, expect } from "@playwright/test";
import path from "path";
import fs from "fs";

test.describe("TASK-18 Framer Motion Animated Storefront Visual Proof", () => {
  const screenshotsDir = path.resolve(process.cwd(), ".agent/screenshots");
  const parentBrainDir =
    "/Users/pritish/.gemini/antigravity/brain/91fc1fed-fc5f-495e-88c1-129ef76052af";
  const subagentBrainDir =
    "/Users/pritish/.gemini/antigravity/brain/3154d9c1-2007-412b-9873-b233df7b97bd";

  test("captures desktop dark, desktop light, and mobile animated storefront screenshots", async ({
    page,
  }) => {
    if (!fs.existsSync(screenshotsDir)) {
      fs.mkdirSync(screenshotsDir, { recursive: true });
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
    // Trigger scroll to animate in-view sections
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight / 2));
    await page.waitForTimeout(400);
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(600);

    const darkPath = path.join(screenshotsDir, "task-18-animated-dark.png");
    await page.screenshot({ path: darkPath, fullPage: true });
    expect(fs.existsSync(darkPath)).toBe(true);
    expect(fs.statSync(darkPath).size).toBeGreaterThan(40000);

    if (fs.existsSync(parentBrainDir)) {
      await page.screenshot({
        path: path.join(parentBrainDir, "task-18-animated-dark.png"),
        fullPage: true,
      });
    }
    if (fs.existsSync(subagentBrainDir)) {
      await page.screenshot({
        path: path.join(subagentBrainDir, "task-18-animated-dark.png"),
        fullPage: true,
      });
    }

    // 2. Desktop Light Mode (1440x900)
    await page.evaluate(() => {
      document.documentElement.classList.add("light");
      document.documentElement.classList.remove("dark");
      localStorage.setItem("frame-cottage-theme", "light");
    });
    await page.waitForTimeout(600);

    const lightPath = path.join(screenshotsDir, "task-18-animated-light.png");
    await page.screenshot({ path: lightPath, fullPage: true });
    expect(fs.existsSync(lightPath)).toBe(true);
    expect(fs.statSync(lightPath).size).toBeGreaterThan(40000);

    if (fs.existsSync(parentBrainDir)) {
      await page.screenshot({
        path: path.join(parentBrainDir, "task-18-animated-light.png"),
        fullPage: true,
      });
    }
    if (fs.existsSync(subagentBrainDir)) {
      await page.screenshot({
        path: path.join(subagentBrainDir, "task-18-animated-light.png"),
        fullPage: true,
      });
    }

    // 3. Mobile Viewport (390x844) Dark Mode
    await page.setViewportSize({ width: 390, height: 844 });
    await page.evaluate(() => {
      document.documentElement.classList.add("dark");
      document.documentElement.classList.remove("light");
      localStorage.setItem("frame-cottage-theme", "dark");
    });
    await page.waitForTimeout(600);

    const mobilePath = path.join(screenshotsDir, "task-18-animated-mobile.png");
    await page.screenshot({ path: mobilePath, fullPage: true });
    expect(fs.existsSync(mobilePath)).toBe(true);
    expect(fs.statSync(mobilePath).size).toBeGreaterThan(30000);

    if (fs.existsSync(parentBrainDir)) {
      await page.screenshot({
        path: path.join(parentBrainDir, "task-18-animated-mobile.png"),
        fullPage: true,
      });
    }
    if (fs.existsSync(subagentBrainDir)) {
      await page.screenshot({
        path: path.join(subagentBrainDir, "task-18-animated-mobile.png"),
        fullPage: true,
      });
    }
  });
});
