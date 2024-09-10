"use client";
import { useEffect, useState } from "react";
import CartProductSuccess from "../productCard/CartProductSuccess";

import Image from "next/image";
import useImgBBUpload from "@/utils/useImgBBUpload";
import { useRouter } from "next/navigation";
import { fetchApi } from "@/utils/FetchApi";

export default function OrderInfo() {
  const [isLoading, setIsLoading] = useState(false);
  const [customerImage, setCustomerImage] = useState("");
  const [customer, setCustomer] = useState({});
  const [active, setActive] = useState("orders");
  const [openModal, setOpenModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [orderHistory, setOrderHistory] = useState([]);

  const { error, handleUpload, imageUrl, uploading } = useImgBBUpload();
  const router = useRouter();

  useEffect(() => {
    const storedCustomer = localStorage.getItem("customer");
    const customerId = storedCustomer ? JSON.parse(storedCustomer).userId : "";
    if (!customerId || customerId === "") {
      router.push("/mobilesignin");
    } else {
      const fetchData = async () => {
        try {
          const data = await fetchApi(`/customer/info/${customerId}`, "GET");
          setCustomer(data?.customerInfo);
          setCustomerImage(data?.customerInfo?.profilePicture);
        } catch (error) {
          console.error("Error fetching product data:", error);
        }
      };

      fetchData();
    }
  }, []);
  useEffect(() => {
    const fetchOrderHistory = async () => {
      const storedCustomer = localStorage.getItem("customer");
      const customerId = storedCustomer
        ? JSON.parse(storedCustomer).userId
        : "";
      if (!customerId || customerId === "") {
        router.push("/mobilesignin");
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

  const handleOrderClick = (order) => {
    setSelectedOrder(order);
    setOpenModal(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("customer");
    router.push("/");
  };

  const formedDate = (date) => {
    const d = new Date(date);
    return d.toDateString();
  };

  const handleGotoOrders = () => {
    router.push("/my-account/orders");
  };

  const handleGotoWishlist = () => {
    router.push("/my-account/wishlist");
  };

  const handleGotoPersonal = () => {
    router.push("/my-account");
  };

  return (
    <section className="bg-[#F4F4F4]">
      <div className="bg-white shadow-md p-5 my-10 rounded-md">
        <div className="flex justify-start items-center uppercase text-slate-500 text-xs">
          <div
            onClick={handleGotoPersonal}
            className={`cursor-pointer inline-block px-5 py-2 rounded-md duration-700 ${
              active === "personal" ? "bg-[#F16521] text-white shadow-md" : ""
            }`}
          >
            personal
          </div>
          <div
            onClick={handleGotoOrders}
            className={`cursor-pointer inline-block px-5 py-2 rounded-md duration-700 ${
              active === "orders" ? "bg-[#F16521] text-white shadow-md" : ""
            }`}
          >
            Orders
          </div>
          <div
            onClick={handleGotoWishlist}
            className={`cursor-pointer inline-block px-5 py-2 rounded-md duration-700 ${
              active === "wishlist" ? "bg-[#F16521] text-white shadow-md" : ""
            }`}
          >
            Wishlist
          </div>
          <button
            onClick={handleLogout}
            className="uppercase bg-[#F16521] text-white px-5 py-2 rounded-md ml-auto"
          >
            LogOut
          </button>
        </div>
        <div
          className={`grid grid-cols-1 justify-between items-start gap-5 w-full my-10 
        ${active === "orders" ? "block" : "hidden"} 
        `}
        >
          {orderHistory
            ?.slice()
            .reverse()
            .map((order, index) => (
              <div
                key={index}
                className="w-full p-5 shadow-md rounded-md border "
              >
                <div className="grid grid-cols-1 md:grid-cols-5 justify-between items-center">
                  <div>
                    <span className="text-slate-400">Order</span>
                    <p className="text-[#F16521]">{order?.orderId}</p>
                  </div>
                  <div>
                    <span className="text-slate-400">Date</span>
                    <p className="">{formedDate(order?.date)}</p>
                  </div>
                  <div>
                    <span className="text-slate-400">Status</span>
                    <p className="">{order?.status}</p>
                  </div>
                  <div>
                    <span className="text-slate-400">Total</span>
                    <p className="">
                      ৳ {order?.total} for {order?.products?.length} item
                    </p>
                  </div>
                  <div>
                    <button
                      type="button"
                      onClick={() => handleOrderClick(order)}
                      className="bg-[#F16521] text-white px-3 py-1 rounded-md"
                    >
                      View
                    </button>
                  </div>
                </div>
                <div className="my-10">
                  {order?.products?.map((product, index) => (
                    <CartProductSuccess key={index} product={product} />
                  ))}
                </div>
              </div>
            ))}
        </div>
      </div>
      {/* Modal */}
      {selectedOrder && (
        <div
          className={`fixed inset-0 z-50 flex justify-center items-center bg-black bg-opacity-50 ${
            openModal ? "block" : "hidden"
          }`}
        >
          <div className="bg-white p-5 rounded-md relative w-11/12 sm:w-3/4 md:w-1/2 lg:w-2/3">
            <div className="flex justify-between items-center">
              <button
                onClick={() => setOpenModal(false)}
                className="text-md font-bold text-[#F26522] flex flex-col items-center justify-center w-7 h-7 rounded-full bg-gray-100 hover:bg-gray-200 duration-700 ml-auto absolute right-1 top-1"
              >
                X
              </button>
            </div>
            <div className="text-md my-5">
              Order{" "}
              <span className="text-[#F26522]">#{selectedOrder.orderId}</span>{" "}
              was placed on
              {` ${formedDate(selectedOrder.date)} `}and is currently{" "}
              <span className="text-[#F26522]">{selectedOrder.status}</span>.
            </div>
            <h1 className="font-semibold my-5">Order details</h1>
            <div>
              <div className="overflow-x-auto">
                <table className="w-full p-6 text-xs sm:text-sm md:text-base text-left whitespace-nowrap">
                  <thead>
                    <tr className="dark:bg-gray-300">
                      <th className="p-3">Product</th>
                      <th className="p-3">Total</th>
                    </tr>
                  </thead>
                  <tbody className="border-b dark:bg-gray-50 dark:border-gray-300">
                    {selectedOrder.products.map((product, index) => (
                      <tr key={index}>
                        <td className="px-3 py-2 flex justify-start items-center">
                          <span className="mr-1">x{product.quantity}</span>
                          <p className="text-[#F26522]">
                            {product.productName}
                          </p>
                        </td>
                        <td className="px-3 py-2">
                          ৳ {product.productPrice * product.quantity}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                  <tbody className="border-b dark:bg-gray-50 dark:border-gray-300">
                    <tr>
                      <td className="px-3 py-2 flex justify-start items-center">
                        Subtotal
                      </td>
                      <td className="px-3 py-2">
                        <p>৳ {selectedOrder.total}</p>
                      </td>
                    </tr>
                  </tbody>
                  <tbody className="border-b dark:bg-gray-50 dark:border-gray-300">
                    <tr>
                      <td className="px-3 py-2 flex justify-start items-center">
                        Payment Method
                      </td>
                      <td className="px-3 py-2">
                        <p>{selectedOrder.paymentMethod}</p>
                      </td>
                    </tr>
                  </tbody>
                  <tbody className="border-b dark:bg-gray-50 dark:border-gray-300">
                    <tr>
                      <td className="px-3 py-2 flex justify-start items-center">
                        Total
                      </td>
                      <td className="px-3 py-2">৳ {selectedOrder.total}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div>
              <h1 className="font-semibold my-5">Billing Details</h1>

              <p>
                {selectedOrder?.billingDetails?.firstName +
                  selectedOrder?.billingDetails?.lastName}
              </p>
              <p>{selectedOrder?.billingDetails?.email}</p>
              <p>{selectedOrder?.billingDetails?.phoneNumber}</p>
              <p>{selectedOrder?.billingDetails?.fullAddress}</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
