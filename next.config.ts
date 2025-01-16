import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  webpack(config, { isServer }) {
    // Add custom handling for video files (like .mp4)
    config.module.rules.push({
      test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)$/i,
      use: [
        {
          loader: 'file-loader',
          options: {
            outputPath: 'static/videos/', // Store videos in the static/videos folder
            publicPath: '/_next/static/videos/', // URL path to the videos
            name: '[name].[hash].[ext]', // Naming convention for video files
          },
        },
      ],
    });
    return config;
  },
};

export default nextConfig;
