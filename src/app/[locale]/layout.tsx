import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { MotionProvider } from "@/components/providers/MotionProvider";
import { ParallaxProviderWrapper } from "@/components/providers/ParallaxProviderWrapper";
import { ContactModalProvider } from "@/lib/contact-modal-context";
import { ContactModal } from "@/components/ui/ContactModal";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ScrollProgress } from "@/components/layout/ScrollProgress";
import { SITE } from "@/lib/constants";
import { Analytics } from "@vercel/analytics/next";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "Metadata" });

  return {
    title: t("title"),
    description: t("description"),
    metadataBase: new URL(SITE.url),
    alternates: {
      canonical: `/${locale}`,
      languages: { en: "/en", it: "/it" },
    },
    openGraph: {
      title: t("title"),
      description: t("description"),
      url: `${SITE.url}/${locale}`,
      siteName: SITE.title,
      locale: locale === "it" ? "it_IT" : "en_US",
      type: "website",
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

  const messages = (await import(`../../../messages/${locale}.json`)).default;

  return (
    <html lang={locale} className="dark">
      <body>
        <NextIntlClientProvider locale={locale} messages={messages}>
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
        </NextIntlClientProvider>
        <Analytics />
      </body>
    </html>
  );
}
