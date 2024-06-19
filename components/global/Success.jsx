import checkMark from "@/public/images/checkmark.png";
import Image from "next/image";
import CardProduct from "../productCard/CartProduct";
import CartProductSuccess from "../productCard/CartProductSuccess";
import Link from "next/link";
export default function Success() {
  return (
    <section className="my-10">
      <div className="mt-20">
        <div className="flex justify-center mx-auto">
          <Image src={checkMark} alt="Check Mark" />
        </div>
        <h2 className="text-2xl md:text-5xl text-center py-5">
          Order Placed Successfully!
        </h2>

        <button className="flex justify-center mx-auto px-10 py-3 text-white bg-[#F16521] rounded-md text-sm">
          <Link href="/shop"> Continue Shopping</Link>
        </button>
      </div>
      {/* <div className="mt-36 grid grid-cols-1 md:grid-cols-3 justify-between items-start gap-10">
        <div className="bg-[#F8F9FD] p-5 rounded-md shadow-md">
          <h4 className="text-lg font-semibold">Order summary</h4>
          <div className="my-5">
            <div className="flex justify-between items-start my-5">
              <span className="">Delivery Address</span>
              <span className="font-semibold text-right max-w-44">
                House-01, Road-02, Islampur, Sylhet
              </span>
            </div>
            <div className="flex justify-between items-start my-5">
              <span className="">Payment Method</span>
              <span className="font-semibold text-right">Online</span>
            </div>
            <div className="flex justify-between items-center my-5">
              <span>Products price</span>
              <span className="font-semibold">৳1840</span>
            </div>
            <div className="flex justify-between items-center my-5">
              <span>Delivery</span>
              <span className="font-semibold">৳40</span>
            </div>
            <div className="flex justify-between items-center my-5">
              <span>VAT</span>
              <span className="font-semibold">৳40</span>
            </div>
            <div className="border"></div>
            <div className="flex justify-between items-center my-5">
              <span>Total (Incl. VAT)</span>
              <span className="font-semibold">৳2240</span>
            </div>
          </div>
        </div>
        <div className="md:col-span-2">
          <CartProductSuccess />
          <div className="border my-5"></div>
          <CartProductSuccess />
        </div>
      </div> */}
    </section>
  );
}
