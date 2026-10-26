import type { GlobalConfig } from "payload";
import { SITE } from "../../lib/constants";
import { authenticated, publicRead } from "../access";
import { urlField } from "../fields";

export const SiteSettings: GlobalConfig = {
  slug: "site-settings",
  label: "Impostazioni del sito",
  access: { read: publicRead, update: authenticated },
  fields: [
    { name: "name", label: "Nome", type: "text", required: true, defaultValue: SITE.name },
    { ...urlField("url", "URL del sito", true), defaultValue: SITE.url },
    { name: "email", label: "Email", type: "email", required: true, defaultValue: SITE.email },
    { name: "phone", label: "Telefono visualizzato", type: "text", required: true, defaultValue: SITE.phone },
    { name: "phoneTel", label: "Telefono per chiamate", type: "text", required: true, defaultValue: SITE.phoneTel, validate: (value: unknown) => /^\+?[0-9]{6,15}$/.test(String(value)) || "Usa il prefisso internazionale e solo cifre, ad esempio +393499010793." },
    { ...urlField("github", "GitHub", true), defaultValue: SITE.github },
    { ...urlField("linkedin", "LinkedIn", true), defaultValue: SITE.linkedin },
  ],
};
