import { test, expect } from "@playwright/test";
import * as fs from "fs";
import path from "path";

test.describe("Mobile Responsiveness (390x844 Viewport)", () => {
  test.beforeEach(async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/");
  });

  test("verifies zero horizontal overflow across full mobile page", async ({
    page,
  }) => {
    // Wait for full hydration
    await page.waitForLoadState("domcontentloaded");

    // Check document scrollWidth does not exceed clientWidth (390px)
    const { scrollWidth, clientWidth } = await page.evaluate(() => ({
      scrollWidth: document.documentElement.scrollWidth,
      clientWidth: document.documentElement.clientWidth,
    }));

    expect(scrollWidth).toBeLessThanOrEqual(clientWidth);
    expect(clientWidth).toBe(390);
  });

  test("verifies Hero Image Carousel mobile layout, touch controls, and zero overflow", async ({
    page,
  }) => {
    const heroCarousel = page.getByTestId("hero-image-carousel");
    await expect(heroCarousel).toBeVisible();

    // 1. Verify navigation controls are visible and within screen width
    const prevBtn = page.getByTestId("carousel-prev-btn");
    const nextBtn = page.getByTestId("carousel-next-btn");
    await expect(prevBtn).toBeVisible();
    await expect(nextBtn).toBeVisible();

    const prevBox = await prevBtn.boundingBox();
    const nextBox = await nextBtn.boundingBox();
    expect(prevBox).not.toBeNull();
    expect(nextBox).not.toBeNull();
    if (prevBox && nextBox) {
      expect(prevBox.x).toBeGreaterThanOrEqual(0);
      expect(nextBox.x + nextBox.width).toBeLessThanOrEqual(390);
    }

    // 2. Verify Slide Indicators and Interactive Next/Prev on Mobile
    const dot0 = page.getByTestId("carousel-dot-0");
    const dot1 = page.getByTestId("carousel-dot-1");
    await expect(dot0).toHaveAttribute("aria-current", "true");

    await nextBtn.click();
    await expect(dot1).toHaveAttribute("aria-current", "true");

    await prevBtn.click();
    await expect(dot0).toHaveAttribute("aria-current", "true");
  });

  test("verifies 6 Core Service Verticals cards fit cleanly on mobile without overflow", async ({
    page,
  }) => {
    const grid = page.getByTestId("core-service-verticals-grid");
    await grid.scrollIntoViewIfNeeded();
    await expect(grid).toBeVisible();

    const verticals = [
      "retail-framing",
      "bespoke-framing",
      "spatial-signage",
      "industrial-cnc",
      "custom-gifting",
      "civic-projects",
    ];

    for (const id of verticals) {
      const card = page.getByTestId(`service-vertical-card-${id}`);
      await expect(card).toBeVisible();
      const box = await card.boundingBox();
      expect(box).not.toBeNull();
      if (box) {
        expect(box.x).toBeGreaterThanOrEqual(0);
        expect(box.x + box.width).toBeLessThanOrEqual(390);
      }
    }
  });

  test("verifies Featured Product Highlight mobile layout within screen bounds", async ({
    page,
  }) => {
    const featuredSection = page.getByTestId("featured-product-highlight");
    await featuredSection.scrollIntoViewIfNeeded();
    await expect(featuredSection).toBeVisible();

    const leftDropzone = page.getByTestId("featured-product-canvas-dropzone");
    await expect(leftDropzone).toBeVisible();
    const leftBox = await leftDropzone.boundingBox();
    expect(leftBox).not.toBeNull();
    if (leftBox) {
      expect(leftBox.x).toBeGreaterThanOrEqual(0);
      expect(leftBox.x + leftBox.width).toBeLessThanOrEqual(390);
    }

    const ctaButton = page.getByTestId("featured-product-cta-container");
    await expect(ctaButton).toBeVisible();
    const ctaBox = await ctaButton.boundingBox();
    expect(ctaBox).not.toBeNull();
    if (ctaBox) {
      expect(ctaBox.x).toBeGreaterThanOrEqual(0);
      expect(ctaBox.x + ctaBox.width).toBeLessThanOrEqual(390);
    }
  });

  test("verifies mobile layout fidelity in Light Mode", async ({ page }) => {
    await page.evaluate(() => {
      document.documentElement.classList.add("light");
      document.documentElement.classList.remove("dark");
      localStorage.setItem("frame-cottage-theme", "light");
    });
    await page.reload();

    const { scrollWidth, clientWidth } = await page.evaluate(() => ({
      scrollWidth: document.documentElement.scrollWidth,
      clientWidth: document.documentElement.clientWidth,
    }));
    expect(scrollWidth).toBeLessThanOrEqual(clientWidth);

    // Verify background is light mode
    await expect(page.locator("body")).toHaveCSS("background-color", "rgb(250, 248, 245)");
  });
});
