export default function robots() {
    return {
      rules: {
        userAgent: '*',
        allow: '/',
        disallow: '/private',
      },
      sitemap: `${process.env.SITE_URL}/sitemap.js`,
    }
  }