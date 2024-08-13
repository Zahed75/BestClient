import Shop from "./Shop";

export const metadata = {
  title: "Shop",
  // title: {
  //   absolute: "SHOP"   only if I don't need template
  // }
  description:
    "Best Electronics is your one-stop shop to get all kinds of electronic and electrical products in Bangladesh.",
};

export default async function Page() {
  const products = await fetch(
    `${process.env.NEXT_PUBLIC_API_ENDPOINT}/product/getProductByproductStatus`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
    }
  )
    .then((res) => res.json())
    .then((data) => data.products)
    .catch((error) => console.error(error));

  return (
    <main>
      <Shop products={products} />
    </main>
  );
}
