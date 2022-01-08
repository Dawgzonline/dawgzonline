const withPlugins = require("next-compose-plugins");
const withOptimizedImages = require("next-optimized-images");

// next.js configuration
const nextConfig = {
  reactStrictMode: true,
};

module.exports = withPlugins(
  [
    withOptimizedImages({
      handleImages: ["jpeg", "png", "svg"],
    }),
  ],
  nextConfig
);
