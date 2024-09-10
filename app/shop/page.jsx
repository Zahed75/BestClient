import { fetchApi } from "@/utils/FetchApi";
import Categories from "./Categories";

export const metadata = {
  title: "Categories",
  // title: {
  //   absolute: "SHOP"   only if I don't need template
  // }
  description:
    "Best Electronics is your one-stop shop to get all kinds of electronic and electrical products in Bangladesh.",
};

export default async function Page() {
  const categories = await fetchApi("/category/getAllCat", "GET");

  const productsByCategory = categories?.categories?.map((category) => {
    return {
      ...category,
      products: category.products,
    };
  });

  const publishedProductsArray = productsByCategory?.map((category) => {
    return category.products?.filter(
      (product) => product?.productStatus === "Published"
    );
  });

  const products = publishedProductsArray?.flat();

 
  

  return (
    <main>
      <Categories products={products} AllCategories={productsByCategory} />
    </main>
  );
}
