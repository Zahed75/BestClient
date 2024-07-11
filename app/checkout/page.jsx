import CheckOutCart from "@/components/cart/CheckOutCart";
import RelatedCard from "@/components/global/RelatedProducts";
import ShortBrand from "@/components/global/ShortBrand";

export default async function page() {
  return (
    <main className="container">
      <CheckOutCart />
      <RelatedCard />
      <ShortBrand />
    </main>
  );
}


// Path: app/checkout/page.jsx
