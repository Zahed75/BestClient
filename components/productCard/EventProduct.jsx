import SectionButton from "../global/SectionButton";
import ProductCard from "./ProductCard";

export default function EventProduct({ event }) {
  const products = [1, 2, 3];
  return (
    <main className="my-5 md:my-10">
      <section className="flex justify-between items-center gap-x-2">
        <div>
          <h4 className="text-[#202435] text-md md:text-xl font-semibold uppercase">
            {event}
          </h4>
          <h4 className="text-[#9B9BB4] text-xs md:text-sm font-semibold">
            Do not miss our best selling products from Washing Machine category.
          </h4>
        </div>
        <SectionButton url="/" />
      </section>
      <section className="grid grid-cols-2 md:grid-cols-3 justify-evenly items-center gap-2 my-10">
        {products.map((index) => (
          <ProductCard index={index} key={index} />
        ))}
      </section>
    </main>
  );
}
