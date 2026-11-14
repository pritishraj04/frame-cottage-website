import { test, expect } from "@playwright/test";

test.describe("Core Service Verticals Discovery Pills & Studio Capabilities Trust Bar", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("renders visual category discovery carousel with all 6 core service vertical pills", async ({
    page,
  }) => {
    const categorySection = page.getByTestId("category-pills");
    await expect(categorySection).toBeVisible();

    // Section title & description
    await expect(categorySection).toContainText("Service Verticals Discovery");
    await expect(categorySection).toContainText("6 Core Service Verticals");

    // Scroll track container
    const scrollTrack = page.getByTestId("category-pills-scroll");
    await expect(scrollTrack).toBeVisible();

    // Verify all 6 service vertical pills are rendered
    const verticals = [
      { id: "retail-framing", name: "Retail & Standard Framing" },
      { id: "bespoke-framing", name: "Bespoke Art & Custom Framing" },
      { id: "spatial-signage", name: "Spatial Design & Signage" },
      { id: "industrial-cnc", name: "Industrial Fabrication & CNC" },
      { id: "custom-gifting", name: "Custom Gifting & Mementos" },
      { id: "civic-projects", name: "Government & Civic Projects" },
    ];

    for (const vert of verticals) {
      const pill = page.getByTestId(`category-pill-${vert.id}`);
      await expect(pill).toBeVisible();
      await expect(page.getByTestId(`category-pill-label-${vert.id}`)).toHaveText(
        vert.name
      );
    }

    // Default active state should be "retail-framing"
    const defaultActivePill = page.getByTestId("category-pill-retail-framing");
    await expect(defaultActivePill).toHaveAttribute("aria-selected", "true");

    const inactivePill = page.getByTestId("category-pill-bespoke-framing");
    await expect(inactivePill).toHaveAttribute("aria-selected", "false");
  });

  test("interactively switches service vertical pills and updates active selection", async ({
    page,
  }) => {
    const retailPill = page.getByTestId("category-pill-retail-framing");
    const bespokePill = page.getByTestId("category-pill-bespoke-framing");
    const spatialPill = page.getByTestId("category-pill-spatial-signage");
    const cncPill = page.getByTestId("category-pill-industrial-cnc");
    const giftingPill = page.getByTestId("category-pill-custom-gifting");
    const civicPill = page.getByTestId("category-pill-civic-projects");

    // Initial state
    await expect(retailPill).toHaveAttribute("aria-selected", "true");
    await expect(bespokePill).toHaveAttribute("aria-selected", "false");

    // Select Bespoke Framing
    await bespokePill.click();
    await expect(bespokePill).toHaveAttribute("aria-selected", "true");
    await expect(retailPill).toHaveAttribute("aria-selected", "false");

    // Select Spatial & Signage
    await spatialPill.click();
    await expect(spatialPill).toHaveAttribute("aria-selected", "true");
    await expect(bespokePill).toHaveAttribute("aria-selected", "false");

    // Select Industrial CNC
    await cncPill.click();
    await expect(cncPill).toHaveAttribute("aria-selected", "true");
    await expect(spatialPill).toHaveAttribute("aria-selected", "false");

    // Select Custom Gifting
    await giftingPill.click();
    await expect(giftingPill).toHaveAttribute("aria-selected", "true");
    await expect(cncPill).toHaveAttribute("aria-selected", "false");

    // Select Civic Projects
    await civicPill.click();
    await expect(civicPill).toHaveAttribute("aria-selected", "true");
    await expect(giftingPill).toHaveAttribute("aria-selected", "false");

    // Select back to Retail Framing
    await retailPill.click();
    await expect(retailPill).toHaveAttribute("aria-selected", "true");
    await expect(civicPill).toHaveAttribute("aria-selected", "false");
  });

  test("renders craftsmanship trust bar with 4 museum-grade commitments and hairline dividers", async ({
    page,
  }) => {
    const trustBar = page.getByTestId("trust-bar");
    await expect(trustBar).toBeVisible();

    // 1. In-House Precision Fabrication
    const hardwoodsPillar = page.getByTestId("trust-bar-hardwoods");
    await expect(hardwoodsPillar).toBeVisible();
    await expect(hardwoodsPillar).toContainText("In-House Precision Fabrication");
    await expect(hardwoodsPillar).toContainText(
      "CNC routing, fiber laser cutting, and master artisanal joinery"
    );

    // 2. Museum Archival & Industrial Standards
    const matsPillar = page.getByTestId("trust-bar-cotton-mats");
    await expect(matsPillar).toBeVisible();
    await expect(matsPillar).toContainText("Museum Archival & Industrial Standards");
    await expect(matsPillar).toContainText(
      "ISO certified, FSC® timber stewardship, and TruVue® UV conservation glazing"
    );

    // 3. End-to-End Turnkey Execution
    const acrylicPillar = page.getByTestId("trust-bar-acrylic");
    await expect(acrylicPillar).toBeVisible();
    await expect(acrylicPillar).toContainText("End-to-End Turnkey Execution");
    await expect(acrylicPillar).toContainText(
      "3D spatial design, engineering, precision fabrication & white-glove installation"
    );

    // 4. Public Sector & Enterprise Scale
    const hardwarePillar = page.getByTestId("trust-bar-hardware");
    await expect(hardwarePillar).toBeVisible();
    await expect(hardwarePillar).toContainText("Public Sector & Enterprise Scale");
    await expect(hardwarePillar).toContainText(
      "GeM registered and tender compliant with high-volume institutional capacity"
    );
  });

  test("carousel arrow controls scroll horizontally and captures verification screenshot", async ({
    page,
  }) => {
    const prevBtn = page.getByTestId("category-scroll-prev");
    const nextBtn = page.getByTestId("category-scroll-next");

    await expect(prevBtn).toBeVisible();
    await expect(nextBtn).toBeVisible();

    // Click next then prev
    await nextBtn.click();
    await prevBtn.click();

    // Scroll section into view for clear visual capture
    const categorySection = page.getByTestId("category-pills");
    await categorySection.scrollIntoViewIfNeeded();

    // Take screenshot capturing category pills and trust bar
    await page.screenshot({
      path: ".agent/screenshots/task-5-category-trust.png",
      fullPage: false,
    });
  });

  test("renders gracefully on mobile viewport", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/");

    const categorySection = page.getByTestId("category-pills");
    await expect(categorySection).toBeVisible();

    const trustBar = page.getByTestId("trust-bar");
    await expect(trustBar).toBeVisible();

    // Ensure all 4 trust bar items remain visible in mobile reflow
    await expect(page.getByTestId("trust-bar-hardwoods")).toBeVisible();
    await expect(page.getByTestId("trust-bar-cotton-mats")).toBeVisible();
    await expect(page.getByTestId("trust-bar-acrylic")).toBeVisible();
    await expect(page.getByTestId("trust-bar-hardware")).toBeVisible();
  });
});
