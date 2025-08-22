"use client";

import { useTheme } from "@/components/theme-provider";

export default function Blackhole() {
  const { theme } = useTheme();

  // Don't render if not in dark mode
  if (theme !== "dark") {
    return null;
  }

  return (
    <div className="w-full flex justify-center mt-[-200px] relative z-10">
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
