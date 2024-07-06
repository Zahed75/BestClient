"use client";
import { fetchApi } from "@/utils/FetchApi";
import isMobileDevice from "@/utils/deviceDetection";
import { getIPAddress } from "@/utils/getIP";
import { ResponseCookies } from "next/dist/compiled/@edge-runtime/cookies";
import { redirect, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function CheckOutCart() {
  const [districts, setDistricts] = useState([]);
  const [productItems, setProductItems] = useState([]);
  const [customerInfo, setCustomerInfo] = useState({});
  const [IP, setIP] = useState("");

  const cart = useSelector((state) => state.cart.items) || [];
  const customer = useSelector((state) => state.customer) || {};

  const router = useRouter();

  const totalProductPrice = Array.isArray(cart)
    ? cart.reduce(
        (acc, item) => acc + item.general.salePrice * item.quantity,
        0
      )
    : 0;
  const deliveryCharge = 100;
  const vat = 50;
  const totalPrice = totalProductPrice + deliveryCharge + vat;
  const userId = customer?.items?.userId;
  const email = customer?.items?.email;

  useEffect(() => {
    const fetchDistricts = async () => {
      try {
        const res = await fetch("https://bdapis.com/api/v1.2/districts");
        const data = await res.json();
        setDistricts(data?.data || []);
      } catch (error) {
        console.error("Error fetching districts:", error);
      }
    };

    fetchDistricts();
  }, []);

  useEffect(() => {
    if (Array.isArray(cart)) {
      const updatedItems = cart?.map((item) => ({
        _id: item._id,
        quantity: item.quantity,
      }));
      setProductItems(updatedItems);
    }
  }, []);

  useEffect(() => {
    const fetchIp = async () => {
      try {
        const ip = await getIPAddress();
        setIP(ip);
      } catch (error) {
        console.log("Failed to fetch IP address.");
      }
    };

    fetchIp();
  }, []);

  useEffect(() => {
    const customerId = customer?.items?.userId;
    if (!customerId || customerId === "") {
      router.push("/signin");
    } else {
      const fetchData = async () => {
        try {
          const data = await fetchApi(`/customer/info/${customerId}`, "GET");
          setCustomerInfo(data?.customerInfo);
        } catch (error) {
          console.error("Error fetching product data:", error);
        }
      };

      fetchData();
    }
  }, []);

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);

    if (!userId) {
      router.push("/signin");
      return;
    }

    const data = {
      customer: userId,
      email: email,
      orderType: "Delivery",
      customerIp: IP,
      firstName: formData.get("firstName"),
      lastName: formData.get("lastName"),
      deliveryAddress: formData.get("fullAddress"),
      district: formData.get("district"),
      phoneNumber: formData.get("phone"),
      paymentMethod:
        formData.get("paymentMethod") === "cashOnDelivery"
          ? "Cash on Delivery"
          : "Online Payment",
      products: productItems,
      totalPrice: totalProductPrice,
      deliveryCharge: deliveryCharge,
      vatRate: vat,
      couponId: "",
      channel: isMobileDevice() ? "mobile" : "web",
      outlet: "",
    };

    console.log("Order Data:", data);

    try {
      const response = await fetchApi("/order/orderCreate", "POST", data);
      console.log("Order Response:", ResponseCookies);
      if (response) {
        router.push("/success");
      } else {
        console.error("Order creation error:", response);
      }
    } catch (error) {
      console.error("Order creation error:", error);
    }
  };

  return (
    <section className="">
      <form
        onSubmit={handlePlaceOrder}
        className="my-10 grid grid-cols-1 md:grid-cols-3 justify-between items-start gap-10"
      >
        <div className="md:col-span-2">
          <h1 className="text-lg md:text-2xl font-semibold uppercase">
            Checkout Cart
          </h1>
          <div className="my-5">
            <span className="font-semibold">Billing Details</span>
            <div className="grid grid-cols-2 justify-start items-center gap-5 my-5 max-w-screen-md">
              <div>
                <label className="text-sm" htmlFor="firstName">
                  First Name *
                </label>
                <input
                  className="border-2 border-gray-400 bg-transparent rounded-md w-full py-2 px-3 focus:outline-0"
                  type="text"
                  name="firstName"
                  id="firstName"
                  defaultValue={customerInfo?.billingInfo?.firstName || ""}
                  required
                />
              </div>
              <div>
                <label className="text-sm" htmlFor="lastName">
                  Last Name *
                </label>
                <input
                  className="border-2 border-gray-400 bg-transparent rounded-md w-full py-2 px-3 focus:outline-0"
                  type="text"
                  name="lastName"
                  id="lastName"
                  defaultValue={customerInfo?.billingInfo?.lastName || ""}
                  required
                />
              </div>
              <div className="col-span-2">
                <label className="text-sm" htmlFor="fullAddress">
                  Enter Your Full Address*
                </label>
                <input
                  className="border-2 border-gray-400 bg-transparent rounded-md w-full py-2 px-3 focus:outline-0"
                  type="text"
                  name="fullAddress"
                  id="fullAddress"
                  defaultValue={customerInfo?.billingInfo?.fullAddress || ""}
                  required
                  placeholder="House name & no., Road no., Village name, Ward no., Thana, Upazilla"
                />
              </div>
              <div className="col-span-2">
                <label className="text-sm" htmlFor="district">
                  District *
                </label>
                <select
                  className="border-2 border-gray-400 bg-transparent rounded-md w-full py-2 px-3 focus:outline-0"
                  name="district"
                  id="district"
                  defaultValue={customerInfo?.billingInfo?.district || ""}
                  required
                >
                  <option value="">Select District</option>
                  {districts?.map((district, index) => (
                    <option key={index} value={district.district}>
                      {district.district}
                    </option>
                  ))}
                </select>
              </div>
              <div className="col-span-2">
                <label className="text-sm" htmlFor="phone">
                  PostalCode *
                </label>
                <input
                  className="border-2 border-gray-400 bg-transparent rounded-md w-full py-2 px-3 focus:outline-0"
                  type="text"
                  name="postalCode"
                  id="postalCode"
                  defaultValue={customerInfo?.billingInfo?.zipCode || ""}
                  required
                />
              </div>
              <div className="col-span-2">
                <label className="text-sm" htmlFor="phone">
                  Enter Your Phone Number *
                </label>
                <input
                  className="border-2 border-gray-400 bg-transparent rounded-md w-full py-2 px-3 focus:outline-0"
                  type="tel"
                  name="phone"
                  id="phone"
                  defaultValue={
                    88 + customerInfo?.billingInfo?.phoneNumber || ""
                  }
                  required
                />
              </div>
            </div>
          </div>
        </div>
        <div className="bg-[#F8F9FD] p-5 rounded-md shadow-md">
          <h4 className="text-lg font-semibold">Products</h4>
          <div className="my-5">
            {Array.isArray(cart) &&
              cart.map((item, index) => (
                <div
                  key={index}
                  className="flex justify-between items-start gap-5 my-3"
                >
                  <p className="font-semibold">{item.quantity} x</p>
                  <p className="font-semibold max-w-52">{item?.productName}</p>
                  <p className="font-semibold">
                    ৳{item.general.salePrice * item.quantity}
                  </p>
                </div>
              ))}
          </div>
          <h4 className="text-lg font-semibold">Payment Method</h4>
          <div className="my-5">
            <div className="flex justify-start items-center">
              <input
                className="rounded-md mr-3 focus:outline-0"
                type="radio"
                name="paymentMethod"
                id="cashOnDelivery"
                required
                defaultChecked={true}
              />
              <label className="text-sm" htmlFor="cashOnDelivery">
                Cash on Delivery
              </label>
            </div>
            <div className="flex justify-start items-center mt-3">
              <input
                className="rounded-md mr-3 focus:outline-0"
                type="radio"
                name="paymentMethod"
                id="onlinePayment"
                required
              />
              <label className="text-sm" htmlFor="onlinePayment">
                Debit/Credit Cards, Mobile Banking, Internet Banking
                <span className="block text-xs">
                  (Conditions Apply on Free Home Delivery)
                </span>
              </label>
            </div>
          </div>

          <h4 className="text-lg font-semibold">Order summary</h4>
          <div className="my-5">
            <div className="flex justify-between items-center my-3">
              <p>Products price</p>
              <p className="font-semibold">৳{totalProductPrice}</p>
            </div>
            <div className="flex justify-between items-center my-3">
              <p>Delivery</p>
              <p className="font-semibold">৳{deliveryCharge}</p>
            </div>
            <div className="flex justify-between items-center my-3">
              <p>VAT</p>
              <p className="font-semibold">৳{vat}</p>
            </div>
            <div className="border"></div>
            <div className="flex justify-between items-center my-3">
              <p>Total (Incl. VAT)</p>
              <p className="font-semibold">৳{totalPrice}</p>
            </div>
          </div>
          <div className="flex justify-start items-center gap-5 my-10">
            <svg
              width="20"
              height="21"
              viewBox="0 0 20 21"
              fill="none"
              className="w-6 h-6"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clipPath="url(#clip0_707_6157)">
                <path
                  d="M18.3385 11.06C18.2451 10.8867 18.2451 10.7134 18.3385 10.54L19.0785 9.02005C19.2918 8.59338 19.3251 8.15672 19.1785 7.71005C19.0318 7.26338 18.7451 6.92672 18.3185 6.70005L16.8185 5.92005C16.6451 5.82672 16.5451 5.68672 16.5185 5.50005L16.2185 3.82005C16.1385 3.35338 15.9085 2.98338 15.5285 2.71005C15.1485 2.43672 14.7251 2.33338 14.2585 2.40005L12.5785 2.64005C12.3918 2.66672 12.2318 2.61338 12.0985 2.48005L10.8785 1.30005C10.5451 0.966717 10.1418 0.800049 9.66846 0.800049C9.19512 0.800049 8.78512 0.966717 8.43846 1.30005L7.21846 2.48005C7.08512 2.61338 6.92512 2.66672 6.73846 2.64005L5.05846 2.40005C4.59179 2.33338 4.16846 2.43672 3.78846 2.71005C3.40846 2.98338 3.17846 3.35338 3.09846 3.82005L2.79846 5.50005C2.77179 5.68672 2.67179 5.82672 2.49846 5.92005L0.998458 6.70005C0.571791 6.92672 0.285124 7.26338 0.138458 7.71005C-0.00820891 8.15672 0.0251244 8.59338 0.238458 9.02005L0.978458 10.54C1.07179 10.7134 1.07179 10.8867 0.978458 11.06L0.238458 12.58C0.0251244 13.0067 -0.00820891 13.4434 0.138458 13.89C0.285124 14.3367 0.571791 14.6734 0.998458 14.9L2.49846 15.68C2.67179 15.7734 2.77179 15.9134 2.79846 16.1L3.09846 17.78C3.17846 18.2467 3.40846 18.6167 3.78846 18.89C4.16846 19.1634 4.59179 19.2667 5.05846 19.2L6.73846 18.96C6.92512 18.9334 7.08512 18.9867 7.21846 19.12L8.43846 20.3C8.78512 20.6334 9.19512 20.8 9.66846 20.8C10.1418 20.8 10.5451 20.6334 10.8785 20.3L12.0985 19.12C12.2318 18.9867 12.3918 18.9334 12.5785 18.96L14.2585 19.2C14.7251 19.2667 15.1485 19.1634 15.5285 18.89C15.9085 18.6167 16.1385 18.2467 16.2185 17.78L16.5185 16.1C16.5451 15.9134 16.6451 15.7734 16.8185 15.68L18.3185 14.9C18.7451 14.6734 19.0318 14.3367 19.1785 13.89C19.3251 13.4434 19.2918 13.0067 19.0785 12.58L18.3385 11.06ZM10.6585 14.92C10.5718 14.9934 10.4785 15.03 10.3785 15.03C10.2785 15.03 10.1851 14.9934 10.0985 14.92L7.69846 12.52C7.59846 12.4334 7.55179 12.3334 7.55846 12.22V8.66005C7.55846 8.53338 7.60512 8.43338 7.69846 8.36005C7.79179 8.28672 7.88512 8.25005 7.97846 8.25005C8.07846 8.25005 8.17179 8.28672 8.25846 8.36005L10.6585 10.76C10.7451 10.8467 10.7918 10.9467 10.7985 11.06V14.62C10.7918 14.7467 10.7451 14.8467 10.6585 14.92ZM14.4185 10.88L12.4585 12.84C12.3785 12.92 12.2785 12.96 12.1585 12.96C12.0385 12.96 11.9385 12.92 11.8585 12.84L11.1985 12.18C11.1185 12.1 11.0785 12.0034 11.0785 11.89C11.0785 11.7767 11.1185 11.6734 11.1985 11.58L13.1585 9.62005C13.2385 9.54005 13.3385 9.50005 13.4585 9.50005C13.5718 9.50005 13.6751 9.54005 13.7685 9.62005L14.4285 10.28C14.5085 10.36 14.5585 10.4534 14.5785 10.56C14.5985 10.6734 14.5718 10.7767 14.4985 10.87L14.4185 10.88Z"
                  fill="#F16521"
                />
              </g>
              <defs>
                <clipPath id="clip0_707_6157">
                  <rect
                    width="20"
                    height="20"
                    fill="white"
                    transform="translate(0 0.5)"
                  />
                </clipPath>
              </defs>
            </svg>
            <p className="text-[#F16521] font-semibold">
              Check and Double-Check Your Product Details
            </p>
          </div>
          <button
            type="submit"
            className="bg-[#F16521] w-full py-2 rounded-md text-white"
          >
            Place Order
          </button>
        </div>
      </form>
    </section>
  );
}
