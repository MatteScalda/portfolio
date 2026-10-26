"use client";

import { createContext, useContext } from "react";
import { SITE } from "./constants";

export type SiteSettings = { [K in keyof typeof SITE]: string };
const SiteSettingsContext = createContext<SiteSettings>(SITE);

export function SiteSettingsProvider({ settings, children }: { settings: SiteSettings; children: React.ReactNode }) {
  return <SiteSettingsContext.Provider value={settings}>{children}</SiteSettingsContext.Provider>;
}

export const useSiteSettings = () => useContext(SiteSettingsContext);
