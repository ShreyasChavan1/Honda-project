import { createFileRoute, Link } from "@tanstack/react-router";
import { useI18n } from "@/lib/i18n";
import { ArrowRight, MapPin, Phone } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { MobileContactBar } from "@/components/mobile-contact-bar";
import { Button } from "@/components/ui/button";
import { HeroSlider } from "@/components/hero-slider";
import { SHOWROOM } from "@/lib/showroom";

const SLIDES = [
  { src: "/images/showroom/slide-1.jpg", alt: "Scooters and motorcycles on display at Laxmi Motors" },
  { src: "/images/showroom/slide-2.jpg", alt: "Honda motorcycle display floor at Laxmi Motors" },
  { src: "/images/showroom/slide-3.jpg", alt: "Workshop office and reception at Laxmi Motors" },
  { src: "/images/showroom/slide-4.jpg", alt: "Laxmi Motors showroom" },
];

const TITLE = `About ${SHOWROOM.name} — Honda Two-Wheeler Dealership`;
const DESCRIPTION = `Learn about ${SHOWROOM.name}, an authorized Honda two-wheeler showroom near Rest House, Lanja.`;

export const Route = createFileRoute("/about")({
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
  component: AboutPage,
});

function AboutPage() {
  const { t } = useI18n();
  return (
    <div className="min-h-screen pb-14 md:pb-0">
      <SiteHeader />

      <main>
        <section className="border-b border-border bg-secondary py-12">
  <div className="container-page grid w-full items-center gap-10 lg:grid-cols-2">
    <div>
    <p className="eyebrow">{t("About our showroom")}</p>

    <h1 className="mt-2 font-display text-4xl font-bold uppercase leading-tight tracking-tight sm:text-5xl">
      {t("Your Honda two-wheeler showroom in Lanja")}
    </h1>

    <p className="mt-3 whitespace-pre-line text-muted-foreground">
  {[t("Laxmi Motors is an authorized Honda two-wheeler showroom located near Rest House in Lanja, Ratnagiri, serving customers from Lanja and surrounding areas. We offer a wide range of Honda motorcycles and scooters, helping customers choose a vehicle that suits their daily commute, family needs and lifestyle."), t("Along with vehicle sales, we provide support for service, genuine spare parts, insurance and exchange facilities, making it convenient for customers to manage their two-wheeler needs in one place. Our experienced staff focuses on providing helpful guidance, clear information and a smooth buying experience from selecting a model to taking it home."), t("At Laxmi Motors, we aim to build lasting customer relationships through dependable service and support before and after every purchase.")].join("\n\n")}
</p>
    </div>
    <HeroSlider slides={SLIDES.map((s) => ({ ...s, alt: t(s.alt) }))} variant="card" />
  </div>
</section>

        <section className="container-page grid items-start gap-10 py-14 lg:grid-cols-2">
          <img
            src="/images/showroom/storefront.jpg"
            alt={t("{name} showroom front view", { name: t(SHOWROOM.name) })}
            loading="lazy"
            width={1672}
            height={941}
            className="rounded-2xl object-cover shadow-card"
          />
          <div className="space-y-8">
            <div>
              <h2 className="font-display text-3xl font-bold uppercase tracking-wide">{t("About Laxmi Motors")}</h2>
              <p className="mt-3 text-muted-foreground">{t("From choosing your Honda to keeping it running smoothly, Laxmi Motors provides support throughout your ownership journey. Our showroom brings together vehicle sales, servicing, genuine spare parts, insurance and exchange facilities, giving customers convenient access to essential two-wheeler services in one place.")}</p>
            </div>
            <div>
              <h2 className="font-display text-3xl font-bold uppercase tracking-wide">{t("Our facilities")}</h2>
              <p className="mt-3 text-muted-foreground">{t("Sales, service, spare parts, insurance and exchange facilities are available for Honda two-wheelers.")}</p>
            </div>
            <dl className="grid grid-cols-2 gap-6 border-t border-border pt-6">
              {SHOWROOM.stats.map((stat) => (
                <div key={t(stat.label)}>
                  <dt className="sr-only">{t(stat.label)}</dt>
                  <dd>
                    <span className="block font-display text-3xl font-bold text-primary">{t(stat.value)}</span>
                    <span className="mt-1 block text-xs uppercase tracking-[0.12em] text-muted-foreground">{t(stat.label)}</span>
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        <section className="bg-secondary py-14">
          <div className="container-page">
            <p className="eyebrow">{t("Why choose us")}</p>
            <h2 className="mt-2 font-display text-4xl font-bold uppercase tracking-tight">
              {t("What you get when you buy from us")}
            </h2>
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {SHOWROOM.whyChooseUs.map((item) => (
                <div key={t(item.title)} className="rounded-xl border border-border bg-card p-6">
                  <h3 className="font-display text-xl font-bold uppercase tracking-wide">
                    {t(item.title)}
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground">{t(item.description)}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="container-page py-14">
          <div className="flex flex-col items-start gap-6 rounded-2xl bg-ink p-8 text-ink-foreground sm:p-12 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="font-display text-3xl font-bold uppercase tracking-wide">
                {t("Visit us this week")}
              </h2>
              <address className="mt-2 not-italic opacity-80">
                {SHOWROOM.addressLines.map((l) => t(l)).join(", ")}
              </address>
            </div>
            <div className="flex flex-wrap gap-3">
              {SHOWROOM.contacts.map((c) => (
                <Button key={c.label} asChild size="lg">
                  <a href={`tel:${c.tel}`}>
                    <Phone /> {t(c.label)}: {c.display}
                  </a>
                </Button>
              ))}
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-white/40 bg-transparent text-ink-foreground hover:bg-white/10 hover:text-ink-foreground"
              >
                <Link to="/contact">
                  <MapPin /> {t("Directions & enquiry")} <ArrowRight />
                </Link>
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
