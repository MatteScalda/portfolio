"use client";

import { m } from "motion/react";

interface AnimatedTextProps {
  text: string;
  className?: string;
  delay?: number;
  as?: "h1" | "h2" | "h3" | "p" | "span";
}

export function AnimatedText({
  text,
  className = "",
  delay = 0,
  as: Tag = "span",
}: AnimatedTextProps) {
  return (
    <m.span
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.6,
        delay,
        ease: [0.25, 0.1, 0.25, 1],
      }}
      style={{ display: "block" }}
    >
      <Tag className={className}>{text}</Tag>
    </m.span>
  );
}
