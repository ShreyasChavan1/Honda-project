import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Bike, Droplets, Film, Menu, PackageOpen, Phone, PlugZap, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { SHOWROOM } from "@/lib/showroom";

const PRODUCT_LINKS = [
  { to: "/vehicles", search: { category: "motorcycle" }, label: "Motorcycles", description: "Commuter, performance and premium models", icon: Bike },
  { to: "/vehicles", search: { category: "scooter" }, label: "Scooters", description: "Automatic everyday mobility", icon: Bike },
  { to: "/products/ev", label: "EV", description: "Electric scooters and battery solutions", icon: PlugZap },
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
                    <Link to="/resources/video-gallery" className="flex gap-3 rounded-md p-3 transition-colors hover:bg-secondary">
                      <span className="flex size-9 shrink-0 items-center justify-center rounded-md bg-primary/10 text-primary"><Film className="size-4" /></span>
                      <span><span className="block font-display text-sm font-bold uppercase">Video Gallery</span><span className="mt-1 block text-xs text-muted-foreground">Product films, maintenance and riding tips</span></span>
                    </Link>
                  </NavigationMenuLink>
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
            <Link to="/resources/video-gallery" onClick={() => setOpen(false)} activeProps={{ className: "text-primary" }} className="border-b border-border/60 py-3 font-display text-base font-semibold uppercase">Video Gallery</Link>
            {NAV.slice(1).map((item) => (
              <Link key={item.to} to={item.to} onClick={() => setOpen(false)} activeProps={{ className: "text-primary" }} className="border-b border-border/60 py-3.5 font-display text-lg font-semibold uppercase last:border-0">{item.label}</Link>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}
