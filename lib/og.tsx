import { ImageResponse } from "next/og";

export const ogSize = { width: 1200, height: 630 };

type Og = { kicker: string; title: string; subtitle: string; steps?: string[] };

/** Shared Open Graph card: same palette and signal-path motif as the site. */
export function renderOg({ kicker, title, subtitle, steps }: Og) {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px 72px",
          background: "#0F141C",
          color: "#E7EAF0",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 24, color: "#9AA3B2" }}>
          <span>{kicker}</span>
          <span>pshah.fun</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 76, fontWeight: 700, letterSpacing: -2, lineHeight: 1.02 }}>{title}</div>
          <div style={{ marginTop: 20, fontSize: 30, lineHeight: 1.35, color: "#B7BFCC", maxWidth: 980 }}>{subtitle}</div>
        </div>
        {steps && (
          <div style={{ display: "flex", alignItems: "center" }}>
            {steps.map((s, i) => (
              <div key={s} style={{ display: "flex", alignItems: "center" }}>
                <div
                  style={{
                    display: "flex",
                    padding: "10px 16px",
                    border: `2px solid ${i === steps.length - 1 ? "#96A2FF" : "#2A3343"}`,
                    borderRadius: 8,
                    fontSize: 22,
                    color: i === steps.length - 1 ? "#96A2FF" : "#E7EAF0",
                  }}
                >
                  {s}
                </div>
                {i < steps.length - 1 && <div style={{ width: 36, height: 2, background: "#2A3343" }} />}
              </div>
            ))}
          </div>
        )}
      </div>
    ),
    ogSize,
  );
}
