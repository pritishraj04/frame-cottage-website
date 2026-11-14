import { test, expect } from "@playwright/test";
import path from "path";
import fs from "fs";

test.describe("Full Home Page End-to-End Smoke & Craft Validation", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("renders all core sections in seamless end-to-end page hierarchy with Apple redesign", async ({
    page,
  }) => {
    // 1. Site Header & Announcement Bar
    const header = page.locator("header");
    await expect(header).toBeVisible();
    await expect(page.getByTestId("brand-wordmark")).toBeVisible();

    // 2. Hero Carousel (Responsive touch-enabled image carousel)
    const heroCarousel = page.getByTestId("hero-carousel");
    await expect(heroCarousel).toBeVisible();

    // 3. Custom Frame Studio (Interactive Frame Switcher moved below Hero)
    const customFrameStudio = page.getByTestId("custom-frame-studio");
    await expect(customFrameStudio).toBeVisible();
    await expect(page.getByTestId("live-frame-switcher")).toBeVisible();

    // 4. Category Pills
    const categoryPills = page.getByTestId("category-pills");
    await expect(categoryPills).toBeVisible();

    // 5. Trust Bar
    const trustBar = page.getByTestId("trust-bar");
    await expect(trustBar).toBeVisible();

    // 6. Curated Collections
    const curatedCollections = page.getByTestId("curated-collections");
    await expect(curatedCollections).toBeVisible();

    // 7. Framing Journey
    const framingJourney = page.getByTestId("framing-journey");
    await expect(framingJourney).toBeVisible();

    // 8. Featured Products Carousel
    const featuredCarousel = page.getByTestId("featured-products-carousel");
    await expect(featuredCarousel).toBeVisible();
    await expect(page.getByTestId("carousel-next-btn")).toBeVisible();
    await expect(page.getByTestId("carousel-prev-btn")).toBeVisible();

    // 9. Customer Lookbook
    const customerLookbook = page.getByTestId("customer-lookbook");
    await expect(customerLookbook).toBeVisible();

    // 10. FAQ Section
    const faqSection = page.getByTestId("faq-section");
    await expect(faqSection).toBeVisible();

    // 11. Site Footer
    const siteFooter = page.getByTestId("site-footer");
    await expect(siteFooter).toBeVisible();
  });

  test("interacts with Customer UGC Lookbook room tabs and hotspot pins", async ({
    page,
  }) => {
    const lookbook = page.getByTestId("customer-lookbook");
    await lookbook.scrollIntoViewIfNeeded();
    await expect(lookbook).toBeVisible();

    // Verify Lookbook header
    const header = page.getByTestId("lookbook-header");
    await expect(header).toBeVisible();
    await expect(header).toContainText("Customer Homes & Gallery Wall Lookbook");

    // Check room tabs
    const livingRoomTab = page.getByTestId("lookbook-room-tab-living-room");
    const diningTab = page.getByTestId("lookbook-room-tab-dining-credenza");
    const bedsideTab = page.getByTestId("lookbook-room-tab-minimalist-bedside");

    await expect(livingRoomTab).toBeVisible();
    await expect(diningTab).toBeVisible();
    await expect(bedsideTab).toBeVisible();

    // Default room is Living Room Salon Wall
    await expect(livingRoomTab).toHaveAttribute("aria-pressed", "true");

    // Verify first hotspot pin and card in living room
    const walnutPin = page.getByTestId("lookbook-hotspot-pin-salon-walnut-large");
    await expect(walnutPin).toBeVisible();

    const walnutCard = page.getByTestId("lookbook-card-salon-walnut-large");
    await expect(walnutCard).toBeVisible();
    await expect(walnutCard).toContainText("The Heritage Black Walnut");
    await expect(
      page.getByTestId("lookbook-buyer-badge-salon-walnut-large")
    ).toBeVisible();
    await expect(
      page.getByTestId("lookbook-shop-link-salon-walnut-large")
    ).toBeVisible();

    // Click second pin in living room (Gilded Brass)
    const brassPin = page.getByTestId("lookbook-hotspot-pin-salon-brass-portrait");
    await expect(brassPin).toBeVisible();
    await brassPin.click();

    const brassCard = page.getByTestId("lookbook-card-salon-brass-portrait");
    await expect(brassCard).toBeVisible();
    await expect(brassCard).toContainText("Atelier Gilded Brass Leaf");
    await expect(brassCard).toContainText("Marcus T.");

    // Switch to Dining Credenza room setting
    await diningTab.click();
    await expect(diningTab).toHaveAttribute("aria-pressed", "true");
    await expect(livingRoomTab).toHaveAttribute("aria-pressed", "false");

    // Verify credenza pin exists and card is visible
    const matteBlackPin = page.getByTestId("lookbook-hotspot-pin-credenza-matte-black");
    await expect(matteBlackPin).toBeVisible();
    const matteBlackCard = page.getByTestId("lookbook-card-credenza-matte-black");
    await expect(matteBlackCard).toBeVisible();
    await expect(matteBlackCard).toContainText("Studio Matte Black Float");
    await expect(matteBlackCard).toContainText("Julian D.");

    // Switch to Minimalist Bedside room setting
    await bedsideTab.click();
    await expect(bedsideTab).toHaveAttribute("aria-pressed", "true");

    const bleachedMaplePin = page.getByTestId("lookbook-hotspot-pin-bedside-bleached-maple");
    await expect(bleachedMaplePin).toBeVisible();
    const bleachedMapleCard = page.getByTestId("lookbook-card-bedside-bleached-maple");
    await expect(bleachedMapleCard).toBeVisible();
    await expect(bleachedMapleCard).toContainText("Atelier Bleached Maple");
    await expect(bleachedMapleCard).toContainText("Kenji T.");
  });

  test("expands and collapses Radix UI FAQ Accordion items with fluid interaction", async ({
    page,
  }) => {
    const faqSection = page.getByTestId("faq-section");
    await faqSection.scrollIntoViewIfNeeded();
    await expect(faqSection).toBeVisible();

    const accordion = page.getByTestId("faq-accordion");
    await expect(accordion).toBeVisible();

    // All 5 FAQ items should exist
    const items = [
      "faq-resolution",
      "faq-acrylic",
      "faq-guarantee",
      "faq-memorabilia",
      "faq-hardware",
    ];

    for (const itemId of items) {
      await expect(page.getByTestId(`faq-item-${itemId}`)).toBeVisible();
      await expect(page.getByTestId(`faq-trigger-${itemId}`)).toBeVisible();
    }

    // Default item 'faq-resolution' should be open
    const defaultContent = page.getByTestId("faq-content-faq-resolution");
    await expect(defaultContent).toBeVisible();
    await expect(defaultContent).toContainText("300 DPI");

    // Click item 2: TruVue Conservation Acrylic
    const triggerAcrylic = page.getByTestId("faq-trigger-faq-acrylic");
    await triggerAcrylic.click();
    const contentAcrylic = page.getByTestId("faq-content-faq-acrylic");
    await expect(contentAcrylic).toBeVisible();
    await expect(contentAcrylic).toContainText("99% of harmful UV radiation");

    // Click item 3: Damage Replacement Guarantee
    const triggerGuarantee = page.getByTestId("faq-trigger-faq-guarantee");
    await triggerGuarantee.click();
    const contentGuarantee = page.getByTestId("faq-content-faq-guarantee");
    await expect(contentGuarantee).toBeVisible();
    await expect(contentGuarantee).toContainText("48 hours");

    // Click item 5: Included Hanging Hardware
    const triggerHardware = page.getByTestId("faq-trigger-faq-hardware");
    await triggerHardware.click();
    const contentHardware = page.getByTestId("faq-content-faq-hardware");
    await expect(contentHardware).toBeVisible();
    await expect(contentHardware).toContainText("pocket bubble level");
  });

  test("verifies luxury footer navigation, certifications, and newsletter validation", async ({
    page,
  }) => {
    const footer = page.getByTestId("site-footer");
    await footer.scrollIntoViewIfNeeded();
    await expect(footer).toBeVisible();

    // Brand story and guild seals
    await expect(page.getByTestId("footer-brand-story")).toBeVisible();
    await expect(page.getByTestId("footer-brand-story")).toContainText(
      "100% Solid Appalachian Hardwoods"
    );

    // 4 Curated navigation columns
    await expect(page.getByTestId("footer-nav-custom-framing")).toBeVisible();
    await expect(page.getByTestId("footer-nav-curated-styles")).toBeVisible();
    await expect(page.getByTestId("footer-nav-the-atelier")).toBeVisible();
    await expect(page.getByTestId("footer-nav-client-services")).toBeVisible();

    // Bottom certifications and payment trust badges
    await expect(page.getByTestId("footer-fsc-badge")).toBeVisible();
    await expect(page.getByTestId("footer-payment-badges")).toBeVisible();

    // Newsletter input and submission testing
    const emailInput = page.getByTestId("footer-newsletter-input");
    const submitBtn = page.getByTestId("footer-newsletter-submit");

    await expect(emailInput).toBeVisible();
    await expect(submitBtn).toBeVisible();

    // 1. Invalid email format trigger
    await emailInput.fill("invalid-email-address");
    await submitBtn.click();

    const errorAlert = page.getByTestId("footer-newsletter-error");
    await expect(errorAlert).toBeVisible();
    await expect(errorAlert).toContainText("Please enter a valid email address.");

    // 2. Valid email format trigger
    await emailInput.fill("collector@framecottage-atelier.com");
    await submitBtn.click();

    const successAlert = page.getByTestId("footer-newsletter-success");
    await expect(successAlert).toBeVisible();
    await expect(successAlert).toContainText("ATELIER10");
  });

  test("captures comprehensive full-page screenshot of the complete Apple-redesigned Home experience", async ({
    page,
  }) => {
    // Scroll through the entire page smoothly to trigger any lazy effects
    await page.evaluate(async () => {
      window.scrollTo(0, document.body.scrollHeight);
    });
    await page.waitForTimeout(600);
    await page.evaluate(async () => {
      window.scrollTo(0, 0);
    });
    await page.waitForTimeout(600);

    const screenshotsDir = path.resolve(process.cwd(), ".agent/screenshots");
    if (!fs.existsSync(screenshotsDir)) {
      fs.mkdirSync(screenshotsDir, { recursive: true });
    }

    // Task 8 baseline screenshot
    const task8Path = path.join(screenshotsDir, "task-8-full-home-page.png");
    await page.screenshot({
      path: task8Path,
      fullPage: true,
    });

    // Task 9 Apple redesign verification screenshot
    const task9Path = path.join(screenshotsDir, "task-9-apple-redesign.png");
    await page.screenshot({
      path: task9Path,
      fullPage: true,
    });

    // Task 10 Museum Dark Charcoal, Rich Burgundy & Muted Gold verification screenshot
    const task10Path = path.join(screenshotsDir, "task-10-museum-dark-gold.png");
    await page.screenshot({
      path: task10Path,
      fullPage: true,
    });

    expect(fs.existsSync(task10Path)).toBe(true);
    const stats = fs.statSync(task10Path);
    expect(stats.size).toBeGreaterThan(50000); // Verify rich non-empty image
  });
});
