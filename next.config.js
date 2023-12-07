/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.anapolis.go.gov.br",
        port: "",
        pathname: "/img/**",
      },

      {
        protocol: "https",
        hostname: "api.anapolis.go.gov.br",
        port: "",
        pathname: "/apiupload/**",
      },

      {
        protocol: 'https',
        hostname: 'api.anapolis.go.gov.br',
        port: '',
        pathname: '/apieleicaoteste/**',
      },

      {
        protocol: "https",
        hostname: "portaleducacao.anapolis.go.gov.br",
        port: "",
        pathname: "/portal/**",
      },
    ],
  },
  publicRuntimeConfig: {
    // remove private variables from processEnv
    processEnv: Object.fromEntries(
      Object.entries(process.env).filter(([key]) =>
        key.includes("NEXT_PUBLIC_")
      )
    ),
  },
  output: "standalone",
};

module.exports = nextConfig;
