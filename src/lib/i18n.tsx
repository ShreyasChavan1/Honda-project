import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { MR } from "@/lib/translations-mr";

export type Lang = "en" | "mr";

const STORAGE_KEY = "laxmi-motors-lang";

/**
 * English text is the translation key. `t("Home")` returns the Marathi text when
 * Marathi is selected and the same English text when it is not (or when no
 * Marathi translation exists yet), so a missing translation never breaks a page.
 * Use `{name}` placeholders for dynamic values: t("Honda {name}", { name }).
 */
type Vars = Record<string, string | number>;

// Module-level copy of the active language so plain helper functions (formatPrice,
// categoryLabel) can translate too. Components still re-render via the context.
let currentLang: Lang = "en";

export function translate(text: string, vars?: Vars): string {
  let out = currentLang === "mr" ? (MR[text] ?? text) : text;
  if (vars) {
    for (const [key, value] of Object.entries(vars)) {
      out = out.split(`{${key}}`).join(String(value));
    }
  }
  return out;
}

type I18nValue = {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: (text: string, vars?: Vars) => string;
};

const I18nContext = createContext<I18nValue>({
  lang: "en",
  setLang: () => {},
  t: (text, vars) => translate(text, vars),
});

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");
  currentLang = lang;

  // Read the saved choice after mount so server and browser render the same HTML first.
  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY);
      if (saved === "mr" || saved === "en") setLangState(saved);
    } catch {
      /* storage unavailable — stay on English */
    }
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const setLang = useCallback((next: Lang) => {
    currentLang = next;
    setLangState(next);
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch {
      /* ignore */
    }
  }, []);

  const value = useMemo<I18nValue>(
    () => ({ lang, setLang, t: (text, vars) => translate(text, vars) }),
    [lang, setLang],
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export const useI18n = () => useContext(I18nContext);
