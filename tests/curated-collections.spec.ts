import { test, expect } from "@playwright/test";

test.describe("6 Core Service Verticals Staggered Grid & Designer Canvas Containers", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("renders 6 Core Service Verticals staggered grid section and title graphic drop zone", async ({
    page,
  }) => {
    const section = page.getByTestId("core-service-verticals-grid");
    await section.scrollIntoViewIfNeeded();
    await expect(section).toBeVisible();

    // Section Title Graphic spatial container
    const titleGraphic = page.getByTestId("section-title-graphic");
    await expect(titleGraphic).toBeVisible();
    await expect(titleGraphic).toContainText("Capabilities Architecture");
    await expect(titleGraphic).toContainText("6 Core Service Verticals");
    await expect(titleGraphic).toContainText("Designer Section Title Graphic Drop Zone");

    // All 6 vertical cards are present
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
    }
  });

  test("validates vertical card structure with aspect-[4/5], audience badge, and PNG drop zone", async ({
    page,
  }) => {
    const section = page.getByTestId("core-service-verticals-grid");
    await section.scrollIntoViewIfNeeded();

    const testVerticals = [
      {
        id: "retail-framing",
        name: "Retail & Standard Framing",
        badge: "B2C",
        spec: "Standard Displays & Gallery Wall Kits",
      },
      {
        id: "bespoke-framing",
        name: "Bespoke Art & Custom Framing",
        badge: "B2C / B2B",
        spec: "Fine Art Printing & Archival Shadowboxes",
      },
      {
        id: "spatial-signage",
        name: "Spatial Design & Signage",
        badge: "B2B",
        spec: "Wayfinding Systems & Dimensional Acrylic",
      },
      {
        id: "industrial-cnc",
        name: "Industrial Fabrication & CNC Metalworks",
        badge: "Commercial",
        spec: "Heavy CNC Milling & Perforated Metal",
      },
      {
        id: "custom-gifting",
        name: "Custom Gifting & Mementos",
        badge: "Corporate",
        spec: "Executive Awards & Custom Presentation Boxes",
      },
      {
        id: "civic-projects",
        name: "Government & Civic Projects",
        badge: "Public Sector",
        spec: "GeM Tender Compliance & Monumental Installs",
      },
    ];

    for (const vert of testVerticals) {
      const card = page.getByTestId(`service-vertical-card-${vert.id}`);
      await expect(card).toBeVisible();

      // Check title and audience badge
      await expect(card).toContainText(vert.name);
      await expect(card).toContainText(vert.badge);

      // Check spatial dashed container for designer PNG asset
      await expect(card).toContainText("PNG Asset Drop Zone");
      await expect(card).toContainText(vert.spec);

      // Verify aspect ratio class exists
      await expect(card).toHaveClass(/aspect-\[4\/5\]/);
      await expect(card).toHaveClass(/rounded-2xl/);
    }
  });

  test("verifies card hover interactions and visual cues", async ({ page }) => {
    const section = page.getByTestId("core-service-verticals-grid");
    await section.scrollIntoViewIfNeeded();

    const bespokeCard = page.getByTestId("service-vertical-card-bespoke-framing");
    await expect(bespokeCard).toBeVisible();

    // Verify hover does not break card layout
    await bespokeCard.hover();
    await expect(bespokeCard).toBeVisible();

    const cncCard = page.getByTestId("service-vertical-card-industrial-cnc");
    await cncCard.hover();
    await expect(cncCard).toBeVisible();
  });
});
