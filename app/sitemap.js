import { fetchApi } from "@/utils/FetchApi";

export default async function sitemap() {
  const res = await fetchApi("/product/getProductByproductStatus", "GET");
  const products = await res?.products;

  const productUrls = products.map((product) => ({
    url: `${process.env.SITE_URL}/shop/${product.productSlug}`,
    lastModified: new Date(product.updatedAt),
  }));

  return [
    {
      url: `${process.env.SITE_URL}`,
      lastModified: new Date(),
    },
    {
      url: `${process.env.SITE_URL}/shop`,
      lastModified: new Date(),
    },
    ...productUrls,
  ];
}
