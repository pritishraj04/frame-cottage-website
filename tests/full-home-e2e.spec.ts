import { test, expect } from "@playwright/test";
import path from "path";
import fs from "fs";

test.describe("Full Home Page Framer Motion Animated Storefront Validation", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("renders all core animated sections in seamless end-to-end page hierarchy", async ({
    page,
  }) => {
    // 1. Site Header & Announcement Bar
    const header = page.locator("header");
    await expect(header).toBeVisible();
    await expect(page.getByTestId("brand-wordmark")).toBeVisible();

    // 2. Section 1: Full-Image PNG Hero Carousel (AnimatePresence)
    const heroCarousel = page.getByTestId("hero-image-carousel");
    await expect(heroCarousel).toBeVisible();
    await expect(page.getByTestId("hero-carousel-slide")).toBeVisible();
    await expect(page.getByTestId("hero-headline")).toBeVisible();
    await expect(page.getByTestId("carousel-indicators")).toBeVisible();

    // 3. Section 2: 6 Core Service Verticals Staggered Grid
    const verticalsGrid = page.getByTestId("core-service-verticals-grid");
    await expect(verticalsGrid).toBeVisible();
    await expect(page.getByTestId("section-title-graphic")).toBeVisible();

    const expectedVerticals = [
      "retail-framing",
      "bespoke-framing",
      "spatial-signage",
      "industrial-cnc",
      "custom-gifting",
      "civic-projects",
    ];

    for (const id of expectedVerticals) {
      const card = page.getByTestId(`service-vertical-card-${id}`);
      await expect(card).toBeVisible();
    }

    // 4. Section 3: Featured Product & Capability Highlight
    const featuredHighlight = page.getByTestId("featured-product-highlight");
    await expect(featuredHighlight).toBeVisible();
    await expect(page.getByTestId("featured-product-canvas-dropzone")).toBeVisible();
    await expect(page.getByTestId("featured-product-title-container")).toBeVisible();
    await expect(page.getByTestId("featured-product-details-container")).toBeVisible();
    await expect(page.getByTestId("featured-product-cta-container")).toBeVisible();

    // 5. Site Footer
    const siteFooter = page.getByTestId("site-footer");
    await expect(siteFooter).toBeVisible();
  });

  test("interacts with Hero AnimatePresence Carousel controls and slide dots", async ({
    page,
  }) => {
    const heroCarousel = page.getByTestId("hero-image-carousel");
    await expect(heroCarousel).toBeVisible();

    const headline = page.getByTestId("hero-headline");
    await expect(headline).toBeVisible();
    await expect(headline).toHaveText("Bespoke Art & Archival Custom Framing");

    // Click indicator 1: Spatial Design & Architectural Signage
    const dot1 = page.getByTestId("carousel-dot-1");
    await expect(dot1).toBeVisible();
    await dot1.click();
    await expect(headline).toHaveText("Spatial Design & Architectural Signage");

    // Click indicator 2: Industrial Fabrication & Civic Projects
    const dot2 = page.getByTestId("carousel-dot-2");
    await expect(dot2).toBeVisible();
    await dot2.click();
    await expect(headline).toHaveText("Industrial Fabrication & Civic Projects");

    // Click previous button to go back to slide 1
    const prevBtn = page.getByTestId("carousel-prev-btn");
    await prevBtn.click();
    await expect(headline).toHaveText("Spatial Design & Architectural Signage");

    // Click dot 0 to return to first slide
    const dot0 = page.getByTestId("carousel-dot-0");
    await dot0.click();
    await expect(headline).toHaveText("Bespoke Art & Archival Custom Framing");
  });

  test("validates all 6 core service vertical cards in staggered grid", async ({
    page,
  }) => {
    const section = page.getByTestId("core-service-verticals-grid");
    await section.scrollIntoViewIfNeeded();
    await expect(section).toBeVisible();

    // Section title graphic drop zone
    const titleGraphic = page.getByTestId("section-title-graphic");
    await expect(titleGraphic).toBeVisible();
    await expect(titleGraphic).toContainText("6 Core Service Verticals");
    await expect(titleGraphic).toContainText("Designer Section Title Graphic Drop Zone");

    const verticalSpecs = [
      {
        id: "retail-framing",
        name: "Retail & Standard Framing",
        badge: "B2C",
      },
      {
        id: "bespoke-framing",
        name: "Bespoke Art & Custom Framing",
        badge: "B2C / B2B",
      },
      {
        id: "spatial-signage",
        name: "Spatial Design & Signage",
        badge: "B2B",
      },
      {
        id: "industrial-cnc",
        name: "Industrial Fabrication & CNC Metalworks",
        badge: "Commercial",
      },
      {
        id: "custom-gifting",
        name: "Custom Gifting & Mementos",
        badge: "Corporate",
      },
      {
        id: "civic-projects",
        name: "Government & Civic Projects",
        badge: "Public Sector",
      },
    ];

    for (const v of verticalSpecs) {
      const card = page.getByTestId(`service-vertical-card-${v.id}`);
      await expect(card).toBeVisible();
      await expect(card).toContainText(v.name);
      await expect(card).toContainText(v.badge);
      await expect(card).toContainText("PNG Asset Drop Zone");
    }
  });

  test("validates Featured Product & Capability Highlight spatial containers", async ({
    page,
  }) => {
    const featuredSection = page.getByTestId("featured-product-highlight");
    await featuredSection.scrollIntoViewIfNeeded();
    await expect(featuredSection).toBeVisible();

    // Left aspect-square dropzone
    const leftDropzone = page.getByTestId("featured-product-canvas-dropzone");
    await expect(leftDropzone).toBeVisible();
    await expect(leftDropzone).toContainText("Floating / Shadow Frame & CNC Design Drop Zone");
    await expect(leftDropzone).toContainText("1:1 Aspect Ratio");

    // Right product containers
    const titleContainer = page.getByTestId("featured-product-title-container");
    await expect(titleContainer).toBeVisible();
    await expect(titleContainer).toContainText("The Mendocino Heritage Walnut & Floating Canvas");
    await expect(titleContainer).toContainText("Title Graphic Container (h-12)");

    const detailsContainer = page.getByTestId("featured-product-details-container");
    await expect(detailsContainer).toBeVisible();
    await expect(detailsContainer).toContainText("Specification & Details Graphic Container (h-32)");
    await expect(detailsContainer).toContainText("FSC® Appalachian Walnut");

    const ctaButton = page.getByTestId("featured-product-cta-container");
    await expect(ctaButton).toBeVisible();
    await expect(ctaButton).toContainText("Request Spec");
  });

  test("verifies luxury footer navigation, certifications, and newsletter validation", async ({
    page,
  }) => {
    const footer = page.getByTestId("site-footer");
    await footer.scrollIntoViewIfNeeded();
    await expect(footer).toBeVisible();

    // Brand story and certifications
    await expect(page.getByTestId("footer-brand-story")).toBeVisible();
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

  test("captures comprehensive full-page screenshot of the Framer Motion animated storefront", async ({
    page,
  }) => {
    // Scroll through the entire page smoothly to trigger whileInView animations
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

    const task18Path = path.join(screenshotsDir, "task-18-animated-full-home.png");
    await page.screenshot({
      path: task18Path,
      fullPage: true,
    });

    expect(fs.existsSync(task18Path)).toBe(true);
    const stats = fs.statSync(task18Path);
    expect(stats.size).toBeGreaterThan(40000);
  });
});
