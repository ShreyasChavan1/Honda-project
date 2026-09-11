# Products navigation, new sections, and slider EMI controls

## What will change

- Rename the public navigation label from **Vehicles** to **Products** without changing the existing visual system.
- Add a desktop Products mega-menu and a clear mobile Products group containing:
  - Motorcycles
  - Scooters
  - EV
  - Accessories
  - Genuine Lubes & Chemicals
- Keep Motorcycles and Scooters connected to the existing catalogue filters and preserve every current model, variant, colour, gallery, pricing, enquiry, and EMI flow.
- Add a Resources menu with a **Video Gallery** destination.

## New product and resource pages

- Create focused, responsive pages for EV, Accessories, Genuine Lubes & Chemicals, and Video Gallery.
- Use Honda India’s public site only to guide category organization and relevant product information; all showroom-specific content remains clearly marked as demo content.
- Use locally stored visual assets so pages do not depend on hotlinked images.
- Give each new page unique title, description, Open Graph, and social metadata.
- Update footer browsing links to match the new Products and Resources structure.

## EMI calculator update

- Replace the down-payment field with a slider bounded from ₹0 to the selected variant’s on-road price.
- Replace the tenure selector with a discrete slider that can only land on tenure options configured by the admin.
- Add a freely adjustable interest-rate slider; changing tenure loads that tenure’s configured rate as the default, after which the visitor may adjust it.
- Keep the loan amount and reducing-balance EMI calculation client-side, variant-specific, responsive, and covered by the existing disclaimer.

## Technical details

- Preserve the existing `/vehicles` and `/vehicles/$slug` URLs to avoid breaking catalogue links; only public labels and navigation hierarchy change.
- Add route files for `/products/ev`, `/products/accessories`, `/products/lubes`, and `/resources/video-gallery` before linking to them.
- Build the navigation with the project’s existing menu/button components, keyboard support, focus states, and mobile behavior.
- Keep all colors, spacing, typography, borders, and shadows on the existing semantic design tokens.

## Verification

- Check desktop and mobile navigation opening, closing, focus, and every destination.
- Confirm motorcycle/scooter filters still show only parent models and all model-detail controls still work.
- Verify each slider’s bounds, tenure stepping, rate reset/edit behavior, variant switching, and EMI result.
- Check all new pages at desktop and mobile sizes and confirm no browser console or broken-link errors.
