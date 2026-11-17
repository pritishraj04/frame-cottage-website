-- ==============================================================================
-- Frames Cottage Atelier - Production Supabase Migration
-- Schema for Profiles, Cart Items, Wishlist Items, Orders, and RFQ Submissions
-- ==============================================================================

-- Enable UUID extension if needed
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. PROFILES TABLE (Mirrors Clerk Users & Atelier Client Profiles)
CREATE TABLE IF NOT EXISTS public.profiles (
  id TEXT PRIMARY KEY, -- Clerk User ID (e.g. user_xxx)
  email TEXT NOT NULL UNIQUE,
  full_name TEXT,
  avatar_url TEXT,
  role TEXT NOT NULL DEFAULT 'collector' CHECK (role IN ('collector', 'enterprise', 'admin')),
  tier TEXT NOT NULL DEFAULT 'Atelier Collector • Tier I',
  company TEXT,
  phone TEXT,
  metadata JSONB NOT NULL DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 2. CART ITEMS TABLE (Authenticated Users & Guest Sessions)
CREATE TABLE IF NOT EXISTS public.cart_items (
  id TEXT PRIMARY KEY,
  user_id TEXT REFERENCES public.profiles(id) ON DELETE CASCADE,
  session_id TEXT, -- Guest session identifier (fc_session_id cookie)
  title TEXT NOT NULL,
  category TEXT,
  dimensions TEXT,
  specs TEXT,
  unit_price NUMERIC(12, 2) NOT NULL DEFAULT 0.00,
  quantity INTEGER NOT NULL DEFAULT 1 CHECK (quantity > 0),
  vertical TEXT,
  metadata JSONB NOT NULL DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 3. WISHLIST ITEMS TABLE
CREATE TABLE IF NOT EXISTS public.wishlist_items (
  id TEXT PRIMARY KEY,
  user_id TEXT REFERENCES public.profiles(id) ON DELETE CASCADE,
  session_id TEXT,
  title TEXT NOT NULL,
  category TEXT,
  dimensions TEXT,
  material TEXT,
  glazing TEXT,
  price NUMERIC(12, 2) NOT NULL DEFAULT 0.00,
  vertical TEXT,
  image_url TEXT,
  metadata JSONB NOT NULL DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 4. ORDERS TABLE (Itemized Invoices, Requisitions & Orders)
CREATE TABLE IF NOT EXISTS public.orders (
  id TEXT PRIMARY KEY, -- E.g. FC-2026-XXXX
  user_id TEXT REFERENCES public.profiles(id) ON DELETE SET NULL,
  session_id TEXT,
  customer_name TEXT NOT NULL,
  customer_email TEXT NOT NULL,
  customer_phone TEXT,
  items JSONB NOT NULL DEFAULT '[]'::jsonb,
  subtotal NUMERIC(12, 2) NOT NULL DEFAULT 0.00,
  shipping NUMERIC(12, 2) NOT NULL DEFAULT 0.00,
  tax NUMERIC(12, 2) NOT NULL DEFAULT 0.00,
  discount NUMERIC(12, 2) NOT NULL DEFAULT 0.00,
  total NUMERIC(12, 2) NOT NULL DEFAULT 0.00,
  currency TEXT NOT NULL DEFAULT 'INR',
  delivery_method TEXT NOT NULL DEFAULT 'white-glove',
  status TEXT NOT NULL DEFAULT 'confirmed' CHECK (status IN ('pending', 'confirmed', 'in_production', 'delivered', 'cancelled')),
  shipping_address JSONB NOT NULL DEFAULT '{}'::jsonb,
  special_instructions TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 5. RFQ SUBMISSIONS TABLE
CREATE TABLE IF NOT EXISTS public.rfq_submissions (
  id TEXT PRIMARY KEY,
  user_id TEXT REFERENCES public.profiles(id) ON DELETE SET NULL,
  reference_no TEXT NOT NULL UNIQUE,
  contact_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  organization TEXT,
  vertical TEXT NOT NULL,
  project_title TEXT,
  scope_description TEXT,
  timeline TEXT,
  budget_range TEXT,
  attachments JSONB NOT NULL DEFAULT '[]'::jsonb,
  assigned_lead TEXT NOT NULL DEFAULT 'Vikram Singhania, Principal Studio Director',
  status TEXT NOT NULL DEFAULT 'received' CHECK (status IN ('received', 'under_review', 'proposal_drafted', 'accepted', 'archived')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- Indexes for high-throughput querying
CREATE INDEX IF NOT EXISTS idx_cart_items_user_id ON public.cart_items(user_id);
CREATE INDEX IF NOT EXISTS idx_cart_items_session_id ON public.cart_items(session_id);
CREATE INDEX IF NOT EXISTS idx_wishlist_items_user_id ON public.wishlist_items(user_id);
CREATE INDEX IF NOT EXISTS idx_wishlist_items_session_id ON public.wishlist_items(session_id);
CREATE INDEX IF NOT EXISTS idx_orders_user_id ON public.orders(user_id);
CREATE INDEX IF NOT EXISTS idx_orders_customer_email ON public.orders(customer_email);
CREATE INDEX IF NOT EXISTS idx_rfq_submissions_user_id ON public.rfq_submissions(user_id);
CREATE INDEX IF NOT EXISTS idx_rfq_submissions_email ON public.rfq_submissions(email);

-- Row Level Security (RLS) Policies
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cart_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.wishlist_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.rfq_submissions ENABLE ROW LEVEL SECURITY;

-- Profiles: Authenticated users can read/update their own profile
CREATE POLICY "Users can read own profile" ON public.profiles
  FOR SELECT USING (auth.uid()::text = id OR auth.jwt() ->> 'sub' = id);

CREATE POLICY "Users can update own profile" ON public.profiles
  FOR UPDATE USING (auth.uid()::text = id OR auth.jwt() ->> 'sub' = id);

-- Service Role full access
CREATE POLICY "Service role full access on profiles" ON public.profiles
  FOR ALL USING (auth.jwt() ->> 'role' = 'service_role');

-- Cart Items: Users or Guests can access their cart items
CREATE POLICY "Users and sessions can read cart items" ON public.cart_items
  FOR SELECT USING (auth.jwt() ->> 'role' = 'service_role' OR auth.uid()::text = user_id OR session_id IS NOT NULL);

CREATE POLICY "Users and sessions can modify cart items" ON public.cart_items
  FOR ALL USING (auth.jwt() ->> 'role' = 'service_role' OR auth.uid()::text = user_id OR session_id IS NOT NULL);

-- Wishlist Items: Users or Guests can access their wishlist items
CREATE POLICY "Users and sessions can access wishlist items" ON public.wishlist_items
  FOR ALL USING (auth.jwt() ->> 'role' = 'service_role' OR auth.uid()::text = user_id OR session_id IS NOT NULL);

-- Orders: Users can read their own orders; Service Role can manage all
CREATE POLICY "Users can view own orders" ON public.orders
  FOR SELECT USING (auth.jwt() ->> 'role' = 'service_role' OR auth.uid()::text = user_id);

CREATE POLICY "Service role full access on orders" ON public.orders
  FOR ALL USING (auth.jwt() ->> 'role' = 'service_role');

-- RFQ: Users can view their own RFQs; Service Role can manage all
CREATE POLICY "Users can view own RFQs" ON public.rfq_submissions
  FOR SELECT USING (auth.jwt() ->> 'role' = 'service_role' OR auth.uid()::text = user_id);

CREATE POLICY "Service role full access on rfq" ON public.rfq_submissions
  FOR ALL USING (auth.jwt() ->> 'role' = 'service_role');
