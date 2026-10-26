import path from "node:path";
import { getPayload } from "payload";
import config from "../payload.config";
import { projects } from "../data/projects";
import { techStack } from "../data/techStack";
import it from "../../messages/it.json";
import en from "../../messages/en.json";

const payload = await getPayload({ config });

try {
  // Never overwrite content edited in the CMS when this script is run again.
  for (const [locale, messages] of [["it", it], ["en", en]] as const) {
    const current = await payload.findGlobal({ slug: "site-content", locale, fallbackLocale: false });
    if (!current.Hero?.name) {
      const { heading, label, viewProject, viewCode } = messages.Projects;
      const projectSection = { heading, label, viewProject, viewCode };
      await payload.updateGlobal({ slug: "site-content", locale, data: {
        ...messages, Projects: projectSection,
        meta: { title: messages.Metadata.title, description: messages.Metadata.description },
      } });
      payload.logger.info(`Testi importati: ${locale}`);
    }
  }

  for (const [sortOrder, project] of projects.entries()) {
    const existing = await payload.find({ collection: "projects", where: { slug: { equals: project.slug } }, limit: 1 });
    if (existing.totalDocs) continue;
    const copy = it.Projects.items[project.id as keyof typeof it.Projects.items];
    const englishCopy = en.Projects.items[project.id as keyof typeof en.Projects.items];
    const filename = path.basename(project.thumbnail);
    const existingMedia = await payload.find({ collection: "media", where: { filename: { equals: filename } }, limit: 1 });
    const media = existingMedia.docs[0] ?? await payload.create({
      collection: "media", locale: "it", data: { alt: copy.title },
      filePath: path.resolve(process.cwd(), "public", project.thumbnail.slice(1)),
    });
    await payload.update({ collection: "media", id: media.id, locale: "en", data: { alt: englishCopy.title } });
    const created = await payload.create({
      collection: "projects", locale: "it",
      data: {
        slug: project.slug, year: project.year, featured: project.featured,
        liveUrl: project.liveUrl, repoUrl: project.repoUrl, ...copy,
        thumbnail: media.id, techStack: project.techStack.map((name) => ({ name })), published: true, sortOrder,
      },
    });
    await payload.update({ collection: "projects", id: created.id, locale: "en", data: englishCopy });
    payload.logger.info(`Progetto importato: ${copy.title}`);
  }

  for (const [sortOrder, technology] of techStack.entries()) {
    const existing = await payload.find({ collection: "technologies", where: { name: { equals: technology.name } }, limit: 1 });
    if (!existing.totalDocs) await payload.create({ collection: "technologies", data: { ...technology, sortOrder } });
  }
  payload.logger.info("Importazione completata. Apri /admin per creare il tuo account.");
} finally {
  await payload.destroy();
}
