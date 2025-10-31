import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */ images: {
    remotePatterns: [new URL("https://avatars.githubusercontent.com/u/**?v=4")],
  },
};

export default nextConfig;
