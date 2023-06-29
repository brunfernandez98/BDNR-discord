/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    dirs: ['src'],
  },
  experimental: {
    appDir: true,
  },
  reactStrictMode: true,
  swcMinify: true,

  images: {
    domains: ['rb.gy', 'discord.com'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3000],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    loader: 'default',
  },

  // SVGR
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: [
        {
          loader: '@svgr/webpack',
          options: {
            typescript: true,
            icon: true,
          },
        },
      ],
    });

    return config;
  },
};

module.exports = nextConfig;
