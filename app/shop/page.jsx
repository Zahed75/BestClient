
import { fetchApi } from "@/utils/FetchApi";
import Shop from "./Shop";

export default async function Page() {
  const products = await fetchApi("/product/getAllProducts", "GET");
  console.log(products);
  return (
    <main>
      <Shop products={products} />
      {/* <Shop /> */}
    </main>
  );
}
