import type { Field, GlobalConfig } from "payload";
import messages from "../../../messages/en.json";
import { authenticated, publicRead } from "../access";

const labels: Record<string, string> = {
  Metadata: "SEO", Nav: "Navigazione", Hero: "Presentazione", About: "Chi sono",
  Projects: "Sezione progetti", TechStack: "Sezione tecnologie", Contact: "Contatti", Footer: "Footer",
  title: "Titolo", description: "Descrizione", greeting: "Saluto", name: "Nome", role: "Ruolo",
  tagline: "Sottotitolo", cta: "Pulsante", scroll: "Indicatore di scorrimento", heading: "Titolo sezione",
  label: "Etichetta", bio1: "Biografia — primo paragrafo", bio2: "Biografia — secondo paragrafo",
  headline1: "Titolo — prima riga", headline2: "Titolo — seconda riga", badge: "Disponibilità",
};

function messageFields(source: Record<string, unknown>): Field[] {
  return Object.entries(source).filter(([key]) => key !== "items").map(([name, value]): Field =>
    typeof value === "string"
      ? { name, label: labels[name] ?? name, type: "textarea", localized: true,
          admin: name.startsWith("bio") ? { description: "Puoi evidenziare parole con <highlight>testo</highlight>." } : undefined }
      : { name, label: labels[name] ?? name, type: "group", fields: messageFields(value as Record<string, unknown>) },
  );
}

export const SiteContent: GlobalConfig = {
  slug: "site-content",
  label: "Testi del sito",
  access: { read: publicRead, update: authenticated },
  admin: { description: "Seleziona Italiano o English per modificare i testi. Titoli e descrizioni dei singoli progetti si gestiscono in Progetti." },
  fields: [{ type: "tabs", tabs: Object.entries(messages).filter(([name]) => name !== "Metadata").map(([name, value]) => ({
    label: labels[name] ?? name,
    fields: [{ name, label: false, type: "group", fields: messageFields(value) }],
  })) },
  // Keep the original values for migration and fallback, with a single SEO editor visible in the admin.
  { name: "Metadata", label: "Metadati precedenti", type: "group", admin: { hidden: true }, fields: messageFields(messages.Metadata) }],
};
