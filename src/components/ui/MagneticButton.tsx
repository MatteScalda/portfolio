"use client";

import { useRef, useState, useCallback } from "react";
import { m } from "motion/react";

interface MagneticButtonProps {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  className?: string;
}

export function MagneticButton({
  children,
  href,
  onClick,
  className = "",
}: MagneticButtonProps) {
  const refA = useRef<HTMLAnchorElement>(null);
  const refB = useRef<HTMLButtonElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      const el = (refA.current ?? refB.current) as HTMLElement | null;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      setPosition({
        x: (e.clientX - centerX) * 0.15,
        y: (e.clientY - centerY) * 0.15,
      });
    },
    []
  );

  const handleMouseLeave = useCallback(() => {
    setPosition({ x: 0, y: 0 });
  }, []);

  const sharedProps = {
    className: `magnetic-button ${className}`,
    onMouseMove: handleMouseMove as React.MouseEventHandler<HTMLElement>,
    onMouseLeave: handleMouseLeave,
    animate: { x: position.x, y: position.y },
    transition: { type: "spring", stiffness: 150, damping: 15, mass: 0.1 },
  };

  if (onClick) {
    return (
      <m.button
        ref={refB}
        type="button"
        {...sharedProps}
        onMouseMove={handleMouseMove as React.MouseEventHandler<HTMLButtonElement>}
        onClick={onClick}
      >
        {children}
      </m.button>
    );
  }

  return (
    <m.a
      ref={refA}
      href={href}
      {...sharedProps}
      onMouseMove={handleMouseMove as React.MouseEventHandler<HTMLAnchorElement>}
    >
      {children}
    </m.a>
  );
}
