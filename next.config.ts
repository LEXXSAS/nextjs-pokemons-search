import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: false,
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'i.pravatar.cc',
        port: '',
        pathname: '/*',
      },
      {
        protocol: 'https',
        hostname: 'raw.githubusercontent.com',
        port: '',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'https://lh3.googleusercontent.com/a/',
        port: '',
        pathname: '*',
      },
      {
        protocol: 'https',
        hostname: 'https://lh3.googleusercontent.com/a',
        port: '',
        pathname: '/*',
      },
    ],
  },
};
// https://lh3.googleusercontent.com/a/ACg8ocJ19iys9RvzVxBPeqEi0_p7uhoMO9YVYXl6jYkcFyMVJT98xAdO=s96-c
export default nextConfig;
