import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com'
      },
      {
        protocol: 'https',
        hostname: 'randomuser.me'
      },
      {
        protocol: 'https',
        hostname: 'ik.imagekit.io'
      },
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com'
      },
    ],
  },
};

export default nextConfig;
