import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/prefabrik-evler/tek-katli",
        destination: "/prefabrik-evler/tek-katli-prefabrik-evler",
        permanent: true,
      },
      {
        source: "/prefabrik-evler/cift-katli",
        destination: "/prefabrik-evler/cift-katli-prefabrik-evler",
        permanent: true,
      },
    ];
  },
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [320, 480, 560, 640, 768, 1024, 1280],
    imageSizes: [280, 300, 320, 360, 400],
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
