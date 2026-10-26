import type { CollectionConfig } from "payload";
import { authenticated } from "../access";

export const Users: CollectionConfig = {
  slug: "users",
  labels: { singular: "Amministratore", plural: "Amministratori" },
  auth: true,
  admin: { useAsTitle: "email" },
  access: {
    read: authenticated,
    create: authenticated,
    update: authenticated,
    delete: authenticated,
  },
  fields: [{ name: "name", label: "Nome", type: "text" }],
};
