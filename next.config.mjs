/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Link",
            value:
              '</llms.txt>; rel="author"; type="text/markdown", </llms-full.txt>; rel="alternate"; type="text/markdown", </api/profile>; rel="service"; type="application/json"',
          },
          {
            key: "X-LLM-Context",
            value: "https://pshah.fun/llms.txt",
          },
        ],
      },
    ];
  },
}

export default nextConfig
