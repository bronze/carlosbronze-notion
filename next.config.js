export default {
  staticPageGenerationTimeout: 300,
  images: {
    remotePatterns: [
      {protocol: 'https', hostname: 'img.notionusercontent.com'},
      {protocol: 'https', hostname: 'www.carlosbronze.com.br'},
      {protocol: 'https', hostname: 'www.notion.so'},
      {protocol: 'https', hostname: 'notion.so'},
      {protocol: 'https', hostname: 'images.unsplash.com'},
      {protocol: 'https', hostname: 'abs.twimg.com'},
      {protocol: 'https', hostname: 'pbs.twimg.com'},
      {protocol: 'https', hostname: 's3.us-west-2.amazonaws.com'}
    ],
    formats: ['image/avif', 'image/webp'],
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;"
  },

  // See https://react-tweet.vercel.app/next#troubleshooting
  transpilePackages: ['react-tweet'],

  async redirects() {
    return [
      {
        source: '/onlyfans',
        destination: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        permanent: false
      },
      {
        source: '/old-blog/:slug',
        destination: '/news/:slug', // Matched parameters can be used in the destination
        permanent: true // Indicates a 308 permanent redirect
      },
      {
        source: '/legacy-page',
        destination: '/new-page',
        permanent: false // Indicates a 307 temporary redirect
      }
    ]
  }
}
