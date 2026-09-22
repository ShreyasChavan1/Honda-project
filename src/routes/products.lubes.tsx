import { createFileRoute } from "@tanstack/react-router";
import lubesImage from "@/assets/lubes-chemicals.jpg";
import { ProductListingPage } from "@/components/product-listing-page";
import { SHOWROOM } from "@/lib/showroom";

const TITLE = `Genuine Lubes & Chemicals — ${SHOWROOM.name}`;
const DESCRIPTION = "Genuine engine oils, lubricants and maintenance chemicals for Honda two-wheelers, managed by our showroom team.";

export const Route = createFileRoute("/products/lubes")({
  head: () => ({ meta: [
    { title: TITLE }, { name: "description", content: DESCRIPTION },
    { property: "og:title", content: TITLE }, { property: "og:description", content: DESCRIPTION },
    { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" },
  ] }),
  component: LubesPage,
});

function LubesPage() {
  return (
    <ProductListingPage
      category="lubes"
      eyebrow="Care for your Honda"
      title="Genuine Lubes & Chemicals"
      description={DESCRIPTION}
      image={lubesImage}
      imageAlt="Engine oils and maintenance products in a two-wheeler workshop"
      note="Product suitability, pack sizes and stock will be confirmed by the showroom service team."
    />
  );
}