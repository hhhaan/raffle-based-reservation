/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['k.kakaocdn.net'],
    },
    async rewrites() {
        return [
            {
                source: '/graphql',
                destination: `${process.env.NEXT_PUBLIC_SUPABASE_URL}/graphql`,
            },
        ];
    },
};
module.exports = nextConfig;
