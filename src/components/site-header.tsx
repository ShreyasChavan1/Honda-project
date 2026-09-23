import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Bike, Droplets, ExternalLink, Film, Menu, PackageOpen, Phone, PlugZap, Wrench, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { SERVICE_LINKS, SHOWROOM, VALUE_ADDED_SERVICES } from "@/lib/showroom";

const PRODUCT_LINKS = [
  { to: "/vehicles", search: { category: "motorcycle" }, label: "Motorcycles", description: "Commuter, performance and premium models", icon: Bike },
  { to: "/vehicles", search: { category: "scooter" }, label: "Scooters", description: "Automatic everyday mobility", icon: Bike },
  { to: "/vehicles", search: { category: "ev" }, label: "EV", description: "Electric scooters and bikes", icon: PlugZap },
  { to: "/products/accessories", label: "Accessories", description: "Model-wise protection, utility and riding gear", icon: PackageOpen },
  { to: "/products/lubes", label: "Genuine Lubes & Chemicals", description: "Engine oils and care products", icon: Droplets },
] as const;

const NAV = [
  { to: "/", label: "Home" },
  { to: "/offers", label: "Offers" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
] as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="hidden bg-ink text-ink-foreground md:block">
        <div className="container-page flex h-9 items-center justify-between text-xs">
          <p className="opacity-80">{SHOWROOM.tagline}</p>
          <div className="flex items-center gap-4">
            <a href={`tel:${SHOWROOM.phone}`} className="hover:text-primary">
              {SHOWROOM.phoneDisplay}
            </a>
            <span className="opacity-40">|</span>
            <span className="opacity-80">{SHOWROOM.hours[0].time} (Mon–Sat)</span>
          </div>
        </div>
      </div>

      <div className="container-page flex h-16 items-center justify-between gap-4">
        <Link to="/" className="flex items-center gap-3" aria-label={`${SHOWROOM.name} home`}>
          <span className="flex h-9 w-9 items-center justify-center rounded-md bg-primary font-display text-lg font-bold text-primary-foreground">
            H
          </span>
          <span className="leading-none">
            <span className="block font-display text-xl font-bold uppercase tracking-wide">
              {SHOWROOM.name}
            </span>
            <span className="block text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
              Two-Wheelers
            </span>
          </span>
        </Link>

        <NavigationMenu className="hidden md:flex" aria-label="Main navigation">
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link to="/" activeOptions={{ exact: true }} activeProps={{ className: "text-primary" }} className="rounded-md px-3 py-2 font-display text-[15px] font-semibold uppercase text-foreground/80 transition-colors hover:text-primary">Home</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuTrigger className="font-display text-[15px] font-semibold uppercase text-foreground/80">Products</NavigationMenuTrigger>
              <NavigationMenuContent>
                <div className="grid w-[620px] grid-cols-2 gap-2 p-4">
                  {PRODUCT_LINKS.map((item) => {
                    const Icon = item.icon;
                    const content = <><span className="mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-md bg-primary/10 text-primary"><Icon className="size-4" /></span><span><span className="block font-display text-sm font-bold uppercase">{item.label}</span><span className="mt-1 block text-xs leading-snug text-muted-foreground">{item.description}</span></span></>;
                    return (
                      <NavigationMenuLink asChild key={item.label}>
                        {"search" in item ? (
                          <Link to="/vehicles" search={item.search} className="group flex gap-3 rounded-md border border-transparent p-3 transition-colors hover:border-border hover:bg-secondary">{content}</Link>
                        ) : (
                          <Link to={item.to} className="group flex gap-3 rounded-md border border-transparent p-3 transition-colors hover:border-border hover:bg-secondary">{content}</Link>
                        )}
                      </NavigationMenuLink>
                    );
                  })}
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuTrigger className="font-display text-[15px] font-semibold uppercase text-foreground/80">Resources</NavigationMenuTrigger>
              <NavigationMenuContent>
                <div className="w-[310px] p-4">
                  <NavigationMenuLink asChild>
  <a href="https://www.honda2wheelersindia.com/video-gallery" target="_blank" rel="noreferrer" className="flex gap-3 rounded-md p-3 transition-colors hover:bg-secondary">
    <span className="flex size-9 shrink-0 items-center justify-center rounded-md bg-primary/10 text-primary"><Film className="size-4" /></span>
    <span><span className="block font-display text-sm font-bold uppercase">Video Gallery</span><span className="mt-1 block text-xs text-muted-foreground">Product films, maintenance and riding tips</span></span>
  </a>
</NavigationMenuLink>
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuTrigger className="font-display text-[15px] font-semibold uppercase text-foreground/80">Services</NavigationMenuTrigger>
              <NavigationMenuContent>
                <div className="w-[340px] p-4">
                  <p className="px-3 pb-2 pt-1 font-display text-xs font-bold uppercase tracking-[0.14em] text-muted-foreground">
                    Value Added Services
                  </p>
                  {VALUE_ADDED_SERVICES.map((item) => (
                    <NavigationMenuLink asChild key={item.label}>
                      <a
                        href={item.href}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center justify-between gap-2 rounded-md px-3 py-2.5 text-sm font-medium transition-colors hover:bg-secondary"
                      >
                        {item.label}
                        <ExternalLink className="size-3.5 shrink-0 text-muted-foreground" />
                      </a>
                    </NavigationMenuLink>
                  ))}
                  <div className="my-2 border-t border-border" />
                  {SERVICE_LINKS.map((item) => (
                    <NavigationMenuLink asChild key={item.label}>
                      <a
                        href={item.href}
                        target="_blank"
                        rel="noreferrer"
                        className="flex gap-3 rounded-md p-3 transition-colors hover:bg-secondary"
                      >
                        <span className="flex size-9 shrink-0 items-center justify-center rounded-md bg-primary/10 text-primary">
                          <Wrench className="size-4" />
                        </span>
                        <span>
                          <span className="flex items-center gap-1.5 font-display text-sm font-bold uppercase">
                            {item.label} <ExternalLink className="size-3.5 text-muted-foreground" />
                          </span>
                          <span className="mt-1 block text-xs text-muted-foreground">Opens on Honda's official site</span>
                        </span>
                      </a>
                    </NavigationMenuLink>
                  ))}
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>
            {NAV.slice(1).map((item) => (
              <NavigationMenuItem key={item.to}>
                <NavigationMenuLink asChild>
                  <Link to={item.to} activeProps={{ className: "text-primary" }} className="rounded-md px-3 py-2 font-display text-[15px] font-semibold uppercase text-foreground/80 transition-colors hover:text-primary">{item.label}</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>

        <div className="hidden md:block">
          <Button asChild>
            <a href={`tel:${SHOWROOM.phone}`}>
              <Phone /> Call Showroom
            </a>
          </Button>
        </div>

        <Button
          type="button"
          onClick={() => setOpen((v) => !v)}
          variant="outline"
          size="icon"
          className="md:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </Button>
      </div>

      {open && (
        <nav className="border-t border-border bg-background md:hidden" aria-label="Mobile navigation">
          <div className="container-page flex flex-col py-2">
            <Link to="/" onClick={() => setOpen(false)} activeOptions={{ exact: true }} activeProps={{ className: "text-primary" }} className="border-b border-border/60 py-3.5 font-display text-lg font-semibold uppercase">Home</Link>
            <p className="pt-4 font-display text-xs font-bold uppercase text-muted-foreground">Products</p>
            {PRODUCT_LINKS.map((item) => "search" in item ? (
              <Link key={item.label} to="/vehicles" search={item.search} onClick={() => setOpen(false)} activeProps={{ className: "text-primary" }} className="border-b border-border/60 py-3 font-display text-base font-semibold uppercase">{item.label}</Link>
            ) : (
              <Link key={item.label} to={item.to} onClick={() => setOpen(false)} activeProps={{ className: "text-primary" }} className="border-b border-border/60 py-3 font-display text-base font-semibold uppercase">{item.label}</Link>
            ))}
            <p className="pt-4 font-display text-xs font-bold uppercase text-muted-foreground">Resources</p>
            <a href="https://www.honda2wheelersindia.com/video-gallery" target="_blank" rel="noreferrer" className="border-b border-border/60 py-3 font-display text-base font-semibold uppercase">Video Gallery</a>
            <p className="pt-4 font-display text-xs font-bold uppercase text-muted-foreground">Services</p>
            <p className="pt-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">Value Added Services</p>
            {VALUE_ADDED_SERVICES.map((item) => (
              <a key={item.label} href={item.href} target="_blank" rel="noreferrer" className="flex items-center justify-between gap-2 border-b border-border/60 py-3 font-display text-base font-semibold uppercase">
                {item.label} <ExternalLink className="size-4 shrink-0 text-muted-foreground" />
              </a>
            ))}
            {SERVICE_LINKS.map((item) => (
              <a key={item.label} href={item.href} target="_blank" rel="noreferrer" className="flex items-center justify-between gap-2 border-b border-border/60 py-3 font-display text-base font-semibold uppercase">
                {item.label} <ExternalLink className="size-4 shrink-0 text-muted-foreground" />
              </a>
            ))}
            {NAV.slice(1).map((item) => (
              <Link key={item.to} to={item.to} onClick={() => setOpen(false)} activeProps={{ className: "text-primary" }} className="border-b border-border/60 py-3.5 font-display text-lg font-semibold uppercase last:border-0">{item.label}</Link>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}
