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

  const allowedSlugs = [
    "tv-entertainment",
    "fan",
    "home-appliances",
    "kitchen-appliances",
    "small-appliances",
    "electrical-power",
  ];

  const categories = await fetchApi("/category/getAllCat", "GET");

  const filteredCategories = categories?.categories?.filter((category) =>
    allowedSlugs.includes(category?.slug)
  );

  const productsByCategory = filteredCategories?.map((category) => {
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
