"use client";

import { ReactLenis } from "@studio-freight/react-lenis";

export default function SmoothScroll({ children }: any) {
  return (
    <ReactLenis
      root
      options={{
        SmoothScroll: true,
        lerp: 0.07,
      }}
    >
      {children}
    </ReactLenis>
  );
}
