import { test, expect } from "@playwright/test";
import path from "path";
import fs from "fs";

test.describe("TASK-26: Customer Lookbook Card Bottom Clipping Fix Verification", () => {
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

  const saveScreenshots = async (locator: any, filename: string) => {
    const agentPath = path.join(screenshotsDir, filename);
    const brainPath = path.join(parentBrainDir, filename);
    await locator.screenshot({ path: agentPath });
    try {
      fs.copyFileSync(agentPath, brainPath);
    } catch {
      await locator.screenshot({ path: brainPath });
    }
  };

  test("verifies smart dynamic popover positioning and zero clipping across all rooms and pins", async ({
    page,
  }) => {
    // 1. Desktop Viewport (1440x900)
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("/");
    await page.waitForLoadState("networkidle");

    // Force Dark Mode initially
    await page.evaluate(() => {
      document.documentElement.classList.add("dark");
      document.documentElement.classList.remove("light");
      localStorage.setItem("frame-cottage-theme", "dark");
    });
    await page.waitForTimeout(300);

    const lookbookSection = page.getByTestId("customer-lookbook");
    await lookbookSection.scrollIntoViewIfNeeded();
    await expect(lookbookSection).toBeVisible();

    const container = page.getByTestId("lookbook-scene-dropzone");
    await expect(container).toBeVisible();

    // Data structure of all rooms and hotspots to verify
    const testRooms = [
      {
        roomId: "living-room",
        tabTestId: "lookbook-room-tab-living-room",
        pins: [
          { id: "salon-walnut-large", y: 30, isLowerHalf: false },
          { id: "salon-brass-portrait", y: 26, isLowerHalf: false },
          { id: "salon-oak-mini", y: 56, isLowerHalf: true },
        ],
      },
      {
        roomId: "dining-credenza",
        tabTestId: "lookbook-room-tab-dining-credenza",
        pins: [
          { id: "credenza-matte-black", y: 38, isLowerHalf: false },
          { id: "credenza-natural-oak", y: 46, isLowerHalf: true },
        ],
      },
      {
        roomId: "minimalist-bedside",
        tabTestId: "lookbook-room-tab-minimalist-bedside",
        pins: [
          { id: "bedside-bleached-maple", y: 34, isLowerHalf: false },
          { id: "bedside-deep-walnut", y: 52, isLowerHalf: true },
        ],
      },
    ];

    for (const room of testRooms) {
      // Select room tab
      const roomTab = page.getByTestId(room.tabTestId);
      await roomTab.click();
      await page.waitForTimeout(250);

      for (const pin of room.pins) {
        const card = page.getByTestId(`lookbook-card-${pin.id}`);
        const isCardVisible = await card.isVisible().catch(() => false);

        if (!isCardVisible) {
          // Click the hotspot pin to open card
          const pinBtn = page.getByTestId(`lookbook-hotspot-pin-${pin.id}`);
          await expect(pinBtn).toBeVisible();
          await pinBtn.click();
          await page.waitForTimeout(250);
        }

        // Card must be visible
        await expect(card).toBeVisible();

        // Verify sub-elements within card
        const buyerBadge = card.getByTestId(`lookbook-buyer-badge-${pin.id}`);
        await expect(buyerBadge).toBeVisible();

        const shopLink = card.getByTestId(`lookbook-shop-link-${pin.id}`);
        await expect(shopLink).toBeVisible();

        // Retrieve bounding boxes for mathematical boundary verification
        const containerBox = await container.boundingBox();
        const cardBox = await card.boundingBox();
        const shopLinkBox = await shopLink.boundingBox();

        expect(containerBox).not.toBeNull();
        expect(cardBox).not.toBeNull();
        expect(shopLinkBox).not.toBeNull();

        if (containerBox && cardBox && shopLinkBox) {
          // Mathematical Proof:
          // 1. Top of card is within or equal to container top (no top clipping)
          expect(cardBox.y).toBeGreaterThanOrEqual(containerBox.y - 1);

          // 2. Bottom of card is within container bottom (no bottom clipping!)
          // Card bottom: cardBox.y + cardBox.height <= containerBox.y + containerBox.height + 2
          expect(cardBox.y + cardBox.height).toBeLessThanOrEqual(
            containerBox.y + containerBox.height + 2
          );

          // 3. Shop link CTA button is strictly visible inside container bounds
          expect(shopLinkBox.y + shopLinkBox.height).toBeLessThanOrEqual(
            containerBox.y + containerBox.height
          );
          expect(shopLinkBox.y).toBeGreaterThanOrEqual(containerBox.y);
        }
      }
    }

    // Capture Proof 1: Lower-Half Pin in Dark Mode (salon-oak-mini, y:56%)
    // Reselect living-room and click salon-oak-mini
    await page.getByTestId("lookbook-room-tab-living-room").click();
    await page.waitForTimeout(200);
    await page.getByTestId("lookbook-hotspot-pin-salon-oak-mini").click();
    await page.waitForTimeout(300);
    await saveScreenshots(
      lookbookSection,
      "task-26-lookbook-lower-pin-no-clipping-dark.png"
    );

    // Capture Proof 2: Lower-Half Pin in Light Mode (bedside-deep-walnut, y:52%)
    await page.evaluate(() => {
      document.documentElement.classList.add("light");
      document.documentElement.classList.remove("dark");
      localStorage.setItem("frame-cottage-theme", "light");
    });
    await page.waitForTimeout(300);

    await page.getByTestId("lookbook-room-tab-minimalist-bedside").click();
    await page.waitForTimeout(200);
    await page.getByTestId("lookbook-hotspot-pin-bedside-deep-walnut").click();
    await page.waitForTimeout(300);

    const bedsideCard = page.getByTestId("lookbook-card-bedside-deep-walnut");
    await expect(bedsideCard).toBeVisible();
    await saveScreenshots(
      lookbookSection,
      "task-26-lookbook-lower-pin-no-clipping-light.png"
    );

    // Capture Proof 3: All Rooms Verified Overview (dining-credenza, credenza-natural-oak, y:46%)
    await page.getByTestId("lookbook-room-tab-dining-credenza").click();
    await page.waitForTimeout(200);
    await page.getByTestId("lookbook-hotspot-pin-credenza-natural-oak").click();
    await page.waitForTimeout(300);

    const credenzaCard = page.getByTestId("lookbook-card-credenza-natural-oak");
    await expect(credenzaCard).toBeVisible();
    await saveScreenshots(
      lookbookSection,
      "task-26-lookbook-all-rooms-verified.png"
    );
  });

  test("verifies mobile layout docking, dismissal, zero overlap, and toggle (390x844)", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/");
    await page.waitForLoadState("networkidle");

    const lookbookSection = page.getByTestId("customer-lookbook");
    await lookbookSection.scrollIntoViewIfNeeded();
    await expect(lookbookSection).toBeVisible();

    const container = page.getByTestId("lookbook-scene-dropzone");
    await expect(container).toBeVisible();

    // 1. Verify initial active card on mobile (salon-walnut-large)
    const initialCard = page.getByTestId("lookbook-card-salon-walnut-large");
    await expect(initialCard).toBeVisible();

    const containerBox = await container.boundingBox();
    const initialCardBox = await initialCard.boundingBox();

    expect(containerBox).not.toBeNull();
    expect(initialCardBox).not.toBeNull();

    if (containerBox && initialCardBox) {
      expect(initialCardBox.y + initialCardBox.height).toBeLessThanOrEqual(
        containerBox.y + containerBox.height + 2
      );
      expect(initialCardBox.y).toBeGreaterThanOrEqual(containerBox.y - 1);
      expect(initialCardBox.x).toBeGreaterThanOrEqual(0);
      expect(initialCardBox.x + initialCardBox.width).toBeLessThanOrEqual(390);
    }

    // 2. Test clicking lower pin salon-oak-mini (y: 56%) WITHOUT { force: true }
    const oakMiniPin = page.getByTestId("lookbook-hotspot-pin-salon-oak-mini");
    await expect(oakMiniPin).toBeVisible();
    await oakMiniPin.click();
    await page.waitForTimeout(250);

    const oakMiniCard = page.getByTestId("lookbook-card-salon-oak-mini");
    await expect(oakMiniCard).toBeVisible();

    // Capture screenshot with compact card open
    await saveScreenshots(lookbookSection, "task-41-lookbook-mobile-compact.png");

    // 3. Test clicking the close button ('X') closes the card completely
    const closeBtn = page.getByLabel("Close card");
    await expect(closeBtn).toBeVisible();
    await closeBtn.click();
    await page.waitForTimeout(250);

    // Assert that card is completely unmounted/closed
    await expect(page.locator('[data-testid^="lookbook-card-"]')).toHaveCount(0);

    // Capture screenshot with card closed
    await saveScreenshots(lookbookSection, "task-41-lookbook-mobile-closed.png");

    // 4. Test that tapping a pin again toggles it open
    await oakMiniPin.click();
    await page.waitForTimeout(250);
    await expect(oakMiniCard).toBeVisible();

    // Test that tapping the active pin again toggles it off
    await oakMiniPin.click();
    await page.waitForTimeout(250);
    await expect(page.locator('[data-testid^="lookbook-card-"]')).toHaveCount(0);

    // 5. Test clicking background dropzone dismisses card
    // Open a pin first
    const brassPin = page.getByTestId("lookbook-hotspot-pin-salon-brass-portrait");
    await expect(brassPin).toBeVisible();
    await brassPin.click();
    await page.waitForTimeout(250);
    await expect(page.getByTestId("lookbook-card-salon-brass-portrait")).toBeVisible();

    // Click dropzone background at top center where there is no pin
    if (containerBox) {
      await page.mouse.click(containerBox.x + containerBox.width / 2, containerBox.y + 15);
      await page.waitForTimeout(250);
      await expect(page.locator('[data-testid^="lookbook-card-"]')).toHaveCount(0);
    }

    // 6. Test that switching rooms works cleanly
    const diningTab = page.getByTestId("lookbook-room-tab-dining-credenza");
    await expect(diningTab).toBeVisible();
    await diningTab.click();
    await page.waitForTimeout(250);

    // Should load the first pin card for dining room
    const credenzaCard = page.getByTestId("lookbook-card-credenza-matte-black");
    await expect(credenzaCard).toBeVisible();

    // Switch to minimalist bedside
    const bedsideTab = page.getByTestId("lookbook-room-tab-minimalist-bedside");
    await expect(bedsideTab).toBeVisible();
    await bedsideTab.click();
    await page.waitForTimeout(250);

    const bedsideCard = page.getByTestId("lookbook-card-bedside-bleached-maple");
    await expect(bedsideCard).toBeVisible();
  });
});
