import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "Cross-Origin-Opener-Policy",
            value: "same-origin-allow-popups",
          },
          {
            key: "Cross-Origin-Embedder-Policy",
            value: "unsafe-none", // यह एक्स्ट्रा लेयर है जो गूगल स्क्रिप्ट को खुशी-खुशी चलने देगी
          },
          {
            key: "Cross-Origin-Resource-Policy",
            value: "cross-origin",
          }
        ],
      },
    ];
  },
};

export default nextConfig;