/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['img.icons8.com'],
        remotePatterns: [
            {
                protocol: 'https',
                hostname: '*.nintendo.com',
            },
        ],
    },
};

export default nextConfig;