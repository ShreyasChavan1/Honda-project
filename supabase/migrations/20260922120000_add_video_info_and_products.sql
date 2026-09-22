-- Vehicle cards: optional embedded video link + extra info/context shown on the card & detail page.
ALTER TABLE public.vehicles
  ADD COLUMN IF NOT EXISTS video_url text,
  ADD COLUMN IF NOT EXISTS info_context text NOT NULL DEFAULT '';

-- Generic "products" table used for Genuine Lubes & Chemicals and Accessories,
-- fully manageable (add/edit/delete) from the admin panel.
CREATE TABLE public.products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  category text NOT NULL CHECK (category IN ('lubes', 'accessories')),
  name text NOT NULL,
  short_description text NOT NULL DEFAULT '',
  description text NOT NULL DEFAULT '',
  price numeric(12,2),
  image_url text NOT NULL DEFAULT '',
  gallery text[] NOT NULL DEFAULT '{}',
  specs jsonb NOT NULL DEFAULT '{}'::jsonb,
  is_available boolean NOT NULL DEFAULT true,
  is_featured boolean NOT NULL DEFAULT false,
  sort_order integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT ON public.products TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.products TO authenticated;
GRANT ALL ON public.products TO service_role;

ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Products are publicly viewable" ON public.products FOR SELECT USING (true);
CREATE POLICY "Admins manage products" ON public.products FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin'::app_role))
  WITH CHECK (public.has_role(auth.uid(), 'admin'::app_role));

CREATE TRIGGER products_touch BEFORE UPDATE ON public.products
  FOR EACH ROW EXECUTE FUNCTION public.touch_updated_at();

CREATE INDEX products_category_idx ON public.products(category);

-- ############ DEMO DATA (replace with real product content) ############
INSERT INTO public.products (category, name, short_description, description, price, image_url, is_available, is_featured, sort_order) VALUES
('lubes', 'Honda Genuine 4T Engine Oil', 'DEMO: Mineral-grade engine oil recommended for everyday commuting.', 'DEMO CONTENT. Formulated for Honda two-wheeler engines, offering reliable lubrication, cooling and protection between services.', 440, '', true, true, 1),
('lubes', 'Honda Genuine Synthetic 2.0 Engine Oil', 'DEMO: Full-synthetic oil for smoother performance and longer intervals.', 'DEMO CONTENT. A premium synthetic formulation for riders who want the best protection and refinement from their Honda engine.', 820, '', true, false, 2),
('accessories', 'Honda Genuine Seat Cover', 'DEMO: Model-specific seat cover for a snug, weatherproof fit.', 'DEMO CONTENT. Designed to match the seat contour of your Honda model for a factory-fit look and everyday protection.', 899, '', true, true, 1),
('accessories', 'Honda Genuine Body Cover', 'DEMO: All-weather body cover to protect your two-wheeler when parked.', 'DEMO CONTENT. Helps shield paint and components from dust, sun and rain when the vehicle is not in use.', 749, '', true, false, 2);
