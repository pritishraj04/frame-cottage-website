import { test, expect } from "@playwright/test";
import path from "path";

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

  test("renders The Atelier: Material Transparency & Sustainability with all 4 craft pillars", async ({
    page,
  }) => {
    const atelierSection = page.getByTestId("atelier-materials");
    await expect(atelierSection).toBeVisible();

    // Atelier Header
    const header = page.getByTestId("atelier-header");
    await expect(header).toBeVisible();
    await expect(header).toContainText(
      "The Atelier: Material Transparency & Sustainability"
    );
    await expect(header).toContainText("FSC-certified Appalachian hardwoods");
    await expect(header).toContainText("corner spline joinery");
    await expect(header).toContainText("4-ply cotton rag mats");
    await expect(header).toContainText("conservation acrylic");

    // Pillar 1: FSC Appalachian Hardwoods
    const hardwoodsPillar = page.getByTestId("material-pillar-hardwoods");
    await expect(hardwoodsPillar).toBeVisible();
    await expect(hardwoodsPillar).toContainText("FSC-Certified Appalachian Hardwoods");
    await expect(hardwoodsPillar).toContainText("Solid White Oak, Black Walnut & Rock Maple");

    // Pillar 2: Corner Spline Joinery
    const splinesPillar = page.getByTestId("material-pillar-splines");
    await expect(splinesPillar).toBeVisible();
    await expect(splinesPillar).toContainText("Corner Spline Joinery");
    await expect(splinesPillar).toContainText("Mortise-Keyed Hardwood Spline Reinforcement");

    // Pillar 3: 4-Ply Cotton Rag Mats
    const matsPillar = page.getByTestId("material-pillar-cotton-mats");
    await expect(matsPillar).toBeVisible();
    await expect(matsPillar).toContainText("4-Ply Archival Cotton Rag Mats");
    await expect(matsPillar).toContainText("100% Acid-Free & Lignin-Free Virgin Cotton Core");

    // Pillar 4: TruVue Conservation Glazing
    const acrylicPillar = page.getByTestId("material-pillar-acrylic");
    await expect(acrylicPillar).toBeVisible();
    await expect(acrylicPillar).toContainText("TruVue® Conservation Glazing");
    await expect(acrylicPillar).toContainText("99% UV-Shielding Optical Grade Acrylic");
  });

  test("interactively controls Glass Comparison Slider via drag, presets, and keyboard", async ({
    page,
  }) => {
    const sliderContainer = page.getByTestId("glass-comparison-slider");
    await expect(sliderContainer).toBeVisible();

    // Verify initial panels and labels
    await expect(page.getByTestId("standard-glass-panel")).toBeVisible();
    await expect(page.getByTestId("truvue-acrylic-panel")).toBeVisible();
    await expect(page.getByTestId("standard-glass-label")).toContainText(
      "Standard Reflection-Prone Glass"
    );
    await expect(page.getByTestId("truvue-acrylic-label")).toContainText(
      "TruVue® Conservation Acrylic"
    );

    // Initial value should be 50
    await expect(sliderContainer).toHaveAttribute("aria-valuenow", "50");

    // Test preset switchers
    const presetStandard = page.getByTestId("slider-preset-standard");
    await presetStandard.click();
    await expect(sliderContainer).toHaveAttribute("aria-valuenow", "100");

    const presetTruVue = page.getByTestId("slider-preset-truvue");
    await presetTruVue.click();
    await expect(sliderContainer).toHaveAttribute("aria-valuenow", "0");

    const presetSplit = page.getByTestId("slider-preset-split");
    await presetSplit.click();
    await expect(sliderContainer).toHaveAttribute("aria-valuenow", "50");

    // Test dragging the slider
    const box = await sliderContainer.boundingBox();
    expect(box).not.toBeNull();
    if (box) {
      // Start drag at middle (50%) and move towards left (25%)
      const startX = box.x + box.width * 0.5;
      const startY = box.y + box.height * 0.5;
      const targetX = box.x + box.width * 0.25;

      await page.mouse.move(startX, startY);
      await page.mouse.down();
      await page.mouse.move(targetX, startY, { steps: 5 });
      await page.mouse.up();

      // The position should now be close to 25
      const valAfterDrag = await sliderContainer.getAttribute("aria-valuenow");
      expect(Number(valAfterDrag)).toBeLessThan(40);
      expect(Number(valAfterDrag)).toBeGreaterThanOrEqual(15);
    }

    // Test keyboard arrow navigation
    await sliderContainer.focus();
    await page.keyboard.press("ArrowRight");
    await page.keyboard.press("ArrowRight");
    const valAfterArrows = await sliderContainer.getAttribute("aria-valuenow");
    expect(Number(valAfterArrows)).toBeGreaterThan(20);

    // Reset to 50 for clean screenshot
    await presetSplit.click();
    await expect(sliderContainer).toHaveAttribute("aria-valuenow", "50");

    // Capture screenshot of the Glass Comparison Slider
    await sliderContainer.scrollIntoViewIfNeeded();
    await page.waitForTimeout(400);
    const sliderScreenshotPath = path.resolve(
      process.cwd(),
      ".agent/screenshots/task-7-glass-slider.png"
    );
    await sliderContainer.screenshot({ path: sliderScreenshotPath });
  });
});
