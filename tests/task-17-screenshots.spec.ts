import { test, expect } from "@playwright/test";
import path from "path";
import fs from "fs";

test.describe("TASK-17 Multi-Disciplinary Studio Visual Proof", () => {
  const screenshotsDir = path.resolve(process.cwd(), ".agent/screenshots");
  const parentBrainDir =
    "/Users/pritish/.gemini/antigravity/brain/91fc1fed-fc5f-495e-88c1-129ef76052af";
  const subagentBrainDir =
    "/Users/pritish/.gemini/antigravity/brain/111b28d2-9484-41d6-b506-ddc8387b186b";

  test("captures desktop dark, desktop light, and mobile screenshots", async ({
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
      localStorage.setItem("theme", "dark");
    });
    await page.waitForTimeout(500);

    const darkPath = path.join(screenshotsDir, "task-17-desktop-dark.png");
    await page.screenshot({ path: darkPath, fullPage: true });
    expect(fs.existsSync(darkPath)).toBe(true);

    if (fs.existsSync(parentBrainDir)) {
      await page.screenshot({
        path: path.join(parentBrainDir, "task-17-desktop-dark.png"),
        fullPage: true,
      });
    }
    if (fs.existsSync(subagentBrainDir)) {
      await page.screenshot({
        path: path.join(subagentBrainDir, "task-17-desktop-dark.png"),
        fullPage: true,
      });
    }

    // 2. Desktop Light Mode (1440x900)
    await page.evaluate(() => {
      document.documentElement.classList.add("light");
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    });
    await page.waitForTimeout(500);

    const lightPath = path.join(screenshotsDir, "task-17-desktop-light.png");
    await page.screenshot({ path: lightPath, fullPage: true });
    expect(fs.existsSync(lightPath)).toBe(true);

    if (fs.existsSync(parentBrainDir)) {
      await page.screenshot({
        path: path.join(parentBrainDir, "task-17-desktop-light.png"),
        fullPage: true,
      });
    }
    if (fs.existsSync(subagentBrainDir)) {
      await page.screenshot({
        path: path.join(subagentBrainDir, "task-17-desktop-light.png"),
        fullPage: true,
      });
    }

    // 3. Mobile View (390x844)
    await page.setViewportSize({ width: 390, height: 844 });
    // Reset to dark mode for mobile showcase
    await page.evaluate(() => {
      document.documentElement.classList.add("dark");
      document.documentElement.classList.remove("light");
      localStorage.setItem("theme", "dark");
    });
    await page.waitForTimeout(500);

    const mobilePath = path.join(screenshotsDir, "task-17-mobile.png");
    await page.screenshot({ path: mobilePath, fullPage: true });
    expect(fs.existsSync(mobilePath)).toBe(true);

    if (fs.existsSync(parentBrainDir)) {
      await page.screenshot({
        path: path.join(parentBrainDir, "task-17-mobile.png"),
        fullPage: true,
      });
    }
    if (fs.existsSync(subagentBrainDir)) {
      await page.screenshot({
        path: path.join(subagentBrainDir, "task-17-mobile.png"),
        fullPage: true,
      });
    }
  });
});
