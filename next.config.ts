import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      new URL("https://picsum.photos/**"),
      new URL("https://lh3.googleusercontent.com/**"),
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
