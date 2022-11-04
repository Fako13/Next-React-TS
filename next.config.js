/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['courses-top.ru']
  },

	webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: [
				{
					loader: '@svgr/webpack',
					options: {
						configFile: '.svgrrc.js',
					}
				}
			],
    });

    return config;
  },
};

module.exports = nextConfig;