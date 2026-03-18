import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    qualities: [10, 20, 30, 40, 50, 58, 55, 60, 70, 80, 90, 100],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "pub-61824bcb709049e4a98f0ba994456027.r2.dev",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "cdn.ctprefabrik.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
