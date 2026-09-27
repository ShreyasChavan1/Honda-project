ALTER TABLE public.vehicles
  ADD COLUMN IF NOT EXISTS brochure_url text;

COMMENT ON COLUMN public.vehicles.brochure_url IS
  'Long-lived signed URL for the vehicle PDF brochure uploaded from the admin panel.';
