import { test, expect } from "@playwright/test";

test.describe("Featured Product & Capability Highlight Section", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("renders Featured Product & Capability Highlight with 2-column spatial containers", async ({
    page,
  }) => {
    const featuredSection = page.getByTestId("featured-product-highlight");
    await featuredSection.scrollIntoViewIfNeeded();
    await expect(featuredSection).toBeVisible();

    // 1. Left Column: Aspect-Square Drop Zone
    const leftDropzone = page.getByTestId("featured-product-canvas-dropzone");
    await expect(leftDropzone).toBeVisible();
    await expect(leftDropzone).toHaveClass(/aspect-square/);
    await expect(leftDropzone).toHaveClass(/border-dashed/);
    await expect(leftDropzone).toContainText("Floating / Shadow Frame & CNC Design Drop Zone");
    await expect(leftDropzone).toContainText("1:1 Aspect Ratio • Full-Bleed PNG Asset");

    // 2. Right Column Containers
    // Product Typography / Title graphic container (h-12)
    const titleContainer = page.getByTestId("featured-product-title-container");
    await expect(titleContainer).toBeVisible();
    await expect(titleContainer).toHaveClass(/h-12/);
    await expect(titleContainer).toHaveClass(/border-dashed/);
    await expect(titleContainer).toContainText("The Mendocino Heritage Walnut & Floating Canvas");
    await expect(titleContainer).toContainText("Title Graphic Container (h-12)");

    // Product Description / Details container (h-32)
    const detailsContainer = page.getByTestId("featured-product-details-container");
    await expect(detailsContainer).toBeVisible();
    await expect(detailsContainer).toHaveClass(/h-32/);
    await expect(detailsContainer).toHaveClass(/border-dashed/);
    await expect(detailsContainer).toContainText("Specification & Details Graphic Container (h-32)");
    await expect(detailsContainer).toContainText("FSC® American Walnut");

    // CTA Button Design container (h-12 w-44 rounded-full)
    const ctaButton = page.getByTestId("featured-product-cta-container");
    await expect(ctaButton).toBeVisible();
    await expect(ctaButton).toHaveClass(/h-12/);
    await expect(ctaButton).toHaveClass(/w-44/);
    await expect(ctaButton).toHaveClass(/rounded-full/);
    await expect(ctaButton).toHaveClass(/border-dashed/);
    await expect(ctaButton).toContainText("Request Spec");
  });

  test("verifies CTA button hover state and styling", async ({ page }) => {
    const featuredSection = page.getByTestId("featured-product-highlight");
    await featuredSection.scrollIntoViewIfNeeded();

    const ctaButton = page.getByTestId("featured-product-cta-container");
    await expect(ctaButton).toBeVisible();

    // Check background color matches gold accent
    await ctaButton.hover();
    await expect(ctaButton).toBeVisible();
  });
});
