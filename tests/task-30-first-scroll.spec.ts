import { test, expect } from "@playwright/test";
import path from "path";
import fs from "fs";

test.describe("TASK-30: Initial Scroll Hitch & First Scroll Stuck Fix Verification", () => {
  const screenshotsDir = path.resolve(process.cwd(), ".agent/screenshots");
  const parentBrainDir =
    "/Users/pritish/.gemini/antigravity/brain/91fc1fed-fc5f-495e-88c1-129ef76052af";
  const currentBrainDir =
    "/Users/pritish/.gemini/antigravity/brain/ca48dc4e-8481-4528-a3c5-0253fc3d6ef0";

  test.beforeAll(() => {
    for (const dir of [screenshotsDir, parentBrainDir, currentBrainDir]) {
      if (!fs.existsSync(dir)) {
        try {
          fs.mkdirSync(dir, { recursive: true });
        } catch {
          // ignore directory creation errors if permission restricted
        }
      }
    }
  });

  const saveScreenshots = async (locatorOrPage: any, filename: string) => {
    const agentPath = path.join(screenshotsDir, filename);
    await locatorOrPage.screenshot({ path: agentPath });

    for (const brainDir of [parentBrainDir, currentBrainDir]) {
      try {
        const dest = path.join(brainDir, filename);
        fs.copyFileSync(agentPath, dest);
      } catch {
        // ignore brain copy errors
      }
    }
  };

  test("1. Home page (/) initial scroll responsiveness on desktop: window scrolls immediately on first gesture", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1366, height: 768 });
    await page.goto("/");
    await page.waitForLoadState("networkidle");

    // Force Museum Dark Mode
    await page.evaluate(() => {
      document.documentElement.classList.add("dark");
      document.documentElement.classList.remove("light");
      localStorage.setItem("frame-cottage-theme", "dark");
    });
    await page.waitForTimeout(100);

    // Verify computed styles: main must NOT be an accidental scroll container
    const styles = await page.evaluate(() => {
      const main = document.querySelector("main");
      if (!main) return null;
      const computed = window.getComputedStyle(main);
      const htmlComputed = window.getComputedStyle(document.documentElement);
      const bodyComputed = window.getComputedStyle(document.body);
      return {
        mainOverflowX: computed.overflowX,
        mainOverflowY: computed.overflowY,
        htmlOverflowX: htmlComputed.overflowX,
        bodyOverflowX: bodyComputed.overflowX,
        mainScrollTop: main.scrollTop,
        windowScrollY: window.scrollY,
      };
    });

    expect(styles).not.toBeNull();
    expect(styles?.mainOverflowX).toBe("clip");
    expect(styles?.mainOverflowY).toBe("visible");
    expect(styles?.htmlOverflowX).toBe("clip");
    expect(styles?.bodyOverflowX).toBe("clip");
    expect(styles?.windowScrollY).toBe(0);
    expect(styles?.mainScrollTop).toBe(0);

    // Move cursor over hero carousel and perform the first scroll gesture (wheel)
    await page.mouse.move(500, 300);
    await page.mouse.wheel(0, 120);
    await page.waitForTimeout(200);

    // Assert that the window scrolled immediately and main did NOT absorb the delta
    const scrolled = await page.evaluate(() => {
      const main = document.querySelector("main");
      return {
        windowScrollY: window.scrollY,
        mainScrollTop: main ? main.scrollTop : 0,
      };
    });

    expect(scrolled.windowScrollY).toBeGreaterThanOrEqual(50);
    expect(scrolled.mainScrollTop).toBe(0);

    // Save proof screenshot of scrolled state
    await saveScreenshots(page, "task-30-home-first-scroll-desktop.png");
  });

  test("2. RFQ page (/rfq) initial scroll responsiveness: main has overflow-y: visible and window scrolls immediately", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1366, height: 768 });
    await page.goto("/rfq");
    await page.waitForLoadState("networkidle");

    const rfqStyles = await page.evaluate(() => {
      const main = document.querySelector("main");
      if (!main) return null;
      const computed = window.getComputedStyle(main);
      return {
        overflowX: computed.overflowX,
        overflowY: computed.overflowY,
        windowScrollY: window.scrollY,
        mainScrollTop: main.scrollTop,
      };
    });

    expect(rfqStyles).not.toBeNull();
    expect(rfqStyles?.overflowX).toBe("clip");
    expect(rfqStyles?.overflowY).toBe("visible");
    expect(rfqStyles?.windowScrollY).toBe(0);
    expect(rfqStyles?.mainScrollTop).toBe(0);

    // Perform first wheel scroll
    await page.mouse.move(500, 300);
    await page.mouse.wheel(0, 120);
    await page.waitForTimeout(200);

    const rfqScrolled = await page.evaluate(() => {
      const main = document.querySelector("main");
      return {
        windowScrollY: window.scrollY,
        mainScrollTop: main ? main.scrollTop : 0,
      };
    });

    expect(rfqScrolled.windowScrollY).toBeGreaterThanOrEqual(50);
    expect(rfqScrolled.mainScrollTop).toBe(0);

    await saveScreenshots(page, "task-30-rfq-first-scroll-desktop.png");
  });

  test("3. Carousel container elements have touch-pan-y touch-action to prevent gesture interference", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1366, height: 768 });
    await page.goto("/");
    await page.waitForLoadState("networkidle");

    const touchActions = await page.evaluate(() => {
      const hero = document.querySelector("[data-testid='hero-carousel']");
      const featCarousel = document.querySelector(
        "[data-testid='featured-products-carousel']"
      );
      const featTrack = featCarousel?.querySelector(".touch-pan-y");

      return {
        heroTouchAction: hero ? window.getComputedStyle(hero).touchAction : "",
        featTouchAction: featCarousel
          ? window.getComputedStyle(featCarousel).touchAction
          : "",
        featTrackTouchAction: featTrack
          ? window.getComputedStyle(featTrack).touchAction
          : "",
      };
    });

    expect(touchActions.heroTouchAction).toBe("pan-y");
    expect(touchActions.featTouchAction).toBe("pan-y");
    expect(touchActions.featTrackTouchAction).toBe("pan-y");
  });

  test("4. Mobile viewport (390x844) zero horizontal overflow and immediate first scroll responsiveness", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/");
    await page.waitForLoadState("networkidle");

    // Check zero horizontal overflow
    const overflowCheck = await page.evaluate(() => {
      const docWidth = document.documentElement.clientWidth;
      const docScrollWidth = document.documentElement.scrollWidth;
      const bodyScrollWidth = document.body.scrollWidth;
      return {
        docWidth,
        docScrollWidth,
        bodyScrollWidth,
        hasHorizontalOverflow:
          docScrollWidth > docWidth || bodyScrollWidth > docWidth,
      };
    });

    expect(overflowCheck.docWidth).toBe(390);
    expect(overflowCheck.hasHorizontalOverflow).toBe(false);

    // Initial scroll position
    const initialPos = await page.evaluate(() => window.scrollY);
    expect(initialPos).toBe(0);

    // Perform first scroll gesture downwards
    await page.mouse.move(195, 400);
    await page.mouse.wheel(0, 150);
    await page.waitForTimeout(200);

    const scrolledPos = await page.evaluate(() => ({
      windowScrollY: window.scrollY,
      mainScrollTop: document.querySelector("main")?.scrollTop || 0,
    }));

    expect(scrolledPos.windowScrollY).toBeGreaterThanOrEqual(50);
    expect(scrolledPos.mainScrollTop).toBe(0);

    await saveScreenshots(page, "task-30-home-first-scroll-mobile.png");
  });

  test("5. Warm Museum Light Mode scroll responsiveness and zero hitch verification", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1366, height: 768 });
    await page.goto("/");
    await page.waitForLoadState("networkidle");

    // Switch to Warm Light Mode
    await page.evaluate(() => {
      document.documentElement.classList.remove("dark");
      document.documentElement.classList.add("light");
      localStorage.setItem("frame-cottage-theme", "light");
    });
    await page.waitForTimeout(100);

    // Verify computed styles in light mode
    const lightModeStyles = await page.evaluate(() => {
      const main = document.querySelector("main");
      if (!main) return null;
      const computed = window.getComputedStyle(main);
      return {
        overflowX: computed.overflowX,
        overflowY: computed.overflowY,
      };
    });

    expect(lightModeStyles?.overflowX).toBe("clip");
    expect(lightModeStyles?.overflowY).toBe("visible");

    // Perform first wheel scroll
    await page.mouse.move(500, 300);
    await page.mouse.wheel(0, 120);
    await page.waitForTimeout(200);

    const lightScrolled = await page.evaluate(() => ({
      windowScrollY: window.scrollY,
      mainScrollTop: document.querySelector("main")?.scrollTop || 0,
    }));

    expect(lightScrolled.windowScrollY).toBeGreaterThanOrEqual(50);
    expect(lightScrolled.mainScrollTop).toBe(0);

    await saveScreenshots(page, "task-30-home-first-scroll-light.png");
  });
});
