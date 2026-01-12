import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: true,
  images: {
    remotePatterns:[
      { hostname: "images.unsplash.com",
        protocol: "https",
       }
       ,
       {
        hostname: "original-stork-538.convex.cloud"
        ,protocol: "https",
       }

    ]

  }

  /* config options here */
};

export default nextConfig;
