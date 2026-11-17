import { test, expect } from "@playwright/test";

test.describe("Backend Architecture Integration: Clerk, Supabase, Resend & Cloudflare", () => {
  const testSessionId = `test_sess_${Date.now()}`;

  // 1. /api/cart Tests (GET, POST, PUT, DELETE)
  test("Cart API: supports GET, POST, PUT, and DELETE with session isolation", async ({ request }) => {
    // 1. Initial GET should succeed
    const getRes1 = await request.get("/api/cart", {
      headers: { "x-session-id": testSessionId },
    });
    expect(getRes1.status()).toBe(200);
    const getData1 = await getRes1.json();
    expect(getData1.success).toBe(true);
    expect(Array.isArray(getData1.items)).toBe(true);

    // 2. POST to add an item
    const postRes = await request.post("/api/cart", {
      headers: { "x-session-id": testSessionId },
      data: {
        id: `cart-item-${Date.now()}`,
        title: "Atelier Teakwood Floater Frame",
        unitPrice: 4200,
        quantity: 1,
        category: "Bespoke Framing",
        dimensions: "30x40 in",
        specs: "Natural Burmese Teak • True Vue Museum Glass",
      },
    });
    expect(postRes.status()).toBe(200);
    const postData = await postRes.json();
    expect(postData.success).toBe(true);
    expect(postData.item.title).toBe("Atelier Teakwood Floater Frame");
    const addedId = postData.item.id;

    // 3. GET should now contain the added item
    const getRes2 = await request.get("/api/cart", {
      headers: { "x-session-id": testSessionId },
    });
    const getData2 = await getRes2.json();
    expect(getData2.items.some((i: any) => i.id === addedId)).toBe(true);

    // 4. PUT to update quantity
    const putRes = await request.put("/api/cart", {
      headers: { "x-session-id": testSessionId },
      data: {
        id: addedId,
        quantity: 3,
      },
    });
    expect(putRes.status()).toBe(200);
    const putData = await putRes.json();
    expect(putData.success).toBe(true);
    expect(putData.item.quantity).toBe(3);

    // 5. DELETE item by ID
    const deleteRes = await request.delete(`/api/cart?id=${encodeURIComponent(addedId)}`, {
      headers: { "x-session-id": testSessionId },
    });
    expect(deleteRes.status()).toBe(200);
    const deleteData = await deleteRes.json();
    expect(deleteData.success).toBe(true);

    // 6. Confirm item removed
    const getRes3 = await request.get("/api/cart", {
      headers: { "x-session-id": testSessionId },
    });
    const getData3 = await getRes3.json();
    expect(getData3.items.some((i: any) => i.id === addedId)).toBe(false);
  });

  // 2. /api/wishlist Tests (GET, POST, DELETE)
  test("Wishlist API: supports GET, POST, and DELETE for spatial collections", async ({ request }) => {
    const wishSessionId = `wish_sess_${Date.now()}`;

    // 1. Initial GET
    const getRes1 = await request.get("/api/wishlist", {
      headers: { "x-session-id": wishSessionId },
    });
    expect(getRes1.status()).toBe(200);
    const getData1 = await getRes1.json();
    expect(getData1.success).toBe(true);

    // 2. POST to add item to wishlist
    const wishItemId = `wish-art-${Date.now()}`;
    const postRes = await request.post("/api/wishlist", {
      headers: { "x-session-id": wishSessionId },
      data: {
        id: wishItemId,
        title: "Gallery Deep-Profile Maple Frame",
        price: 3600,
        category: "Museum Series",
        material: "Hard Rock Maple",
        glazing: "Museum Acrylic UV99",
      },
    });
    expect(postRes.status()).toBe(200);
    const postData = await postRes.json();
    expect(postData.success).toBe(true);
    expect(postData.item.title).toBe("Gallery Deep-Profile Maple Frame");

    // 3. GET should contain item
    const getRes2 = await request.get("/api/wishlist", {
      headers: { "x-session-id": wishSessionId },
    });
    const getData2 = await getRes2.json();
    expect(getData2.items.some((i: any) => i.id === wishItemId)).toBe(true);

    // 4. DELETE from wishlist
    const delRes = await request.delete(`/api/wishlist?id=${encodeURIComponent(wishItemId)}`, {
      headers: { "x-session-id": wishSessionId },
    });
    expect(delRes.status()).toBe(200);
    const delData = await delRes.json();
    expect(delData.success).toBe(true);

    // 5. Verify removal
    const getRes3 = await request.get("/api/wishlist", {
      headers: { "x-session-id": wishSessionId },
    });
    const getData3 = await getRes3.json();
    expect(getData3.items.some((i: any) => i.id === wishItemId)).toBe(false);
  });

  // 3. /api/cart/checkout Tests (converts cart to order)
  test("Checkout API: converts cart into confirmed order and dispatches invoice", async ({ request }) => {
    const checkoutSessionId = `checkout_sess_${Date.now()}`;

    // Add an item to cart first
    await request.post("/api/cart", {
      headers: { "x-session-id": checkoutSessionId },
      data: {
        id: `checkout-item-${Date.now()}`,
        title: "Architectural Bronze Anodized Showcase",
        unitPrice: 8500,
        quantity: 2,
        specs: "Precision CNC Aluminum • Anti-Reflective Optium",
      },
    });

    // Invoke checkout
    const checkoutRes = await request.post("/api/cart/checkout", {
      headers: { "x-session-id": checkoutSessionId },
      data: {
        customerName: "Camilla Vance",
        customerEmail: "collector@frames-cottage.com",
        deliveryMethod: "white-glove",
        shippingAddress: {
          street: "12 Heritage Boulevard, Art District",
          city: "New Delhi",
          state: "Delhi",
          pincode: "110001",
        },
      },
    });

    expect(checkoutRes.status()).toBe(200);
    const checkoutData = await checkoutRes.json();
    expect(checkoutData.success).toBe(true);
    expect(checkoutData.orderId).toMatch(/^FC-2026-\d{4}$/);
    expect(checkoutData.order.customer_name).toBe("Camilla Vance");
    expect(checkoutData.order.total).toBeGreaterThan(0);
    expect(checkoutData.order.currency).toBe("INR");

    // Verify user cart is cleared after checkout
    const postCheckoutCart = await request.get("/api/cart", {
      headers: { "x-session-id": checkoutSessionId },
    });
    const cartData = await postCheckoutCart.json();
    expect(cartData.items.length).toBe(0);
  });

  // 4. /api/upload Tests (Cloudflare R2 file upload)
  test("Upload API: accepts CAD blueprints / images and returns Cloudflare R2 URL", async ({ request }) => {
    const mockFileContent = Buffer.from("CAD-DWG-BLUEPRINT-SPECIFICATION-MOCK-DATA-2026");

    const uploadRes = await request.post("/api/upload", {
      multipart: {
        file: {
          name: "elevation-atrium-plan.dwg",
          mimeType: "application/acad",
          buffer: mockFileContent,
        },
      },
    });

    expect(uploadRes.status()).toBe(200);
    const uploadData = await uploadRes.json();
    expect(uploadData.success).toBe(true);
    expect(uploadData.filename).toBe("elevation-atrium-plan.dwg");
    expect(uploadData.size).toBe(mockFileContent.length);
    expect(uploadData.url).toContain("images.frames-cottage.com");
  });

  // 5. /api/email Tests (Resend transactional templates)
  test("Email API: dispatches welcome, order confirmation, and RFQ lead emails", async ({ request }) => {
    // Test 1: Welcome Email
    const welcomeRes = await request.post("/api/email", {
      data: {
        type: "welcome",
        recipientEmail: "client@atelier-design.com",
        payload: {
          name: "Marcus Sterling",
          tier: "Corporate Enterprise Partner • GeM L1",
        },
      },
    });
    expect(welcomeRes.status()).toBe(200);
    const welcomeData = await welcomeRes.json();
    expect(welcomeData.success).toBe(true);
    expect(welcomeData.emailId).toBeTruthy();

    // Test 2: Order Confirmation Email with ₹ amounts
    const orderRes = await request.post("/api/email", {
      data: {
        type: "order_confirmation",
        recipientEmail: "orders@som-architects.com",
        payload: {
          customerName: "Marcus Sterling",
          orderId: "FC-2026-9901",
          items: [
            {
              title: "Conservation Walnut Frame",
              unitPrice: 4500,
              quantity: 2,
              specs: "Burmese Teakwood • Tru Vue Optium",
            },
          ],
          subtotal: 9000,
          shipping: 0,
          tax: 743,
          discount: 0,
          total: 9743,
        },
      },
    });
    expect(orderRes.status()).toBe(200);
    const orderData = await orderRes.json();
    expect(orderData.success).toBe(true);
    expect(orderData.emailId).toBeTruthy();

    // Test 3: RFQ Confirmation referencing Vikram Singhania
    const rfqRes = await request.post("/api/email", {
      data: {
        type: "rfq_confirmation",
        recipientEmail: "tenders@heritage-civic.gov.in",
        payload: {
          contactName: "Director Alok Verma",
          organization: "National Museum Conservation Wing",
          vertical: "Government & Civic Projects",
          projectTitle: "Archival Vitrine Restoration",
          referenceNo: "RFQ-2026-041",
          assignedLead: "Vikram Singhania, Principal Studio Director",
        },
      },
    });
    expect(rfqRes.status()).toBe(200);
    const rfqData = await rfqRes.json();
    expect(rfqData.success).toBe(true);
    expect(rfqData.emailId).toBeTruthy();
  });

  // 6. /api/cloudflare/turnstile Tests (token verification)
  test("Turnstile API: verifies human verification challenge tokens", async ({ request }) => {
    // Valid test token
    const verifyRes = await request.post("/api/cloudflare/turnstile", {
      data: {
        token: "1x00000000000000000000AA",
      },
    });
    expect(verifyRes.status()).toBe(200);
    const verifyData = await verifyRes.json();
    expect(verifyData.success).toBe(true);

    // Missing token should return 400
    const invalidRes = await request.post("/api/cloudflare/turnstile", {
      data: {},
    });
    expect(invalidRes.status()).toBe(400);
    const invalidData = await invalidRes.json();
    expect(invalidData.success).toBe(false);
  });
});
