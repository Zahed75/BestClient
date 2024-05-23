import ShowCart from "@/components/cart/ShowCart";
import RelatedCard from "@/components/global/RelatedProducts";
import ShortBrand from "@/components/global/ShortBrand";
import CardProduct from "@/components/productCard/CartProduct";

export default function page() {
  return (
    <main className="container">
      <ShowCart />
      <RelatedCard />
      <ShortBrand />
    </main>
  );
}