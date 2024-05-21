import RelatedProductCard from "../productCard/RelatedProductCard";

export default function RelatedCard({}) {
  const products = [1, 2, 3, 4];
  return (
    <main>
      <section className="my-5 md:my-10 flex justify-start items-center gap-x-2">
        <div>
          <h4 className="text-[#202435] text-md md:text-xl font-semibold uppercase">
            Related Products
          </h4>
        </div>
      </section>
      <section className="grid grid-cols-2 md:grid-cols-4 justify-evenly items-center gap-2 my-10">
        {products.map((index) => (
          <RelatedProductCard index={index} key={index} />
        ))}
      </section>
    </main>
  );
}
