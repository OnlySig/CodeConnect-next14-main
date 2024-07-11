/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        //  domains: [
        //      'raw.githubusercontent.com'
        //  ], essa é a forma "antiga/depreciada" em projetos antigos provavel q esteja esse código e não o remotePatterns
        remotePatterns: [
            {
                protocol: 'https',
                hostname: '*.githubusercontent.com',
                port: '',
                pathname: '**'
            },
            {
                protocol: 'https',
                hostname: '*.public.blob.vercel-storage.com',
                port: '',
                pathname: '**'
            },
        ]
    }
};

export default nextConfig;
