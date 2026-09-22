import { Link } from "@tanstack/react-router";
import { ArrowRight, CheckCircle2, MessageCircle } from "lucide-react";
import { MobileContactBar } from "@/components/mobile-contact-bar";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { Button } from "@/components/ui/button";
import { SHOWROOM, waLink } from "@/lib/showroom";

type Feature = {
  title: string;
  description: string;
};

export function ProductCategoryPage({
  eyebrow,
  title,
  description,
  image,
  imageAlt,
  features,
  note,
}: {
  eyebrow: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  features: Feature[];
  note: string;
}) {
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
              Designed for your Honda
            </h2>
          </div>
          <div className="mt-9 grid gap-5 md:grid-cols-3">
            {features.map((feature) => (
              <article key={feature.title} className="border-t-2 border-primary pt-5">
                <CheckCircle2 className="size-5 text-primary" />
                <h3 className="mt-4 font-display text-2xl font-bold uppercase">{feature.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {feature.description}
                </p>
              </article>
            ))}
          </div>
          <p className="mt-10 border-l-2 border-primary pl-4 text-sm text-muted-foreground">{note}</p>
        </section>
      </main>
      <SiteFooter />
      <MobileContactBar />
    </div>
  );
}