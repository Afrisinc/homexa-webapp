import { NextConfig } from "next";

const nextConfig = {
  experimental: {
    reactCompiler: true,
  },
  ppr: true,
} satisfies NextConfig;

export default nextConfig;
