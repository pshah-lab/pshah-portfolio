import { renderOg, ogSize } from "@/lib/og";

export const size = ogSize;
export const contentType = "image/png";
export const alt = "Pratham Shah: cloud and full-stack engineer, Pune. Google Cloud Associate Cloud Engineer.";

export default function Image() {
  return renderOg({
    kicker: "Pratham Shah",
    title: "Cloud and full-stack engineer.",
    subtitle: "2026 CS graduate, Pune. Google Cloud Associate Cloud Engineer. Internships at Searce and NeuraMach AI Studios.",
    steps: ["Cloud", "Backend", "Full stack", "FinOps"],
  });
}
