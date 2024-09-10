/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["picsum.photos"], // Add 'picsum.photos' to allowed domains
  },
  async redirects() {
    return [
      {
        source: "/signup",
        destination: "/login",
        permanent: true,
        // statusCode: 301,
      },
    ];
  },
};

export default nextConfig;
