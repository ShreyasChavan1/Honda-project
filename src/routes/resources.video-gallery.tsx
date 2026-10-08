import { createFileRoute } from "@tanstack/react-router";
import { useI18n } from "@/lib/i18n";
import { Play, Wrench, ShieldCheck, Sparkles } from "lucide-react";
import videoCover from "@/assets/video-gallery-cover.jpg";
import { MobileContactBar } from "@/components/mobile-contact-bar";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { Button } from "@/components/ui/button";
import { SHOWROOM } from "@/lib/showroom";

const TITLE = `Honda Video Gallery — ${SHOWROOM.name}`;
const DESCRIPTION = "Browse Honda product films, maintenance guides, riding tips and road-safety videos.";
const VIDEOS = [
  { title: "Meet the latest Honda range", category: "Product walkthroughs", icon: Sparkles, description: "A closer look at design, comfort, technology and practical features across the line-up." },
  { title: "Simple care between services", category: "Maintenance guides", icon: Wrench, description: "Everyday checks and care tips that help keep your two-wheeler ready for the road." },
  { title: "Ride prepared, ride safe", category: "Safety & riding tips", icon: ShieldCheck, description: "Responsible riding habits, protective equipment and essential road-awareness guidance." },
];

export const Route = createFileRoute("/resources/video-gallery")({
  head: () => ({ meta: [
    { title: TITLE }, { name: "description", content: DESCRIPTION },
    { property: "og:title", content: TITLE }, { property: "og:description", content: DESCRIPTION },
    { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" },
  ] }),
  component: VideoGalleryPage,
});

function VideoGalleryPage() {
  const { t } = useI18n();
  return (
    <div className="min-h-screen pb-14 md:pb-0">
      <SiteHeader />
      <main>
        <section className="border-b border-border bg-secondary py-12">
          <div className="container-page">
            <p className="eyebrow">{t("Resources")}</p>
            <h1 className="mt-2 font-display text-5xl font-bold uppercase leading-none sm:text-6xl">{t("Video gallery")}</h1>
            <p className="mt-4 max-w-2xl text-muted-foreground">{t(DESCRIPTION)}</p>
          </div>
        </section>
        <section className="container-page py-12 sm:py-16">
          <div className="grid gap-6 lg:grid-cols-3">
            {VIDEOS.map((video, index) => {
              const Icon = video.icon;
              return (
                <article key={t(video.title)} className="overflow-hidden rounded-xl border border-border bg-card shadow-card">
                  <div className="relative aspect-video overflow-hidden bg-ink">
                    <img src={videoCover} alt={t("Motorcyclist riding safely on a scenic road")} loading="lazy" width={1400} height={900} className="h-full w-full object-cover opacity-80" />
                    <span className="absolute inset-0 flex items-center justify-center" aria-hidden="true">
                      <span className="flex size-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-red"><Play className="ml-1 size-6" /></span>
                    </span>
                    <span className="absolute left-4 top-4 rounded-md bg-ink/85 px-3 py-1 font-display text-xs font-semibold uppercase text-ink-foreground">{t("Video {n}", { n: index + 1 })}</span>
                  </div>
                  <div className="p-6">
                    <p className="flex items-center gap-2 text-xs font-semibold uppercase text-primary"><Icon className="size-4" />{t(video.category)}</p>
                    <h2 className="mt-3 font-display text-2xl font-bold uppercase">{t(video.title)}</h2>
                    <p className="mt-2 text-sm text-muted-foreground">{t(video.description)}</p>
                    <Button asChild variant="outline" className="mt-5">
                      <a href="https://www.honda2wheelersindia.com/video-gallery" target="_blank" rel="noreferrer"><Play /> {t("View official gallery")}</a>
                    </Button>
                  </div>
                </article>
              );
            })}
          </div>
        </section>
      </main>
      <SiteFooter />
      <MobileContactBar />
    </div>
  );
}