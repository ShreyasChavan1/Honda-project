import { createFileRoute } from "@tanstack/react-router";
import accessoriesImage from "@/assets/accessories.jpg";
import { ProductListingPage } from "@/components/product-listing-page";
import { SHOWROOM } from "@/lib/showroom";

const TITLE = `Honda Accessories — ${SHOWROOM.name}`;
const DESCRIPTION = "Model-specific Honda two-wheeler accessories, protection and riding essentials, managed by our showroom team.";

export const Route = createFileRoute("/products/accessories")({
  head: () => ({ meta: [
    { title: TITLE }, { name: "description", content: DESCRIPTION },
    { property: "og:title", content: TITLE }, { property: "og:description", content: DESCRIPTION },
    { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" },
  ] }),
  component: AccessoriesPage,
});

function AccessoriesPage() {
  return (
    <ProductListingPage
      category="accessories"
      eyebrow="Personalise your ride"
      title="Accessories"
      description={DESCRIPTION}
      image={accessoriesImage}
      imageAlt="A selection of two-wheeler riding and vehicle accessories"
      note="Product range, compatibility and prices must be confirmed with the showroom before purchase."
    />
  );
}