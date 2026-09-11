import { createFileRoute } from "@tanstack/react-router";
import accessoriesImage from "@/assets/accessories.jpg";
import { ProductCategoryPage } from "@/components/product-category-page";
import { SHOWROOM } from "@/lib/showroom";

const TITLE = `Honda Accessories — ${SHOWROOM.name}`;
const DESCRIPTION = "Explore demo information about model-specific Honda two-wheeler accessories, protection and riding essentials.";

export const Route = createFileRoute("/products/accessories")({
  head: () => ({ meta: [
    { title: TITLE }, { name: "description", content: DESCRIPTION },
    { property: "og:title", content: TITLE }, { property: "og:description", content: DESCRIPTION },
    { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" },
  ] }),
  component: AccessoriesPage,
});

function AccessoriesPage() {
  return <ProductCategoryPage eyebrow="Personalise your ride" title="Accessories" description={DESCRIPTION} image={accessoriesImage} imageAlt="A selection of two-wheeler riding and vehicle accessories" features={[
    { title: "Model-wise fitment", description: "Choose accessories designed around the fit, finish and everyday use of individual Honda models." },
    { title: "Protection & utility", description: "Explore guards, covers, storage solutions and practical additions for daily riding." },
    { title: "Riding essentials", description: "Ask our team about helmets, gloves and other essentials for comfort and responsible riding." },
  ]} note="Demo content for development. Product range, compatibility and prices must be confirmed with the showroom before purchase." />;
}