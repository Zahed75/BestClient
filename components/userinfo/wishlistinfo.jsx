"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { fetchApi } from "@/utils/FetchApi";
import { useSelector } from "react-redux";
import WishlistCard from "../productCard/wishlistCard";

export default function WishlistInfo() {
  const [customerImage, setCustomerImage] = useState("");
  const [customer, setCustomer] = useState({});
  const [active, setActive] = useState("wishlist");

  const router = useRouter();
  const products = useSelector((state) => state.wishlist.items);

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

  const handleLogout = () => {
    localStorage.removeItem("customer");
    router.push("/");
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
        ${active === "wishlist" ? "block" : "hidden"}
        `}
        >
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 justify-between items-center">
            {products?.map((product, index) => (
              <WishlistCard key={index} product={product} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
