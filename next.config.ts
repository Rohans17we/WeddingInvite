import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",          // static export → /out folder → Firebase Hosting
  trailingSlash: true,       // ensures clean URLs on Firebase
  images: {
    unoptimized: true,       // required for static export
  },
};

export default nextConfig;
