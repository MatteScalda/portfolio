"use client";

import { useTranslations } from "next-intl";
import { m } from "motion/react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ParallaxWrapper } from "@/components/ui/ParallaxWrapper";
import { SECTION_IDS, ANIMATION } from "@/lib/constants";

const richTextComponents = {
  highlight: (chunks: React.ReactNode) => (
    <span className="about__highlight">{chunks}</span>
  ),
};

export function AboutSection() {
  const t = useTranslations("About");

  return (
    <section id={SECTION_IDS.about} className="about">
      <SectionHeading label={t("label")} title={t("heading")} />

      <div className="about__grid">
        <m.div
          initial={ANIMATION.fadeInUp.initial}
          whileInView={ANIMATION.fadeInUp.animate}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ ...ANIMATION.fadeInUp.transition, delay: 0.2 }}
        >
          <p className="about__text" style={{ marginBottom: "1.5rem" }}>
            {t.rich("bio1", richTextComponents)}
          </p>
          <p className="about__text">
            {t.rich("bio2", richTextComponents)}
          </p>
        </m.div>

        <ParallaxWrapper offset={15}>
          <m.div
            className="about__code-card"
            initial={ANIMATION.fadeInUp.initial}
            whileInView={ANIMATION.fadeInUp.animate}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ ...ANIMATION.fadeInUp.transition, delay: 0.4 }}
          >
            <div className="about__code-titlebar">
              <span className="about__code-dot about__code-dot--red" />
              <span className="about__code-dot about__code-dot--yellow" />
              <span className="about__code-dot about__code-dot--green" />
              <span className="about__code-filename">matteo.ts</span>
            </div>
            <div className="about__code-body">
              <div>
                <span className="about__code-keyword">const</span>{" "}
                <span className="about__code-variable">matteo</span>{" "}
                <span className="about__code-punctuation">= {"{"}</span>
              </div>
              <div style={{ paddingLeft: "1.5rem" }}>
                <span className="about__code-property">role</span>
                <span className="about__code-punctuation">: </span>
                <span className="about__code-string">
                  &quot;Freelance Web Developer&quot;
                </span>
                <span className="about__code-punctuation">,</span>
              </div>
              <div style={{ paddingLeft: "1.5rem" }}>
                <span className="about__code-property">location</span>
                <span className="about__code-punctuation">: </span>
                <span className="about__code-string">
                  &quot;Italy&quot;
                </span>
                <span className="about__code-punctuation">,</span>
              </div>
              <div style={{ paddingLeft: "1.5rem" }}>
                <span className="about__code-property">languages</span>
                <span className="about__code-punctuation">: [</span>
                <span className="about__code-string">
                  &quot;Italian&quot;
                </span>
                <span className="about__code-punctuation">, </span>
                <span className="about__code-string">
                  &quot;English&quot;
                </span>
                <span className="about__code-punctuation">],</span>
              </div>
              <div style={{ paddingLeft: "1.5rem" }}>
                <span className="about__code-property">coffee</span>
                <span className="about__code-punctuation">: </span>
                <span className="about__code-string">
                  &quot;always&quot;
                </span>
                <span className="about__code-punctuation">,</span>
              </div>
              <div style={{ paddingLeft: "1.5rem" }}>
                <span className="about__code-property">available</span>
                <span className="about__code-punctuation">: </span>
                <span className="about__code-keyword">true</span>
                <span className="about__code-punctuation">,</span>
              </div>
              <div>
                <span className="about__code-punctuation">{"}"};</span>
              </div>
              <div style={{ marginTop: "0.75rem" }}>
                <span className="about__code-comment">
                  {"// Open to new projects!"}
                </span>
              </div>
            </div>
          </m.div>
        </ParallaxWrapper>
      </div>
    </section>
  );
}
