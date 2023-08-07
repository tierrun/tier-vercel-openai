// We ignore point 4 at https://env.t3.gg/docs/nextjs as env.mjs is now env.js
// env.mjs was renamed to env.js to remove any error caused while importing this to other modules in the project
// import "./src/env.mjs";

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["avatars.githubusercontent.com"],
  },
  experimental: {
    serverActions: true,
    serverComponentsExternalPackages: ["@prisma/client"],
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
