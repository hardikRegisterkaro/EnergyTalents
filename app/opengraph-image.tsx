import { ImageResponse } from "next/og";

/**
 * Site-wide Open Graph / social-share image (1200×630). Rendered at build time
 * by next/og. Applies as the default og:image for every route; individual pages
 * can override by exporting their own openGraph.images in metadata.
 */
export const alt =
  "Energy Talents — Technical crewing for the world's most demanding energy projects";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const BADGES = [
  "India-based recruiting",
  "Global deployment",
  "Compliance end to end",
];

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#141210",
          padding: "80px",
          position: "relative",
        }}
      >
        {/* Warm corner glow */}
        <div
          style={{
            position: "absolute",
            top: -180,
            right: -140,
            width: 680,
            height: 680,
            borderRadius: 9999,
            background:
              "radial-gradient(circle, rgba(249,115,22,0.55), rgba(249,115,22,0) 60%)",
            display: "flex",
          }}
        />

        {/* Eyebrow */}
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div
            style={{
              width: 60,
              height: 6,
              background: "linear-gradient(90deg, #f59e0b, #f97316)",
              display: "flex",
            }}
          />
          <div
            style={{
              fontSize: 26,
              letterSpacing: 6,
              color: "#f97316",
              fontWeight: 700,
            }}
          >
            GLOBAL WORKFORCE MOBILIZATION
          </div>
        </div>

        {/* Wordmark + tagline */}
        <div style={{ display: "flex", flexDirection: "column", gap: 26 }}>
          <div
            style={{
              fontSize: 108,
              fontWeight: 800,
              color: "#ffffff",
              lineHeight: 1.0,
              letterSpacing: -3,
            }}
          >
            ENERGY TALENTS
          </div>
          <div
            style={{
              fontSize: 42,
              color: "#d6cfc6",
              lineHeight: 1.25,
              maxWidth: 940,
            }}
          >
            Technical crewing for the world&rsquo;s most demanding energy
            projects.
          </div>
        </div>

        {/* Badges */}
        <div style={{ display: "flex", gap: 44 }}>
          {BADGES.map((t) => (
            <div
              key={t}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                fontSize: 24,
                color: "#a8a29e",
              }}
            >
              <div style={{ width: 10, height: 10, background: "#f97316", display: "flex" }} />
              {t}
            </div>
          ))}
        </div>
      </div>
    ),
    { ...size },
  );
}
