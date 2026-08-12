"use client";

import { useTheme } from "@/components/theme-provider";
import { useIsMobile } from "@/hooks/use-mobile";

export default function Blackhole() {
  const { theme } = useTheme();
  const isMobile = useIsMobile();

  // Don't render if not in dark mode or on mobile
  if (theme !== "dark" || isMobile) {
    return null;
  }

  return (
    <div className="pointer-events-none absolute inset-x-0 top-0 z-0 -mt-[140px] md:-mt-[165px] lg:-mt-[200px] flex justify-center overflow-hidden opacity-40">
      <video
        autoPlay
        loop
        muted
        playsInline
        className="h-auto w-full max-w-5xl rotate-180 bg-transparent"
      >
        <source src="/blackhole.webm" type="video/webm" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
}
