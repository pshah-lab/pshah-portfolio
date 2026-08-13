import { ImageResponse } from "next/og";

export const runtime = "edge";

export const alt = "Pratham Shah - Full Stack Developer & Cloud Engineer";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "linear-gradient(135deg, #080b10 0%, #0f172a 100%)",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "60px 80px",
          fontFamily: "sans-serif",
          color: "#ffffff",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Subtle decorative grid background */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage:
              "radial-gradient(circle at 25px 25px, rgba(255, 255, 255, 0.08) 2px, transparent 0)",
            backgroundSize: "50px 50px",
            opacity: 0.5,
          }}
        />

        {/* Top bar with branding */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            zIndex: 10,
          }}
        >
          <div
            style={{
              fontSize: 22,
              fontWeight: 700,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "#5eead4",
            }}
          >
            PRATHAM SHAH
          </div>
          <div
            style={{
              fontSize: 18,
              padding: "6px 16px",
              borderRadius: "20px",
              background: "rgba(94, 234, 212, 0.1)",
              border: "1px solid rgba(94, 234, 212, 0.3)",
              color: "#5eead4",
            }}
          >
            pshah.fun
          </div>
        </div>

        {/* Hero title & role summary */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "16px",
            zIndex: 10,
            maxWidth: "950px",
          }}
        >
          <h1
            style={{
              fontSize: 56,
              fontWeight: 800,
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
              color: "#ffffff",
              margin: 0,
            }}
          >
            Full Stack Developer & Cloud Engineer
          </h1>
          <p
            style={{
              fontSize: 24,
              lineHeight: 1.4,
              color: "#94a3b8",
              margin: 0,
            }}
          >
            Building precise web interfaces, serverless AWS/GCP architectures,
            and real-time EEG signal processing tools.
          </p>
        </div>

        {/* Bottom tags */}
        <div
          style={{
            display: "flex",
            gap: "12px",
            zIndex: 10,
          }}
        >
          {["React / Next.js", "Node.js & AWS", "GCP FinOps", "BCI & EEG AI"].map(
            (tag) => (
              <span
                key={tag}
                style={{
                  fontSize: 16,
                  padding: "8px 18px",
                  background: "rgba(255, 255, 255, 0.06)",
                  border: "1px solid rgba(255, 255, 255, 0.12)",
                  borderRadius: "6px",
                  color: "#cbd5e1",
                }}
              >
                {tag}
              </span>
            )
          )}
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
