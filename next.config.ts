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
        hostname: "cool-cormorant-507.convex.cloud"
        ,protocol: "https",
       }

    ]

  }

  /* config options here */
};

export default nextConfig;
