-- ============================================================
-- H22 Security Migrations
-- Run this entire file in the Supabase SQL Editor (Dashboard → SQL Editor)
-- Review each section carefully before executing.
-- ============================================================


-- ============================================================
-- PART A: Admin users table
-- Creates a simple allowlist of admin UIDs.
-- Only users whose auth.uid() is in this table are admins.
-- Granting yourself admin requires direct DB access — not the app.
-- ============================================================

CREATE TABLE IF NOT EXISTS admin_users (
  user_id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Insert your admin user (replace with your actual Supabase auth user UUID)
-- Find your UUID in: Dashboard → Authentication → Users → copy the ID column
-- INSERT INTO admin_users (user_id) VALUES ('your-admin-uuid-here');

-- No RLS needed on admin_users — it is read via SERVICE ROLE only.
-- The table itself has no public SELECT policy.


-- ============================================================
-- PART B: UNIQUE constraint on paystack_reference
-- Prevents duplicate orders from the same Paystack transaction.
-- ============================================================

-- Add the column if it doesn't already have the constraint
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint
    WHERE conname = 'orders_paystack_reference_key'
  ) THEN
    ALTER TABLE orders ADD CONSTRAINT orders_paystack_reference_key
      UNIQUE (paystack_reference);
  END IF;
END $$;


-- ============================================================
-- PART C: numeric_id sequence for products
-- Replaces the client-side MAX(numeric_id)+1 race condition.
-- ============================================================

-- Create a dedicated sequence for product numeric IDs
CREATE SEQUENCE IF NOT EXISTS products_numeric_id_seq
  START WITH 1
  INCREMENT BY 1
  NO MINVALUE
  NO MAXVALUE
  CACHE 1;

-- Set the sequence to continue from the current max (run this ONCE)
SELECT setval(
  'products_numeric_id_seq',
  COALESCE((SELECT MAX(numeric_id) FROM products), 0)
);

-- Make numeric_id default to the next sequence value
ALTER TABLE products
  ALTER COLUMN numeric_id SET DEFAULT nextval('products_numeric_id_seq');

-- Ensure numeric_id is UNIQUE and NOT NULL
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint
    WHERE conname = 'products_numeric_id_key'
  ) THEN
    ALTER TABLE products ADD CONSTRAINT products_numeric_id_key UNIQUE (numeric_id);
  END IF;
END $$;


-- ============================================================
-- PART D: Database-level constraints for data integrity
-- ============================================================

DO $$
BEGIN
  -- products_price_positive skipped — price column is NOT NULL, coming-soon products use 0

  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'orders_grand_total_non_negative'
  ) THEN
    ALTER TABLE orders ADD CONSTRAINT orders_grand_total_non_negative CHECK (grand_total >= 0);
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'order_items_quantity_range'
  ) THEN
    ALTER TABLE order_items ADD CONSTRAINT order_items_quantity_range CHECK (quantity BETWEEN 1 AND 50);
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'order_items_unit_price_positive'
  ) THEN
    ALTER TABLE order_items ADD CONSTRAINT order_items_unit_price_positive CHECK (unit_price >= 0);
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'order_items_subtotal_positive'
  ) THEN
    ALTER TABLE order_items ADD CONSTRAINT order_items_subtotal_positive CHECK (subtotal >= 0);
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'delivery_fees_non_negative'
  ) THEN
    ALTER TABLE delivery_fees ADD CONSTRAINT delivery_fees_non_negative CHECK (fee_kobo >= 0);
  END IF;
END $$;


-- ============================================================
-- PART E: Row Level Security — enable on all tables
-- ============================================================

ALTER TABLE products      ENABLE ROW LEVEL SECURITY;
ALTER TABLE variants      ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders        ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items   ENABLE ROW LEVEL SECURITY;
ALTER TABLE delivery_fees ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_users   ENABLE ROW LEVEL SECURITY;


-- ============================================================
-- PART F: RLS helper function
-- Returns true if the currently authenticated user is an admin.
-- Using SECURITY DEFINER so it runs as the function owner (not the caller),
-- allowing it to read admin_users without a public SELECT policy on that table.
-- ============================================================

CREATE OR REPLACE FUNCTION is_admin()
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM admin_users WHERE user_id = auth.uid()
  );
$$;

-- Grant execute to authenticated and anon roles
GRANT EXECUTE ON FUNCTION is_admin() TO authenticated, anon;


-- ============================================================
-- PART G: Drop existing permissive policies (if any)
-- These drop statements are safe if the policies don't exist yet.
-- ============================================================

-- products
DROP POLICY IF EXISTS "Allow all" ON products;
DROP POLICY IF EXISTS "Enable read access for all users" ON products;
DROP POLICY IF EXISTS "Public read" ON products;
DROP POLICY IF EXISTS "Admin write" ON products;
DROP POLICY IF EXISTS "Authenticated write" ON products;

-- variants
DROP POLICY IF EXISTS "Allow all" ON variants;
DROP POLICY IF EXISTS "Enable read access for all users" ON variants;
DROP POLICY IF EXISTS "Public read" ON variants;
DROP POLICY IF EXISTS "Admin write" ON variants;
DROP POLICY IF EXISTS "Authenticated write" ON variants;

