import { test, expect } from "@playwright/test";
import * as fs from "fs";
import path from "path";

test.describe("Mobile Responsiveness (390x844 Viewport)", () => {
  test.beforeEach(async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/");
  });

  test("verifies zero horizontal overflow across full mobile page", async ({
    page,
  }) => {
    // Wait for full hydration
    await page.waitForLoadState("domcontentloaded");

    // Check document scrollWidth does not exceed clientWidth (390px)
    const { scrollWidth, clientWidth } = await page.evaluate(() => ({
      scrollWidth: document.documentElement.scrollWidth,
      clientWidth: document.documentElement.clientWidth,
    }));

    expect(scrollWidth).toBeLessThanOrEqual(clientWidth);
    expect(clientWidth).toBe(390);
  });

  test("verifies Glass Comparison Slider mobile layout, non-colliding badges, summary card, and touch controls", async ({
    page,
  }) => {
    const atelierSection = page.getByTestId("atelier-materials");
    await atelierSection.scrollIntoViewIfNeeded();
    await expect(atelierSection).toBeVisible();

    const slider = page.getByTestId("glass-comparison-slider");
    await expect(slider).toBeVisible();

    // 1. Verify Both Floating Badges are Visible & Do Not Horizontally Collide
    const standardBadge = page.getByTestId("standard-glass-label");
    const truvueBadge = page.getByTestId("truvue-acrylic-label");

    await expect(standardBadge).toBeVisible();
    await expect(truvueBadge).toBeVisible();

    // Verify compact label text on mobile
    await expect(standardBadge).toContainText("Standard Glass");
    await expect(truvueBadge).toContainText("TruVue® Acrylic");

    const boxStandard = await standardBadge.boundingBox();
    const boxTruvue = await truvueBadge.boundingBox();

    expect(boxStandard).not.toBeNull();
    expect(boxTruvue).not.toBeNull();

    if (boxStandard && boxTruvue) {
      // Must be inside mobile screen bounds
      expect(boxStandard.x).toBeGreaterThanOrEqual(0);
      expect(boxTruvue.x + boxTruvue.width).toBeLessThanOrEqual(390);

      // Must NOT horizontally overlap/collide!
      expect(boxStandard.x + boxStandard.width).toBeLessThan(boxTruvue.x);
    }

    // 2. Verify Mobile Side-by-Side Comparison Summary Card is Visible
    const mobileSummaryCard = page.getByTestId("glass-mobile-comparison-card");
    await expect(mobileSummaryCard).toBeVisible();
    await expect(mobileSummaryCard).toContainText("Standard Glass");
    await expect(mobileSummaryCard).toContainText("Uncoated specular glare");
    await expect(mobileSummaryCard).toContainText("TruVue® Acrylic");
    await expect(mobileSummaryCard).toContainText("99% UV defense");

    // 3. Verify Preset Buttons in 3-Column Mobile Grid and Interactive Switching
    const presetStandard = page.getByTestId("slider-preset-standard");
    const presetSplit = page.getByTestId("slider-preset-split");
    const presetTruVue = page.getByTestId("slider-preset-truvue");

    await expect(presetStandard).toBeVisible();
    await expect(presetSplit).toBeVisible();
    await expect(presetTruVue).toBeVisible();

    // Standard preset -> 100
    await presetStandard.click();
    await expect(slider).toHaveAttribute("aria-valuenow", "100");

    // TruVue preset -> 0
    await presetTruVue.click();
    await expect(slider).toHaveAttribute("aria-valuenow", "0");

    // Split 50/50 preset -> 50
    await presetSplit.click();
    await expect(slider).toHaveAttribute("aria-valuenow", "50");

    // 4. Test Touch Dragging on Mobile Viewport
    const sliderBox = await slider.boundingBox();
    expect(sliderBox).not.toBeNull();

    if (sliderBox) {
      const startX = sliderBox.x + sliderBox.width * 0.5;
      const startY = sliderBox.y + sliderBox.height * 0.5;
      const targetX = sliderBox.x + sliderBox.width * 0.25;

      // Simulate pointer drag gesture
      await page.mouse.move(startX, startY);
      await page.mouse.down();
      await page.mouse.move(targetX, startY, { steps: 5 });
      await page.mouse.up();

      const updatedVal = Number(await slider.getAttribute("aria-valuenow"));
      expect(updatedVal).toBeGreaterThanOrEqual(20);
      expect(updatedVal).toBeLessThanOrEqual(30);
    }

    // Reset to 50 for clean screenshot
    await presetSplit.click();
    await expect(slider).toHaveAttribute("aria-valuenow", "50");

    // 5. Capture Verification Screenshot
    const brainDir =
      "/Users/pritish/.gemini/antigravity/brain/91fc1fed-fc5f-495e-88c1-129ef76052af";
    const brainScreenshot = path.join(
      brainDir,
      "task-15-glass-slider-mobile.png"
    );
    const agentScreenshot = ".agent/screenshots/task-15-glass-slider-mobile.png";

    if (fs.existsSync(brainDir)) {
      await slider.screenshot({ path: brainScreenshot });
      expect(fs.existsSync(brainScreenshot)).toBe(true);
    }
    await slider.screenshot({ path: agentScreenshot });
    expect(fs.existsSync(agentScreenshot)).toBe(true);
  });

  test("verifies Customer Lookbook mobile horizontal tab scrolling and docked bottom popover card", async ({
    page,
  }) => {
    const lookbookSection = page.getByTestId("customer-lookbook");
    await lookbookSection.scrollIntoViewIfNeeded();
    await expect(lookbookSection).toBeVisible();

    // 1. Verify Room Tabs Switcher
    const livingRoomTab = page.getByTestId("lookbook-room-tab-living-room");
    const diningTab = page.getByTestId("lookbook-room-tab-dining-credenza");
    const bedsideTab = page.getByTestId("lookbook-room-tab-minimalist-bedside");

    await expect(livingRoomTab).toBeVisible();
    await expect(diningTab).toBeVisible();
    await expect(bedsideTab).toBeVisible();

    // Switch to Dining Credenza
    await diningTab.click();
    await expect(diningTab).toHaveAttribute("aria-pressed", "true");
    await expect(livingRoomTab).toHaveAttribute("aria-pressed", "false");

    // Switch to Minimalist Bedside
    await bedsideTab.click();
    await expect(bedsideTab).toHaveAttribute("aria-pressed", "true");

    // Switch back to Living Room
    await livingRoomTab.click();
    await expect(livingRoomTab).toHaveAttribute("aria-pressed", "true");

    // 2. Click Hotspot Pin and Verify Docked Popover Card within Screen Bounds
    const pin = page.getByTestId("lookbook-hotspot-pin-salon-walnut-large");
    await expect(pin).toBeVisible();

    const card = page.getByTestId("lookbook-card-salon-walnut-large");
    await expect(card).toBeVisible();

    const cardBox = await card.boundingBox();
    expect(cardBox).not.toBeNull();

    if (cardBox) {
      // Must not bleed outside viewport bounds
      expect(cardBox.x).toBeGreaterThanOrEqual(0);
      expect(cardBox.x + cardBox.width).toBeLessThanOrEqual(390);
    }

    // 3. Verify Card Elements
    const buyerBadge = page.getByTestId(
      "lookbook-buyer-badge-salon-walnut-large"
    );
    await expect(buyerBadge).toBeVisible();
    await expect(buyerBadge).toContainText("Verified Collector");

    await expect(card).toContainText("Camilla V.");
    await expect(card).toContainText("The Heritage Black Walnut");

    const shopLink = page.getByTestId("lookbook-shop-link-salon-walnut-large");
    await expect(shopLink).toBeVisible();
    await expect(shopLink).toHaveAttribute(
      "href",
      "/custom-framing?style=heritage-walnut"
    );

    // Test second pin
    const brassPin = page.getByTestId(
      "lookbook-hotspot-pin-salon-brass-portrait"
    );
    await expect(brassPin).toBeVisible();
    await brassPin.click();

    const brassCard = page.getByTestId("lookbook-card-salon-brass-portrait");
    await expect(brassCard).toBeVisible();

    const brassCardBox = await brassCard.boundingBox();
    expect(brassCardBox).not.toBeNull();
    if (brassCardBox) {
      expect(brassCardBox.x).toBeGreaterThanOrEqual(0);
      expect(brassCardBox.x + brassCardBox.width).toBeLessThanOrEqual(390);
    }

    // 4. Capture Verification Screenshot
    const brainDir =
      "/Users/pritish/.gemini/antigravity/brain/91fc1fed-fc5f-495e-88c1-129ef76052af";
    const brainScreenshot = path.join(
      brainDir,
      "task-15-customer-lookbook-mobile.png"
    );
    const agentScreenshot =
      ".agent/screenshots/task-15-customer-lookbook-mobile.png";

    if (fs.existsSync(brainDir)) {
      await lookbookSection.screenshot({ path: brainScreenshot });
      expect(fs.existsSync(brainScreenshot)).toBe(true);
    }
    await lookbookSection.screenshot({ path: agentScreenshot });
    expect(fs.existsSync(agentScreenshot)).toBe(true);
  });

  test("verifies mobile layout fidelity in Light Mode", async ({ page }) => {
    // Open mobile navigation menu to toggle theme
    const menuButton = page.getByRole("button", {
      name: "Open mobile navigation menu",
    });
    await expect(menuButton).toBeVisible();
    await menuButton.click();

    const drawer = page.getByRole("dialog");
    await expect(drawer).toBeVisible();

    const drawerToggle = drawer.getByTestId("mobile-theme-toggle");
    await expect(drawerToggle).toBeVisible();
    await drawerToggle.click();

    // Verify Light Mode active
    await expect(page.locator("html")).toHaveClass(/light/);

    // Close drawer
    const closeButton = drawer.getByRole("button", { name: "Close menu" });
    await closeButton.click();
    await expect(drawer).not.toBeVisible();

    // Check Glass Comparison Slider in Light Mode
    const atelierSection = page.getByTestId("atelier-materials");
    await atelierSection.scrollIntoViewIfNeeded();
    await expect(atelierSection).toBeVisible();

    const standardBadge = page.getByTestId("standard-glass-label");
    const truvueBadge = page.getByTestId("truvue-acrylic-label");
    await expect(standardBadge).toBeVisible();
    await expect(truvueBadge).toBeVisible();

    // Check Lookbook in Light Mode
    const lookbookSection = page.getByTestId("customer-lookbook");
    await lookbookSection.scrollIntoViewIfNeeded();
    await expect(lookbookSection).toBeVisible();

    const card = page.getByTestId("lookbook-card-salon-walnut-large");
    await expect(card).toBeVisible();

    const cardBox = await card.boundingBox();
    expect(cardBox).not.toBeNull();
    if (cardBox) {
      expect(cardBox.x).toBeGreaterThanOrEqual(0);
      expect(cardBox.x + cardBox.width).toBeLessThanOrEqual(390);
    }
  });
});
