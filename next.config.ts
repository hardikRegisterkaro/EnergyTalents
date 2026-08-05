import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Don't advertise the framework in an X-Powered-By response header.
  poweredByHeader: false,
  // Catch unsafe lifecycles / double-invoke side effects in development.
  reactStrictMode: true,
  images: {
    // Serve AVIF first (smallest), then WebP, falling back to the original.
    formats: ["image/avif", "image/webp"],
    // Our image sources are content-stable (renamed when they change), so let
    // the optimizer cache each generated variant for 31 days instead of the
    // short default — fewer re-optimizations, faster repeat loads.
    minimumCacheTTL: 2678400,
  },
};

export default nextConfig;
