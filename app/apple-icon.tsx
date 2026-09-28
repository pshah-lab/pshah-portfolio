import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
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
          fontSize: 88,
          fontWeight: 700,
          letterSpacing: -4,
        }}
      >
        PS
      </div>
    ),
    size,
  );
}
