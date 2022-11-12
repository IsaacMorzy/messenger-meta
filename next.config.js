/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  images: {
    domains: ['links.papareact.com','res.cloudinary.com','picsum.photos'],
  },
  experimental: { 
    appDir: true 
  },
}
