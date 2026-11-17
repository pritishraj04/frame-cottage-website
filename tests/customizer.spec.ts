import { test, expect } from "@playwright/test";

test.describe("Interactive Studio Customizer Page", () => {
  test("1. Page loads at /customizer with default walnut moulding, classic mat, and ₹76 total price", async ({
    page,
  }) => {
    await page.goto("/customizer");
    await page.waitForLoadState("networkidle");

    // Page container
    await expect(page.getByTestId("studio-customizer-page")).toBeVisible();

    // Default Walnut moulding checked
    const walnutOption = page.getByTestId("moulding-option-walnut");
    await expect(walnutOption).toBeVisible();
    await expect(walnutOption).toHaveAttribute("aria-checked", "true");

    // Default Classic mat checked
    const classicOption = page.getByTestId("mat-option-classic");
    await expect(classicOption).toBeVisible();
    await expect(classicOption).toHaveAttribute("aria-checked", "true");

    // Default total price: Walnut (₹64) + Classic Mat (₹12) = ₹76
    const priceDisplay = page.getByTestId("customizer-total-price");
    await expect(priceDisplay).toBeVisible();
    await expect(priceDisplay).toHaveText("₹76");

    // Live preview stage & outer moulding
    const previewStage = page.getByTestId("customizer-preview-stage");
    await expect(previewStage).toBeVisible();
    const outerMoulding = page.getByTestId("customizer-outer-moulding");
    await expect(outerMoulding).toBeVisible();

    // Artwork display contains default Ginkgo artwork
    const artworkDisplay = page.getByTestId("customizer-artwork-display");
    await expect(artworkDisplay).toBeVisible();
    await expect(artworkDisplay).toContainText("Ginkgo biloba L.");
  });

  test("2. URL Query Parameter Hydration: /customizer?moulding=brass&mat=gallery hydrates Antique Brass and Gallery mat correctly", async ({
    page,
  }) => {
    await page.goto("/customizer?moulding=brass&mat=gallery");
    await page.waitForLoadState("networkidle");

    // Antique Brass is selected
    const brassOption = page.getByTestId("moulding-option-brass");
    await expect(brassOption).toBeVisible();
    await expect(brassOption).toHaveAttribute("aria-checked", "true");

    // Gallery Mat is selected
    const galleryOption = page.getByTestId("mat-option-gallery");
    await expect(galleryOption).toBeVisible();
    await expect(galleryOption).toHaveAttribute("aria-checked", "true");

    // Walnut is not selected
    const walnutOption = page.getByTestId("moulding-option-walnut");
    await expect(walnutOption).toHaveAttribute("aria-checked", "false");

    // Price calculation: Brass (₹78) + Gallery Mat (₹18) = ₹96
    const priceDisplay = page.getByTestId("customizer-total-price");
    await expect(priceDisplay).toHaveText("₹96");
  });

  test("3. Switching moulding profiles dynamically updates real-time price and live preview attributes", async ({
    page,
  }) => {
    await page.goto("/customizer");
    await page.waitForLoadState("networkidle");

    const priceDisplay = page.getByTestId("customizer-total-price");

    // 1. Switch to Antique Brass (₹78 + ₹12 = ₹90)
    await page.getByTestId("moulding-option-brass").click();
    await expect(page.getByTestId("moulding-option-brass")).toHaveAttribute("aria-checked", "true");
    await expect(priceDisplay).toHaveText("₹90");

    // 2. Switch to Gallery Matte Black (₹58 + ₹12 = ₹70)
    await page.getByTestId("moulding-option-black").click();
    await expect(page.getByTestId("moulding-option-black")).toHaveAttribute("aria-checked", "true");
    await expect(priceDisplay).toHaveText("₹70");

    // 3. Switch to Nordic Natural White Oak (₹62 + ₹12 = ₹74)
    await page.getByTestId("moulding-option-oak").click();
    await expect(page.getByTestId("moulding-option-oak")).toHaveAttribute("aria-checked", "true");
    await expect(priceDisplay).toHaveText("₹74");

    // 4. Switch to Vintage Florentine Gold (₹82 + ₹12 = ₹94)
    await page.getByTestId("moulding-option-gold").click();
    await expect(page.getByTestId("moulding-option-gold")).toHaveAttribute("aria-checked", "true");
    await expect(priceDisplay).toHaveText("₹94");

    // 5. Switch to Bleached Heritage Ash (₹68 + ₹12 = ₹80)
    await page.getByTestId("moulding-option-ash").click();
    await expect(page.getByTestId("moulding-option-ash")).toHaveAttribute("aria-checked", "true");
    await expect(priceDisplay).toHaveText("₹80");

    // 6. Switch back to American Natural Walnut (₹64 + ₹12 = ₹76)
    await page.getByTestId("moulding-option-walnut").click();
    await expect(page.getByTestId("moulding-option-walnut")).toHaveAttribute("aria-checked", "true");
    await expect(priceDisplay).toHaveText("₹76");
  });

  test("4. Toggling frame dimensions and conservation glazing updates itemized breakdown and price", async ({
    page,
  }) => {
    await page.goto("/customizer");
    await page.waitForLoadState("networkidle");

    const priceDisplay = page.getByTestId("customizer-total-price");

    // Select 16x20 size (+₹30): Walnut ₹64 + Classic Mat ₹12 + 16x20 ₹30 = ₹106
    const size16x20 = page.getByTestId("size-option-16x20");
    await size16x20.scrollIntoViewIfNeeded();
    await size16x20.click();
    await expect(size16x20).toHaveAttribute("aria-checked", "true");
    await expect(priceDisplay).toHaveText("₹106");

    // Select Museum Glass (+₹24): ₹106 + ₹24 = ₹130
    const museumGlass = page.getByTestId("glazing-option-museum-glass");
    await museumGlass.scrollIntoViewIfNeeded();
    await museumGlass.click();
    await expect(museumGlass).toHaveAttribute("aria-checked", "true");
    await expect(priceDisplay).toHaveText("₹130");

    // Select Shatterproof Acrylic (+₹18): ₹106 + ₹18 = ₹124
    const acrylic = page.getByTestId("glazing-option-acrylic");
    await acrylic.scrollIntoViewIfNeeded();
    await acrylic.click();
    await expect(acrylic).toHaveAttribute("aria-checked", "true");
    await expect(priceDisplay).toHaveText("₹124");
  });

  test("5. Adding configured frame to cart increases cart count, displays feedback toast, and stores the item", async ({
    page,
  }) => {
    await page.goto("/customizer?moulding=brass&mat=classic");
    await page.waitForLoadState("networkidle");

    // Read initial cart badge number
    const cartBadge = page.getByTestId("cart-badge");
    const initialText = await cartBadge.textContent();
    const initialCount = parseInt(initialText || "0", 10);

    // Click Add to Cart
    const addToCartBtn = page.getByTestId("customizer-add-to-cart");
    await addToCartBtn.scrollIntoViewIfNeeded();
    await expect(addToCartBtn).toBeVisible();
    await addToCartBtn.click();

    // Feedback toast appears
    const toast = page.getByTestId("customizer-cart-toast");
    await expect(toast).toBeVisible();
    await expect(toast).toContainText("Added");
    await expect(toast).toContainText("Bespoke Frame");

    // Cart badge count incremented by 1
    const expectedCount = (initialCount + 1).toString();
    await expect(cartBadge).toHaveText(expectedCount);

    // Verify navigating to /cart contains the newly added item
    await page.goto("/cart");
    await page.waitForLoadState("networkidle");
    await expect(page.locator("body")).toContainText("Brushed Antique Brass Bespoke Frame");
  });

  test("6. Wishlist action successfully saves configuration and displays feedback", async ({
    page,
  }) => {
    await page.goto("/customizer?moulding=gold&mat=gallery");
    await page.waitForLoadState("networkidle");

    const wishlistBtn = page.getByTestId("customizer-add-to-wishlist");
    await wishlistBtn.scrollIntoViewIfNeeded();
    await expect(wishlistBtn).toBeVisible();
    await expect(wishlistBtn).toHaveText("Save to Wishlist");

    await wishlistBtn.click();

    // Changes to saved state
    await expect(wishlistBtn).toHaveText("Saved to Wishlist");

    // Toast appears
    const toast = page.getByTestId("customizer-cart-toast");
    await expect(toast).toBeVisible();
    await expect(toast).toContainText("Wishlist");

    // Verify in /wishlist
    await page.goto("/wishlist");
    await page.waitForLoadState("networkidle");
    await expect(page.locator("body")).toContainText("Vintage Florentine Gold Bespoke Frame");
  });

  test("7. Toggles dual-stage visual preview between Studio Neutral and In-Situ Curated Room", async ({
    page,
  }) => {
    await page.goto("/customizer");
    await page.waitForLoadState("networkidle");

    const studioToggle = page.getByTestId("preview-toggle-studio");
    const roomToggle = page.getByTestId("preview-toggle-room");

    // Default: Studio Neutral
    await expect(studioToggle).toHaveAttribute("aria-checked", "true");
    await expect(roomToggle).toHaveAttribute("aria-checked", "false");

    // Toggle to Curated Room
    await roomToggle.click();
    await expect(roomToggle).toHaveAttribute("aria-checked", "true");
    await expect(studioToggle).toHaveAttribute("aria-checked", "false");

    // Toggle back to Studio
    await studioToggle.click();
    await expect(studioToggle).toHaveAttribute("aria-checked", "true");
    await expect(roomToggle).toHaveAttribute("aria-checked", "false");
  });

  test("8. Opens Archival Engineering Spec Sheet modal and RFP link is correctly formatted", async ({
    page,
  }) => {
    await page.goto("/customizer?moulding=walnut&mat=classic");
    await page.waitForLoadState("networkidle");

    // Open spec sheet modal
    const specSheetBtn = page.getByTestId("customizer-spec-sheet");
    await specSheetBtn.scrollIntoViewIfNeeded();
    await specSheetBtn.click();

    const specModal = page.getByRole("dialog");
    await expect(specModal).toBeVisible();
    await expect(specModal).toContainText("Archival Engineering Spec Sheet");
    await expect(specModal).toContainText("American Natural Walnut");

    // Close modal via Escape
    await page.keyboard.press("Escape");
    await expect(specModal).not.toBeVisible();

    // Verify RFP link
    const rfpLink = page.getByTestId("customizer-rfp-link");
    await rfpLink.scrollIntoViewIfNeeded();
    await expect(rfpLink).toBeVisible();
    const href = await rfpLink.getAttribute("href");
    expect(href).toContain("/rfq?source=customizer");
  });

  test("9. Aliases redirect accurately: /customize and /upload redirect to /customizer", async ({
    page,
  }) => {
    // /customize redirect
    await page.goto("/customize?moulding=brass&mat=classic");
    await page.waitForURL(/\/customizer\?moulding=brass/);
    expect(page.url()).toContain("/customizer?moulding=brass");

    // /upload redirect
    await page.goto("/upload");
    await page.waitForURL(/\/customizer\?step=artwork/);
    expect(page.url()).toContain("/customizer?step=artwork");
    await expect(page.getByTestId("customizer-upload-dropzone")).toBeVisible();
  });
});
