import { test, expect } from "@playwright/test";
import path from "path";
import fs from "fs";

test.describe("TASK-28: Frontend-Only Wishlist, Cart, Profile/Account, and Login Pages", () => {
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

  test("1. Route Verification & HTTP 200 Checks across all storefront pages", async ({
    page,
  }) => {
    const routes = ["/wishlist", "/cart", "/login", "/account", "/profile"];

    for (const route of routes) {
      const response = await page.goto(route);
      expect(response?.status()).toBe(200);
      await page.waitForLoadState("networkidle");
      await expect(page.locator("body")).toBeVisible();
    }
  });

  test("2. Wishlist Page: interactive list, 4:3 spatial drop zones, move to cart, remove, batch controls & empty state", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("/wishlist");
    await page.waitForLoadState("networkidle");

    // Force Museum Dark Mode
    await page.evaluate(() => {
      document.documentElement.classList.add("dark");
      document.documentElement.classList.remove("light");
      localStorage.setItem("frame-cottage-theme", "dark");
    });
    await page.waitForTimeout(300);

    // Assert header and counter badge
    const counterBadge = page.getByTestId("wishlist-counter-badge");
    await expect(counterBadge).toBeVisible();
    await expect(counterBadge).toContainText("4 Items");

    // Assert initial items and 4:3 dashed drop zones
    await expect(page.getByTestId("wishlist-item-fc-wish-1")).toBeVisible();
    await expect(page.getByTestId("wishlist-dropzone-fc-wish-1")).toBeVisible();
    await expect(page.getByTestId("wishlist-item-fc-wish-2")).toBeVisible();
    await expect(page.getByTestId("wishlist-item-fc-wish-3")).toBeVisible();
    await expect(page.getByTestId("wishlist-item-fc-wish-4")).toBeVisible();

    // Capture dark mode screenshot
    await saveScreenshots(page, "task-28-wishlist-dark.png");

    // Test Move to Cart on item 1
    const moveBtn1 = page.getByTestId("move-to-cart-fc-wish-1");
    await expect(moveBtn1).toBeVisible();
    await moveBtn1.click();

    // Verify counter badge decremented to 3
    await expect(counterBadge).toContainText("3 Items");
    await expect(page.getByTestId("wishlist-item-fc-wish-1")).not.toBeVisible();

    // Test Remove on item 2
    const removeBtn2 = page.getByTestId("remove-wishlist-fc-wish-2");
    await removeBtn2.click();
    await expect(counterBadge).toContainText("2 Items");

    // Test Clear Wishlist batch button
    const clearBtn = page.getByTestId("wishlist-clear-all-btn");
    await clearBtn.click();

    // Assert empty state is rendered
    const emptyState = page.getByTestId("wishlist-empty-state");
    await expect(emptyState).toBeVisible();
    await expect(page.getByTestId("wishlist-discover-btn")).toBeVisible();

    // Test restore sample items
    const restoreBtn = page.getByTestId("wishlist-restore-btn");
    await restoreBtn.click();
    await expect(page.getByTestId("wishlist-item-fc-wish-1")).toBeVisible();
    await expect(counterBadge).toContainText("4 Items");

    // Switch to Light Mode and capture screenshot
    await page.evaluate(() => {
      document.documentElement.classList.remove("dark");
      document.documentElement.classList.add("light");
      localStorage.setItem("frame-cottage-theme", "light");
    });
    await page.waitForTimeout(300);
    await saveScreenshots(page, "task-28-wishlist-light.png");
  });

  test("3. Cart Page: header navigation link, quantity selector, tax toggle, trade promo code, delivery selector, and checkout modal", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1440, height: 900 });

    // Verify header cart button link from home
    await page.goto("/");
    await page.waitForLoadState("networkidle");
    const headerCartBtn = page.getByTestId("header-cart-btn");
    await expect(headerCartBtn).toBeVisible();
    await expect(headerCartBtn).toHaveAttribute("href", "/cart");

    // Navigate to /cart
    await page.goto("/cart");
    await page.waitForLoadState("networkidle");

    // Force Museum Dark Mode
    await page.evaluate(() => {
      document.documentElement.classList.add("dark");
      document.documentElement.classList.remove("light");
      localStorage.setItem("frame-cottage-theme", "dark");
    });
    await page.waitForTimeout(300);

    // Assert counter badge and cart items list
    await expect(page.getByTestId("cart-counter-badge")).toBeVisible();
    await expect(page.getByTestId("cart-items-list")).toBeVisible();
    await expect(page.getByTestId("cart-summary-card")).toBeVisible();

    // Capture dark mode screenshot
    await saveScreenshots(page, "task-28-cart-dark.png");

    // Test Quantity increment
    const qtyVal1 = page.getByTestId("qty-value-fc-cart-1");
    await expect(qtyVal1).toHaveText("1");
    const increaseBtn1 = page.getByTestId("qty-increase-fc-cart-1");
    await increaseBtn1.click();
    await expect(qtyVal1).toHaveText("2");
    await expect(page.getByTestId("line-total-fc-cart-1")).toHaveText("$960");

    // Test Quantity decrement back
    const decreaseBtn1 = page.getByTestId("qty-decrease-fc-cart-1");
    await decreaseBtn1.click();
    await expect(qtyVal1).toHaveText("1");
    await expect(page.getByTestId("line-total-fc-cart-1")).toHaveText("$480");

    // Test Promo Code application
    const promoInput = page.getByTestId("promo-input");
    const promoApplyBtn = page.getByTestId("promo-apply-btn");
    await promoInput.fill("TRADE15");
    await promoApplyBtn.click();
    await expect(page.getByTestId("cart-discount")).toBeVisible();

    // Test B2B Tax Exemption Toggle
    const taxToggle = page.getByTestId("cart-tax-toggle");
    await expect(page.getByTestId("cart-tax")).not.toHaveText("$0");
    await taxToggle.click();
    await expect(page.getByTestId("cart-tax")).toHaveText("$0");

    // Test Special Instructions input
    const notesInput = page.getByTestId("cart-engraving-notes");
    await notesInput.fill("Brass Inscription: The Metropolitan Wing 2026");
    await expect(notesInput).toHaveValue("Brass Inscription: The Metropolitan Wing 2026");

    // Test Checkout modal trigger
    const checkoutBtn = page.getByTestId("checkout-btn");
    await checkoutBtn.click();
    const modal = page.getByTestId("checkout-modal");
    await expect(modal).toBeVisible();
    await modal.getByRole("button", { name: "Return to Studio Cart" }).click();
    await expect(modal).not.toBeVisible();

    // Switch to Light Mode and capture screenshot
    await page.evaluate(() => {
      document.documentElement.classList.remove("dark");
      document.documentElement.classList.add("light");
      localStorage.setItem("frame-cottage-theme", "light");
    });
    await page.waitForTimeout(300);
    await saveScreenshots(page, "task-28-cart-light.png");
  });

  test("4. Login Page: tabs switching, client portal selector, demo credentials, and clean account redirect", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("/login");
    await page.waitForLoadState("networkidle");

    // Force Museum Dark Mode
    await page.evaluate(() => {
      document.documentElement.classList.add("dark");
      document.documentElement.classList.remove("light");
      localStorage.setItem("frame-cottage-theme", "dark");
    });
    await page.waitForTimeout(300);

    // Assert form elements
    await expect(page.getByTestId("auth-tab-signin")).toBeVisible();
    await expect(page.getByTestId("auth-tab-register")).toBeVisible();
    await expect(page.getByTestId("portal-collector")).toBeVisible();
    await expect(page.getByTestId("portal-enterprise")).toBeVisible();
    await expect(page.getByTestId("input-email")).toBeVisible();
    await expect(page.getByTestId("input-password")).toBeVisible();
    await expect(page.getByTestId("demo-collector-btn")).toBeVisible();
    await expect(page.getByTestId("demo-enterprise-btn")).toBeVisible();

    // Capture dark mode screenshot
    await saveScreenshots(page, "task-28-login-dark.png");

    // Test tab switching to Register
    await page.getByTestId("auth-tab-register").click();
    await expect(page.getByTestId("input-name")).toBeVisible();

    // Test enterprise portal switcher
    await page.getByTestId("portal-enterprise").click();
    await expect(page.getByTestId("input-organization")).toBeVisible();

    // Test Demo Collector Login button redirects to /account
    await page.getByTestId("demo-collector-btn").click();
    await page.waitForURL("**/account");
    expect(page.url()).toContain("/account");
    await expect(page.getByTestId("account-name")).toContainText("Camilla Vance");
  });

  test("5. Account Dashboard: profile identity, 4-tab navigation, spec sheet modal, address modal, and theme toggle", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("/account");
    await page.waitForLoadState("networkidle");

    // Force Museum Dark Mode
    await page.evaluate(() => {
      document.documentElement.classList.add("dark");
      document.documentElement.classList.remove("light");
      localStorage.setItem("frame-cottage-theme", "dark");
    });
    await page.waitForTimeout(300);

    // Profile Identity checks
    await expect(page.getByTestId("account-avatar")).toBeVisible();
    await expect(page.getByTestId("account-name")).toBeVisible();
    await expect(page.getByTestId("account-tier-badge")).toBeVisible();

    // Capture account dark mode screenshot
    await saveScreenshots(page, "task-28-account-dark.png");

    // Tab 1: Orders
    await expect(page.getByTestId("tab-orders")).toBeVisible();
    await expect(page.getByTestId("content-orders")).toBeVisible();
    const specSheetBtn = page.getByTestId("spec-sheet-btn-FC-2026-8841");
    await expect(specSheetBtn).toBeVisible();
    await specSheetBtn.click();
    await expect(page.getByText("In-Situ Architectural Spec Sheet")).toBeVisible();
    await page.getByRole("button", { name: "Close" }).click();

    // Tab 2: RFQs
    const tabRfqs = page.getByTestId("tab-rfqs");
    await tabRfqs.click();
    await expect(page.getByTestId("content-rfqs")).toBeVisible();
    const rfqDetailBtn = page.getByTestId("rfq-details-btn-RFQ-2026-041");
    await expect(rfqDetailBtn).toBeVisible();
    await rfqDetailBtn.click();
    await expect(page.getByText("RFQ Architectural Dossier")).toBeVisible();
    await page.getByRole("button", { name: "Close" }).click();

    // Tab 3: Addresses
    const tabAddresses = page.getByTestId("tab-addresses");
    await tabAddresses.click();
    await expect(page.getByTestId("content-addresses")).toBeVisible();
    const addAddressBtn = page.getByTestId("add-address-btn");
    await addAddressBtn.click();
    const addressModal = page.getByTestId("address-modal");
    await expect(addressModal).toBeVisible();
    await addressModal.getByRole("button", { name: "Cancel" }).click();
    await expect(addressModal).not.toBeVisible();

    // Tab 4: Settings & Preferences
    const tabSettings = page.getByTestId("tab-settings");
    await tabSettings.click();
    await expect(page.getByTestId("content-settings")).toBeVisible();
    await expect(page.getByTestId("account-theme-toggle")).toBeVisible();
    await expect(page.getByTestId("sign-out-btn")).toBeVisible();

    // Sign out test redirects to /login
    await page.getByTestId("sign-out-btn").click();
    await page.waitForURL("**/login");
    expect(page.url()).toContain("/login");
  });

  test("6. Profile route re-export/render: /profile cleanly renders Account Dashboard", async ({
    page,
  }) => {
    await page.goto("/profile");
    await page.waitForLoadState("networkidle");

    await expect(page.getByTestId("account-avatar")).toBeVisible();
    await expect(page.getByTestId("tab-orders")).toBeVisible();
    await expect(page.getByTestId("tab-rfqs")).toBeVisible();
  });

  test("7. Mobile Viewport (390×844) Responsiveness & Zero Horizontal Overflow", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 390, height: 844 });

    const routes = ["/wishlist", "/cart", "/login", "/account"];

    for (const route of routes) {
      await page.goto(route);
      await page.waitForLoadState("networkidle");

      // Check horizontal overflow
      const hasHorizontalOverflow = await page.evaluate(() => {
        return document.documentElement.scrollWidth > document.documentElement.clientWidth;
      });

      expect(
        hasHorizontalOverflow,
        `Expected ${route} to have zero horizontal overflow at 390x844`
      ).toBe(false);
    }

    // Capture mobile screenshot of account page
    await page.goto("/account");
    await page.waitForLoadState("networkidle");
    await saveScreenshots(page, "task-28-account-mobile.png");
  });
});
