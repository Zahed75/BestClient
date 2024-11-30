import SingleProduct from "@/components/SingleProduct/SingleProduct";
import Skeleton from "@/components/global/Skeleton";
import { fetchApi } from "@/utils/FetchApi";

export async function generateMetadata({ params, searchParams }) {
  const { slug } = params;
  const res = await fetchApi(`/product/getProductBySlugHandler/${slug}`, "GET");
  const product = await res?.product;
  return {
    title: product?.seo?.productTitle,
    description: product?.seo?.prodDescription,
    openGraph: {
      title: product?.seo?.productTitle,
      description: product?.seo?.prodDescription,
      type: "website",
      locale: "en_BD",
      url: `${process.env.SITE_URL}/shop/${slug}`,
      metadataBase: `${process.env.SITE_URL}`,
      siteName: "Best Electronic",
      images: [
        {
          url: product?.productImage,
        },
      ],
    },
  };
}

export default async function Page({ params }) {
  const { slug } = params;
  const res = await fetchApi(`/product/getProductBySlugHandler/${slug}`, "GET");
  const product = await res?.product;

  const categories = product?.categoryId?.map((category) =>
    fetchApi(`/category/getCategoryById/${category}`, "GET")
  );


  const category = await Promise.all(categories);
  const categoryName = category?.map((cat) => cat?.category);




  return (
    <>
      {product ? (
        <SingleProduct product={product} categoryName={categoryName} />
      ) : (
        <Skeleton />
      )}
    </>
  );
}

