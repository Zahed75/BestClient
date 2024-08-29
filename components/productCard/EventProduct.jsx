import SectionButton from "../global/SectionButton";
import ProductCard from "./ProductCard";

export default function EventProduct({ event }) {
  const { gridName, gridDescription, selectProducts, productColumn } = event;
  return (
    <main className="my-5 md:my-10">
      <section className="flex justify-between items-center gap-x-2">
        <div>
          <h4 className="text-[#202435] text-md md:text-xl font-dosis uppercase">
            {gridName}
          </h4>
          <h4 className="text-[#9B9BB4] text-xs md:text-sm">
            {gridDescription}
          </h4>
        </div>
        <SectionButton url="/" />
      </section>
      <section
        className={`grid grid-cols-2 md:grid-cols-3 lg:grid-cols-${productColumn} justify-evenly items-center gap-2 my-10`}
      >
        {selectProducts?.map((product, index) => (
          <ProductCard product={product} index={index} key={index} />
        ))}
      </section>
    </main>
  );
}
