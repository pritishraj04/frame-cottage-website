import { test, expect } from "@playwright/test";

test.describe("Hero Image Carousel with Framer Motion AnimatePresence", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("renders responsive Hero Carousel with curated lifestyle slides and Apple typography", async ({
    page,
  }) => {
    const heroCarousel = page.getByTestId("hero-image-carousel");
    await expect(heroCarousel).toBeVisible();

    // Slide 1 verification: Bespoke Art & Archival Custom Framing
    const slide = page.getByTestId("hero-carousel-slide");
    await expect(slide).toBeVisible();

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
      "Fine Art Printing, Canvas Stretching & Archival Preservation"
    );

    // Dedicated spatial dashed container
    const dashedContainer = slide.locator(".border-dashed").first();
    await expect(dashedContainer).toBeVisible();
    await expect(slide).toContainText("Designer Canvas Drop Zone");
    await expect(slide).toContainText("16:9 Full-Bleed Spatial Canvas");
  });

  test("interactively switches slides via next/prev buttons and indicator dots", async ({
    page,
  }) => {
    const headline = page.getByTestId("hero-headline");
    await expect(headline).toBeVisible();
    await expect(headline).toHaveText("Bespoke Art & Archival Custom Framing");

    // Advance to Slide 2: Spatial Design & Architectural Signage
    await page.getByTestId("carousel-next-btn").click();
    await expect(headline).toHaveText("Spatial Design & Architectural Signage");

    // Advance to Slide 3: Industrial Fabrication & Civic Projects
    await page.getByTestId("carousel-next-btn").click();
    await expect(headline).toHaveText("Industrial Fabrication & Civic Projects");

    // Click indicator 0 to return to Slide 1
    await page.getByTestId("carousel-dot-0").click();
    await expect(headline).toHaveText("Bespoke Art & Archival Custom Framing");

    // Click indicator 1 to go to Slide 2
    await page.getByTestId("carousel-dot-1").click();
    await expect(headline).toHaveText("Spatial Design & Architectural Signage");

    // Click indicator 2 to go to Slide 3
    await page.getByTestId("carousel-dot-2").click();
    await expect(headline).toHaveText("Industrial Fabrication & Civic Projects");

    // Click previous button
    await page.getByTestId("carousel-prev-btn").click();
    await expect(headline).toHaveText("Spatial Design & Architectural Signage");
  });

  test("verifies active dot state styling and accessibility attributes", async ({
    page,
  }) => {
    const dot0 = page.getByTestId("carousel-dot-0");
    const dot1 = page.getByTestId("carousel-dot-1");
    const dot2 = page.getByTestId("carousel-dot-2");

    // Initially dot 0 is active
    await expect(dot0).toHaveAttribute("aria-current", "true");
    await expect(dot1).toHaveAttribute("aria-current", "false");
    await expect(dot2).toHaveAttribute("aria-current", "false");

    // Switch to dot 1
    await dot1.click();
    await expect(dot0).toHaveAttribute("aria-current", "false");
    await expect(dot1).toHaveAttribute("aria-current", "true");
    await expect(dot2).toHaveAttribute("aria-current", "false");
  });

  test("pauses auto-play on carousel hover", async ({ page }) => {
    const heroCarousel = page.getByTestId("hero-image-carousel");
    await expect(heroCarousel).toBeVisible();

    const headline = page.getByTestId("hero-headline");
    await expect(headline).toHaveText("Bespoke Art & Archival Custom Framing");

    // Hover over carousel container to trigger pause
    await heroCarousel.hover();

    // Wait 2 seconds while hovered, verify slide has not automatically changed
    await page.waitForTimeout(2000);
    await expect(headline).toHaveText("Bespoke Art & Archival Custom Framing");
  });
});
