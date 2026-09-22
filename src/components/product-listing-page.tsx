import { Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { ArrowRight, MessageCircle } from "lucide-react";
import { AvailabilityBadge } from "@/components/availability-badge";
import { MobileContactBar } from "@/components/mobile-contact-bar";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { productsQuery, type Product } from "@/lib/catalogue";
import { SHOWROOM, formatPrice, waLink } from "@/lib/showroom";

export function ProductListingPage({
  category,
  eyebrow,
  title,
  description,
  image,
  imageAlt,
  note,
}: {
  category: "lubes" | "accessories";
  eyebrow: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  note: string;
}) {
  const { data, isLoading, isError } = useQuery(productsQuery(category));
  const products = data ?? [];

  return (
    <div className="min-h-screen pb-14 md:pb-0">
      <SiteHeader />
      <main>
        <section className="border-b border-border bg-secondary">
          <div className="container-page grid items-center gap-10 py-12 lg:grid-cols-[0.9fr_1.1fr] lg:py-16">
            <div>
              <p className="eyebrow">{eyebrow}</p>
              <h1 className="mt-3 font-display text-5xl font-bold uppercase leading-none sm:text-6xl">
                {title}
              </h1>
              <p className="mt-5 max-w-xl text-base text-muted-foreground sm:text-lg">
                {description}
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button asChild size="lg">
                  <Link to="/contact">
                    Enquire at showroom <ArrowRight />
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline">
                  <a
                    href={waLink(`Hello ${SHOWROOM.name}, I would like to know more about ${title}.`)}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <MessageCircle /> WhatsApp
                  </a>
                </Button>
              </div>
            </div>
            <img
              src={image}
              alt={imageAlt}
              width={1400}
              height={900}
              className="aspect-[14/9] w-full rounded-xl border border-border object-cover shadow-card"
            />
          </div>
        </section>

        <section className="container-page py-14 sm:py-20">
          <div className="max-w-2xl">
            <p className="eyebrow">Explore the range</p>
            <h2 className="mt-2 font-display text-4xl font-bold uppercase leading-tight">
              Available at our showroom
            </h2>
          </div>

          {isLoading && (
            <div className="mt-9 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 3 }).map((_, i) => (
                <Skeleton key={i} className="h-72 rounded-xl" />
              ))}
            </div>
          )}

          {isError && (
            <p className="mt-9 rounded-xl border border-destructive/30 bg-destructive/5 p-6 text-sm text-muted-foreground">
              Could not load products. Please refresh the page.
            </p>
          )}

          {!isLoading && !isError && products.length === 0 && (
            <p className="mt-9 rounded-xl border border-border bg-card p-8 text-sm text-muted-foreground">
              Products will be listed here shortly. Contact us for current availability.
            </p>
          )}

          {products.length > 0 && (
            <div className="mt-9 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}

          <p className="mt-10 border-l-2 border-primary pl-4 text-sm text-muted-foreground">{note}</p>
        </section>
      </main>
      <SiteFooter />
      <MobileContactBar />
    </div>
  );
}

function ProductCard({ product }: { product: Product }) {
  return (
    <article className="flex flex-col overflow-hidden rounded-xl border border-border bg-card shadow-card">
      <div className="aspect-4/3 overflow-hidden bg-secondary">
        {product.image_url ? (
          <img
            src={product.image_url}
            alt={product.name}
            loading="lazy"
            width={1200}
            height={900}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-xs text-muted-foreground">
            Image coming soon
          </div>
        )}
      </div>
      <div className="flex flex-1 flex-col gap-2 p-5">
        <h3 className="font-display text-xl font-bold uppercase leading-tight">{product.name}</h3>
        <AvailabilityBadge available={product.is_available} className="self-start" />
        <p className="line-clamp-2 text-sm text-muted-foreground">{product.short_description}</p>
        <div className="mt-auto flex items-end justify-between gap-3 pt-2">
          <p className="font-display text-lg font-bold">{formatPrice(product.price)}</p>
          <Button asChild size="sm" variant="outline">
            <a
              href={waLink(`Hello ${SHOWROOM.name}, I would like to know more about ${product.name}.`)}
              target="_blank"
              rel="noreferrer"
            >
              Enquire
            </a>
          </Button>
        </div>
      </div>
    </article>
  );
}
