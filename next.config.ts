import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
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
