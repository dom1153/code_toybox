/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    // serverActions: true,
  },
  images: {
    // https://raw.githubusercontent.com/AzurAPI/azurapi-js-setup/master/images/skins/001/Default/image.png
    remotePatterns: [
      {
        protocol: "https",
        hostname: "raw.githubusercontent.com",
        port: "",
        pathname: "/AzurAPI/azurapi-js-setup/master/**",
      },
    ],
    unoptimized: true,
  },
}

export default nextConfig
