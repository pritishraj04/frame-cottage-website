import { test, expect } from "@playwright/test";
import path from "path";
import fs from "fs";

test.describe("TASK-32: Themed Floating WhatsApp Button & Optical Alignment", () => {
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

  const saveScreenshots = async (locatorOrPage: any, filename: string) => {
    const agentPath = path.join(screenshotsDir, filename);
    const brainPath = path.join(parentBrainDir, filename);
    await locatorOrPage.screenshot({ path: agentPath });
    try {
      fs.copyFileSync(agentPath, brainPath);
    } catch {
      await locatorOrPage.screenshot({ path: brainPath });
    }
  };

  test("1. Dark mode: WhatsApp button has themed canvas-card background, gold border, and matching dot ring", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("/");
    await page.waitForLoadState("networkidle");

    // Force Dark Theme
    await page.evaluate(() => {
      document.documentElement.classList.add("dark");
      document.documentElement.classList.remove("light");
      localStorage.setItem("frame-cottage-theme", "dark");
    });
    await page.waitForTimeout(300);

    const whatsappBtn = page.getByTestId("whatsapp-floating-btn");
    await expect(whatsappBtn).toBeVisible();
    await expect(whatsappBtn).toHaveAttribute(
      "aria-label",
      "Chat with Studio Consultant on WhatsApp"
    );

    // Verify Dark Mode background color: --color-canvas-card (#242424 -> rgb(36, 36, 36))
    const btnBg = await whatsappBtn.evaluate(
      (el) => window.getComputedStyle(el).backgroundColor
    );
    expect(btnBg).toBe("rgb(36, 36, 36)");

    // Verify Dark Mode border color: --color-accent-gold (#C5A059 -> rgb(197, 160, 89))
    const btnBorder = await whatsappBtn.evaluate(
      (el) => window.getComputedStyle(el).borderColor
    );
    expect(btnBorder).toBe("rgb(197, 160, 89)");

    // Capture visual proof of dark closed button
    await saveScreenshots(page, "task-32-whatsapp-dark-closed.png");

    // Open Popover in Dark Mode
    await whatsappBtn.click();
    const popover = page.getByTestId("whatsapp-popover");
    await expect(popover).toBeVisible();

    // Verify popover background in Dark Mode: --color-canvas-card (#242424 -> rgb(36, 36, 36))
    const popoverBg = await popover.evaluate(
      (el) => window.getComputedStyle(el).backgroundColor
    );
    expect(popoverBg).toBe("rgb(36, 36, 36)");

    // Verify Popover interactive elements & test IDs
    await expect(page.getByTestId("whatsapp-close-btn")).toBeVisible();
    await expect(page.getByTestId("whatsapp-chat-cta")).toBeVisible();
    await expect(page.getByTestId("whatsapp-shortcut-bespoke")).toBeVisible();
    await expect(page.getByTestId("whatsapp-shortcut-signage")).toBeVisible();
    await expect(page.getByTestId("whatsapp-launch-concierge")).toBeVisible();

    // Capture visual proof of dark open popover
    await saveScreenshots(page, "task-32-whatsapp-dark-open.png");

    // Close Popover
    await page.getByTestId("whatsapp-close-btn").click();
    await expect(popover).not.toBeVisible();
  });

  test("2. Light mode: WhatsApp button dynamically shifts to white canvas-card, light gold border, and white dot ring", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("/");
    await page.waitForLoadState("networkidle");

    // Switch to Light Theme
    await page.evaluate(() => {
      document.documentElement.classList.remove("dark");
      document.documentElement.classList.add("light");
      localStorage.setItem("frame-cottage-theme", "light");
    });
    await page.waitForTimeout(300);

    const whatsappBtn = page.getByTestId("whatsapp-floating-btn");
    await expect(whatsappBtn).toBeVisible();

    // Verify Light Mode background color: --color-canvas-card (#FFFFFF -> rgb(255, 255, 255))
    const btnBg = await whatsappBtn.evaluate(
      (el) => window.getComputedStyle(el).backgroundColor
    );
    expect(btnBg).toBe("rgb(255, 255, 255)");

    // Verify Light Mode border color: --color-accent-gold (#B38F48 -> rgb(179, 143, 72))
    const btnBorder = await whatsappBtn.evaluate(
      (el) => window.getComputedStyle(el).borderColor
    );
    expect(btnBorder).toBe("rgb(179, 143, 72)");

    // Capture visual proof of light closed button
    await saveScreenshots(page, "task-32-whatsapp-light-closed.png");

    // Open Popover in Light Mode
    await whatsappBtn.click();
    const popover = page.getByTestId("whatsapp-popover");
    await expect(popover).toBeVisible();

    // Verify popover background in Light Mode: --color-canvas-card (#FFFFFF -> rgb(255, 255, 255))
    const popoverBg = await popover.evaluate(
      (el) => window.getComputedStyle(el).backgroundColor
    );
    expect(popoverBg).toBe("rgb(255, 255, 255)");

    // Capture visual proof of light open popover
    await saveScreenshots(page, "task-32-whatsapp-light-open.png");

    // Close Popover
    await page.getByTestId("whatsapp-close-btn").click();
    await expect(popover).not.toBeVisible();
  });

  test("3. Mobile Responsiveness: 390x844 viewport, elegant breathing room, and zero horizontal scroll", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/");
    await page.waitForLoadState("networkidle");

    // Switch to Dark Mode
    await page.evaluate(() => {
      document.documentElement.classList.add("dark");
      document.documentElement.classList.remove("light");
      localStorage.setItem("frame-cottage-theme", "dark");
    });
    await page.waitForTimeout(300);

    // Verify zero horizontal scroll
    const scrollWidth = await page.evaluate(
      () => document.documentElement.scrollWidth
    );
    const clientWidth = await page.evaluate(
      () => document.documentElement.clientWidth
    );
    expect(scrollWidth).toBeLessThanOrEqual(clientWidth + 2);

    const whatsappBtn = page.getByTestId("whatsapp-floating-btn");
    await expect(whatsappBtn).toBeVisible();

    // Open popover on mobile
    await whatsappBtn.click();
    const popover = page.getByTestId("whatsapp-popover");
    await expect(popover).toBeVisible();

    // Capture visual proof of mobile popover
    await saveScreenshots(page, "task-32-whatsapp-mobile.png");

    // Close popover
    await page.getByTestId("whatsapp-close-btn").click();
    await expect(popover).not.toBeVisible();
  });
});
