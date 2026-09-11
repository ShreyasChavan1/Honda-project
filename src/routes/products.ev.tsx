import { createFileRoute } from "@tanstack/react-router";
import evImage from "@/assets/ev-showroom.jpg";
import { ProductCategoryPage } from "@/components/product-category-page";
import { SHOWROOM } from "@/lib/showroom";

const TITLE = `Honda EV Range — ${SHOWROOM.name}`;
const DESCRIPTION = "Explore demo information about Honda electric scooters, everyday range, charging and battery solutions.";

export const Route = createFileRoute("/products/ev")({
  head: () => ({ meta: [
    { title: TITLE }, { name: "description", content: DESCRIPTION },
    { property: "og:title", content: TITLE }, { property: "og:description", content: DESCRIPTION },
    { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" },
  ] }),
  component: EvPage,
});

function EvPage() {
  return <ProductCategoryPage eyebrow="Electric mobility" title="Honda EV" description={DESCRIPTION} image={evImage} imageAlt="Red electric scooter displayed in a modern showroom" features={[
    { title: "Electric scooters", description: "Discover city-focused electric mobility designed for smooth, quiet and practical everyday travel." },
    { title: "Battery solutions", description: "Learn about fixed-battery and battery-swapping approaches available across the Honda EV ecosystem." },
    { title: "Connected riding", description: "Explore intelligent displays, charging information and connected features offered on selected models." },
  ]} note="Demo content for development. Models, specifications, prices, range and local availability will be replaced with verified showroom information." />;
}