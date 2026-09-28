import { ImageResponse } from "next/og";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

/** Monogram favicon, generated at build time (replaces a 136 KB WebP served as .ico). */
export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#161A20",
          color: "#EEF0F2",
          fontSize: 34,
          fontWeight: 700,
          letterSpacing: -2,
          borderRadius: 12,
        }}
      >
        PS
        <div style={{ position: "absolute", right: 10, bottom: 12, width: 8, height: 8, borderRadius: 8, background: "#6C7BFF" }} />
      </div>
    ),
    size,
  );
}
