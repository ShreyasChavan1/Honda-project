import { MessageCircle, Phone } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { SHOWROOM, waLink } from "@/lib/showroom";

/** Sticky call / WhatsApp actions — mobile only. */
export function MobileContactBar() {
  const { t } = useI18n();
  return (
    <div className="fixed inset-x-0 bottom-0 z-50 grid grid-cols-3 border-t border-border bg-background/95 backdrop-blur md:hidden">
      {SHOWROOM.contacts.map((c) => (
        <a
          key={c.label}
          href={`tel:${c.tel}`}
          aria-label={t("Call {label} {number}", { label: t(c.label), number: c.display })}
          className="flex min-h-14 flex-col items-center justify-center font-display text-sm font-semibold uppercase leading-tight tracking-wide text-foreground"
        >
          <span className="flex items-center gap-1.5">
            <Phone className="size-3.5 text-primary" /> {t(c.label)}
          </span>
          <span className="text-[11px] font-medium normal-case tracking-normal text-muted-foreground">{c.display}</span>
        </a>
      ))}
      <a
        href={waLink(`Hello ${SHOWROOM.name}, I have an enquiry about a Honda two-wheeler.`)}
        target="_blank"
        rel="noreferrer"
        className="flex min-h-14 items-center justify-center gap-1.5 bg-primary font-display text-sm font-semibold uppercase tracking-wide text-primary-foreground"
      >
        <MessageCircle className="size-4" /> WhatsApp
      </a>
    </div>
  );
}
