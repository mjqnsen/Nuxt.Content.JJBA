export default defineEventHandler(async (event) => {
  const baseUrl = 'https://janjansen.pages.dev'
  
  // Get current date for lastmod
  const currentDate = new Date().toISOString().split('T')[0]
  
  // Define static pages with their priorities and change frequencies
  const staticPages = [
    {
      loc: '/',
      lastmod: currentDate,
      changefreq: 'weekly',
      priority: '1.0'
    },
    {
      loc: '/over-ons',
      lastmod: currentDate,
      changefreq: 'monthly',
      priority: '0.8'
    },
    {
      loc: '/contact',
      lastmod: currentDate,
      changefreq: 'monthly',
      priority: '0.8'
    },
    {
      loc: '/nieuws',
      lastmod: currentDate,
      changefreq: 'weekly',
      priority: '0.9'
    }
  ]
  
  // Get news articles from content
  const newsArticles: Array<{loc: string, lastmod: string, changefreq: string, priority: string}> = []
  try {
    // Note: In v3, server-side queries need to use the storage layer
    // For now, using empty array - this can be updated when the proper server API is available
    const articles: any[] = []
    
    for (const article of articles) {
      if (article.path && article.path !== '/nieuws') {
        newsArticles.push({
          loc: article.path,
          lastmod: article.date ? new Date(article.date).toISOString().split('T')[0] : currentDate,
          changefreq: 'monthly',
          priority: '0.7'
        })
      }
    }
  } catch (error) {
    console.error('Error fetching news articles for sitemap:', error)
  }
  
  // Combine all URLs
  const allUrls = [...staticPages, ...newsArticles]
  
  // Generate XML sitemap
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allUrls.map(url => `  <url>
    <loc>${baseUrl}${url.loc}</loc>
    <lastmod>${url.lastmod}</lastmod>
    <changefreq>${url.changefreq}</changefreq>
    <priority>${url.priority}</priority>
  </url>`).join('\n')}
</urlset>`

  // Set appropriate headers
  setHeader(event, 'Content-Type', 'application/xml')
  setHeader(event, 'Cache-Control', 's-maxage=86400') // Cache for 24 hours
  
  return sitemap
})
