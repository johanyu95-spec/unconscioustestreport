import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  turbopack: {}, // Required to silence error when using webpack config in Next 16
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },
  /* reactCompiler: true, */
  transpilePackages: ["@react-pdf/renderer"],
  webpack: (config) => {
    config.resolve.alias.canvas = false;
    config.resolve.alias.encoding = false;
    config.resolve.alias.scheduler = require.resolve("scheduler");
    return config;
  },
};

export default nextConfig;
