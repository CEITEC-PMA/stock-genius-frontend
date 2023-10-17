/** @type {import('next').NextConfig} */
const nextConfig = {
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
        hostname: "portaleducacao.anapolis.go.gov.br",
        port: "",
        pathname: "/portal/wp-content/uploads/2021/04/**",
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
  experimental: {
    appDir: true,
  },
};

module.exports = nextConfig;
