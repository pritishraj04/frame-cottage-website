"use server";

export interface GuestOrderItem {
  name: string;
  dimensions?: string;
  specs?: string;
  quantity: number;
  price: number;
}

export interface SaveGuestOrderPayload {
  orderRef?: string;
  customerName?: string;
  customerEmail?: string;
  customerPhone?: string | null;
  items?: GuestOrderItem[];
  total: number;
  subtotal?: number;
  shipping?: number;
  tax?: number;
  discount?: number;
  currency?: string;
  deliveryMethod?: string;
  status?: "pending" | "confirmed" | "in_production" | "delivered" | "cancelled";
  shippingAddress?: { address?: string; [key: string]: any } | string;
  specialInstructions?: string;
}

export interface SaveGuestOrderResult {
  success: boolean;
  orderId?: string;
  error?: string;
}

/**
 * Server action to persist guest orders directly into Supabase table public.orders.
 * Gracefully catches errors if offline or credentials are not configured.
 */
export async function saveGuestOrder(
  payload: SaveGuestOrderPayload
): Promise<SaveGuestOrderResult> {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey =
      process.env.SUPABASE_SERVICE_ROLE_KEY ||
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseKey) {
      console.warn(
        "[saveGuestOrder] Supabase credentials missing. Gracefully skipping guest order storage."
      );
      return { success: false, error: "Supabase credentials missing" };
    }

    const orderId =
      payload.orderRef || `FC-2026-${Math.floor(1000 + Math.random() * 9000)}`;

    const deliveryMethod =
      payload.deliveryMethod?.toLowerCase().includes("atelier") ||
      payload.deliveryMethod?.toLowerCase().includes("pickup")
        ? "atelier"
        : "white-glove";

    const shippingAddress =
      typeof payload.shippingAddress === "string"
        ? { address: payload.shippingAddress }
        : payload.shippingAddress || { address: "" };

    const items = (payload.items || []).map((item) => ({
      name: item.name,
      dimensions: item.dimensions || "Standard",
      specs: item.specs || "",
      quantity: Number(item.quantity) || 1,
      price: Number(item.price) || 0,
    }));

    const orderRow = {
      id: orderId,
      customer_name: payload.customerName?.trim() || "Guest Collector",
      customer_email: payload.customerEmail?.trim() || "guest@framescottage.com",
      customer_phone: payload.customerPhone?.trim() || null,
      items,
      subtotal: payload.subtotal ?? payload.total,
      shipping: payload.shipping ?? 0,
      tax: payload.tax ?? 0,
      discount: payload.discount ?? 0,
      total: Number(payload.total) || 0,
      currency: payload.currency || "INR",
      delivery_method: deliveryMethod,
      status: payload.status || "confirmed",
      shipping_address: shippingAddress,
      special_instructions: payload.specialInstructions || null,
    };

    const res = await fetch(`${supabaseUrl.replace(/\/$/, "")}/rest/v1/orders`, {
      method: "POST",
      headers: {
        apikey: supabaseKey,
        Authorization: `Bearer ${supabaseKey}`,
        "Content-Type": "application/json",
        Prefer: "return=minimal",
      },
      body: JSON.stringify(orderRow),
    });

    if (!res.ok) {
      const errText = await res.text();
      console.warn(
        `[saveGuestOrder] Supabase REST API error (${res.status}): ${errText}`
      );
      return { success: false, error: errText };
    }

    console.log(
      `[saveGuestOrder] Successfully stored guest order ${orderId} in Supabase`
    );
    return { success: true, orderId };
  } catch (err: any) {
    console.warn(
      "[saveGuestOrder] Graceful catch: Exception while saving guest order to Supabase:",
      err?.message || err
    );
    return { success: false, error: err?.message || "Unknown error" };
  }
}
