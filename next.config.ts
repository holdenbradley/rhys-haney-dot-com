import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Next handles the local /images/* tree with the built-in optimizer.
    // When Rhys moves to a CDN, add `remotePatterns` here.
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 60 * 60 * 24 * 30, // 30 days
  },
  experimental: {
    optimizePackageImports: ["lucide-react"],
  },
};

export default nextConfig;
