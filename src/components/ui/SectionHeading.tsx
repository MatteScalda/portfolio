"use client";

import { m } from "motion/react";
import { ANIMATION } from "@/lib/constants";

interface SectionHeadingProps {
  label: string;
  title: string;
  center?: boolean;
}

export function SectionHeading({ label, title, center }: SectionHeadingProps) {
  return (
    <m.div
      className="section-heading"
      style={center ? { textAlign: "center" } : undefined}
      initial={ANIMATION.fadeInUp.initial}
      whileInView={ANIMATION.fadeInUp.animate}
      viewport={{ once: true, margin: "-100px" }}
      transition={ANIMATION.fadeInUp.transition}
    >
      <span className="section-heading__label">{label}</span>
      <h2 className="section-heading__title">{title}</h2>
      <span
        className="section-heading__line"
        style={center ? { margin: "1rem auto 0" } : undefined}
      />
    </m.div>
  );
}
