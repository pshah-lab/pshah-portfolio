import type { MetadataRoute } from "next";
import { profile } from "@/content/profile";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${profile.name}, ${profile.shortRole}`,
    short_name: profile.name,
    description: profile.tagline,
    start_url: "/",
    display: "browser",
    background_color: "#EEF0F2",
    theme_color: "#EEF0F2",
    icons: [
      { src: "/icon", sizes: "64x64", type: "image/png" },
      { src: "/apple-icon", sizes: "180x180", type: "image/png" },
    ],
  };
}
