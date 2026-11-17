export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface ProfileRow {
  id: string; // Clerk User ID
  email: string;
  full_name: string | null;
  avatar_url: string | null;
  role: "collector" | "enterprise" | "admin";
  tier: string;
  company: string | null;
  phone: string | null;
  metadata: Record<string, any>;
  created_at: string;
  updated_at: string;
}

export interface CartItemRow {
  id: string;
  user_id: string | null;
  session_id: string | null;
  title: string;
  category: string | null;
  dimensions: string | null;
  specs: string | null;
  unit_price: number;
  quantity: number;
  vertical: string | null;
  metadata: Record<string, any>;
  created_at: string;
  updated_at: string;
}

export interface WishlistItemRow {
  id: string;
  user_id: string | null;
  session_id: string | null;
  title: string;
  category: string | null;
  dimensions: string | null;
  material: string | null;
  glazing: string | null;
  price: number;
  vertical: string | null;
  image_url: string | null;
  metadata: Record<string, any>;
  created_at: string;
}

export interface OrderRow {
  id: string;
  user_id: string | null;
  session_id: string | null;
  customer_name: string;
  customer_email: string;
  customer_phone: string | null;
  items: Array<{
    id: string;
    title: string;
    category?: string;
    dimensions?: string;
    specs?: string;
    unitPrice: number;
    quantity: number;
    vertical?: string;
  }>;
  subtotal: number;
  shipping: number;
  tax: number;
  discount: number;
  total: number;
  currency: string;
  delivery_method: string;
  status: "pending" | "confirmed" | "in_production" | "delivered" | "cancelled";
  shipping_address: Record<string, any>;
  special_instructions: string | null;
  created_at: string;
  updated_at: string;
}

export interface RfqSubmissionRow {
  id: string;
  user_id: string | null;
  reference_no: string;
  contact_name: string;
  email: string;
  phone: string | null;
  organization: string | null;
  vertical: string;
  project_title: string | null;
  scope_description: string | null;
  timeline: string | null;
  budget_range: string | null;
  attachments: Array<{
    filename: string;
    url: string;
    size?: number;
  }>;
  assigned_lead: string;
  status: "received" | "under_review" | "proposal_drafted" | "accepted" | "archived";
  created_at: string;
  updated_at: string;
}

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: ProfileRow;
        Insert: Partial<ProfileRow> & Pick<ProfileRow, "id" | "email">;
        Update: Partial<ProfileRow>;
      };
      cart_items: {
        Row: CartItemRow;
        Insert: Partial<CartItemRow> & Pick<CartItemRow, "id" | "title" | "unit_price">;
        Update: Partial<CartItemRow>;
      };
      wishlist_items: {
        Row: WishlistItemRow;
        Insert: Partial<WishlistItemRow> & Pick<WishlistItemRow, "id" | "title" | "price">;
        Update: Partial<WishlistItemRow>;
      };
      orders: {
        Row: OrderRow;
        Insert: Partial<OrderRow> & Pick<OrderRow, "id" | "customer_name" | "customer_email" | "items" | "total">;
        Update: Partial<OrderRow>;
      };
      rfq_submissions: {
        Row: RfqSubmissionRow;
        Insert: Partial<RfqSubmissionRow> & Pick<RfqSubmissionRow, "id" | "reference_no" | "contact_name" | "email" | "vertical">;
        Update: Partial<RfqSubmissionRow>;
      };
    };
  };
}
