import { cn } from "@/lib/utils";
import { useI18n, type Lang } from "@/lib/i18n";

const OPTIONS: { value: Lang; label: string; full: string }[] = [
  { value: "en", label: "EN", full: "English" },
  { value: "mr", label: "मराठी", full: "मराठी" },
];

/** Small English / Marathi toggle. `tone="dark"` is for the black top bar. */
export function LanguageSwitcher({
  tone = "light",
  className,
}: {
  tone?: "light" | "dark";
  className?: string;
}) {
  const { lang, setLang } = useI18n();

  return (
    <div
      role="group"
      aria-label="Language"
      className={cn(
        "inline-flex items-center overflow-hidden rounded-full border text-xs font-semibold",
        tone === "dark" ? "border-white/30" : "border-border bg-card",
        className,
      )}
    >
      {OPTIONS.map((option) => {
        const active = lang === option.value;
        return (
          <button
            key={option.value}
            type="button"
            lang={option.value}
            title={option.full}
            aria-pressed={active}
            onClick={() => setLang(option.value)}
            className={cn(
              "px-2.5 py-1 leading-none transition-colors",
              active
                ? "bg-primary text-primary-foreground"
                : tone === "dark"
                  ? "text-ink-foreground/80 hover:text-ink-foreground"
                  : "text-foreground/70 hover:text-primary",
            )}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}
