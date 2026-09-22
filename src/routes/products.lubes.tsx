import { createFileRoute } from "@tanstack/react-router";
import lubesImage from "@/assets/lubes-chemicals.jpg";
import { ProductCategoryPage } from "@/components/product-category-page";
import { SHOWROOM } from "@/lib/showroom";

const TITLE = `Genuine Lubes & Chemicals — ${SHOWROOM.name}`;
const DESCRIPTION = "Explore demo information about genuine engine oils, lubricants and maintenance chemicals for Honda two-wheelers.";

export const Route = createFileRoute("/products/lubes")({
  head: () => ({ meta: [
    { title: TITLE }, { name: "description", content: DESCRIPTION },
    { property: "og:title", content: TITLE }, { property: "og:description", content: DESCRIPTION },
    { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" },
  ] }),
  component: LubesPage,
});

function LubesPage() {
  return <ProductCategoryPage eyebrow="Care for your Honda" title="Genuine Lubes & Chemicals" description={DESCRIPTION} image={lubesImage} imageAlt="Engine oils and maintenance products in a two-wheeler workshop" features={[
    { title: "Engine oils", description: "Select the recommended grade for smooth performance, protection and dependable daily riding." },
    { title: "Maintenance chemicals", description: "Specialist cleaners, lubricants and care products help protect important parts over time." },
    { title: "Service guidance", description: "Our service team can recommend the right product and replacement interval for your model." },
  ]} note="Demo content for development. Product suitability, pack sizes, specifications and stock will be confirmed by the showroom service team." />;
}