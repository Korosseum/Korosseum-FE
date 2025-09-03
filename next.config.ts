import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/back-end/:path*", // /api/로 시작하는 모든 요청을
        destination: "http://192.168.1.162:4000/:path*", // NestJS 서버로 전달
      },
    ];
  },
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "picsum.photos",
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
      {
        protocol: "https",
        hostname: "korosseum.s3.ap-northeast-2.amazonaws.com",
      },
    ],
    domains: ["localhost"],
  },
  turbopack: {
    // Example: adding an alias and custom file extension
    resolveAlias: {
      underscore: "lodash",
    },
    resolveExtensions: [".mdx", ".tsx", ".ts", ".jsx", ".js", ".json"],
  },
};

export default nextConfig;
