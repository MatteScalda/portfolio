import path from "node:path";
import type { CollectionConfig } from "payload";
import { authenticated, publicRead } from "../access";

export const Media: CollectionConfig = {
  slug: "media",
  labels: { singular: "Immagine", plural: "Immagini" },
  access: { read: publicRead, create: authenticated, update: authenticated, delete: authenticated },
  upload: {
    // Uploads live on persistent disk at runtime and must not be bundled with the application.
    staticDir: path.resolve(/* turbopackIgnore: true */ process.env.PAYLOAD_MEDIA_DIR || path.join(process.cwd(), "media")),
    mimeTypes: ["image/jpeg", "image/png", "image/webp", "image/avif", "image/gif"],
    imageSizes: [{ name: "thumbnail", width: 1200, height: 800, fit: "inside", withoutEnlargement: true }],
    adminThumbnail: "thumbnail",
  },
  fields: [{ name: "alt", label: "Testo alternativo", type: "text", localized: true, required: true }],
};
