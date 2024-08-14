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
      url: `https://www.bestelectronics.com.bd/shop/${slug}`,
      metadataBase: "https://www.bestelectronics.com.bd/",
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

  console.log("product", product);

  const categories = product?.categoryId?.map((category) =>
    fetchApi(`/category/getCategoryById/${category}`, "GET")
  );
  // const category = await fetchApi(
  //   `/category/getCategoryById/${product?.categoryId}`,
  //   "GET"
  // );
  // const categoryName = await category?.category?.categoryName;

  const category = await Promise.all(categories);
  const categoryName = category?.map((cat) => cat?.category?.categoryName);

  console.log("categoryName", categoryName);
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

// export async function generateStaticParams() {
//   const res = await fetchApi(`/product/getAllProducts`, "GET");
//   const products = res?.products;

//   return products.map((product) => ({
//     id: product?._id.toString(),
//   }));
// }
