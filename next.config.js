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
        protocol: 'https',
        hostname: 'api.anapolis.go.gov.br',
        port: '',
        pathname: '/apiupload/**',
      },
      {
        protocol: 'https',
        hostname: 'portaleducacao.anapolis.go.gov.br',
        port: '',
        pathname: '/portal/**',
      },
    ],
  },
};

module.exports = nextConfig;
