"use client";

import { useLocale } from "next-intl";
import { useRouter, usePathname } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { cn } from "@/lib/utils";

export function LocaleSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const switchLocale = (newLocale: string) => {
    router.replace(pathname, { locale: newLocale });
  };

  return (
    <div className="locale-switcher">
      {routing.locales.map((loc, i) => (
        <span key={loc} style={{ display: "contents" }}>
          {i > 0 && <span className="locale-switcher__divider" />}
          <button
            className={cn(
              "locale-switcher__btn",
              locale === loc && "locale-switcher__btn--active"
            )}
            onClick={() => switchLocale(loc)}
            aria-label={`Switch to ${loc}`}
          >
            {loc}
          </button>
        </span>
      ))}
    </div>
  );
}
