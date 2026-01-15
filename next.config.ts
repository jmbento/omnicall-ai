import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Ignore TypeScript errors during build (for initial deployment)
  typescript: {
    ignoreBuildErrors: true,
  },
  // Ignore ESLint errors during build
  eslint: {
    ignoreDuringBuilds: true,
  },
  // Explicitly set the project root for Turbopack
  experimental: {
    turbo: {
      root: './',
    },
  },
};

export default nextConfig;
