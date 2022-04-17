/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
}

module.exports = {
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"]
    });

    return config;
  },
  images: {
    domains: ['18.221.134.53'],
  },
  nextConfig,
  env: {
    INFURA_ID: 'a5b51678f5c248c5af6c10dc7c5501ea',
    BACKEND_URL: 'https://18.221.134.53/api',
    BACKEND_ASSETS_URL: 'https://18.221.134.53/assets',
    PINATA_API_KEY: '1f8e37ec423bce5ed562',
    PINATA_SECRET_API_KEY: '12bc6c92c377a63574ac6307bff4213da8adf58b604148fb3313018948f1b864',
    TOKEN_URL: '0x194194b1D78172446047e327476B811f5D365c21',
    ETHER_CHAIN: 4, //rinkeby test network, we can chain it to mainnet later
    POLYGON_CHAIN: 8001, //mumbai test network, we can chain it to mainnet later
    TOKEN_ADDR: "0x889E39c7d55562f9acD4Bf21eE3F257B545F2A30",
    MARKET_ADDR: "0x5FbDB2315678afecb367f032d93F642f64180aa3"
  },
}
