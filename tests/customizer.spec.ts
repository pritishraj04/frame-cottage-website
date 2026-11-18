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

  test("10. Order via WhatsApp button is visible with preformatted WhatsApp URL containing frame specifications", async ({
    page,
  }) => {
    await page.goto("/customizer?moulding=walnut&mat=classic");
    await page.waitForLoadState("networkidle");

    const whatsappBtn = page.getByTestId("customizer-order-whatsapp");
    await whatsappBtn.scrollIntoViewIfNeeded();
    await expect(whatsappBtn).toBeVisible();
    await expect(whatsappBtn).toContainText("Order via WhatsApp");

    const href = await whatsappBtn.getAttribute("href");
    expect(href).not.toBeNull();
    expect(href).toContain("https://wa.me/");
    expect(href).toContain("Walnut");
  });

  test("11. Email Spec Sheet / Order button opens modal, allows switching Payment Type, and dispatches Resend HTML invoice requisition", async ({
    page,
  }) => {
    await page.goto("/customizer?moulding=walnut&mat=classic");
    await page.waitForLoadState("networkidle");

    const emailOrderBtn = page.getByTestId("customizer-email-order");
    await emailOrderBtn.scrollIntoViewIfNeeded();
    await expect(emailOrderBtn).toBeVisible();
    await emailOrderBtn.click();

    const emailModal = page.getByTestId("customizer-email-modal");
    await expect(emailModal).toBeVisible();

    // Verify Payment Type selector renders and all 4 options are present
    const paymentSelector = page.getByTestId("payment-type-selector");
    await expect(paymentSelector).toBeVisible();
    await expect(page.getByTestId("payment-option-upi")).toBeVisible();
    await expect(page.getByTestId("payment-option-bank-transfer")).toBeVisible();
    await expect(page.getByTestId("payment-option-card-link")).toBeVisible();
    await expect(page.getByTestId("payment-option-pay-on-delivery")).toBeVisible();

    // Switch payment option from default UPI to Bank Transfer (NEFT/IMPS/RTGS)
    await page.getByTestId("payment-option-bank-transfer").click();
    await expect(page.getByTestId("payment-option-bank-transfer")).toContainText("NEFT / IMPS / RTGS");

    await page.getByTestId("customizer-email-name").fill("Ar. Priya Sen");
    await page.getByTestId("customizer-email-input").fill("priya@senstudio.com");
    await page.getByTestId("customizer-email-phone").fill("+91 98111 22334");
    await page.getByTestId("customizer-email-notes").fill("Deliver to Studio 4B, Hauz Khas");

    await page.getByTestId("customizer-submit-email").click();
    await expect(emailModal.getByText("Spec Sheet Dispatched!")).toBeVisible();
    await expect(emailModal).toContainText("NEFT / IMPS / RTGS");
    await expect(emailModal).toContainText("Official Atelier HTML Invoice");
  });

  test("12. Modal state persistence regression: Confirming customizer order, clicking Continue Browsing, and re-navigating to customizer does NOT show stale popup", async ({
    page,
  }) => {
    // 1. Visit /customizer
    await page.goto("/customizer");
    await page.waitForLoadState("networkidle");

    // 2. Open Email Spec Sheet / Order modal, fill name/email, submit order, verify confirmation ("Spec Sheet Dispatched!")
    const emailOrderBtn = page.getByTestId("customizer-email-order");
    await emailOrderBtn.scrollIntoViewIfNeeded();
    await emailOrderBtn.click();

    const emailModal = page.getByTestId("customizer-email-modal");
    await expect(emailModal).toBeVisible();

    await page.getByTestId("customizer-email-name").fill("Ar. Priya Sen");
    await page.getByTestId("customizer-email-input").fill("priya@senstudio.com");
    await page.getByTestId("customizer-submit-email").click();

    await expect(emailModal.getByText("Spec Sheet Dispatched!")).toBeVisible();

    // 3. Click "Continue Browsing" link and verify navigation to /
    const continueBrowsingBtn = page.getByTestId("customizer-continue-browsing");
    await expect(continueBrowsingBtn).toBeVisible();
    await continueBrowsingBtn.click();
    await page.waitForURL("/");

    // 4. Click "Customize This Frame" (cta-customize) on / (soft client-side Next.js navigation) to return to /customizer
    const customizeCta = page.getByTestId("cta-customize");
    await expect(customizeCta).toBeVisible();
    await customizeCta.click();
    await page.waitForURL(/\/customizer/);

    // 5. Assert customizer-email-modal is NOT visible
    await expect(page.getByTestId("customizer-email-modal")).not.toBeVisible();
  });

  test("13. Cart modal persistence regression: Confirming cart requisition, clicking Continue Browsing Gallery, and returning to /cart does NOT show stale checkout modal", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1600, height: 900 });

    // 1. Visit /cart
    await page.goto("/cart");
    await page.waitForLoadState("networkidle");

    // 2. Open checkout modal via Resend HTML Email trigger
    const emailCheckoutBtn = page.getByTestId("email-checkout-btn");
    await emailCheckoutBtn.scrollIntoViewIfNeeded();
    await emailCheckoutBtn.click();

    const checkoutModal = page.getByTestId("checkout-modal");
    await expect(checkoutModal).toBeVisible();

    // 3. Fill customer info and submit order
    await page.getByTestId("checkout-customer-name").fill("Ar. Rajesh Mehra");
    await page.getByTestId("checkout-customer-email").fill("rajesh@mehra.design");
    await page.getByTestId("send-email-order-btn").click();

    // 4. Verify confirmation
    await expect(page.getByText("Requisition Dispatched Successfully!")).toBeVisible();

    // 5. Click "Continue Browsing Gallery" (view-saved-orders-btn)
    const continueGalleryBtn = page.getByTestId("view-saved-orders-btn");
    await expect(continueGalleryBtn).toBeVisible();
    await continueGalleryBtn.click();
    await page.waitForURL("/");

    // 6. Return to /cart via visible header cart button (soft client-side Next.js navigation)
    const headerCartBtn = page.getByTestId("header-cart-btn").filter({ visible: true });
    await expect(headerCartBtn).toBeVisible();
    await headerCartBtn.click();
    await page.waitForURL("**/cart");

    // 7. Assert checkout-modal is NOT visible
    await expect(page.getByTestId("checkout-modal")).not.toBeVisible();
  });

  test("14. Mobile responsive layout (390x844): Zero horizontal overflow, no preview stage overlaps, and interactive options click cleanly", async ({
    page,
  }) => {
    // 1. Mobile viewport 390x844 (iPhone 12/13/14 screen)
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/customizer");
    await page.waitForLoadState("networkidle");

    // 2. Zero horizontal overflow across page
    const hasHorizontalOverflow = await page.evaluate(() => {
      return document.documentElement.scrollWidth > document.documentElement.clientWidth;
    });
    expect(hasHorizontalOverflow).toBe(false);

    // Quick jump ribbon shows "↑ Preview" and mobile live price pill
    const quickPreviewBtn = page.getByTestId("customizer-quick-preview-btn");
    await expect(quickPreviewBtn).toBeVisible();
    const ribbonPrice = page.getByTestId("customizer-ribbon-mobile-price");
    await expect(ribbonPrice).toBeVisible();
    await expect(ribbonPrice).toHaveText("₹76");

    // 3. Verifies preview stage is in normal document flow on mobile and does NOT overlap controls
    const previewStage = page.getByTestId("customizer-preview-stage");
    const controlsPanel = page.getByTestId("customizer-controls-panel");
    await expect(previewStage).toBeVisible();
    await expect(controlsPanel).toBeVisible();

    const previewBox = await previewStage.boundingBox();
    const controlsBox = await controlsPanel.boundingBox();
    expect(previewBox).not.toBeNull();
    expect(controlsBox).not.toBeNull();
    if (previewBox && controlsBox) {
      // In mobile normal flow, preview stage is positioned strictly above controls panel
      expect(previewBox.y + previewBox.height).toBeLessThanOrEqual(controlsBox.y + 2);
    }

    // 4. Actually clicks moulding (brass), mat (gallery), size (16x20), and glazing (museum-glass)
    // without { force: true } (proving zero sticky transparent layer intercepts pointer events!)

    // Select Brass Moulding: ₹78 + ₹12 = ₹90
    const brassMoulding = page.getByTestId("moulding-option-brass");
    await brassMoulding.scrollIntoViewIfNeeded();
    await brassMoulding.click(); // no force: true
    await expect(brassMoulding).toHaveAttribute("aria-checked", "true");
    await expect(ribbonPrice).toHaveText("₹90");

    // Select Gallery Mat: ₹78 + ₹18 = ₹96
    const galleryMat = page.getByTestId("mat-option-gallery");
    await galleryMat.scrollIntoViewIfNeeded();
    await galleryMat.click(); // no force: true
    await expect(galleryMat).toHaveAttribute("aria-checked", "true");
    await expect(ribbonPrice).toHaveText("₹96");

    // 5. Verifies the "Standard" badge on 16x20 does not overlap the size label bounding box
    const size16x20 = page.getByTestId("size-option-16x20");
    await size16x20.scrollIntoViewIfNeeded();

    const sizeLabel = size16x20.locator("span", { hasText: '16" × 20"' });
    const standardBadge = size16x20.locator("span", { hasText: "Standard" });
    await expect(sizeLabel).toBeVisible();
    await expect(standardBadge).toBeVisible();
    const labelBox = await sizeLabel.boundingBox();
    const badgeBox = await standardBadge.boundingBox();
    expect(labelBox).not.toBeNull();
    expect(badgeBox).not.toBeNull();
    if (labelBox && badgeBox) {
      // Badge is to the right of the label in flex row with no overlap
      expect(labelBox.x + labelBox.width).toBeLessThanOrEqual(badgeBox.x);
    }

    // Click 16x20 size (+₹30): ₹96 + ₹30 = ₹126
    await size16x20.click(); // no force: true
    await expect(size16x20).toHaveAttribute("aria-checked", "true");
    await expect(ribbonPrice).toHaveText("₹126");

    // Select Museum Glass (+₹24): ₹126 + ₹24 = ₹150
    const museumGlass = page.getByTestId("glazing-option-museum-glass");
    await museumGlass.scrollIntoViewIfNeeded();
    await museumGlass.click(); // no force: true
    await expect(museumGlass).toHaveAttribute("aria-checked", "true");
    await expect(ribbonPrice).toHaveText("₹150");

    // 6. Verifies total price updates accurately on mobile
    const totalPrice = page.getByTestId("customizer-total-price");
    await expect(totalPrice).toHaveText("₹150");

    // Test "↑ Preview" quick jump button scrolls preview back into view
    await quickPreviewBtn.click();
    await page.waitForTimeout(400); // allow smooth scroll
    const previewAnchor = page.locator("#customizer-preview-anchor");
    await expect(previewAnchor).toBeInViewport();
  });
});
