/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'github-readme-stats.vercel.app',
      },
      {
        protocol: 'https',
        hostname: 'github-readme-streak-stats.herokuapp.com',
      },
      {
        protocol: 'https',
        hostname: 'github-profile-trophy.vercel.app',
      },
    ],
  },
};

module.exports = nextConfig; 