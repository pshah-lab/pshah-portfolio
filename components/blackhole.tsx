"use client";

import { useEffect, useState } from "react";
import { useTheme } from "@/components/theme-provider";
import { useIsMobile } from "@/hooks/use-mobile";

export default function Blackhole() {
  const [mounted, setMounted] = useState(false);
  const { theme } = useTheme();
  const isMobile = useIsMobile();

  useEffect(() => {
    setMounted(true);
  }, []);

  // Don't render if not mounted, not in dark mode, or on mobile
  if (!mounted || theme !== "dark" || isMobile) {
    return null;
  }

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-x-0 top-0 z-0 -mt-[140px] md:-mt-[165px] lg:-mt-[200px] flex justify-center overflow-hidden opacity-40"
    >
      <video
        autoPlay
        loop
        muted
        playsInline
        preload="metadata"
        className="h-auto w-full max-w-5xl rotate-180 bg-transparent"
      >
        <source src="/blackhole.webm" type="video/webm" />
      </video>
    </div>
  );
}
