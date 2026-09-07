"use client";

import React from "react";

/**
 * HomeDotBackground
 * 
 * Recreates the exact dotted background style from the reference image:
 * - Simple, evenly spaced small DOT pattern in a clean regular Cartesian grid.
 * - Soft/pale sky-blue to subtle light lavender/purple gradient across the dots.
 * - Small, thin, low-opacity, evenly distributed dots (28px x 28px grid, ~1.25px radius).
 * - Clean white/off-white canvas.
 * - Scoped strictly to the Home/Landing page.
 */
export const HomeDotBackground: React.FC<{ className?: string }> = ({ className = "" }) => {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 overflow-hidden select-none z-0 ${className}`}
    >
      {/* Fallback layer: soft pale blue dots */}
      <div
        className="w-full h-full"
        style={{
          backgroundImage:
            "radial-gradient(circle at 14px 14px, rgba(96, 165, 250, 0.35) 1.25px, transparent 1.25px)",
          backgroundSize: "28px 28px",
          backgroundPosition: "0 0",
        }}
      />

      {/* Primary gradient-masked layer: soft sky-blue to lavender/purple transition */}
      <div
        className="absolute inset-0 w-full h-full"
        style={{
          background:
            "linear-gradient(135deg, rgba(56, 189, 248, 0.45) 0%, rgba(96, 165, 250, 0.40) 35%, rgba(129, 140, 248, 0.38) 70%, rgba(192, 132, 252, 0.45) 100%)",
          WebkitMaskImage:
            "radial-gradient(circle at 14px 14px, #000 1.25px, transparent 1.25px)",
          maskImage:
            "radial-gradient(circle at 14px 14px, #000 1.25px, transparent 1.25px)",
          WebkitMaskSize: "28px 28px",
          maskSize: "28px 28px",
        }}
      />
    </div>
  );
};
