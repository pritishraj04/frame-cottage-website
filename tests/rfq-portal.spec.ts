import { test, expect } from "@playwright/test";
import path from "path";
import fs from "fs";

test.describe("TASK-20 Project Specification & RFQ Portal (/rfq)", () => {
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

  test("1. Successfully loads /rfq with editorial header, breadcrumbs and tier badges", async ({
    page,
  }) => {
    await page.goto("/rfq");
    await page.waitForLoadState("networkidle");

    // Title & subtitle
    const pageTitle = page.locator('[data-testid="rfq-page-title"]');
    await expect(pageTitle).toBeVisible();
    await expect(pageTitle).toContainText("Project Specification & RFQ Portal");

    const pageSubtitle = page.locator('[data-testid="rfq-page-subtitle"]');
    await expect(pageSubtitle).toBeVisible();

    // Breadcrumb navigation
    const breadcrumb = page.locator('nav[aria-label="Breadcrumbs"]');
    await expect(breadcrumb).toBeVisible();
    await expect(breadcrumb).toContainText("Home");
    await expect(breadcrumb).toContainText("Studio Services");

    // Client tier badges in header
    await expect(page.locator('[data-testid="header-tier-badge-b2c"]')).toBeVisible();
    await expect(page.locator('[data-testid="header-tier-badge-b2b"]')).toBeVisible();
    await expect(page.locator('[data-testid="header-tier-badge-public"]')).toBeVisible();

    // Step indicator initial state (Step 1 active)
    await expect(page.locator('[data-testid="step-indicator"]')).toBeVisible();
    await expect(page.locator('[data-testid="step-1-container"]')).toBeVisible();
  });

  test("2. Client Tier selection switches between B2C, B2B, and Public Sector", async ({
    page,
  }) => {
    await page.goto("/rfq");
    await page.waitForLoadState("networkidle");

    // Check all 3 tier cards are present
    const b2cCard = page.locator('[data-testid="tier-card-b2c"]');
    const b2bCard = page.locator('[data-testid="tier-card-b2b"]');
    const publicCard = page.locator('[data-testid="tier-card-public"]');

    await expect(b2cCard).toBeVisible();
    await expect(b2bCard).toBeVisible();
    await expect(publicCard).toBeVisible();

    // Click B2C card
    await b2cCard.click();
    await expect(b2cCard).toHaveClass(/border-\[#C5A059\]/);

    // Click Public Sector card
    await publicCard.click();
    await expect(publicCard).toHaveClass(/border-\[#C5A059\]/);

    // Click Header B2B badge to switch back
    await page.locator('[data-testid="header-tier-badge-b2b"]').click();
    await expect(b2bCard).toHaveClass(/border-\[#C5A059\]/);
  });

  test("3. Multi-vertical selection across 6 core service verticals with validation", async ({
    page,
  }) => {
    await page.goto("/rfq");
    await page.waitForLoadState("networkidle");

    // Proceed to Step 2
    await page.locator('[data-testid="rfq-next-btn"]').click();
    await expect(page.locator('[data-testid="step-2-container"]')).toBeVisible();

    // Verify all 6 verticals exist
    const verticalIds = [
      "retail-framing",
      "bespoke-framing",
      "spatial-signage",
      "industrial-cnc",
      "custom-gifting",
      "civic-projects",
    ];

    for (const id of verticalIds) {
      const card = page.locator(`[data-testid="vertical-card-${id}"]`);
      await expect(card).toBeVisible();
    }

    // Toggle custom-gifting
    const customGiftingCard = page.locator('[data-testid="vertical-card-custom-gifting"]');
    await customGiftingCard.click();
    await expect(customGiftingCard).toHaveClass(/border-\[#C5A059\]/);

    // Toggle bespoke-framing
    const bespokeCard = page.locator('[data-testid="vertical-card-bespoke-framing"]');
    await bespokeCard.click();
    await expect(bespokeCard).toHaveClass(/border-\[#C5A059\]/);
  });

  test("4. Material and Technical Capability toggles on Step 3", async ({ page }) => {
    await page.goto("/rfq");
    await page.waitForLoadState("networkidle");

    // Advance to Step 3
    await page.locator('[data-testid="rfq-next-btn"]').click(); // Step 1 -> 2
    await page.locator('[data-testid="rfq-next-btn"]').click(); // Step 2 -> 3
    await expect(page.locator('[data-testid="step-3-container"]')).toBeVisible();

    // Materials check
    const museumGlazing = page.locator('[data-testid="material-toggle-museum-glazing"]');
    await expect(museumGlazing).toBeVisible();
    await museumGlazing.click();
    await expect(museumGlazing).toHaveClass(/border-\[#C5A059\]/);

    const opticalCrystal = page.locator('[data-testid="material-toggle-optical-crystal"]');
    await expect(opticalCrystal).toBeVisible();
    await opticalCrystal.click();
    await expect(opticalCrystal).toHaveClass(/border-\[#C5A059\]/);

    // Capabilities check
    const fineArtPrinting = page.locator(
      '[data-testid="capability-toggle-fine-art-printing"]'
    );
    await expect(fineArtPrinting).toBeVisible();
    await fineArtPrinting.click();
    await expect(fineArtPrinting).toHaveClass(/border-\[#C5A059\]/);
  });

  test("5. Scope volume, delivery timeline, tender ID, and blueprint dropzone on Step 4", async ({
    page,
  }) => {
    await page.goto("/rfq");
    await page.waitForLoadState("networkidle");

    // Advance to Step 4
    await page.locator('[data-testid="rfq-next-btn"]').click(); // Step 1 -> 2
    await page.locator('[data-testid="rfq-next-btn"]').click(); // Step 2 -> 3
    await page.locator('[data-testid="rfq-next-btn"]').click(); // Step 3 -> 4
    await expect(page.locator('[data-testid="step-4-container"]')).toBeVisible();

    // Volume selection
    const enterpriseVol = page.locator('[data-testid="volume-option-enterprise"]');
    await expect(enterpriseVol).toBeVisible();
    await enterpriseVol.click();
    await expect(enterpriseVol).toHaveClass(/border-\[#C5A059\]/);

    // Timeline selection
    const urgentTimeline = page.locator('[data-testid="timeline-option-urgent"]');
    await expect(urgentTimeline).toBeVisible();
    await urgentTimeline.click();
    await expect(urgentTimeline).toHaveClass(/border-\[#C5A059\]/);

    // Tender Reference ID input
    const tenderInput = page.locator('[data-testid="tender-id-input"]');
    await expect(tenderInput).toBeVisible();
    await tenderInput.fill("GeM-2026-TENDER-48291");

    // Blueprint Drop Zone
    const dropzone = page.locator('[data-testid="blueprint-dropzone"]');
    await expect(dropzone).toBeVisible();
    await expect(dropzone).toContainText("Drop Architectural Blueprints");
  });

  test("6. Step 5 Live Scope Summary, Form Validation, and Submission with Reference ID", async ({
    page,
  }) => {
    await page.goto("/rfq");
    await page.waitForLoadState("networkidle");

    // Navigate through to Step 5
    await page.locator('[data-testid="rfq-next-btn"]').click(); // Step 1 -> 2
    await page.locator('[data-testid="rfq-next-btn"]').click(); // Step 2 -> 3
    await page.locator('[data-testid="rfq-next-btn"]').click(); // Step 3 -> 4

    // Enter tender ID
    await page.locator('[data-testid="tender-id-input"]').fill("GeM-2026-B-89104");

    // Proceed to Step 5
    await page.locator('[data-testid="rfq-next-btn"]').click(); // Step 4 -> 5
    await expect(page.locator('[data-testid="step-5-container"]')).toBeVisible();

    // Check Live Project Scope Summary sidebar
    const liveSummary = page.locator('[data-testid="live-scope-summary"]');
    await expect(liveSummary).toBeVisible();
    await expect(page.locator('[data-testid="summary-tier"]')).toBeVisible();
    await expect(page.locator('[data-testid="summary-verticals"]')).toBeVisible();
    await expect(page.locator('[data-testid="summary-volume"]')).toBeVisible();
    await expect(page.locator('[data-testid="summary-timeline"]')).toBeVisible();
    await expect(page.locator('[data-testid="summary-tender-id"]')).toContainText(
      "GeM-2026-B-89104"
    );

    // Attempt submit with empty fields to trigger validation
    const submitBtn = page.locator('[data-testid="rfq-submit-btn"]');
    await submitBtn.click();
    await expect(page.getByText("Full Name is required.")).toBeVisible();

    // Fill valid contact details
    await page.locator('[data-testid="input-client-name"]').fill("Vikramaditya Roy");
    await page.locator('[data-testid="input-organization"]').fill("Roy & Associates Architecture");
    await page.locator('[data-testid="input-client-email"]').fill("v.roy@royarchitects.com");
    await page.locator('[data-testid="input-client-phone"]').fill("+91 98110 54321");
    await page.locator('[data-testid="input-project-location"]').fill("Aerocity Hospitality Hub, New Delhi");
    await page.locator('[data-testid="input-project-notes"]').fill(
      "Sub-millimeter CNC jewelers brass facades and TruVue museum acrylic vitrines."
    );

    // Submit form
    await submitBtn.click();

    // Success state verification
    const successContainer = page.locator('[data-testid="rfq-success-container"]');
    await expect(successContainer).toBeVisible({ timeout: 5000 });

    const refId = page.locator('[data-testid="rfq-reference-id"]');
    await expect(refId).toBeVisible();
    const refText = await refId.innerText();
    expect(refText).toMatch(/^FC-RFQ-2026-\d{5}$/);

    // Senior studio lead verification
    const leadName = page.locator('[data-testid="rfq-lead-name"]');
    await expect(leadName).toBeVisible();
    await expect(leadName).toContainText("Vikram Singhania");

    // Action buttons in success state
    await expect(page.locator('[data-testid="download-summary-btn"]')).toBeVisible();
    const scheduleBtn = page.locator('[data-testid="schedule-consultation-btn"]');
    await expect(scheduleBtn).toBeVisible();

    // Click consultation scheduler
    await scheduleBtn.click();
    await expect(
      page.locator('[data-testid="consultation-scheduled-banner"]')
    ).toBeVisible();

    // Test Create Another Specification resets form
    const resetBtn = page.locator('[data-testid="create-another-btn"]');
    await expect(resetBtn).toBeVisible();
    await resetBtn.click();
    await expect(page.locator('[data-testid="step-1-container"]')).toBeVisible();
  });

  test("7. Mobile viewport responsiveness (390x844) with zero horizontal overflow", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/rfq");
    await page.waitForLoadState("networkidle");

    // Scroll through mobile page to ensure no overflow occurs anywhere
    const isOverflowing = await page.evaluate(() => {
      return document.body.scrollWidth > window.innerWidth;
    });
    expect(isOverflowing).toBe(false);

    // Verify key elements are visible on mobile
    await expect(page.locator('[data-testid="rfq-page-title"]')).toBeVisible();
    await expect(page.locator('[data-testid="step-indicator"]')).toBeVisible();
    await expect(page.locator('[data-testid="tier-card-b2b"]')).toBeVisible();
  });

  test("8. Dark and Light mode theme adaptability", async ({ page }) => {
    await page.goto("/rfq");
    await page.waitForLoadState("networkidle");

    // Ensure Dark Mode
    await page.evaluate(() => {
      document.documentElement.classList.add("dark");
      document.documentElement.classList.remove("light");
      localStorage.setItem("frame-cottage-theme", "dark");
    });
    await page.waitForTimeout(300);

    const darkBg = await page.evaluate(() => {
      return window.getComputedStyle(document.body).backgroundColor;
    });
    // #1A1A1A in rgb is rgb(26, 26, 26)
    expect(darkBg).toBe("rgb(26, 26, 26)");

    // Switch to Light Mode
    await page.evaluate(() => {
      document.documentElement.classList.add("light");
      document.documentElement.classList.remove("dark");
      localStorage.setItem("frame-cottage-theme", "light");
    });
    await page.waitForTimeout(300);

    const lightBg = await page.evaluate(() => {
      return window.getComputedStyle(document.body).backgroundColor;
    });
    // #FAF8F5 in rgb is rgb(250, 248, 245)
    expect(lightBg).toBe("rgb(250, 248, 245)");
  });

  test("9. Captures full-page screenshots for Desktop Dark, Desktop Light, and Mobile", async ({
    page,
  }) => {
    // 1. Desktop Dark Mode (1440x900)
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("/rfq");
    await page.waitForLoadState("networkidle");

    await page.evaluate(() => {
      document.documentElement.classList.add("dark");
      document.documentElement.classList.remove("light");
      localStorage.setItem("frame-cottage-theme", "dark");
    });
    await page.waitForTimeout(500);

    const darkAgentPath = path.join(screenshotsDir, "task-20-rfq-portal-dark.png");
    const darkBrainPath = path.join(parentBrainDir, "task-20-rfq-portal-dark.png");
    await page.screenshot({ path: darkAgentPath, fullPage: true });
    await page.screenshot({ path: darkBrainPath, fullPage: true });

    expect(fs.existsSync(darkAgentPath)).toBe(true);
    expect(fs.existsSync(darkBrainPath)).toBe(true);
    expect(fs.statSync(darkAgentPath).size).toBeGreaterThan(30000);

    // 2. Desktop Light Mode (1440x900)
    await page.evaluate(() => {
      document.documentElement.classList.add("light");
      document.documentElement.classList.remove("dark");
      localStorage.setItem("frame-cottage-theme", "light");
    });
    await page.waitForTimeout(500);

    const lightAgentPath = path.join(screenshotsDir, "task-20-rfq-portal-light.png");
    const lightBrainPath = path.join(parentBrainDir, "task-20-rfq-portal-light.png");
    await page.screenshot({ path: lightAgentPath, fullPage: true });
    await page.screenshot({ path: lightBrainPath, fullPage: true });

    expect(fs.existsSync(lightAgentPath)).toBe(true);
    expect(fs.existsSync(lightBrainPath)).toBe(true);
    expect(fs.statSync(lightAgentPath).size).toBeGreaterThan(30000);

    // 3. Mobile Viewport (390x844) Dark Mode
    await page.setViewportSize({ width: 390, height: 844 });
    await page.evaluate(() => {
      document.documentElement.classList.add("dark");
      document.documentElement.classList.remove("light");
      localStorage.setItem("frame-cottage-theme", "dark");
    });
    await page.waitForTimeout(500);

    const mobileAgentPath = path.join(screenshotsDir, "task-20-rfq-portal-mobile.png");
    const mobileBrainPath = path.join(parentBrainDir, "task-20-rfq-portal-mobile.png");
    await page.screenshot({ path: mobileAgentPath, fullPage: true });
    await page.screenshot({ path: mobileBrainPath, fullPage: true });

    expect(fs.existsSync(mobileAgentPath)).toBe(true);
    expect(fs.existsSync(mobileBrainPath)).toBe(true);
    expect(fs.statSync(mobileAgentPath).size).toBeGreaterThan(25000);
  });
});
