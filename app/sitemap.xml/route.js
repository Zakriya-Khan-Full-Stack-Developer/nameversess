import { getManifest } from '../../lib/data/names-data.js';

export const dynamic = 'force-dynamic';

export async function GET() {
  const siteUrl = 'https://nameverse.site';
  const manifest = getManifest();

  const chunkSize = 5000;
  const sitemaps = [
    { loc: `${siteUrl}/sitemap/pages.xml` },
  ];

  for (const rel of ['islamic', 'christian', 'hindu', 'italian']) {
    const count = (manifest[rel] || []).length;
    const chunks = Math.ceil(count / chunkSize) || 1;
    if (chunks === 1) {
      sitemaps.push({ loc: `${siteUrl}/sitemap/${rel}.xml` });
    } else {
      for (let i = 1; i <= chunks; i++) {
        sitemaps.push({ loc: `${siteUrl}/sitemap/${rel}-${i}.xml` });
      }
    }
  }

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemaps
  .map(
    (s) => `  <sitemap>
    <loc>${s.loc}</loc>
  </sitemap>`
  )
  .join('\n')}
</sitemapindex>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=86400, s-maxage=86400',
    },
  });
}
