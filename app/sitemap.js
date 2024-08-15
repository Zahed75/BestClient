import { fetchApi } from "@/utils/FetchApi";

export default async function sitemap(req, res) {
  const response = await fetchApi("/product/getProductByproductStatus", "GET");
  const products = response?.products || [];

  const productUrls = products.map((product) => ({
    url: `${process.env.SITE_URL}/shop/${product.productSlug}`,
    lastModified: new Date(product.updatedAt).toISOString(),
  }));

  const staticUrls = [
    {
      url: `${process.env.SITE_URL}`,
      lastModified: new Date().toISOString(),
    },
    {
      url: `${process.env.SITE_URL}/shop`,
      lastModified: new Date().toISOString(),
    },
  ];

  const allUrls = [...staticUrls, ...productUrls];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${allUrls
        .map((url) => {
          return `
          <url>
            <loc>${url.url}</loc>
            <lastmod>${url.lastModified}</lastmod>
          </url>
        `;
        })
        .join("")}
    </urlset>`;

  res.setHeader("Content-Type", "text/xml");
  res.write(sitemap);
  res.end();

  return {
    props: {},  
  };
}
