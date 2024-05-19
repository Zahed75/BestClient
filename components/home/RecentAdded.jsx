import NewProduct from "../productCard/NewProduct";

export default function RecentAdded() {
  return (
    <section className="my-5 md:my-10">
      <div className="border-2 border-[#F16521] rounded-lg grid grid-cols-1 justify-center items-center p-5">
        <NewProduct />
        <NewProduct />
      </div>
    </section>
  );
}
