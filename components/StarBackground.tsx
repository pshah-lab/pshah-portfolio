"use client";

import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { useTheme } from "@/components/theme-provider";

const StarBackgroundCanvas = dynamic(
  () => import("@/components/StarBackgroundCanvas"),
  { ssr: false }
) as React.FC;

const StarsCanvas = () => {
  const [mounted, setMounted] = useState(false);
  const { theme } = useTheme();

  useEffect(() => {
    if (typeof window !== "undefined" && window.innerWidth >= 768) {
      setMounted(true);
    }
  }, []);

  if (!mounted || theme !== "dark") return null;

  return <StarBackgroundCanvas />;
};

export default StarsCanvas;
