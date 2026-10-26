import type { TextField } from "payload";

export const urlField = (name: string, label: string, required = false): TextField => ({
  name,
  label,
  type: "text",
  required,
  validate: (value: unknown) => {
    if (!value) return required ? "Inserisci un URL." : true;
    try {
      const url = new URL(String(value));
      return ["http:", "https:"].includes(url.protocol) || "Usa un URL http o https.";
    } catch {
      return "Inserisci un URL completo (https://…).";
    }
  },
});
