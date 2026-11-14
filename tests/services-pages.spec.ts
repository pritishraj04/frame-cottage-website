import { test, expect } from "@playwright/test";
import path from "path";
import fs from "fs";

test.describe("TASK-22 Core Service Verticals Detail Pages (/services/[id])", () => {
  const screenshotsDir = path.resolve(process.cwd(), ".agent/screenshots");
  const parentBrainDir =
    "/Users/pritish/.gemini/antigravity/brain/91fc1fed-fc5f-495e-88c1-129ef76052af";

  const allSlugs = [
    { slug: "retail-framing", title: "Retail & Standard Framing" },
    { slug: "bespoke-framing", title: "Bespoke Art & Custom Framing" },
    { slug: "spatial-signage", title: "Spatial Design & Signage" },
    { slug: "industrial-cnc", title: "Industrial Fabrication & CNC Metalworks" },
    { slug: "custom-gifting", title: "Custom Gifting & Mementos" },
    { slug: "civic-projects", title: "Government & Civic Projects" },
  ];

  test.beforeAll(() => {
    if (!fs.existsSync(screenshotsDir)) {
      fs.mkdirSync(screenshotsDir, { recursive: true });
    }
    if (!fs.existsSync(parentBrainDir)) {
      fs.mkdirSync(parentBrainDir, { recursive: true });
    }
  });

  // Test 1: Verify all 6 routes render with 200 HTTP status and required spatial sections
  for (const { slug, title } of allSlugs) {
    test(`1. Service page /services/${slug} renders successfully (200) with spatial architecture`, async ({
      page,
    }) => {
      const response = await page.goto(`/services/${slug}`);
      expect(response?.status()).toBe(200);
      await page.waitForLoadState("networkidle");

      // Verify Page Title and Header Breadcrumbs
      const pageTitle = page.getByTestId("service-title");
      await expect(pageTitle).toBeVisible();
      await expect(pageTitle).toContainText(title);

      const breadcrumb = page.getByTestId("service-breadcrumb");
      await expect(breadcrumb).toBeVisible();
      await expect(breadcrumb).toContainText("Home");
      await expect(breadcrumb).toContainText("Services");

      // Verify Audience Badge & Hero Spatial Canvas
      await expect(page.getByTestId("service-audience-badge")).toBeVisible();
      await expect(page.getByTestId("service-hero-spatial-canvas")).toBeVisible();

      // Verify RFQ CTA exists with vertical query parameter
      const rfqCta = page.getByTestId("service-rfq-cta");
      await expect(rfqCta).toBeVisible();
      await expect(rfqCta).toHaveAttribute("href", `/rfq?vertical=${slug}`);

      // Verify Capabilities, Specs, Estimator, Case Studies, Workflow, FAQ
      await expect(page.getByTestId("service-capabilities")).toBeVisible();
      await expect(page.getByTestId("service-material-specs")).toBeVisible();
      await expect(page.getByTestId("service-quick-estimator")).toBeVisible();
      await expect(page.getByTestId("service-case-studies")).toBeVisible();
      await expect(page.getByTestId("service-workflow")).toBeVisible();
      await expect(page.getByTestId("service-faq")).toBeVisible();
    });
  }

  // Test 2: Navigation flow: Homepage -> /services/spatial-signage -> /rfq
  test("2. Navigates smoothly from homepage to /services/spatial-signage and deep-links to /rfq", async ({
    page,
  }) => {
    await page.goto("/");
    await page.waitForLoadState("networkidle");

    // Click navigation link to Spatial & Signage
    const navLink = page.getByTestId("nav-spatial-signage");
    await expect(navLink).toBeVisible();
    await navLink.click();

    // Verify URL is /services/spatial-signage
    await page.waitForURL("**/services/spatial-signage");
    expect(page.url()).toContain("/services/spatial-signage");

    const title = page.getByTestId("service-title");
    await expect(title).toBeVisible();
    await expect(title).toContainText("Spatial Design & Signage");

    // Click "Initiate RFQ Specification" button
    const rfqBtn = page.getByTestId("service-rfq-cta");
    await expect(rfqBtn).toBeVisible();
    await rfqBtn.click();

    // Verify redirected to /rfq?vertical=spatial-signage
    await page.waitForURL("**/rfq?vertical=spatial-signage*");
    expect(page.url()).toContain("/rfq?vertical=spatial-signage");

    const rfqTitle = page.getByTestId("rfq-page-title");
    await expect(rfqTitle).toBeVisible();
    await expect(rfqTitle).toContainText("Project Specification & RFQ Portal");
  });

  // Test 3: Interactive Quick Estimator Island
  test("3. Quick Estimator calculates dynamic pricing and transfers parameters to RFQ", async ({
    page,
  }) => {
    await page.goto("/services/bespoke-framing");
    await page.waitForLoadState("networkidle");

    const estimator = page.getByTestId("service-quick-estimator");
    await expect(estimator).toBeVisible();

    const priceDisplay = page.getByTestId("estimator-total-price");
    await expect(priceDisplay).toBeVisible();
    const initialPriceText = await priceDisplay.innerText();

    // Select higher dimension tier (Gallery or Exhibition)
    const largeDimBtn = page.getByTestId("estimator-dim-large");
    if (await largeDimBtn.isVisible()) {
      await largeDimBtn.click();
    }

    // Select Walnut tier
    const walnutTierBtn = page.getByTestId("estimator-tier-walnut");
    if (await walnutTierBtn.isVisible()) {
      await walnutTierBtn.click();
    }

    // Verify price updated
    const updatedPriceText = await priceDisplay.innerText();
    expect(updatedPriceText).not.toEqual(initialPriceText);

    // Verify transfer CTA contains vertical parameter
    const transferCta = page.getByTestId("estimator-transfer-rfq");
    await expect(transferCta).toBeVisible();
    await expect(transferCta).toHaveAttribute("href", /vertical=bespoke-framing/);
  });

  // Test 4: Mobile Responsiveness with zero horizontal overflow
  test("4. Mobile viewport responsiveness (390x844) with zero horizontal overflow", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/services/spatial-signage");
    await page.waitForLoadState("networkidle");

    // Verify zero horizontal overflow
    const overflowCheck = await page.evaluate(() => {
      const docEl = document.documentElement;
      return {
        scrollWidth: docEl.scrollWidth,
        clientWidth: docEl.clientWidth,
        hasOverflow: docEl.scrollWidth > docEl.clientWidth,
      };
    });

    expect(overflowCheck.hasOverflow).toBe(false);
    expect(overflowCheck.scrollWidth).toBeLessThanOrEqual(overflowCheck.clientWidth);

    // Verify main components visible in mobile view
    await expect(page.getByTestId("service-title")).toBeVisible();
    await expect(page.getByTestId("service-rfq-cta")).toBeVisible();
    await expect(page.getByTestId("service-hero-spatial-canvas")).toBeVisible();
    await expect(page.getByTestId("service-quick-estimator")).toBeVisible();
  });

  // Test 5: Theme Toggling on Service Detail Page
  test("5. Theme switcher cleanly toggles between Museum Dark and Warm Light modes", async ({
    page,
  }) => {
    await page.goto("/services/spatial-signage");
    await page.waitForLoadState("networkidle");

    const headerToggle = page.getByTestId("header-theme-toggle");
    await expect(headerToggle).toBeVisible();

    // Verify initial dark mode
    await expect(page.locator("html")).toHaveClass(/dark/);
    await expect(page.locator("body")).toHaveCSS("background-color", "rgb(26, 26, 26)");

    // Click toggle to switch to Light mode
    await headerToggle.click();
    await expect(page.locator("html")).toHaveClass(/light/);
    await expect(page.locator("body")).toHaveCSS("background-color", "rgb(250, 248, 245)");

    // Click toggle back to Dark mode
    await headerToggle.click();
    await expect(page.locator("html")).toHaveClass(/dark/);
  });

  // Test 6: High-Resolution Proof Screenshots
  test("6. Captures high-res proof screenshots in dark, light, and mobile viewports", async ({
    page,
  }) => {
    // 1. Desktop Dark Mode (1440x900)
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("/services/spatial-signage");
    await page.waitForLoadState("networkidle");

    // Force dark mode
    await page.evaluate(() => {
      document.documentElement.classList.add("dark");
      document.documentElement.classList.remove("light");
      localStorage.setItem("frame-cottage-theme", "dark");
    });
    await page.waitForTimeout(500);

    const darkAgentPath = path.join(screenshotsDir, "task-22-service-detail-dark.png");
    const darkBrainPath = path.join(parentBrainDir, "task-22-service-detail-dark.png");
    await page.screenshot({ path: darkAgentPath, fullPage: true });
    await page.screenshot({ path: darkBrainPath, fullPage: true });

    expect(fs.existsSync(darkAgentPath)).toBe(true);
    expect(fs.existsSync(darkBrainPath)).toBe(true);
    expect(fs.statSync(darkAgentPath).size).toBeGreaterThan(40000);

    // 2. Desktop Light Mode (1440x900)
    await page.evaluate(() => {
      document.documentElement.classList.add("light");
      document.documentElement.classList.remove("dark");
      localStorage.setItem("frame-cottage-theme", "light");
    });
    await page.waitForTimeout(500);

    const lightAgentPath = path.join(screenshotsDir, "task-22-service-detail-light.png");
    const lightBrainPath = path.join(parentBrainDir, "task-22-service-detail-light.png");
    await page.screenshot({ path: lightAgentPath, fullPage: true });
    await page.screenshot({ path: lightBrainPath, fullPage: true });

    expect(fs.existsSync(lightAgentPath)).toBe(true);
    expect(fs.existsSync(lightBrainPath)).toBe(true);
    expect(fs.statSync(lightAgentPath).size).toBeGreaterThan(40000);

    // 3. Mobile Viewport (390x844)
    await page.setViewportSize({ width: 390, height: 844 });
    await page.evaluate(() => {
      document.documentElement.classList.add("dark");
      document.documentElement.classList.remove("light");
      localStorage.setItem("frame-cottage-theme", "dark");
    });
    await page.waitForTimeout(500);

    const mobileAgentPath = path.join(screenshotsDir, "task-22-service-detail-mobile.png");
    const mobileBrainPath = path.join(parentBrainDir, "task-22-service-detail-mobile.png");
    await page.screenshot({ path: mobileAgentPath, fullPage: true });
    await page.screenshot({ path: mobileBrainPath, fullPage: true });

    expect(fs.existsSync(mobileAgentPath)).toBe(true);
    expect(fs.existsSync(mobileBrainPath)).toBe(true);
    expect(fs.statSync(mobileAgentPath).size).toBeGreaterThan(40000);
  });
});
