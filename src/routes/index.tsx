import { createFileRoute, Link } from "@tanstack/react-router";
import { useI18n } from "@/lib/i18n";
import { useQuery } from "@tanstack/react-query";
import { ArrowRight, BadgePercent, MapPin, Phone, ShieldCheck, Star, Wrench } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { MobileContactBar } from "@/components/mobile-contact-bar";
import { VehicleCard } from "@/components/vehicle-card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { offersQuery, vehiclesQuery } from "@/lib/catalogue";
import { CATEGORIES, SHOWROOM } from "@/lib/showroom";

const TITLE = `${SHOWROOM.name} — Honda Scooters & Motorcycles Showroom`;
const DESCRIPTION =
  "Explore Honda scooters and motorcycles available at our showroom. Check models, variants, prices and live availability, then contact our team.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  const { t } = useI18n();
  const vehicles = useQuery(vehiclesQuery);
  const offers = useQuery(offersQuery);

  const featured = (vehicles.data ?? []).filter((v) => v.is_featured).slice(0, 4);
  const activeOffers = (offers.data ?? []).filter((o) => o.is_active).slice(0, 3);

  return (
    <div className="min-h-screen pb-14 md:pb-0">
      <SiteHeader />

      <main>
        {/* HERO */}
        <section className="relative isolate overflow-hidden bg-ink text-ink-foreground">
          <img
            src="/images/showroom/storefront.jpg"
            alt={t("Laxmi Motors authorised Honda showroom front view")}
            width={1672}
            height={941}
            className="absolute inset-0 h-full w-full object-cover object-center opacity-70"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/85 to-ink/20" />
          <div className="container-page relative flex min-h-[78vh] flex-col justify-center py-20">
            <p className="eyebrow">{t(SHOWROOM.tagline)}</p>
            <h1 className="mt-4 max-w-2xl font-display text-5xl font-bold uppercase leading-[0.95] tracking-tight sm:text-6xl lg:text-7xl">
              {t("Find your perfect Honda two-wheeler")}
            </h1>
            <p className="mt-5 max-w-xl text-base opacity-85 sm:text-lg">
              {t(SHOWROOM.shortDescription)}
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Button asChild size="lg">
                <Link to="/vehicles">
                  {t("Explore Vehicles")} <ArrowRight />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-white/40 bg-transparent text-ink-foreground hover:bg-white/10 hover:text-ink-foreground">
                <Link to="/contact">{t("Contact Us")}</Link>
              </Button>
            </div>
            <dl className="mt-14 grid max-w-2xl grid-cols-2 gap-6 border-t border-white/15 pt-8 sm:grid-cols-4">
              {SHOWROOM.stats.map((stat) => (
                <div key={t(stat.label)}>
                  <dt className="sr-only">{t(stat.label)}</dt>
                  <dd>
                    <span className="block font-display text-3xl font-bold">{t(stat.value)}</span>
                    <span className="mt-1 block text-xs uppercase tracking-[0.12em] opacity-70">
                      {t(stat.label)}
                    </span>
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* FEATURED */}
        <section className="container-page py-16 sm:py-20">
          <SectionHead
            eyebrow="Featured line-up"
            title="Popular models at our showroom"
            action={
              <Button asChild variant="outline">
                <Link to="/vehicles">
                  {t("View all vehicles")} <ArrowRight />
                </Link>
              </Button>
            }
          />
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {vehicles.isLoading &&
              Array.from({ length: 4 }).map((_, i) => (
                <Skeleton key={i} className="h-[26rem] rounded-xl" />
              ))}
            {vehicles.isError && (
              <p className="text-sm text-destructive">
                {t("Could not load vehicles right now. Please refresh the page.")}
              </p>
            )}
            {featured.map((vehicle) => (
              <VehicleCard key={vehicle.id} vehicle={vehicle} />
            ))}
          </div>
        </section>

        {/* CATEGORIES */}
        <section className="bg-secondary py-16 sm:py-20">
          <div className="container-page">
            <SectionHead eyebrow="Browse by category" title="Scooters or motorcycles?" />
            <div className="mt-10 grid gap-6 md:grid-cols-2">
              {CATEGORIES.map((category) => (
                <Link
                  key={category.value}
                  to="/vehicles"
                  search={{ category: category.value }}
                  className="group relative isolate overflow-hidden rounded-2xl bg-ink text-ink-foreground shadow-card"
                >
                  <img
                    src={category.image}
                    alt={t("Honda {label} at the showroom", { label: t(category.label).toLowerCase() })}
                    loading="lazy"
                    width={1200}
                    height={900}
                    className="absolute inset-0 h-full w-full object-cover opacity-55 transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/60 to-transparent" />
                  <div className="relative flex min-h-64 flex-col justify-end p-7">
                    <h3 className="font-display text-3xl font-bold uppercase tracking-wide">
                      {t(category.label)}
                    </h3>
                    <p className="mt-2 max-w-sm text-sm opacity-80">{t(category.description)}</p>
                    <span className="mt-4 inline-flex items-center gap-2 font-display text-sm font-semibold uppercase tracking-wide text-primary">
                      {t("Browse {label}", { label: t(category.label) })} <ArrowRight className="size-4" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* OFFERS */}
        <section className="container-page py-16 sm:py-20">
          <SectionHead
            eyebrow="Current offers"
            title="Running promotions at the showroom"
            action={
              <Button asChild variant="outline">
                <Link to="/offers">
                  {t("All offers")} <ArrowRight />
                </Link>
              </Button>
            }
          />
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {offers.isLoading &&
              Array.from({ length: 3 }).map((_, i) => <Skeleton key={i} className="h-52 rounded-xl" />)}
            {activeOffers.map((offer) => (
              <article
                key={offer.id}
                className="flex flex-col rounded-xl border border-border bg-card p-6 shadow-card"
              >
                <BadgePercent className="size-6 text-primary" />
                <h3 className="mt-4 font-display text-2xl font-bold uppercase tracking-wide">
                  {offer.title}
                </h3>
                <p className="mt-2 line-clamp-3 text-sm text-muted-foreground">{offer.description}</p>
                <p className="mt-4 font-display text-lg font-semibold text-primary">{offer.benefit}</p>
              </article>
            ))}
            {!offers.isLoading && activeOffers.length === 0 && (
              <p className="text-sm text-muted-foreground">
                {t("No offers are running right now. Please check back soon.")}
              </p>
            )}
          </div>
        </section>

        {/* WHY US */}
        <section className="bg-secondary py-16 sm:py-20">
          <div className="container-page">
            <SectionHead eyebrow="Why choose us" title="A dealership that stays with you" />
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {SHOWROOM.whyChooseUs.map((item, index) => (
                <div key={t(item.title)} className="rounded-xl border border-border bg-card p-6">
                  <span className="flex size-10 items-center justify-center rounded-lg bg-accent text-accent-foreground">
                    {[<ShieldCheck key="a" className="size-5" />, <Star key="b" className="size-5" />, <Wrench key="c" className="size-5" />][index % 3]}
                  </span>
                  <h3 className="mt-4 font-display text-xl font-bold uppercase tracking-wide">
                    {t(item.title)}
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground">{t(item.description)}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ABOUT */}
        <section className="container-page grid items-center gap-10 py-16 sm:py-20 lg:grid-cols-2">
          <img
            src="/images/showroom/storefront.jpg"
            alt={t("{name} showroom front view", { name: t(SHOWROOM.name) })}
            loading="lazy"
            width={1672}
            height={941}
            className="rounded-2xl object-cover shadow-card"
          />
          <div>
            <p className="eyebrow">{t("About the showroom")}</p>
            <h2 className="mt-3 font-display text-4xl font-bold uppercase leading-tight tracking-tight">
              {t("{name}, your Honda two-wheeler showroom in Lanja", { name: t(SHOWROOM.name) })}
            </h2>
            <p className="mt-4 text-muted-foreground">{t(SHOWROOM.about.intro)}</p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Button asChild>
                <Link to="/about">
                  {t("About our showroom")} <ArrowRight />
                </Link>
              </Button>
              <Button asChild variant="outline">
                <Link to="/contact">
                  <MapPin /> {t("Find us")}
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* CONTACT CTA */}
        <section className="bg-primary text-primary-foreground">
          <div className="container-page flex flex-col items-start gap-6 py-14 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="font-display text-4xl font-bold uppercase leading-tight tracking-tight">
                {t("Ready for a test ride?")}
              </h2>
              <p className="mt-2 max-w-xl opacity-90">
                {t("Call or message us and we will keep the model you like ready at the showroom.")}
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              {SHOWROOM.contacts.map((c) => (
                <Button key={c.label} asChild size="lg" variant="secondary">
                  <a href={`tel:${c.tel}`}>
                    <Phone /> {t(c.label)}: {c.display}
                  </a>
                </Button>
              ))}
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-white/50 bg-transparent text-primary-foreground hover:bg-white/15 hover:text-primary-foreground"
              >
                <Link to="/contact">{t("Send an enquiry")}</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
      <MobileContactBar />
    </div>
  );
}

function SectionHead({
  eyebrow,
  title,
  action,
}: {
  eyebrow: string;
  title: string;
  action?: React.ReactNode;
}) {
  const { t } = useI18n();
  return (
    <div className="flex flex-wrap items-end justify-between gap-4">
      <div>
        <p className="eyebrow">{t(eyebrow)}</p>
        <h2 className="mt-2 max-w-xl font-display text-4xl font-bold uppercase leading-tight tracking-tight">
          {t(title)}
        </h2>
      </div>
      {action}
    </div>
  );
}
