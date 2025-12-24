import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
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
