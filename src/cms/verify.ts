import assert from "node:assert/strict";
import { randomBytes } from "node:crypto";
import { getPayload } from "payload";
import config from "../payload.config";

if (process.env.CMS_INTEGRATION_TEST !== "true") {
  throw new Error("Esegui npm run test:cms per usare un database e una cartella immagini temporanei.");
}

const payload = await getPayload({ config });
const forbidden = (error: unknown) => (error as { status?: number }).status === 403;

try {
  const account = await payload.create({ collection: "users", data: {
    email: "cms-test@example.com", password: randomBytes(24).toString("hex"),
  } });
  const user = { ...account, collection: "users" as const };

  await assert.rejects(() => payload.find({ collection: "users", overrideAccess: false }), forbidden);
  await assert.rejects(() => payload.create({ collection: "users", overrideAccess: false, data: {
    email: "unauthorized@example.com", password: randomBytes(24).toString("hex"),
  } }), forbidden);
  await assert.rejects(() => payload.updateGlobal({ slug: "site-settings", overrideAccess: false, data: { name: "Unauthorized" } }), forbidden);

  const media = await payload.create({ collection: "media", locale: "it", overrideAccess: false, user,
    data: { alt: "Anteprima di prova" }, filePath: "public/images/projects/jushin-thumb.png",
  });
  assert.ok(media.url);
  assert.ok(media.sizes?.thumbnail?.url);

  const project = await payload.create({ collection: "projects", locale: "it", overrideAccess: false, user,
    data: { title: "Progetto italiano", slug: "cms-integration-test", description: "Descrizione italiana", thumbnail: media.id, year: 2026, published: false },
  });
  await payload.update({ collection: "projects", id: project.id, locale: "en", overrideAccess: false, user,
    data: { title: "English project", description: "English description" },
  });
  assert.equal((await payload.find({ collection: "projects", overrideAccess: false })).totalDocs, 0);
  assert.equal((await payload.find({ collection: "projects", overrideAccess: false, user })).totalDocs, 1);

  await assert.rejects(() => payload.update({ collection: "projects", id: project.id, overrideAccess: false, data: { published: true } }), forbidden);
  await payload.update({ collection: "projects", id: project.id, overrideAccess: false, user, data: { published: true } });
  const italian = await payload.find({ collection: "projects", locale: "it", overrideAccess: false });
  const english = await payload.find({ collection: "projects", locale: "en", overrideAccess: false });
  assert.equal(italian.docs[0].title, "Progetto italiano");
  assert.equal(english.docs[0].title, "English project");
  assert.equal(english.docs[0].description, "English description");

  await payload.updateGlobal({ slug: "site-content", locale: "it", overrideAccess: false, user, data: { Hero: { name: "Nome italiano" } } });
  await payload.updateGlobal({ slug: "site-content", locale: "en", overrideAccess: false, user, data: { Hero: { name: "English name" } } });
  assert.equal((await payload.findGlobal({ slug: "site-content", locale: "it", overrideAccess: false })).Hero?.name, "Nome italiano");
  assert.equal((await payload.findGlobal({ slug: "site-content", locale: "en", overrideAccess: false })).Hero?.name, "English name");

  await assert.rejects(() => payload.updateGlobal({ slug: "site-content", overrideAccess: false,
    data: { meta: { title: "Unauthorized SEO" } },
  }), forbidden);
  await payload.updateGlobal({ slug: "site-content", locale: "it", overrideAccess: false, user,
    data: { meta: { title: "Titolo SEO italiano", description: "Descrizione SEO italiana", image: media.id } },
  });
  await payload.updateGlobal({ slug: "site-content", locale: "en", overrideAccess: false, user,
    data: { meta: { title: "English SEO title", description: "English SEO description", image: null } },
  });
  const italianSeo = await payload.findGlobal({ slug: "site-content", locale: "it", depth: 1, fallbackLocale: false, overrideAccess: false });
  const englishSeo = await payload.findGlobal({ slug: "site-content", locale: "en", depth: 1, fallbackLocale: false, overrideAccess: false });
  assert.equal(italianSeo.meta?.title, "Titolo SEO italiano");
  assert.equal(englishSeo.meta?.title, "English SEO title");
  assert.equal(italianSeo.meta?.description, "Descrizione SEO italiana");
  assert.equal(englishSeo.meta?.description, "English SEO description");
  assert.equal(typeof italianSeo.meta?.image, "object");
  assert.ok(typeof italianSeo.meta?.image === "object" && italianSeo.meta.image?.url);
  assert.equal(englishSeo.meta?.image, null);

  await payload.updateGlobal({ slug: "site-settings", overrideAccess: false, user, data: { email: "updated@example.com" } });
  assert.equal((await payload.findGlobal({ slug: "site-settings", overrideAccess: false })).email, "updated@example.com");
  await payload.delete({ collection: "projects", id: project.id, overrideAccess: false, user });
  assert.equal((await payload.find({ collection: "projects", overrideAccess: false })).totalDocs, 0);
  payload.logger.info("Verificati accessi, pubblicazione, traduzioni, immagini, SEO e aggiornamento dei contenuti.");
} finally {
  await payload.destroy();
}
