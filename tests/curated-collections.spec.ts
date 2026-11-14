import { test, expect } from "@playwright/test";

test.describe("Curated Projects & Dual-State In-Situ Product Cards", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("renders Curated Projects & Capabilities section header and all 6 vertical filter tabs", async ({
    page,
  }) => {
    const section = page.getByTestId("curated-collections");
    await expect(section).toBeVisible();

    // Section Header and Subheading
    const header = page.getByTestId("curated-collections-header");
    await expect(header).toBeVisible();
    await expect(header).toContainText("Curated Projects & Capabilities");
    await expect(header).toContainText("Artisan Milling & Spatial Capabilities");
    await expect(header).toContainText("Tru Vue® UV-Shield Acrylic");

    // All 6 vertical filter tabs
    const tabs = [
      { id: "all", label: "All Verticals" },
      { id: "bespoke-framing", label: "Bespoke Framing & Art" },
      { id: "spatial-signage", label: "Spatial & Signage" },
      { id: "industrial-cnc", label: "Industrial CNC" },
      { id: "custom-gifting", label: "Custom Gifting" },
      { id: "civic-projects", label: "Civic & Government" },
    ];

    for (const tab of tabs) {
      const tabBtn = page.getByTestId(`collection-tab-${tab.id}`);
      await expect(tabBtn).toBeVisible();
      await expect(tabBtn).toContainText(tab.label);
    }

    // Default active tab should be "all"
    await expect(page.getByTestId("collection-tab-all")).toHaveAttribute(
      "aria-selected",
      "true"
    );
    await expect(
      page.getByTestId("collection-tab-bespoke-framing")
    ).toHaveAttribute("aria-selected", "false");
  });

  test("renders product cards with serif titles, materials, size badges, and starting prices", async ({
    page,
  }) => {
    const grid = page.getByTestId("collection-grid");
    await expect(grid).toBeVisible();

    // Verify key curated frame cards exist
    const testProducts = [
      {
        id: "highline-matte-black",
        title: "The Highline Matte Black",
        price: "From $54",
        size: "8×10 to 24×36 in",
      },
      {
        id: "kyoto-white-oak",
        title: "The Kyoto White Oak",
        price: "From $62",
        size: "8×10 to 24×36 in",
      },
      {
        id: "mendocino-walnut",
        title: "The Mendocino Walnut",
        price: "From $64",
        size: "8×10 to 24×36 in",
      },
      {
        id: "tribeca-brass",
        title: "The Tribeca Brushed Brass",
        price: "From $78",
        size: "8×10 to 24×36 in",
      },
      {
        id: "florentine-gilded",
        title: "The Florentine Gilded Heirloom",
        price: "From $82",
        size: "8×10 to 24×36 in",
      },
    ];

    for (const prod of testProducts) {
      const card = page.getByTestId(`frame-card-${prod.id}`);
      await expect(card).toBeVisible();

      // Check title
      const title = page.getByTestId(`frame-card-title-${prod.id}`);
      await expect(title).toHaveText(prod.title);

      // Check material
      const material = page.getByTestId(`frame-card-material-${prod.id}`);
      await expect(material).toBeVisible();

      // Check standard sizes badge
      const sizeBadge = page.getByTestId(`frame-card-size-${prod.id}`);
      await expect(sizeBadge).toHaveText(prod.size);

      // Check starting price
      const priceTag = page.getByTestId(`frame-card-price-${prod.id}`);
      await expect(priceTag).toHaveText(prod.price);

      // Check rest state cutout is present
      const restState = page.getByTestId(`frame-card-rest-${prod.id}`);
      await expect(restState).toBeVisible();
    }
  });

  test("filters curated frame models by category tab", async ({ page }) => {
    // Click "Spatial & Signage"
    const spatialTab = page.getByTestId("collection-tab-spatial-signage");
    await spatialTab.click();
    await expect(spatialTab).toHaveAttribute("aria-selected", "true");

    // Spatial signage models should be visible
    await expect(
      page.getByTestId("frame-card-architectural-wayfinding")
    ).toBeVisible();

    // Bespoke framing models should be filtered out
    await expect(
      page.getByTestId("frame-card-mendocino-walnut")
    ).not.toBeVisible();
    await expect(
      page.getByTestId("frame-card-tribeca-brass")
    ).not.toBeVisible();

    // Click "All Verticals" to restore
    const allTab = page.getByTestId("collection-tab-all");
    await allTab.click();
    await expect(page.getByTestId("frame-card-mendocino-walnut")).toBeVisible();
    await expect(page.getByTestId("frame-card-tribeca-brass")).toBeVisible();
  });

  test("triggers hover transition, reveals in-situ living room scene and Quick Customise CTA, and toggles wishlist", async ({
    page,
  }) => {
    const section = page.getByTestId("curated-collections");
    await section.scrollIntoViewIfNeeded();

    const targetCard = page.getByTestId("frame-card-mendocino-walnut");
    await expect(targetCard).toBeVisible();

    const restView = page.getByTestId("frame-card-rest-mendocino-walnut");
    const insituView = page.getByTestId("frame-card-insitu-mendocino-walnut");
    const quickCustomiseBtn = page.getByTestId(
      "quick-customise-btn-mendocino-walnut"
    );
    const wishlistBtn = page.getByTestId("wishlist-btn-mendocino-walnut");

    // Rest view is initially visible
    await expect(restView).toBeVisible();

    // Hover over the card to reveal in-situ scene and quick customise button
    await targetCard.hover();
    await expect(quickCustomiseBtn).toBeVisible();
    await expect(insituView).toBeVisible();
    await expect(insituView).toContainText("In Situ • Mid-Century Credenza");

    // Test Wishlist toggle
    await expect(wishlistBtn).toHaveAttribute("aria-label", "Add to wishlist");
    await wishlistBtn.click();
    await expect(wishlistBtn).toHaveAttribute(
      "aria-label",
      "Remove from wishlist"
    );
    await wishlistBtn.click();
    await expect(wishlistBtn).toHaveAttribute("aria-label", "Add to wishlist");

    // Capture curated collections screenshot with hover state active
    await page.screenshot({
      path: ".agent/screenshots/task-6-curated-collections.png",
      fullPage: false,
    });
  });

  test("opens Quick Customise dialog, dynamically updates price for dimensions and matting, and verifies CTA", async ({
    page,
  }) => {
    const section = page.getByTestId("curated-collections");
    await section.scrollIntoViewIfNeeded();

    const targetCard = page.getByTestId("frame-card-mendocino-walnut");
    await targetCard.scrollIntoViewIfNeeded();
    await targetCard.hover();

    const quickCustomiseBtn = page.getByTestId(
      "quick-customise-btn-mendocino-walnut"
    );
    await expect(quickCustomiseBtn).toBeVisible();
    await quickCustomiseBtn.click();

    // Dialog should open
    const dialog = page.getByRole("dialog");
    await expect(dialog).toBeVisible();

    // Title and description
    await expect(page.getByTestId("dialog-title")).toHaveText(
      "The Mendocino Walnut"
    );
    await expect(page.getByTestId("dialog-description")).toContainText(
      "100% Solid American Walnut"
    );

    // Live frame preview
    const preview = page.getByTestId("dialog-frame-preview");
    await expect(preview).toBeVisible();

    // Verify all 4 size options are rendered
    const size8x10 = page.getByTestId("dialog-size-option-8x10");
    const size11x14 = page.getByTestId("dialog-size-option-11x14");
    const size16x20 = page.getByTestId("dialog-size-option-16x20");
    const size24x36 = page.getByTestId("dialog-size-option-24x36");

    await expect(size8x10).toBeVisible();
    await expect(size11x14).toBeVisible();
    await expect(size16x20).toBeVisible();
    await expect(size24x36).toBeVisible();

    // Verify all 3 mat options are rendered
    const matNone = page.getByTestId("dialog-mat-option-none");
    const matClassic = page.getByTestId("dialog-mat-option-classic");
    const matGallery = page.getByTestId("dialog-mat-option-gallery");

    await expect(matNone).toBeVisible();
    await expect(matClassic).toBeVisible();
    await expect(matGallery).toBeVisible();

    // Initial state: 8x10 ($0 delta) + Mendocino default mat (gallery +$18) = Base $64 + $0 + $18 = $82
    const priceDisplay = page.getByTestId("dialog-total-price");
    await expect(priceDisplay).toHaveText("$82");

    // Select 11x14 size option (+ $16 delta): $64 + $16 + $18 = $98
    await size11x14.click();
    await expect(size11x14).toHaveAttribute("aria-checked", "true");
    await expect(priceDisplay).toHaveText("$98");

    // Select "No Mat" (+ $0): $64 + $16 + $0 = $80
    await matNone.click();
    await expect(matNone).toHaveAttribute("aria-checked", "true");
    await expect(priceDisplay).toHaveText("$80");

    // Select 2" Classic mat (+ $12): $64 + $16 + $12 = $92
    await matClassic.click();
    await expect(matClassic).toHaveAttribute("aria-checked", "true");
    await expect(priceDisplay).toHaveText("$92");

    // Verify CTA button
    const ctaButton = page.getByTestId("dialog-cta-button");
    await expect(ctaButton).toBeVisible();
    await expect(ctaButton).toContainText("Proceed to Full Customiser");
    await expect(ctaButton).toHaveAttribute(
      "href",
      "/customise?moulding=walnut&size=11x14&mat=classic"
    );

    // Close the dialog
    const closeBtn = page.getByTestId("dialog-close-btn");
    await closeBtn.click();
    await expect(dialog).not.toBeVisible();
  });

  test("renders gracefully on mobile viewport", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/");

    const section = page.getByTestId("curated-collections");
    await expect(section).toBeVisible();

    const card = page.getByTestId("frame-card-mendocino-walnut");
    await expect(card).toBeVisible();
  });
});
