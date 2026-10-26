import { NextIntlClientProvider, hasLocale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { MotionProvider } from "@/components/providers/MotionProvider";
import { ParallaxProviderWrapper } from "@/components/providers/ParallaxProviderWrapper";
import { ContactModalProvider } from "@/lib/contact-modal-context";
import { ContactModal } from "@/components/ui/ContactModal";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ScrollProgress } from "@/components/layout/ScrollProgress";
import { Analytics } from "@vercel/analytics/next";
import "../globals.css";
import { getSiteContent } from "@/lib/cms";
import { SiteSettingsProvider } from "@/lib/site-settings-context";
import type { Metadata } from "next";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  setRequestLocale(locale);
  const { settings, seo } = await getSiteContent(locale);
  const image = seo.image?.url ? seo.image : null;

  return {
    title: seo.title,
    description: seo.description,
    metadataBase: new URL(settings.url),
    alternates: {
      canonical: `/${locale}`,
      languages: { en: "/en", it: "/it" },
    },
    openGraph: {
      title: seo.title,
      description: seo.description,
      url: `${settings.url}/${locale}`,
      siteName: settings.name,
      locale: locale === "it" ? "it_IT" : "en_US",
      type: "website",
      images: image ? [{
        url: image.url!,
        width: image.width || undefined,
        height: image.height || undefined,
        alt: image.alt || seo.title,
      }] : undefined,
    },
    twitter: {
      card: image ? "summary_large_image" : "summary",
      title: seo.title,
      description: seo.description,
      images: image?.url ? [image.url] : undefined,
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  const { messages, settings } = await getSiteContent(locale);

  return (
    <html lang={locale} className="dark">
      <body>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <SiteSettingsProvider settings={settings}>
            <MotionProvider>
              <ParallaxProviderWrapper>
                <ContactModalProvider>
                  <ScrollProgress />
                  <Header />
                  <main>{children}</main>
                  <Footer />
                  <ContactModal />
                </ContactModalProvider>
              </ParallaxProviderWrapper>
            </MotionProvider>
          </SiteSettingsProvider>
        </NextIntlClientProvider>
        <Analytics />
      </body>
    </html>
  );
}
