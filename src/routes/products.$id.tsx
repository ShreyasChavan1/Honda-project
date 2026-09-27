import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft, MessageCircle } from "lucide-react";
import { AvailabilityBadge } from "@/components/availability-badge";
import { MobileContactBar } from "@/components/mobile-contact-bar";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { productQuery } from "@/lib/catalogue";
import { SHOWROOM, formatPrice, waLink } from "@/lib/showroom";

export const Route = createFileRoute("/products/$id")({
  head: () => ({
    meta: [{ title: `Product — ${SHOWROOM.name}` }],
  }),
  component: ProductDetailPage,
});

function ProductDetailPage() {
  const { id } = Route.useParams();
  const { data: product, isLoading, isError } = useQuery(productQuery(id));

  if (isLoading) {
    return (
      <div className="min-h-screen">
        <SiteHeader />
        <main className="container-page py-14">
          <Skeleton className="h-[420px] w-full rounded-xl" />
        </main>
        <SiteFooter />
      </div>
    );
  }

  if (isError || !product) {
    return (
      <div className="min-h-screen">
        <SiteHeader />
        <main className="container-page py-20 text-center">
          <h1 className="font-display text-4xl font-bold uppercase">Product not found</h1>
          <p className="mt-3 text-muted-foreground">This product may have been removed or is no longer available.</p>
          <Button asChild className="mt-6">
            <Link to="/products/lubes">
              <ArrowLeft /> Back to products
            </Link>
          </Button>
        </main>
        <SiteFooter />
      </div>
    );
  }

  const images = [product.image_url, ...product.gallery].filter(Boolean);
  const categoryPath = productCategoryPath(product.category);

  return (
    <div className="min-h-screen pb-14 md:pb-0">
      <SiteHeader />
      <main>
        <section className="border-b border-border bg-secondary">
          <div className="container-page py-8 sm:py-10">
            <Link to={categoryPath} className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary">
              <ArrowLeft className="h-4 w-4" />
              Back to {product.category === "lubes" ? "Genuine Lubes & Chemicals" : "Accessories"}
            </Link>

            <div className="mt-8 grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
              <div>
                <div className="overflow-hidden rounded-xl border border-border bg-card shadow-card">
                  {images[0] ? (
                    <img src={images[0]} alt={product.name} className="aspect-[4/3] h-full w-full object-cover" />
                  ) : (
                    <div className="flex aspect-[4/3] items-center justify-center bg-background text-sm text-muted-foreground">
                      Image coming soon
                    </div>
                  )}
                </div>

                {images.length > 1 && (
                  <div className="mt-4 grid grid-cols-4 gap-3">
                    {images.slice(0, 4).map((image, index) => (
                      <img
                        key={`${image}-${index}`}
                        src={image}
                        alt={`${product.name} ${index + 1}`}
                        className="aspect-square w-full rounded-lg border border-border object-cover"
                      />
                    ))}
                  </div>
                )}
              </div>

              <div>
                <p className="eyebrow">{product.category === "lubes" ? "Genuine Lubes & Chemicals" : "Accessories"}</p>
                <h1 className="mt-3 font-display text-5xl font-bold uppercase leading-none sm:text-6xl">{product.name}</h1>
                <div className="mt-5">
                  <AvailabilityBadge available={product.is_available} />
                </div>
                {product.price != null && <p className="mt-6 font-display text-3xl font-bold">{formatPrice(product.price)}</p>}
                <p className="mt-5 text-base leading-7 text-muted-foreground">{product.description || product.short_description}</p>

                <div className="mt-8 flex flex-wrap gap-3">
                  <Button asChild size="lg">
                    <Link to="/contact">
                      Enquire at showroom
                    </Link>
                  </Button>
                  <Button asChild size="lg" variant="outline">
                    <a href={waLink(`Hello ${SHOWROOM.name}, I would like to know more about ${product.name}.`)} target="_blank" rel="noreferrer">
                      <MessageCircle /> WhatsApp
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
      <MobileContactBar />
    </div>
  );
}

function productCategoryPath(category: "lubes" | "accessories") {
  return category === "lubes" ? "/products/lubes" : "/products/accessories";
}
