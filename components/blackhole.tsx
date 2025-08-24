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
    <div className="w-full flex justify-center mt-[-200px]  z-10 object-cover">
      <video
        autoPlay
        loop
        muted
        playsInline
        className=" w-full max-w-4xl h-auto transform rotate-180 bg-transparent"
      >
        <source src="/blackhole.webm" type="video/webm" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
}
