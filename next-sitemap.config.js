/** @type {import('next-sitemap').IConfig} */
module.exports = {
    siteUrl: 'https://eko-study.vercel.app',
    generateRobotsTxt: true,
    generateIndexSitemap: true,
    changefreq: 'weekly',
    priority: 0.7,
    sitemapSize: 5000,
    trailingSlash: false,
  
    exclude: [
      '/login',
      '/signup',
      '/admin',
      '/dashboard',
      '/profile',
      '/account',
      '/api/*',
      '/verify-email',
      '/reset-password',
      '/forgot-password',
    ],
  
    robotsTxtOptions: {
      policies: [
        {
          userAgent: '*',
          allow: '/',
          disallow: [
            '/login',
            '/signup',
            '/admin',
            '/dashboard',
            '/profile',
            '/account',
            '/api/',
            '/verify-email',
            '/reset-password',
            '/forgot-password',
          ],
        },
      ],
      additionalSitemaps: [
        'https://eko-study.vercel.app/server-sitemap.xml',
      ],
    },
  };
  