import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-sqlite'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.run(sql`ALTER TABLE \`site_content_locales\` ADD \`meta_title\` text;`)
  await db.run(sql`ALTER TABLE \`site_content_locales\` ADD \`meta_description\` text;`)
  await db.run(sql`ALTER TABLE \`site_content_locales\` ADD \`meta_image_id\` integer REFERENCES media(id);`)
  await db.run(sql`CREATE INDEX \`site_content_meta_meta_image_idx\` ON \`site_content_locales\` (\`meta_image_id\`,\`_locale\`);`)
  await db.run(sql`UPDATE \`site_content_locales\`
    SET \`meta_title\` = \`metadata_title\`, \`meta_description\` = \`metadata_description\`;`)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.run(sql`UPDATE \`site_content_locales\`
    SET \`metadata_title\` = COALESCE(NULLIF(\`meta_title\`, ''), \`metadata_title\`),
        \`metadata_description\` = COALESCE(NULLIF(\`meta_description\`, ''), \`metadata_description\`);`)
  await db.run(sql`PRAGMA foreign_keys=OFF;`)
  await db.run(sql`CREATE TABLE \`__new_site_content_locales\` (
  	\`metadata_title\` text,
  	\`metadata_description\` text,
  	\`nav_about\` text,
  	\`nav_projects\` text,
  	\`nav_tech_stack\` text,
  	\`nav_contact\` text,
  	\`nav_cta\` text,
  	\`hero_greeting\` text,
  	\`hero_name\` text,
  	\`hero_role\` text,
  	\`hero_tagline\` text,
  	\`hero_cta\` text,
  	\`hero_scroll\` text,
  	\`about_heading\` text,
  	\`about_label\` text,
  	\`about_bio1\` text,
  	\`about_bio2\` text,
  	\`projects_heading\` text,
  	\`projects_label\` text,
  	\`projects_view_project\` text,
  	\`projects_view_code\` text,
  	\`tech_stack_heading\` text,
  	\`tech_stack_label\` text,
  	\`tech_stack_categories_frontend\` text,
  	\`tech_stack_categories_backend\` text,
  	\`tech_stack_categories_tools\` text,
  	\`contact_label\` text,
  	\`contact_headline1\` text,
  	\`contact_headline2\` text,
  	\`contact_badge\` text,
  	\`contact_cta\` text,
  	\`contact_modal_title\` text,
  	\`contact_modal_or\` text,
  	\`contact_modal_call_title\` text,
  	\`contact_modal_call_hours\` text,
  	\`contact_modal_call_cta\` text,
  	\`contact_modal_call_copy\` text,
  	\`contact_modal_call_copied\` text,
  	\`contact_modal_email_title\` text,
  	\`contact_modal_email_cta\` text,
  	\`contact_modal_email_copy\` text,
  	\`contact_modal_email_copied\` text,
  	\`footer_copyright\` text,
  	\`footer_built_with\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`site_content\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`INSERT INTO \`__new_site_content_locales\`("metadata_title", "metadata_description", "nav_about", "nav_projects", "nav_tech_stack", "nav_contact", "nav_cta", "hero_greeting", "hero_name", "hero_role", "hero_tagline", "hero_cta", "hero_scroll", "about_heading", "about_label", "about_bio1", "about_bio2", "projects_heading", "projects_label", "projects_view_project", "projects_view_code", "tech_stack_heading", "tech_stack_label", "tech_stack_categories_frontend", "tech_stack_categories_backend", "tech_stack_categories_tools", "contact_label", "contact_headline1", "contact_headline2", "contact_badge", "contact_cta", "contact_modal_title", "contact_modal_or", "contact_modal_call_title", "contact_modal_call_hours", "contact_modal_call_cta", "contact_modal_call_copy", "contact_modal_call_copied", "contact_modal_email_title", "contact_modal_email_cta", "contact_modal_email_copy", "contact_modal_email_copied", "footer_copyright", "footer_built_with", "id", "_locale", "_parent_id") SELECT "metadata_title", "metadata_description", "nav_about", "nav_projects", "nav_tech_stack", "nav_contact", "nav_cta", "hero_greeting", "hero_name", "hero_role", "hero_tagline", "hero_cta", "hero_scroll", "about_heading", "about_label", "about_bio1", "about_bio2", "projects_heading", "projects_label", "projects_view_project", "projects_view_code", "tech_stack_heading", "tech_stack_label", "tech_stack_categories_frontend", "tech_stack_categories_backend", "tech_stack_categories_tools", "contact_label", "contact_headline1", "contact_headline2", "contact_badge", "contact_cta", "contact_modal_title", "contact_modal_or", "contact_modal_call_title", "contact_modal_call_hours", "contact_modal_call_cta", "contact_modal_call_copy", "contact_modal_call_copied", "contact_modal_email_title", "contact_modal_email_cta", "contact_modal_email_copy", "contact_modal_email_copied", "footer_copyright", "footer_built_with", "id", "_locale", "_parent_id" FROM \`site_content_locales\`;`)
  await db.run(sql`DROP TABLE \`site_content_locales\`;`)
  await db.run(sql`ALTER TABLE \`__new_site_content_locales\` RENAME TO \`site_content_locales\`;`)
  await db.run(sql`PRAGMA foreign_keys=ON;`)
  await db.run(sql`CREATE UNIQUE INDEX \`site_content_locales_locale_parent_id_unique\` ON \`site_content_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`site_content_locales_parent_id_idx\` ON \`site_content_locales\` (\`_parent_id\`);`)
}
