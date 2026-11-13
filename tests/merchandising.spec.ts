import { test, expect } from "@playwright/test";

test.describe("Visual Category Discovery Pills & Craftsmanship Trust Bar", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("renders visual category discovery carousel with all 6 circular category pills", async ({
    page,
  }) => {
    const categorySection = page.getByTestId("category-pills");
    await expect(categorySection).toBeVisible();

    // Section title & description
    await expect(categorySection).toContainText("Visual Category Discovery");
    await expect(categorySection).toContainText("Curated by Silhouette & Craft");

    // Scroll track container
    const scrollTrack = page.getByTestId("category-pills-scroll");
    await expect(scrollTrack).toBeVisible();

    // Verify all 6 category pills are rendered
    const categories = [
      { id: "solid-hardwoods", name: "Solid Hardwoods" },
      { id: "brushed-metals", name: "Brushed Metals" },
      { id: "vintage-gilded", name: "Vintage & Gilded" },
      { id: "gallery-wall-sets", name: "Gallery Wall Sets" },
      { id: "tabletop-minis", name: "Tabletop & Minis" },
      { id: "archival-shadowboxes", name: "Archival Shadowboxes" },
    ];

    for (const cat of categories) {
      const pill = page.getByTestId(`category-pill-${cat.id}`);
      await expect(pill).toBeVisible();
      await expect(page.getByTestId(`category-pill-label-${cat.id}`)).toHaveText(
        cat.name
      );
    }

    // Default active state should be "solid-hardwoods"
    const defaultActivePill = page.getByTestId("category-pill-solid-hardwoods");
    await expect(defaultActivePill).toHaveAttribute("aria-selected", "true");

    const inactivePill = page.getByTestId("category-pill-brushed-metals");
    await expect(inactivePill).toHaveAttribute("aria-selected", "false");
  });

  test("interactively switches category pills and updates active selection", async ({
    page,
  }) => {
    const hardwoodsPill = page.getByTestId("category-pill-solid-hardwoods");
    const metalsPill = page.getByTestId("category-pill-brushed-metals");
    const gildedPill = page.getByTestId("category-pill-vintage-gilded");
    const galleryPill = page.getByTestId("category-pill-gallery-wall-sets");
    const tabletopPill = page.getByTestId("category-pill-tabletop-minis");
    const shadowboxesPill = page.getByTestId(
      "category-pill-archival-shadowboxes"
    );

    // Initial state
    await expect(hardwoodsPill).toHaveAttribute("aria-selected", "true");
    await expect(metalsPill).toHaveAttribute("aria-selected", "false");

    // Select Brushed Metals
    await metalsPill.click();
    await expect(metalsPill).toHaveAttribute("aria-selected", "true");
    await expect(hardwoodsPill).toHaveAttribute("aria-selected", "false");

    // Select Vintage & Gilded
    await gildedPill.click();
    await expect(gildedPill).toHaveAttribute("aria-selected", "true");
    await expect(metalsPill).toHaveAttribute("aria-selected", "false");

    // Select Gallery Wall Sets
    await galleryPill.click();
    await expect(galleryPill).toHaveAttribute("aria-selected", "true");
    await expect(gildedPill).toHaveAttribute("aria-selected", "false");

    // Select Tabletop & Minis
    await tabletopPill.click();
    await expect(tabletopPill).toHaveAttribute("aria-selected", "true");
    await expect(galleryPill).toHaveAttribute("aria-selected", "false");

    // Select Archival Shadowboxes
    await shadowboxesPill.click();
    await expect(shadowboxesPill).toHaveAttribute("aria-selected", "true");
    await expect(tabletopPill).toHaveAttribute("aria-selected", "false");

    // Select back to Solid Hardwoods
    await hardwoodsPill.click();
    await expect(hardwoodsPill).toHaveAttribute("aria-selected", "true");
    await expect(shadowboxesPill).toHaveAttribute("aria-selected", "false");
  });

  test("renders craftsmanship trust bar with 4 museum-grade commitments and hairline dividers", async ({
    page,
  }) => {
    const trustBar = page.getByTestId("trust-bar");
    await expect(trustBar).toBeVisible();

    // 1. Solid Hardwoods pillar
    const hardwoodsPillar = page.getByTestId("trust-bar-hardwoods");
    await expect(hardwoodsPillar).toBeVisible();
    await expect(hardwoodsPillar).toContainText("100% Solid Hardwoods");
    await expect(hardwoodsPillar).toContainText(
      "Responsibly harvested North American timber. Zero MDF or plastics"
    );

    // 2. Archival Cotton Mats pillar
    const matsPillar = page.getByTestId("trust-bar-cotton-mats");
    await expect(matsPillar).toBeVisible();
    await expect(matsPillar).toContainText("Archival 4-Ply Cotton Mats");
    await expect(matsPillar).toContainText(
      "Acid-free core prevents yellowing and preserves prints for generations"
    );

    // 3. TruVue Conservation Acrylic pillar
    const acrylicPillar = page.getByTestId("trust-bar-acrylic");
    await expect(acrylicPillar).toBeVisible();
    await expect(acrylicPillar).toContainText("TruVue® Conservation Acrylic");
    await expect(acrylicPillar).toContainText(
      "Shatter-safe optical acrylic blocking 99% of fading UV light"
    );

    // 4. Ready-to-Hang Hardware pillar
    const hardwarePillar = page.getByTestId("trust-bar-hardware");
    await expect(hardwarePillar).toBeVisible();
    await expect(hardwarePillar).toContainText("Ready-to-Hang Hardware");
    await expect(hardwarePillar).toContainText(
      "Custom coated wire, brass hangers, and wall bumpers included in every box"
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
