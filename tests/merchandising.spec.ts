import { test, expect } from "@playwright/test";

test.describe("Core Service Verticals Grid Discovery & Audience Presentation", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("renders visual category grid with all 6 core service vertical cards", async ({
    page,
  }) => {
    const grid = page.getByTestId("core-service-verticals-grid");
    await grid.scrollIntoViewIfNeeded();
    await expect(grid).toBeVisible();

    // Section title & description
    await expect(grid).toContainText("Capabilities Architecture");
    await expect(grid).toContainText("6 Core Service Verticals");

    // Verify all 6 service vertical cards are rendered
    const verticals = [
      { id: "retail-framing", name: "Retail & Standard Framing", audience: "B2C" },
      { id: "bespoke-framing", name: "Bespoke Art & Custom Framing", audience: "B2C / B2B" },
      { id: "spatial-signage", name: "Spatial Design & Signage", audience: "B2B" },
      { id: "industrial-cnc", name: "Industrial Fabrication & CNC Metalworks", audience: "Commercial" },
      { id: "custom-gifting", name: "Custom Gifting & Mementos", audience: "Corporate" },
      { id: "civic-projects", name: "Government & Civic Projects", audience: "Public Sector" },
    ];

    for (const vert of verticals) {
      const card = page.getByTestId(`service-vertical-card-${vert.id}`);
      await expect(card).toBeVisible();
      await expect(card).toContainText(vert.name);
      await expect(card).toContainText(vert.audience);
    }
  });

  test("verifies spatial dashed containers and hover scale cues on cards", async ({
    page,
  }) => {
    const grid = page.getByTestId("core-service-verticals-grid");
    await grid.scrollIntoViewIfNeeded();

    const retailCard = page.getByTestId("service-vertical-card-retail-framing");
    await expect(retailCard).toBeVisible();

    const spatialContainer = retailCard.locator(".border-dashed").first();
    await expect(spatialContainer).toBeVisible();
    await expect(spatialContainer).toContainText("PNG Asset Drop Zone");

    // Check hover scale class
    await expect(spatialContainer).toHaveClass(/group-hover:scale-105/);
  });
});
