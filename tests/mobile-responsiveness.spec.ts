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

  test("verifies Featured Products Carousel mobile layout, touch ergonomics, controls, and zero overflow", async ({
    page,
  }) => {
    const featuredSection = page.getByTestId("featured-products-carousel");
    await featuredSection.scrollIntoViewIfNeeded();
    await expect(featuredSection).toBeVisible();

    // 1. Verify navigation controls are visible and within screen width
    const prevBtn = page.getByTestId("carousel-prev-btn");
    const nextBtn = page.getByTestId("carousel-next-btn");
    await expect(prevBtn).toBeVisible();
    await expect(nextBtn).toBeVisible();

    const prevBox = await prevBtn.boundingBox();
    const nextBox = await nextBtn.boundingBox();
    expect(prevBox).not.toBeNull();
    expect(nextBox).not.toBeNull();
    if (prevBox && nextBox) {
      expect(prevBox.x).toBeGreaterThanOrEqual(0);
      expect(nextBox.x + nextBox.width).toBeLessThanOrEqual(390);
    }

    // 2. Verify First Card fits inside the 390px mobile viewport without overflow
    const walnutCard = page.getByTestId("featured-product-card-mendocino-walnut");
    await expect(walnutCard).toBeVisible();
    const cardBox = await walnutCard.boundingBox();
    expect(cardBox).not.toBeNull();
    if (cardBox) {
      expect(cardBox.x).toBeGreaterThanOrEqual(0);
      expect(cardBox.x + cardBox.width).toBeLessThanOrEqual(390);
    }

    // 3. Verify Dot Indicators and Interactive Next/Prev on Mobile
    const dot0 = page.getByTestId("carousel-dot-0");
    const dot1 = page.getByTestId("carousel-dot-1");
    await expect(dot0).toHaveAttribute("aria-selected", "true");

    await nextBtn.click();
    await expect(dot1).toHaveAttribute("aria-selected", "true");

    await prevBtn.click();
    await expect(dot0).toHaveAttribute("aria-selected", "true");

    // 4. Test Touch-Swipe Gesture on Mobile Viewport
    const track = featuredSection.locator(".overflow-hidden").first();
    await track.evaluate((el) => {
      const startEv = new CustomEvent("touchstart", { bubbles: true });
      Object.defineProperty(startEv, "touches", {
        value: [{ clientX: 300, clientY: 100 }],
      });
      el.dispatchEvent(startEv);

      const moveEv = new CustomEvent("touchmove", { bubbles: true });
      Object.defineProperty(moveEv, "touches", {
        value: [{ clientX: 50, clientY: 100 }],
      });
      el.dispatchEvent(moveEv);

      const endEv = new CustomEvent("touchend", { bubbles: true });
      el.dispatchEvent(endEv);
    });
    await page.waitForTimeout(300);
    await expect(dot1).toHaveAttribute("aria-selected", "true");

    // Reset back to dot 0
    await dot0.click();
    await expect(dot0).toHaveAttribute("aria-selected", "true");

    // 5. Capture Verification Screenshot
    const brainDir =
      "/Users/pritish/.gemini/antigravity/brain/91fc1fed-fc5f-495e-88c1-129ef76052af";
    const brainScreenshot = path.join(
      brainDir,
      "task-16-featured-carousel-mobile.png"
    );
    const agentScreenshot = ".agent/screenshots/task-16-featured-carousel-mobile.png";

    if (fs.existsSync(brainDir)) {
      await featuredSection.screenshot({ path: brainScreenshot });
      expect(fs.existsSync(brainScreenshot)).toBe(true);
    }
    await featuredSection.screenshot({ path: agentScreenshot });
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

    // Check Featured Products Carousel in Light Mode
    const featuredSection = page.getByTestId("featured-products-carousel");
    await featuredSection.scrollIntoViewIfNeeded();
    await expect(featuredSection).toBeVisible();

    const walnutCard = page.getByTestId("featured-product-card-mendocino-walnut");
    await expect(walnutCard).toBeVisible();
    await expect(walnutCard).toHaveCSS("background-color", "rgb(255, 255, 255)");

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
