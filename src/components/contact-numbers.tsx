import { Phone } from "lucide-react";
import { SHOWROOM } from "@/lib/showroom";

/** Sales + Workshop numbers as tappable links, for use next to enquiry actions. */
export function ContactNumbers({ className = "" }: { className?: string }) {
  return (
    <p className={`flex flex-wrap items-center gap-x-5 gap-y-1 text-sm text-muted-foreground ${className}`}>
      {SHOWROOM.contacts.map((c) => (
        <a key={c.label} href={`tel:${c.tel}`} className="inline-flex items-center gap-1.5 hover:text-primary">
          <Phone className="size-3.5 text-primary" />
          <span>
            {c.label}: <span className="font-semibold text-foreground">{c.display}</span>
          </span>
        </a>
      ))}
    </p>
  );
}
