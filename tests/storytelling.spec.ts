import { test, expect } from "@playwright/test";
import path from "path";
import fs from "fs";

test.describe("3-Step Framing Journey & The Atelier Material Story", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("renders 3-Step Framing Journey with header, badges, and all 3 narrative steps", async ({
    page,
  }) => {
    const journeySection = page.getByTestId("framing-journey");
    await expect(journeySection).toBeVisible();

    // Section Header and Subtitle
    const header = page.getByTestId("framing-journey-header");
    await expect(header).toBeVisible();
    await expect(header).toContainText("How Custom Framing Works");
    await expect(header).toContainText(
      "From digital memory to handcrafted heirloom in three seamless steps."
    );

    // Verify all 3 steps exist
    const steps = [
      {
        index: 1,
        number: "01",
        title: "Upload or Mail In",
        descSubstring: "Upload high-res photos for 12-color archival giclée printing",
        pill: "Upload / Send",
      },
      {
        index: 2,
        number: "02",
        title: "Design with Precision",
        descSubstring: "Pair your piece with solid hardwoods, archival cotton mats",
        pill: "Customise",
      },
      {
        index: 3,
        number: "03",
        title: "Delivered Ready to Hang",
        descSubstring: "Handcrafted by master framers in 5-7 days",
        pill: "Ready-to-Hang",
      },
    ];

    for (const step of steps) {
      const stepCard = page.getByTestId(`framing-step-${step.index}`);
      await expect(stepCard).toBeVisible();

      const stepNumber = page.getByTestId(`framing-step-number-${step.index}`);
      await expect(stepNumber).toBeVisible();
      await expect(stepNumber).toHaveText(step.number);

      const stepTitle = page.getByTestId(`framing-step-title-${step.index}`);
      await expect(stepTitle).toBeVisible();
      await expect(stepTitle).toHaveText(step.title);

      const stepDesc = page.getByTestId(`framing-step-desc-${step.index}`);
      await expect(stepDesc).toBeVisible();
      await expect(stepDesc).toContainText(step.descSubstring);

      // Verify pill tag
      await expect(stepCard).toContainText(step.pill);
    }

    // Step connector lines on desktop
    const connectors = page.getByTestId("framing-journey-connectors");
    await expect(connectors).toBeAttached();

    // Capture screenshot of the 3-step framing journey
    await journeySection.scrollIntoViewIfNeeded();
    await page.waitForTimeout(400);
    const screenshotPath = path.resolve(
      process.cwd(),
      ".agent/screenshots/task-7-framing-journey.png"
    );
    await journeySection.screenshot({ path: screenshotPath });
  });

  test("renders pure image-based Featured Products Carousel with editorial header and all 8 handcrafted frame cards", async ({
    page,
  }) => {
    const featuredSection = page.getByTestId("featured-products-carousel");
    await expect(featuredSection).toBeVisible();

    // Section Header
    await expect(featuredSection).toContainText("Curated Atelier Gallery");
    await expect(featuredSection).toContainText("Featured Handcrafted Works");
    await expect(featuredSection).toContainText("TruVue® museum conservation acrylic");

    // Circular Prev & Next navigation buttons
    await expect(page.getByTestId("carousel-prev-btn")).toBeVisible();
    await expect(page.getByTestId("carousel-next-btn")).toBeVisible();

    // Verify all 8 featured handcrafted cards exist in the DOM
    const expectedCards = [
      "mendocino-walnut",
      "gilded-atelier-brass",
      "kyoto-white-oak-slim",
      "highline-matte-black",
      "florentine-antiqued-gold",
      "montmartre-gallery-triptych",
      "versailles-ogee-gilt",
      "chelsea-gallery-duo",
    ];

    for (const cardId of expectedCards) {
      const card = page.getByTestId(`featured-product-card-${cardId}`);
      await expect(card).toBeAttached();
    }

    // Verify specific frame presentation elements on Mendocino Walnut card
    const walnutCard = page.getByTestId("featured-product-card-mendocino-walnut");
    await expect(walnutCard).toContainText("The Mendocino Walnut");
    await expect(walnutCard).toContainText("Solid Appalachian Black Walnut");
    await expect(walnutCard).toContainText("Organic Linseed Oil");
    await expect(walnutCard).toContainText("From $64");
    await expect(walnutCard).toContainText("Mortise-Keyed Maple Spline");

    // Verify pagination dots
    for (let i = 0; i < 8; i++) {
      await expect(page.getByTestId(`carousel-dot-${i}`)).toBeVisible();
    }
  });

  test("interactively controls Featured Products Carousel via next/prev buttons, dots, touch swipe, and customisation", async ({
    page,
  }) => {
    const featuredSection = page.getByTestId("featured-products-carousel");
    await featuredSection.scrollIntoViewIfNeeded();
    await expect(featuredSection).toBeVisible();

    const nextBtn = page.getByTestId("carousel-next-btn");
    const prevBtn = page.getByTestId("carousel-prev-btn");
    const dot0 = page.getByTestId("carousel-dot-0");
    const dot1 = page.getByTestId("carousel-dot-1");
    const dot2 = page.getByTestId("carousel-dot-2");

    // Dot 0 is initially active
    await expect(dot0).toHaveAttribute("aria-selected", "true");

    // Click Next button -> Advances to slide 1
    await nextBtn.click();
    await expect(dot1).toHaveAttribute("aria-selected", "true");

    // Click Next button again -> Advances to slide 2
    await nextBtn.click();
    await expect(dot2).toHaveAttribute("aria-selected", "true");

    // Click Prev button -> Returns to slide 1
    await prevBtn.click();
    await expect(dot1).toHaveAttribute("aria-selected", "true");

    // Direct dot navigation -> Click dot 3
    const dot3 = page.getByTestId("carousel-dot-3");
    await dot3.click();
    await expect(dot3).toHaveAttribute("aria-selected", "true");

    // Test touch-swipe interaction via synthetic touch events
    const track = featuredSection.locator(".overflow-hidden").first();
    await track.evaluate((el) => {
      const startEv = new CustomEvent("touchstart", { bubbles: true });
      Object.defineProperty(startEv, "touches", {
        value: [{ clientX: 350, clientY: 100 }],
      });
      el.dispatchEvent(startEv);

      const moveEv = new CustomEvent("touchmove", { bubbles: true });
      Object.defineProperty(moveEv, "touches", {
        value: [{ clientX: 50, clientY: 100 }],
      });
      el.dispatchEvent(moveEv);

      const endEv = new CustomEvent("touchend", { bubbles: true });
      el.dispatchEvent(endEv);
    });
    await page.waitForTimeout(300);

    // Reset back to slide 0 for clean screenshot
    await dot0.click();
    await expect(dot0).toHaveAttribute("aria-selected", "true");

    // Test Quick Customise Modal Trigger
    const customiseBtn = page.getByTestId("featured-card-customise-mendocino-walnut");
    await expect(customiseBtn).toBeVisible();
    await customiseBtn.click();

    // Verify Quick Customise dialog opened
    const dialog = page.getByTestId("quick-customise-dialog");
    await expect(dialog).toBeVisible();
    await expect(page.getByTestId("dialog-title")).toContainText("The Mendocino Walnut");

    // Close dialog
    const closeBtn = page.getByTestId("dialog-close-button");
    await closeBtn.click();
    await expect(dialog).not.toBeVisible();

    // 1. Capture Dark Mode Screenshot of Featured Products Carousel
    await featuredSection.scrollIntoViewIfNeeded();
    await page.waitForTimeout(400);

    const brainDir =
      "/Users/pritish/.gemini/antigravity/brain/91fc1fed-fc5f-495e-88c1-129ef76052af";
    const darkBrainPath = path.join(
      brainDir,
      "task-16-featured-carousel-dark.png"
    );
    const darkAgentPath = path.resolve(
      process.cwd(),
      ".agent/screenshots/task-16-featured-carousel-dark.png"
    );

    if (fs.existsSync(brainDir)) {
      await featuredSection.screenshot({ path: darkBrainPath });
      expect(fs.existsSync(darkBrainPath)).toBe(true);
    }
    await featuredSection.screenshot({ path: darkAgentPath });
    expect(fs.existsSync(darkAgentPath)).toBe(true);

    // 2. Switch to Light Mode and capture Light Mode Screenshot
    const themeToggle = page.getByTestId("header-theme-toggle");
    await themeToggle.click();
    await expect(page.locator("html")).toHaveClass(/light/);

    await featuredSection.scrollIntoViewIfNeeded();
    await page.waitForTimeout(400);

    const lightBrainPath = path.join(
      brainDir,
      "task-16-featured-carousel-light.png"
    );
    const lightAgentPath = path.resolve(
      process.cwd(),
      ".agent/screenshots/task-16-featured-carousel-light.png"
    );

    if (fs.existsSync(brainDir)) {
      await featuredSection.screenshot({ path: lightBrainPath });
      expect(fs.existsSync(lightBrainPath)).toBe(true);
    }
    await featuredSection.screenshot({ path: lightAgentPath });
    expect(fs.existsSync(lightAgentPath)).toBe(true);

    // 3. Switch back to Dark Mode
    await themeToggle.click();
    await expect(page.locator("html")).toHaveClass(/dark/);
  });
});
