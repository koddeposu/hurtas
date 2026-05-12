import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  rewrites: () => {
    return [
      {
        source: "/aliveli",
        destination: "/altyapi-elemanlari/item/baca-elemanlari",
      },
    ];
  },
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [320, 480, 560, 640, 768, 1024, 1280],
    imageSizes: [280, 300, 320, 360, 400],
    qualities: [10, 20, 30, 40, 50, 55, 58, 60, 70, 75, 80, 90, 100],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "pub-dedb7d7baa404113b58cbbd099fd1e3f.r2.dev",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "cdn.hurtasbeton.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
