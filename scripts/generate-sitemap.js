const fs = require('fs');
const path = require('path');

// Define your website URL
const siteUrl = 'https://debugtools.org';

// Define the list of pages and tools
const pages = [
  { url: '/', changefreq: 'weekly', priority: 1.0 },
  { url: '/tools/', changefreq: 'weekly', priority: 0.9 },
  { url: '/tools/all/', changefreq: 'weekly', priority: 0.9 },
  { url: '/tools/json/', changefreq: 'monthly', priority: 0.8 },
  { url: '/tools/jwt/', changefreq: 'monthly', priority: 0.8 },
  { url: '/tools/hash/', changefreq: 'monthly', priority: 0.8 },
  { url: '/tools/base64/', changefreq: 'monthly', priority: 0.8 },
  { url: '/tools/api/', changefreq: 'monthly', priority: 0.8 },
  { url: '/tools/regex/', changefreq: 'monthly', priority: 0.8 },
  { url: '/tools/color/', changefreq: 'monthly', priority: 0.8 },
  { url: '/tools/icons/', changefreq: 'monthly', priority: 0.8 },
  { url: '/tools/http-status/', changefreq: 'monthly', priority: 0.8 },
  { url: '/tools/code-diff/', changefreq: 'monthly', priority: 0.8 },
  { url: '/tools/css/', changefreq: 'monthly', priority: 0.8 },
  { url: '/tools/html/', changefreq: 'monthly', priority: 0.8 },
  { url: '/tools/markdown/', changefreq: 'monthly', priority: 0.8 },
  { url: '/tools/crash-beautifier/', changefreq: 'monthly', priority: 0.8 },
  { url: '/tools/build-diff/', changefreq: 'monthly', priority: 0.8 },
  { url: '/tools/bundle-analyzer/', changefreq: 'monthly', priority: 0.8 },
  { url: '/tools/database/', changefreq: 'monthly', priority: 0.8 },
  { url: '/tools/startup-profiling/', changefreq: 'monthly', priority: 0.8 },
  { url: '/tools/uuid/', changefreq: 'monthly', priority: 0.8 },
  { url: '/tools/url/', changefreq: 'monthly', priority: 0.8 },
  { url: '/tools/timestamp/', changefreq: 'monthly', priority: 0.8 },
  // Policy and legal pages
  { url: '/faq/', changefreq: 'monthly', priority: 0.7 },
  { url: '/privacy-policy/', changefreq: 'monthly', priority: 0.6 },
  { url: '/terms-of-service/', changefreq: 'monthly', priority: 0.6 },
  { url: '/cookie-policy/', changefreq: 'monthly', priority: 0.6 },
  { url: '/contact/', changefreq: 'monthly', priority: 0.7 },
  { url: '/about/', changefreq: 'monthly', priority: 0.7 },
  { url: '/answers/', changefreq: 'weekly', priority: 0.7 },
  { url: '/answers/best-free-json-formatter/', changefreq: 'monthly', priority: 0.6 },
  { url: '/answers/how-to-decode-jwt-safely/', changefreq: 'monthly', priority: 0.6 },
  { url: '/answers/base64-encode-vs-decode/', changefreq: 'monthly', priority: 0.6 },
  { url: '/answers/test-api-request-online/', changefreq: 'monthly', priority: 0.6 },
  { url: '/answers/compare-two-code-snippets/', changefreq: 'monthly', priority: 0.6 },
  { url: '/cli/', changefreq: 'weekly', priority: 0.7 },
  { url: '/roadmap/', changefreq: 'weekly', priority: 0.7 },
  { url: '/releases/', changefreq: 'weekly', priority: 0.7 },
  // Add more tools as they are added to your application
];

// Get current date in YYYY-MM-DD format for lastmod
const currentDate = new Date().toISOString().split('T')[0];

// Generate sitemap XML content
const sitemapContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages.map(page => `  <url>
    <loc>${siteUrl}${page.url}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

// Write sitemap to public directory
fs.writeFileSync(path.join(__dirname, '../public/sitemap.xml'), sitemapContent);

console.log('Sitemap generated successfully!');
