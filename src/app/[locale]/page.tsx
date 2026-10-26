import { HeroSection } from "@/components/sections/HeroSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { ProjectsSection } from "@/components/sections/ProjectsSection";
import { TechStackSection } from "@/components/sections/TechStackSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { ScrollToTop } from "@/components/ui/ScrollToTop";
import { getSiteContent } from "@/lib/cms";

export const dynamic = "force-dynamic";

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const { projects, technologies } = await getSiteContent(locale);
  return (
    <>
      <HeroSection />
      <AboutSection />
      <ProjectsSection projects={projects} />
      <TechStackSection techStack={technologies} />
      <ContactSection />
      <ScrollToTop />
    </>
  );
}
