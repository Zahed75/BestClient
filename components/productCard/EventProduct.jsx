import SectionButton from "../global/SectionButton";
import ProductCard from "./ProductCard";

export default function EventProduct({ event }) {
  const { title, description, url, products } = event;
  return (
    <main className="my-5 md:my-10">
      <section className="flex justify-between items-center gap-x-2">
        <div>
          <h4 className="text-[#202435] text-md md:text-xl font-dosis uppercase">
            {title}
          </h4>
          <h4 className="text-[#9B9BB4] text-xs md:text-sm">{description}</h4>
        </div>
        <SectionButton url={url} />
      </section>
      <section className="grid grid-cols-2 md:grid-cols-4 justify-evenly items-center gap-2 my-10">
        {products?.map((product, index) => (
          <ProductCard product={product} index={index} key={index} />
        ))}
      </section>
    </main>
  );
}
