import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Pratham Shah - Developer Portfolio",
    short_name: "Pratham Shah",
    description:
      "Portfolio of Pratham Shah, Full Stack Developer & Cloud Engineer specializing in React, Next.js, Node.js, and AI applications.",
    start_url: "/",
    display: "standalone",
    background_color: "#080b10",
    theme_color: "#080b10",
    icons: [
      {
        src: "/logo.jpg",
        sizes: "192x192",
        type: "image/jpeg",
      },
      {
        src: "/logo.jpg",
        sizes: "512x512",
        type: "image/jpeg",
      },
    ],
  };
}
