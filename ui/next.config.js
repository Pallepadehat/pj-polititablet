/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverComponentsExternalPackages: ["@prisma/client", "bcrypt"],
  },
  reactStrictMode: true,
  output: "standalone",
  distDir: "nui",
  images: {
    unoptimized: true,
  },
};

module.exports = nextConfig;
