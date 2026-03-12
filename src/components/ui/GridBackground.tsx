"use client";

import { Parallax } from "react-scroll-parallax";

export function GridBackground() {
  return (
    <div className="grid-background">
      <Parallax speed={-10}>
        <div className="grid-background__pattern" />
      </Parallax>
      <div className="grid-background__gradient" />
      <div className="grid-background__vignette" />
    </div>
  );
}
