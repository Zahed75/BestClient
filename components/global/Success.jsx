"use client"
import checkMark from "@/public/images/checkmark.png";
import Image from "next/image";
import CardProduct from "../productCard/CartProduct";
import CartProductSuccess from "../productCard/CartProductSuccess";
import Link from "next/link";
import { fetchApi } from "@/utils/FetchApi";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";


export default function Success() {
  const [customer, setCustomer] = useState({});
  const [active, setActive] = useState("orders");
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [orderHistory, setOrderHistory] = useState([]);
  const router = useRouter();
  const discounts = useSelector((state) => state.discount?.discounts) || {};
  const discount = discounts?.discount || 0;
  const cart = useSelector((state) => state.cart.items) || [];
  const orderResponse = useSelector((state) => state.orderResponse);

  console.log("orderResponse", orderResponse);



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
      
     
        
            <div className="my-10 grid grid-cols-1 md:grid-cols-3 justify-between items-between gap-10">
              <div className="bg-[#F8F9FD] p-5 rounded-md shadow-md">
                <h3 className="text-lg font-semibold">Order Summary</h3>
                <div className="my-5">
                  <div className="flex justify-between items-between my-3">
                    <p>Delivery Address</p>
                    <p className="font-semibold">{orderResponse?.deliveryAddress}</p>
                  </div>
                  <div className="flex justify-between items-center my-3">
                    <p>Payment Method</p>
                    <p className="font-semibold">{orderResponse?.paymentMethod}</p>
                  </div>
                  <div className="flex justify-between items-center my-3">
                    <p>Products Price</p>
                    <p className="font-semibold">৳{orderResponse?.subTotal || "00"}</p>
                  </div>
                  <div className="flex justify-between items-center my-3">
                    <p>Vat</p>
                    <p className="font-semibold">5%</p>
                  </div>
                  <div className="border"></div>
                  <div className="flex justify-between items-center my-3">
                    <p>Total (Incl. VAT)</p>
                    <p className="font-semibold">৳{orderResponse?.totalPrice}</p>
                  </div>
                </div>
              </div>
              <div className="col-span-2">
                {orderResponse?.products?.map((product, i) => (
                  <div key={i} className={`flex justify-start items-start gap-5 my-5 ${i !== product?.length - 1 ? 'border-b-2' : ''
                  }`}>
                    <div className="w-[150px] h-[150px]">
                      <Image src={product?.productImage} width={100} height={100} alt="product" />
                    </div>
                    <div className="">
                      <div className="flex justify-between items-start gap-x-10">
                        <h3 className="text-lg font-semibold max-w-[500px]">{product?.productName}</h3>
                        <span className="text-lg font-semibold">৳{product?.salePrice}</span>
                      </div>
                      <div className="my-3">
                        Previous Price: ৳{product?.regularPrice}
                      </div>
                    </div>
                    <div className="border"></div>
                  </div>
                ))}
              </div>
            </div>
        
       


    </section>
  );
}
