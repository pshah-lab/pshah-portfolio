import type { MetadataRoute } from "next";
import { site } from "@/content/profile";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      // /api/profile is intentionally public: it is a machine-readable profile for agents.
      { userAgent: "*", allow: ["/", "/api/profile"], disallow: ["/api/"] },
    ],
    sitemap: `${site.url}/sitemap.xml`,
  };
}
