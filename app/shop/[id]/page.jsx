import SingleProduct from "@/components/SingleProduct/SingleProduct";
import Skeleton from "@/components/global/Skeleton";
import { fetchApi } from "@/utils/FetchApi";

export async function generateMetadata({ params, searchParams }) {
  const id = params.id;
  const res = await fetchApi(`/product/getProductById/${id}`, "GET");
  const product = await res?.data;
  return {
    title: product?.seo?.productTitle,
    description: product?.seo?.prodDescription,
  };
}

export default async function Page({ params }) {
  const id = params.id;
  const res = await fetchApi(`/product/getProductById/${id}`, "GET");
  const product = await res?.data;
  const category = await fetchApi(
    `/category/getCategoryById/${product?.categoryId}`,
    "GET"
  );
  const categoryName = await category?.category?.categoryName;

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

export async function generateStaticParams() {
  const res = await fetchApi(`/product/getAllProducts`, "GET");
  const products = res?.products;

  return products.map((product) => ({
    id: product?._id.toString(),
  }));
}
