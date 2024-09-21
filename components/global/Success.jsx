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
  const customerInfo = JSON.parse(localStorage.getItem("customer") || "{}");

  const vatPercentage = 5;
  const totalProductPrice = Array.isArray(cart)
    ? cart.reduce((acc, item) => {
      const price =
        discount > 0 ? item.general.regularPrice : item.general.salePrice;
      return acc + price * item.quantity;
    }, 0)
    : 0;

  const totalPrice = totalProductPrice - discount;



  useEffect(() => {
    const fetchOrderHistory = async () => {
      const storedCustomer = localStorage.getItem("customer");
      const customerId = storedCustomer
        ? JSON.parse(storedCustomer).userId
        : "";
      if (!customerId || customerId === "") {
        router.push("");
      } else {
        try {
          const res = await fetchApi(
            `/order/order-history/${customerId}`,
            "GET"
          );

          setOrderHistory(res?.data);

        } catch (error) {
          console.error("Error fetching order history:", error);
        }
      }
    };

    fetchOrderHistory();
  }, []);

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
      <div className="my-10 grid grid-cols-1 md:grid-cols-3 justify-between items-between gap-10">
        <div className="bg-[#F8F9FD] p-5 rounded-md shadow-md">
          <h3 className="text-lg font-semibold">Order summary</h3>
          {/* {cart?.length > 0 ? ( */}
          <div className="my-5">
            <div className="flex justify-between items-between my-3">
              <p>Delivery Address</p>
              <p className="font-semibold">{customerInfo?.billingInfo?.fullAddress || ""}</p>

            </div>
            <div className="flex justify-between items-center my-3">
              <p>Payment Method</p>
              {/* <p className="font-semibold">৳{totalProductPrice.toFixed(2)}</p> */}
              <p className="font-semibold">Online</p>
            </div>
            <div className="flex justify-between items-center my-3">
              <p>Products price</p>
              <p className="font-semibold">৳{totalProductPrice.toFixed(2)}</p>
            </div>
            <div className="flex justify-between it/ems-center my-3">
              <p>Delivery</p>
              {/* <p className="font-semibold">৳{totalProductPrice.toFixed(2)}</p> */}
              {/* <p className="font-semibold">৳100</p> */}
            </div>
            <div className="flex justify-between items-center my-3">
              <p>VAT</p>
              <p className="font-semibold">{vatPercentage}%</p>
            </div>
            <div className="border"></div>
            <div className="flex justify-between items-center my-3">
              <p>Total (Incl. VAT)</p>
              {cart && <p className="font-semibold">৳{totalPrice}</p>}
              {/* } */}
            </div>
          </div>
          {/* ) : ( */}

          {/* )} */}
        </div>
        <div className="col-span-2">
          {cart?.map((product) => (
            <div className="flex justify-start items-start gap-5">
              <div className="w-[150px] h-[150px] ">
                <Image src={product?.productImage} width={100} height={100} alt="product" />
              </div>
              <div className="">
                <div className="flex justify-between items-start gap-x-10">
                  <h3 className="text-lg font-semibold max-w-[500px]">{product?.productName}</h3>
                  {/* <h3 className="text-lg font-semibold max-w-[500px]">product Name</h3> */}
                  <span className="text-lg font-semibold">৳{product?.general?.salePrice}</span>
                  {/* <span className="text-lg font-semibold">৳ product Price</span> */}
                </div>
                <div className="my-3">
                  Previous Price : ৳ {product?.general?.regularPrice}
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
