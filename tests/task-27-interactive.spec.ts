import { test, expect } from "@playwright/test";
import path from "path";
import fs from "fs";

test.describe("TASK-27: Floating WhatsApp Button & Interactive Decision Concierge", () => {
  const screenshotsDir = path.resolve(process.cwd(), ".agent/screenshots");
  const parentBrainDir =
    "/Users/pritish/.gemini/antigravity/brain/91fc1fed-fc5f-495e-88c1-129ef76052af";

  test.beforeAll(() => {
    if (!fs.existsSync(screenshotsDir)) {
      fs.mkdirSync(screenshotsDir, { recursive: true });
    }
    if (!fs.existsSync(parentBrainDir)) {
      fs.mkdirSync(parentBrainDir, { recursive: true });
    }
  });

  const saveScreenshots = async (locatorOrPage: any, filename: string) => {
    const agentPath = path.join(screenshotsDir, filename);
    const brainPath = path.join(parentBrainDir, filename);
    await locatorOrPage.screenshot({ path: agentPath });
    try {
      fs.copyFileSync(agentPath, brainPath);
    } catch {
      await locatorOrPage.screenshot({ path: brainPath });
    }
  };

  test("1. Floating WhatsApp Button: visibility, interaction, and link targets", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("/");
    await page.waitForLoadState("networkidle");

    // Force Dark Theme
    await page.evaluate(() => {
      document.documentElement.classList.add("dark");
      document.documentElement.classList.remove("light");
      localStorage.setItem("frame-cottage-theme", "dark");
    });
    await page.waitForTimeout(300);

    // Locate floating WhatsApp button
    const whatsappBtn = page.getByTestId("whatsapp-floating-btn");
    await expect(whatsappBtn).toBeVisible();
    await expect(whatsappBtn).toHaveAttribute(
      "aria-label",
      "Chat with Studio Consultant on WhatsApp"
    );

    // Click to open consultation popover
    await whatsappBtn.click();
    const popover = page.getByTestId("whatsapp-popover");
    await expect(popover).toBeVisible();

    // Verify popover header and response time
    await expect(popover.getByText("Studio Consultant Online")).toBeVisible();
    await expect(popover.getByText(/Average reply time/i)).toBeVisible();

    // Verify main CTA link targets wa.me with consultation text
    const chatCta = page.getByTestId("whatsapp-chat-cta");
    await expect(chatCta).toBeVisible();
    const ctaHref = await chatCta.getAttribute("href");
    expect(ctaHref).toContain("https://wa.me/919876543210");
    expect(ctaHref).toContain("Hello%20Frames%20Cottage%20Studio");

    // Verify quick shortcuts target wa.me
    const bespokeShortcut = page.getByTestId("whatsapp-shortcut-bespoke");
    await expect(bespokeShortcut).toBeVisible();
    const bespokeHref = await bespokeShortcut.getAttribute("href");
    expect(bespokeHref).toContain("https://wa.me/919876543210");
    expect(bespokeHref).toContain("Bespoke%20Framing");

    const signageShortcut = page.getByTestId("whatsapp-shortcut-signage");
    await expect(signageShortcut).toBeVisible();
    const signageHref = await signageShortcut.getAttribute("href");
    expect(signageHref).toContain("https://wa.me/919876543210");
    expect(signageHref).toContain("Spatial%20Signage");

    // Verify Launch Decision Concierge shortcut button exists and works
    const launchConciergeBtn = page.getByTestId("whatsapp-launch-concierge");
    await expect(launchConciergeBtn).toBeVisible();

    // Scroll down to Decision Concierge section
    const conciergeSection = page.getByTestId("decision-concierge");
    await conciergeSection.scrollIntoViewIfNeeded();
    await expect(conciergeSection).toBeVisible();

    // Capture dark mode screenshot with both popover and concierge visible
    await saveScreenshots(page, "task-27-whatsapp-and-concierge-dark.png");

    // Switch to Light Theme
    await page.evaluate(() => {
      document.documentElement.classList.remove("dark");
      document.documentElement.classList.add("light");
      localStorage.setItem("frame-cottage-theme", "light");
    });
    await page.waitForTimeout(300);

    // Verify popover remains visible and styled in light mode
    await expect(popover).toBeVisible();
    await saveScreenshots(page, "task-27-whatsapp-and-concierge-light.png");

    // Click close button and ensure popover closes
    const closeBtn = page.getByTestId("whatsapp-close-btn");
    await closeBtn.click();
    await expect(popover).not.toBeVisible();
  });

  test("2. Interactive Decision Concierge: multi-step flow, recommendation, RFQ transfer, and reset", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("/");
    await page.waitForLoadState("networkidle");

    // Force Dark Theme
    await page.evaluate(() => {
      document.documentElement.classList.add("dark");
      document.documentElement.classList.remove("light");
      localStorage.setItem("frame-cottage-theme", "dark");
    });
    await page.waitForTimeout(300);

    const concierge = page.getByTestId("decision-concierge");
    await concierge.scrollIntoViewIfNeeded();
    await expect(concierge).toBeVisible();

    // STEP 1: Verify Step 1 is displayed
    await expect(
      concierge.getByText("Step 1 of 3: Architectural Scope")
    ).toBeVisible();
    const bespokeOption = page.getByTestId("concierge-option-bespoke-framing");
    const signageOption = page.getByTestId("concierge-option-spatial-signage");
    const cncOption = page.getByTestId("concierge-option-industrial-cnc");
    const giftingOption = page.getByTestId("concierge-option-custom-gifting");
    const civicOption = page.getByTestId("concierge-option-civic-projects");

    await expect(bespokeOption).toBeVisible();
    await expect(signageOption).toBeVisible();
    await expect(cncOption).toBeVisible();
    await expect(giftingOption).toBeVisible();
    await expect(civicOption).toBeVisible();

    // Select Bespoke Framing option -> Advance to Step 2
    await bespokeOption.click();

    // STEP 2: Verify Step 2 is displayed
    await expect(
      concierge.getByText("Step 2 of 3: Environmental Conditions")
    ).toBeVisible();
    const museumOption = page.getByTestId("concierge-option-gallery-museum");
    const uvDaylightOption = page.getByTestId("concierge-option-uv-daylight");
    await expect(museumOption).toBeVisible();
    await expect(uvDaylightOption).toBeVisible();

    // Verify back button on Step 2
    const backBtnStep2 = page.getByTestId("concierge-back-btn");
    await expect(backBtnStep2).toBeVisible();

    // Select Gallery Showcase option -> Advance to Step 3
    await museumOption.click();

    // STEP 3: Verify Step 3 is displayed
    await expect(
      concierge.getByText("Step 3 of 3: Tactile & Aesthetic Tone")
    ).toBeVisible();
    const hardwoodsOption = page.getByTestId("concierge-option-hardwoods");
    const heritageMetalsOption = page.getByTestId("concierge-option-heritage-metals");
    await expect(hardwoodsOption).toBeVisible();
    await expect(heritageMetalsOption).toBeVisible();

    // Select Warm Architectural Hardwoods -> Advance to Step 4 (Tailored Recommendation)
    await hardwoodsOption.click();

    // STEP 4: Tailored Recommendation Card
    const recommendationCard = page.getByTestId("concierge-recommendation-card");
    await expect(recommendationCard).toBeVisible();

    // Verify Recommended Title & Badge
    const recTitle = page.getByTestId("concierge-recommended-title");
    await expect(recTitle).toHaveText("Bespoke Art & Custom Framing");

    const recBadge = page.getByTestId("concierge-recommended-badge");
    await expect(recBadge).toHaveText("B2C / B2B Curation");

    // Verify Service Link
    const serviceLink = page.getByTestId("concierge-recommended-link");
    await expect(serviceLink).toHaveAttribute("href", "/services/bespoke-framing");

    // Verify Substrate & Glazing Specs
    await expect(
      recommendationCard.getByText("FSC® Select Appalachian Black Walnut & White Oak")
    ).toBeVisible();
    await expect(
      recommendationCard.getByText("TruVue® Optium Museum Acrylic Anti-Reflective")
    ).toBeVisible();

    // Verify Dedicated Dashed PNG Drop Zone Container
    const dropzone = page.getByTestId("concierge-dropzone");
    await expect(dropzone).toBeVisible();
    await expect(dropzone.getByText(/PNG Studio Drop Zone/i)).toBeVisible();
    await expect(dropzone.getByText(/1:1 Aspect Ratio • Full-Bleed PNG Asset/i)).toBeVisible();

    // Verify RFQ Direct Transfer Button with pre-selected vertical
    const rfqBtn = page.getByTestId("concierge-rfq-btn");
    await expect(rfqBtn).toBeVisible();
    await expect(rfqBtn).toHaveAttribute("href", "/rfq?vertical=bespoke-framing");

    // Verify WhatsApp deep link contains summary text
    const whatsappBtn = page.getByTestId("concierge-whatsapp-btn");
    await expect(whatsappBtn).toBeVisible();
    const waHref = await whatsappBtn.getAttribute("href");
    expect(waHref).toContain("https://wa.me/919876543210");
    expect(waHref).toContain("Bespoke%20Art%20%26%20Custom%20Framing");

    // Capture results screenshot in Dark Mode
    await saveScreenshots(concierge, "task-27-concierge-results-dark.png");

    // Test "Retake Decision Quiz" button resets back to Step 1
    const resetBtn = page.getByTestId("concierge-reset-btn");
    await expect(resetBtn).toBeVisible();
    await resetBtn.click();

    // Verify Step 1 is active again
    await expect(
      concierge.getByText("Step 1 of 3: Architectural Scope")
    ).toBeVisible();
    await expect(page.getByTestId("concierge-option-bespoke-framing")).toBeVisible();
  });

  test("3. Mobile Responsiveness: 390x844 viewport and zero horizontal scroll", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/");
    await page.waitForLoadState("networkidle");

    // Force Dark Mode
    await page.evaluate(() => {
      document.documentElement.classList.add("dark");
      document.documentElement.classList.remove("light");
      localStorage.setItem("frame-cottage-theme", "dark");
    });
    await page.waitForTimeout(300);

    // Verify zero horizontal scroll across page
    const scrollWidth = await page.evaluate(
      () => document.documentElement.scrollWidth
    );
    const clientWidth = await page.evaluate(
      () => document.documentElement.clientWidth
    );
    expect(scrollWidth).toBeLessThanOrEqual(clientWidth + 2);

    // Verify floating WhatsApp button is visible on mobile
    const whatsappBtn = page.getByTestId("whatsapp-floating-btn");
    await expect(whatsappBtn).toBeVisible();

    // Open WhatsApp popover on mobile
    await whatsappBtn.click();
    const popover = page.getByTestId("whatsapp-popover");
    await expect(popover).toBeVisible();

    // Close popover
    await page.getByTestId("whatsapp-close-btn").click();
    await expect(popover).not.toBeVisible();

    // Scroll to Concierge on mobile
    const concierge = page.getByTestId("decision-concierge");
    await concierge.scrollIntoViewIfNeeded();
    await expect(concierge).toBeVisible();

    // Advance to recommendation on mobile
    await page.getByTestId("concierge-option-spatial-signage").click();
    await page.getByTestId("concierge-option-exterior-weather").click();
    await page.getByTestId("concierge-option-modern-aluminum").click();

    const recommendationCard = page.getByTestId("concierge-recommendation-card");
    await expect(recommendationCard).toBeVisible();
    const recTitle = page.getByTestId("concierge-recommended-title");
    await expect(recTitle).toHaveText("Spatial Design & Signage");

    const rfqBtn = page.getByTestId("concierge-rfq-btn");
    await expect(rfqBtn).toBeVisible();
    await expect(rfqBtn).toHaveAttribute("href", "/rfq?vertical=spatial-signage");

    // Capture mobile proof screenshot
    await saveScreenshots(page, "task-27-concierge-mobile.png");
  });
});
