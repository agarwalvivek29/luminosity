import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'solace-outputs.s3.ap-south-1.amazonaws.com',
        port: '',
        pathname: '*',
        search: '',
      },
    ],
  },
  /* config options here */
};

export default nextConfig;
