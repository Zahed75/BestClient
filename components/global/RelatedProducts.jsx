"use client";
import { useDispatch, useSelector } from "react-redux";
import RelatedProductCard from "../productCard/RelatedProductCard";

export default function RelatedCard() {
  const relatedProducts =
    useSelector((state) => state.relatedProducts?.items) || [];

  console.log("relatedProducts", relatedProducts);
  return (
    <main>
      <section className="my-5 md:my-10 flex justify-start items-center gap-x-2">
        <div>
          <h4 className="text-[#202435] text-md md:text-xl font-semibold uppercase">
            {relatedProducts?.length > 0 ? "Related Products" : ""}
          </h4>
        </div>
      </section>
      <section className="grid grid-cols-2 md:grid-cols-4 justify-evenly items-center gap-2 my-10">
        {relatedProducts?.map((product, index) => (
          <RelatedProductCard product={product} key={index} index={index} />
        ))}
      </section>
    </main>
  );
}
