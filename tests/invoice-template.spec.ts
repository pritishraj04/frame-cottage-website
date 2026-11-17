import { test, expect } from "@playwright/test";
import {
  generateInvoiceHtml,
  generateInvoiceText,
  PAYMENT_OPTIONS,
  PaymentTypeId,
  InvoicePayload,
} from "@/lib/email/invoice-template";
import { sendOrderEmail } from "@/app/actions/send-order-email";

test.describe("Resend HTML Invoice Generator & Payment Types", () => {
  test("1. PAYMENT_OPTIONS constant defines all 4 required payment types", () => {
    expect(PAYMENT_OPTIONS).toHaveLength(4);
    const ids = PAYMENT_OPTIONS.map((p) => p.id);
    expect(ids).toEqual(["upi", "bank-transfer", "card-link", "pay-on-delivery"]);

    const upi = PAYMENT_OPTIONS.find((p) => p.id === "upi");
    expect(upi?.label).toContain("UPI");
    expect(upi?.description).toContain("Zero-fee instant UPI transfer");

    const bank = PAYMENT_OPTIONS.find((p) => p.id === "bank-transfer");
    expect(bank?.label).toContain("NEFT / IMPS / RTGS");
    expect(bank?.description).toContain("Direct bank transfer");

    const card = PAYMENT_OPTIONS.find((p) => p.id === "card-link");
    expect(card?.label).toContain("Card / Secure Payment Link");

    const pod = PAYMENT_OPTIONS.find((p) => p.id === "pay-on-delivery");
    expect(pod?.label).toContain("Pay on Delivery / Studio Pick-Up");
  });

  test("2. generateInvoiceHtml renders luxury dark/gold website theme, Indian Rupee, and 4 Atelier Guarantees", () => {
    const payload: InvoicePayload = {
      orderRef: "FC-TEST-7788",
      customer: {
        name: "Ar. Rajesh Mehra",
        email: "rajesh@mehra.design",
        phone: "+91 98100 12345",
        address: "14 Jor Bagh, New Delhi",
      },
      items: [
        {
          name: "American Walnut Bespoke Frame",
          dimensions: "16″ × 20″",
          specifications: "TruVue Museum Glass • 4-ply Cotton Rag Mat",
          quantity: 2,
          price: 8400,
        },
      ],
      total: 16800,
      subtotal: 16800,
      shipping: 0,
      tax: 0,
      discount: 0,
      paymentType: "upi",
      deliveryMethod: "Insured White-Glove Transit",
      specialNotes: "Brass plaque engraving: Private Residence 2026",
    };

    const html = generateInvoiceHtml("FC-TEST-7788", payload);

    // Theme color checks
    expect(html).toContain("#0E0E10"); // Dark canvas
    expect(html).toContain("#17191E"); // Obsidian card
    expect(html).toContain("#C5A059"); // Gold accent
    expect(html).toContain("#F7F5F0"); // Ivory text
    expect(html).toContain("#A8A29E"); // Warm stone muted
    expect(html).toContain("1px dashed #3A352C"); // Architectural border

    // Header & Monogram
    expect(html).toContain("FRAMES COTTAGE");
    expect(html).toContain("FC");
    expect(html).toContain("OFFICIAL ATELIER INVOICE &amp; ORDER CONFIRMATION");
    expect(html).toContain("FC-TEST-7788");

    // Client & Coordinates
    expect(html).toContain("Ar. Rajesh Mehra");
    expect(html).toContain("rajesh@mehra.design");
    expect(html).toContain("+91 98100 12345");
    expect(html).toContain("14 Jor Bagh, New Delhi");

    // Rupee and Pricing
    expect(html).toContain("₹");
    expect(html).toContain("16,800");

    // Selected Payment Type
    expect(html).toContain("UPI / Instant QR");
    expect(html).toContain("Zero-fee instant UPI transfer");
    expect(html).toContain("No online charge is deducted before our master framers confirm");

    // 4 Craftsmanship & Archival Guarantees
    expect(html).toContain("99% UV Conservation Glazing");
    expect(html).toContain("TruVue®");
    expect(html).toContain("FSC-Certified Solid Hardwoods");
    expect(html).toContain("100% Insured Transit Assurance");
    expect(html).toContain("Lifetime Structural Warranty");

    // WhatsApp CTA & Footer
    expect(html).toContain("Confirm or Track on WhatsApp");
    expect(html).toContain("https://wa.me/");
    expect(html).toContain("Frames Cottage &bull; New Delhi &bull; ISO 9001:2015 Certified Fabrication Studio");
  });

  test("3. generateInvoiceHtml renders dynamically with alternate payment types (e.g. Bank Transfer)", () => {
    const payload: InvoicePayload = {
      orderRef: "FC-CORP-9001",
      customer: {
        name: "Studio Metaphor",
        email: "accounts@metaphor.in",
      },
      items: [
        {
          name: "Nordic White Oak Gallery Frame",
          dimensions: "24″ × 36″",
          quantity: 4,
          price: 12500,
        },
      ],
      total: 50000,
      paymentType: "bank-transfer",
    };

    const html = generateInvoiceHtml("FC-CORP-9001", payload);
    expect(html).toContain("NEFT / IMPS / RTGS");
    expect(html).toContain("Direct bank transfer for residential &amp; corporate invoices");
    expect(html).toContain("Atelier bank coordinates");
  });

  test("4. generateInvoiceText produces clean, complete plain text invoice", () => {
    const payload: InvoicePayload = {
      orderRef: "FC-TXT-1234",
      customer: {
        name: "Vikram Seth",
        email: "vikram@seth.org",
      },
      items: [
        {
          name: "Vintage Florentine Gold Frame",
          quantity: 1,
          price: 9500,
        },
      ],
      total: 9500,
      paymentType: "card-link",
    };

    const text = generateInvoiceText("FC-TXT-1234", payload);
    expect(text).toContain("FRAMES COTTAGE — BESPOKE FRAMING ATELIER");
    expect(text).toContain("OFFICIAL ATELIER INVOICE & ORDER CONFIRMATION");
    expect(text).toContain("Invoice Reference : FC-TXT-1234");
    expect(text).toContain("Vikram Seth");
    expect(text).toContain("Card / Secure Payment Link");
    expect(text).toContain("₹9,500");
    expect(text).toContain("99% UV Conservation Glazing");
    expect(text).toContain("Lifetime Structural Warranty");
    expect(text).toContain("https://wa.me/");
  });

  test("5. sendOrderEmail server action resolves simulated dispatch cleanly in test env", async () => {
    const res = await sendOrderEmail({
      orderRef: "FC-TEST-SERVER-ACTION",
      customer: {
        name: "Test Client",
        email: "client@example.com",
      },
      items: [
        {
          name: "Test Frame",
          quantity: 1,
          price: 5000,
        },
      ],
      total: 5000,
      paymentType: "pay-on-delivery",
    });

    expect(res.success).toBe(true);
    expect(res.simulated).toBe(true);
    expect(res.orderRef).toBe("FC-TEST-SERVER-ACTION");
  });
});
