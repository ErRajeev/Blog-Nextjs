/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["picsum.photos"], // Add 'picsum.photos' to allowed domains
  },
  async redirects() {
    return [
      {
        source: "/signup",
        destination: "/auth",
        permanent: true,
      },
      {
        source: "/login",
        destination: "/auth",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
