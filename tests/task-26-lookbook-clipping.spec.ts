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
        // Click the hotspot pin
        const pinBtn = page.getByTestId(`lookbook-hotspot-pin-${pin.id}`);
        await expect(pinBtn).toBeVisible();
        await pinBtn.click({ force: true });
        await page.waitForTimeout(250);

        // Card must be visible
        const card = page.getByTestId(`lookbook-card-${pin.id}`);
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
    await page.getByTestId("lookbook-hotspot-pin-salon-oak-mini").click({ force: true });
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
    await page.getByTestId("lookbook-hotspot-pin-bedside-deep-walnut").click({ force: true });
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
    await page.getByTestId("lookbook-hotspot-pin-credenza-natural-oak").click({ force: true });
    await page.waitForTimeout(300);

    const credenzaCard = page.getByTestId("lookbook-card-credenza-natural-oak");
    await expect(credenzaCard).toBeVisible();
    await saveScreenshots(
      lookbookSection,
      "task-26-lookbook-all-rooms-verified.png"
    );
  });

  test("verifies mobile layout docking and boundary containment (390x844)", async ({
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

    // Verify initial active card on mobile (salon-walnut-large)
    const card = page.getByTestId("lookbook-card-salon-walnut-large");
    await expect(card).toBeVisible();

    const containerBox = await container.boundingBox();
    const cardBox = await card.boundingBox();

    expect(containerBox).not.toBeNull();
    expect(cardBox).not.toBeNull();

    if (containerBox && cardBox) {
      expect(cardBox.y + cardBox.height).toBeLessThanOrEqual(
        containerBox.y + containerBox.height + 2
      );
      expect(cardBox.y).toBeGreaterThanOrEqual(containerBox.y - 1);
      expect(cardBox.x).toBeGreaterThanOrEqual(0);
      expect(cardBox.x + cardBox.width).toBeLessThanOrEqual(390);
    }

    // Switch to another pin on mobile (e.g. salon-brass-portrait at y:26%)
    const brassPin = page.getByTestId("lookbook-hotspot-pin-salon-brass-portrait");
    await expect(brassPin).toBeVisible();
    await brassPin.click({ force: true });
    await page.waitForTimeout(250);

    const brassCard = page.getByTestId("lookbook-card-salon-brass-portrait");
    await expect(brassCard).toBeVisible();

    const brassCardBox = await brassCard.boundingBox();
    if (containerBox && brassCardBox) {
      expect(brassCardBox.y + brassCardBox.height).toBeLessThanOrEqual(
        containerBox.y + containerBox.height + 2
      );
      expect(brassCardBox.y).toBeGreaterThanOrEqual(containerBox.y - 1);
    }
  });
});
