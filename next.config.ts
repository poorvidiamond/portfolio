import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: '/resume',
        destination: '/resume.pdf',
        permanent: true,
      },
    ];
  },

};

export default nextConfig;