-- orders
DROP POLICY IF EXISTS "Allow all" ON orders;
DROP POLICY IF EXISTS "Enable read access for all users" ON orders;

-- order_items
DROP POLICY IF EXISTS "Allow all" ON order_items;
DROP POLICY IF EXISTS "Enable read access for all users" ON order_items;

-- delivery_fees
DROP POLICY IF EXISTS "Allow all" ON delivery_fees;
DROP POLICY IF EXISTS "Enable read access for all users" ON delivery_fees;


-- ============================================================
-- PART H: RLS policies — products
-- Public: SELECT only.  Admin: full CRUD.
-- ============================================================

CREATE POLICY "products_public_read"
  ON products FOR SELECT
  USING (true);  -- Anyone (anon or authenticated) can read products

CREATE POLICY "products_admin_insert"
  ON products FOR INSERT
  WITH CHECK (is_admin());

CREATE POLICY "products_admin_update"
  ON products FOR UPDATE
  USING (is_admin())
  WITH CHECK (is_admin());

CREATE POLICY "products_admin_delete"
  ON products FOR DELETE
  USING (is_admin());


-- ============================================================
-- PART I: RLS policies — variants
-- Public: SELECT only.  Admin: full CRUD.
-- ============================================================

CREATE POLICY "variants_public_read"
  ON variants FOR SELECT
  USING (true);

CREATE POLICY "variants_admin_insert"
  ON variants FOR INSERT
  WITH CHECK (is_admin());

CREATE POLICY "variants_admin_update"
  ON variants FOR UPDATE
  USING (is_admin())
  WITH CHECK (is_admin());

CREATE POLICY "variants_admin_delete"
  ON variants FOR DELETE
  USING (is_admin());


-- ============================================================
-- PART J: RLS policies — delivery_fees
-- Public: SELECT only.  Admin: full CRUD.
-- ============================================================

CREATE POLICY "delivery_fees_public_read"
  ON delivery_fees FOR SELECT
  USING (true);

CREATE POLICY "delivery_fees_admin_insert"
  ON delivery_fees FOR INSERT
  WITH CHECK (is_admin());

CREATE POLICY "delivery_fees_admin_update"
  ON delivery_fees FOR UPDATE
  USING (is_admin())
  WITH CHECK (is_admin());

CREATE POLICY "delivery_fees_admin_delete"
  ON delivery_fees FOR DELETE
  USING (is_admin());


-- ============================================================
-- PART K: RLS policies — orders
-- Nobody can INSERT orders through the anon/authenticated key
-- (only the service-role backend inserts orders after verifying payment).
-- Admins can SELECT and UPDATE (e.g., to change order status).
-- Nobody deletes orders through the API.
-- ============================================================

CREATE POLICY "orders_admin_select"
  ON orders FOR SELECT
  USING (is_admin());

-- No INSERT policy: service role bypasses RLS.
-- Authenticated users and anon cannot insert orders directly.

CREATE POLICY "orders_admin_update"
  ON orders FOR UPDATE
  USING (is_admin())
  WITH CHECK (is_admin());

-- No DELETE policy: orders are never deleted through the API.


-- ============================================================
-- PART L: RLS policies — order_items
-- Same as orders: read/write only for admins via API.
-- Backend inserts via service role (bypasses RLS).
-- ============================================================

CREATE POLICY "order_items_admin_select"
  ON order_items FOR SELECT
  USING (is_admin());

-- No INSERT, UPDATE, DELETE policies for non-service-role.


-- ============================================================
-- PART M: RLS policy — admin_users
-- Nobody can read or write admin_users through the API.
-- The is_admin() function uses SECURITY DEFINER to read it internally.
-- Adding yourself as admin requires direct Supabase SQL access.
-- ============================================================

-- No policies = nobody can access through the API (RLS enabled, no policy = deny all)
-- This is intentional. Admin grant/revoke happens via the SQL editor or migrations only.


-- ============================================================
-- PART N: Storage policies — variant-images bucket
-- Assumes bucket name is "variant-images".
-- Run these in: Dashboard → Storage → Policies
-- Or use the SQL below (storage schema).
-- ============================================================

-- Public read (so storefront can display images)
CREATE POLICY "variant_images_public_read"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'variant-images');

-- Only admins can upload
CREATE POLICY "variant_images_admin_insert"
  ON storage.objects FOR INSERT
  WITH CHECK (
    bucket_id = 'variant-images'
    AND is_admin()
    AND (storage.foldername(name))[1] IS NOT NULL  -- must be in a folder
  );

-- Only admins can update (replace)
CREATE POLICY "variant_images_admin_update"
  ON storage.objects FOR UPDATE
  USING (bucket_id = 'variant-images' AND is_admin())
  WITH CHECK (bucket_id = 'variant-images' AND is_admin());

-- Only admins can delete
CREATE POLICY "variant_images_admin_delete"
  ON storage.objects FOR DELETE
  USING (bucket_id = 'variant-images' AND is_admin());


-- ============================================================
-- END OF MIGRATIONS
-- ============================================================