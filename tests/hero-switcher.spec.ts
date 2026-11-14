import { test, expect } from "@playwright/test";

test.describe("Hero Image Carousel & The Custom Frame Studio", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("renders responsive Hero Carousel with curated lifestyle slides and Apple typography", async ({
    page,
  }) => {
    const heroCarousel = page.getByTestId("hero-carousel");
    await expect(heroCarousel).toBeVisible();

    // Slide 1 verification: Bespoke Art & Archival Custom Framing
    const slide = page.getByTestId("hero-carousel-slide");
    await expect(slide).toBeVisible();

    // Eyebrow tag
    await expect(heroCarousel).toContainText("Bespoke Art & Custom Framing");

    // Apple-styled headline
    const headline = page.getByTestId("hero-headline");
    await expect(headline).toBeVisible();
    await expect(headline).toHaveText(
      "Bespoke Art & Archival Custom Framing"
    );

    // Subheadline
    const subheadline = page.getByTestId("hero-subheadline");
    await expect(subheadline).toBeVisible();
    await expect(subheadline).toContainText(
      "Gallery-quality fine art printing, canvas stretching"
    );

    // Dual action buttons
    const ctaCustomise = page.getByTestId("cta-customise-frame");
    await expect(ctaCustomise).toBeVisible();
    await expect(ctaCustomise).toHaveAttribute("href", "/customizer");

    const ctaExplore = page.getByTestId("cta-explore-collections");
    await expect(ctaExplore).toBeVisible();
    await expect(ctaExplore).toHaveAttribute("href", "/services/bespoke-framing");

    // Carousel controls
    await expect(page.getByTestId("hero-carousel-prev")).toBeVisible();
    await expect(page.getByTestId("hero-carousel-next")).toBeVisible();
    await expect(page.getByTestId("hero-carousel-indicators")).toBeVisible();

    // Advance to Slide 2: Spatial Design & Architectural Signage
    await page.getByTestId("hero-carousel-next").click();
    await expect(headline).toHaveText("Spatial Design & Architectural Signage");
    await expect(heroCarousel).toContainText("Spatial Design & Signage");

    // Advance to Slide 3: Industrial Fabrication & Civic Projects
    await page.getByTestId("hero-carousel-next").click();
    await expect(headline).toHaveText("Industrial Fabrication & Civic Projects");
    await expect(heroCarousel).toContainText("Precision CNC Metalworks & GeM Certified");

    // Click indicator 0 to return to Slide 1
    await page.getByTestId("hero-carousel-indicator-0").click();
    await expect(headline).toHaveText(
      "Bespoke Art & Archival Custom Framing"
    );
  });

  test("renders The Custom Frame Studio repositioned below hero carousel with trust highlights", async ({
    page,
  }) => {
    const frameStudio = page.getByTestId("custom-frame-studio");
    await frameStudio.scrollIntoViewIfNeeded();
    await expect(frameStudio).toBeVisible();

    // Section title & subtitle
    const title = page.getByTestId("frame-studio-title");
    await expect(title).toBeVisible();
    await expect(title).toHaveText("The Custom Frame Studio");

    const subtitle = page.getByTestId("frame-studio-subtitle");
    await expect(subtitle).toBeVisible();
    await expect(subtitle).toHaveText(
      "Choose your moulding, customize your matting, and preview your art in real time."
    );

    // Trust highlights row
    const trustRow = page.getByTestId("trust-highlights");
    await expect(trustRow).toBeVisible();
    await expect(page.getByTestId("trust-item-hardwoods")).toContainText("100% Solid Hardwoods");
    await expect(page.getByTestId("trust-item-mats")).toContainText("Archival 4-Ply Mats");
    await expect(page.getByTestId("trust-item-glazing")).toContainText("Conservation Glazing");
    await expect(page.getByTestId("trust-item-ready-to-hang")).toContainText("Ready to Hang");
  });

  test("renders initial frame switcher state with Walnut + Classic Mat ($76)", async ({ page }) => {
    const switcher = page.getByTestId("live-frame-switcher");
    await switcher.scrollIntoViewIfNeeded();
    await expect(switcher).toBeVisible();

    // Verify initial price ($64 base + $12 mat = $76)
    const priceAmount = page.getByTestId("frame-price-amount");
    await expect(priceAmount).toHaveText("$76");

    // Verify Walnut moulding button is checked
    const walnutOption = page.getByTestId("moulding-option-walnut");
    await expect(walnutOption).toHaveAttribute("aria-checked", "true");

    // Verify Classic mat button is checked
    const classicOption = page.getByTestId("mat-option-classic");
    await expect(classicOption).toHaveAttribute("aria-checked", "true");

    // Verify artwork is visible
    const artwork = page.getByTestId("frame-artwork");
    await expect(artwork).toBeVisible();
    await expect(artwork).toContainText("Atelier Herbarium");
    await expect(artwork).toContainText("Ginkgo biloba L.");

    // Verify CTAs
    const customizeBtn = page.getByTestId("cta-customize");
    await expect(customizeBtn).toBeVisible();
    await expect(customizeBtn).toHaveAttribute("href", "/customizer?moulding=walnut&mat=classic");

    const uploadBtn = page.getByTestId("cta-upload");
    await expect(uploadBtn).toBeVisible();
    await expect(uploadBtn).toHaveAttribute("href", "/upload");
  });

  test("interactively switches all 5 moulding profiles and updates dynamic price", async ({ page }) => {
    const switcher = page.getByTestId("live-frame-switcher");
    await switcher.scrollIntoViewIfNeeded();
    const priceAmount = page.getByTestId("frame-price-amount");
    const customizeBtn = page.getByTestId("cta-customize");

    // 1. Switch to Antique Brass ($78 base + $12 mat = $90)
    await page.getByTestId("moulding-option-brass").click();
    await expect(page.getByTestId("moulding-option-brass")).toHaveAttribute("aria-checked", "true");
    await expect(page.getByTestId("moulding-option-walnut")).toHaveAttribute("aria-checked", "false");
    await expect(priceAmount).toHaveText("$90");
    await expect(customizeBtn).toHaveAttribute("href", "/customizer?moulding=brass&mat=classic");

    // 2. Switch to Gallery Matte Black ($58 base + $12 mat = $70)
    await page.getByTestId("moulding-option-black").click();
    await expect(page.getByTestId("moulding-option-black")).toHaveAttribute("aria-checked", "true");
    await expect(priceAmount).toHaveText("$70");
    await expect(customizeBtn).toHaveAttribute("href", "/customizer?moulding=black&mat=classic");

    // 3. Switch to Nordic Natural White Oak ($62 base + $12 mat = $74)
    await page.getByTestId("moulding-option-oak").click();
    await expect(page.getByTestId("moulding-option-oak")).toHaveAttribute("aria-checked", "true");
    await expect(priceAmount).toHaveText("$74");
    await expect(customizeBtn).toHaveAttribute("href", "/customizer?moulding=oak&mat=classic");

    // 4. Switch to Vintage Florentine Gold ($82 base + $12 mat = $94)
    await page.getByTestId("moulding-option-gold").click();
    await expect(page.getByTestId("moulding-option-gold")).toHaveAttribute("aria-checked", "true");
    await expect(priceAmount).toHaveText("$94");
    await expect(customizeBtn).toHaveAttribute("href", "/customizer?moulding=gold&mat=classic");

    // 5. Switch back to American Natural Walnut ($64 base + $12 mat = $76)
    await page.getByTestId("moulding-option-walnut").click();
    await expect(page.getByTestId("moulding-option-walnut")).toHaveAttribute("aria-checked", "true");
    await expect(priceAmount).toHaveText("$76");
  });

  test("toggles mat margins and calculates real-time price & bevel recalculation", async ({ page }) => {
    const switcher = page.getByTestId("live-frame-switcher");
    await switcher.scrollIntoViewIfNeeded();
    const priceAmount = page.getByTestId("frame-price-amount");
    const matBoard = page.getByTestId("frame-mat-board");

    // Initially with Classic mat (24px padding, +$12, base $64 walnut = $76)
    await expect(matBoard).toHaveCSS("padding", "24px");
    await expect(priceAmount).toHaveText("$76");

    // 1. Toggle to No Mat ($0, base $64 walnut = $64)
    await page.getByTestId("mat-option-none").click();
    await expect(page.getByTestId("mat-option-none")).toHaveAttribute("aria-checked", "true");
    await expect(priceAmount).toHaveText("$64");
    await expect(matBoard).toHaveCSS("padding", "0px");

    // 2. Toggle to 3\" Dramatic Gallery (36px padding, +$18, base $64 walnut = $82)
    await page.getByTestId("mat-option-gallery").click();
    await expect(page.getByTestId("mat-option-gallery")).toHaveAttribute("aria-checked", "true");
    await expect(priceAmount).toHaveText("$82");
    await expect(matBoard).toHaveCSS("padding", "36px");

    // Combine with Gold moulding ($82 + $18 = $100)
    await page.getByTestId("moulding-option-gold").click();
    await expect(priceAmount).toHaveText("$100");
  });

  test("toggles room context between Studio Neutral and Curated Living Room and captures screenshots", async ({ page }) => {
    const switcher = page.getByTestId("live-frame-switcher");
    await switcher.scrollIntoViewIfNeeded();
    const studioToggle = page.getByTestId("context-toggle-studio");
    const roomToggle = page.getByTestId("context-toggle-room");
    const displayContainer = page.getByTestId("frame-display-container");

    // Default: Studio Neutral
    await expect(studioToggle).toHaveAttribute("aria-checked", "true");
    await expect(roomToggle).toHaveAttribute("aria-checked", "false");
    await expect(displayContainer).toContainText("Crisp Architectural Daylight");

    // Capture screenshot in Studio Neutral context
    await page.screenshot({
      path: ".agent/screenshots/task-4-hero-switcher-studio.png",
      fullPage: true,
    });

    // Toggle to Curated Living Room
    await roomToggle.click();
    await expect(roomToggle).toHaveAttribute("aria-checked", "true");
    await expect(studioToggle).toHaveAttribute("aria-checked", "false");
    await expect(displayContainer).toContainText("Salon Wall with Warm Evening Glow");

    // Verify outer frame drop shadow in room context has deeper room shadow
    const frameOuter = page.getByTestId("frame-outer-moulding");
    await expect(frameOuter).toBeVisible();

    // Capture screenshot in Curated Living Room context
    await page.screenshot({
      path: ".agent/screenshots/task-4-hero-switcher-room.png",
      fullPage: true,
    });

    // Toggle back to Studio Neutral
    await studioToggle.click();
    await expect(studioToggle).toHaveAttribute("aria-checked", "true");
    await expect(displayContainer).toContainText("Crisp Architectural Daylight");
  });
});
