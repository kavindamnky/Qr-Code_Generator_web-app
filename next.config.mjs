/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ['qr-code-styling'],
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
