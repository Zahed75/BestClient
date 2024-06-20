"use client";
import { useEffect, useState } from "react";

export default function InfoSection() {
  const [active, setActive] = useState("personal");
  const [districts, setDistricts] = useState([]);

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
  return (
    <section className="bg-[#F4F4F4]">
      <div className="bg-white shadow-md p-5 my-10 rounded-md">
        <div className="flex justify-start items-center uppercase text-slate-500">
          <div
            onClick={() => setActive("personal")}
            className={`cursor-pointer inline-block px-5 py-2 rounded-md duration-700 ${
              active === "personal" ? "bg-[#F16521] text-white shadow-md" : ""
            }`}
          >
            personal information
          </div>
          <div
            onClick={() => setActive("orders")}
            className={`cursor-pointer inline-block px-5 py-2 rounded-md duration-700 ${
              active === "orders" ? "bg-[#F16521] text-white shadow-md" : ""
            }`}
          >
            Orders
          </div>
          <div
            onClick={() => setActive("wishlist")}
            className={`cursor-pointer inline-block px-5 py-2 rounded-md duration-700 ${
              active === "wishlist" ? "bg-[#F16521] text-white shadow-md" : ""
            }`}
          >
            Wishlist
          </div>
        </div>
        <div
          className={`grid grid-cols-1 justify-between items-start gap-5 w-full my-10 
        ${active === "personal" ? "block" : "hidden"}
        `}
        >
          <div className="w-full">
            <h5 className="text-md font-bold mb-3">Personal info</h5>
            <div className="grid grid-cols-1 md:grid-cols-4 justify-between items-start gap-5 border-b-2 pb-10">
              <div>
                <input type="file" id="file-upload" className="hidden " />
                <label
                  for="file-upload"
                  className="z-20 flex flex-col-reverse items-center justify-center w-[145px] h-[145px] cursor-pointer border py-2 bg-gray-200 rounded-md"
                >
                  <svg
                    width="21"
                    height="20"
                    viewBox="0 0 21 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M10.0925 2.4917C6.35684 2.4917 4.48901 2.4917 3.32849 3.65177C2.16797 4.81185 2.16797 6.67896 2.16797 10.4132C2.16797 14.1473 2.16797 16.0145 3.32849 17.1746C4.48901 18.3347 6.35684 18.3347 10.0925 18.3347C13.8281 18.3347 15.6959 18.3347 16.8565 17.1746C18.017 16.0145 18.017 14.1473 18.017 10.4132V9.99626"
                      stroke="black"
                      stroke-width="1.25"
                      stroke-linecap="round"
                    />
                    <path
                      d="M4.66602 17.4913C8.17433 13.5319 12.117 8.28093 17.9993 12.2192"
                      stroke="black"
                      stroke-width="1.25"
                    />
                    <path
                      d="M15.4982 1.66504V8.33847M18.8362 4.98087L12.1602 4.99327"
                      stroke="black"
                      stroke-width="1.25"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </label>
              </div>

              <div className="md:col-span-3 grid grid-cols-1 md:grid-cols-3 justify-between items-center gap-5">
                <div className="flex flex-col space-y-1 w-full">
                  <label
                    htmlFor="userName"
                    className="text-sm font-semibold text-gray-600"
                  >
                    User Name
                  </label>
                  <input
                    type="text"
                    id="userName"
                    defaultValue={"Md Shaiful Islam"}
                    className="border border-gray-300 rounded-md p-2 focus:outline-none "
                  />
                </div>
                <div className="flex flex-col space-y-1 w-full">
                  <label
                    htmlFor="outletName"
                    className="text-sm font-semibold text-gray-600"
                  >
                    First Name
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    defaultValue={"Md Shaiful"}
                    className="border border-gray-300 rounded-md p-2 focus:outline-none "
                  />
                </div>
                <div className="flex flex-col space-y-1 w-full">
                  <label
                    htmlFor="outletLocation"
                    className="text-sm font-semibold text-gray-600"
                  >
                    Last Name
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    defaultValue={"Islam"}
                    className="border border-gray-300 rounded-md p-2 focus:outline-none "
                  />
                </div>

                <div className="flex flex-col space-y-1 w-full">
                  <label
                    htmlFor="outletName"
                    className="text-sm font-semibold text-gray-600"
                  >
                    Phone Number
                  </label>
                  <input
                    type="text"
                    id="phoneNumber"
                    defaultValue={"0165428413"}
                    className="border border-gray-300 rounded-md p-2 focus:outline-none "
                  />
                </div>
                <div className="flex flex-col space-y-1 w-full">
                  <label
                    htmlFor="outletLocation"
                    className="text-sm font-semibold text-gray-600"
                  >
                    Email
                  </label>
                  <input
                    type="text"
                    id="email"
                    defaultValue={"managerbanani@best.com.bd"}
                    className="border border-gray-300 rounded-md p-2 focus:outline-none "
                  />
                </div>
              </div>
            </div>

            <div className="mt-10">
              <h5 className="text-md font-bold mb-3">Billing Info</h5>
              <div className="grid grid-cols-2 justify-between items-center gap-5 border-b-2 pb-10">
                <div className="flex flex-col space-y-1 w-full">
                  <label
                    htmlFor="outletName"
                    className="text-sm font-semibold text-gray-600"
                  >
                    First Name
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    defaultValue={"Md Shaiful"}
                    className="border border-gray-300 rounded-md p-2 focus:outline-none "
                  />
                </div>
                <div className="flex flex-col space-y-1 w-full">
                  <label
                    htmlFor="outletLocation"
                    className="text-sm font-semibold text-gray-600"
                  >
                    Last Name
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    defaultValue={"Islam"}
                    className="border border-gray-300 rounded-md p-2 focus:outline-none "
                  />
                </div>
                <div className="space-y-1 w-full">
                  <label
                    className="text-sm font-semibold text-gray-600"
                    htmlFor="district"
                  >
                    District
                  </label>
                  <select
                    className="border border-gray-300 bg-transparent rounded-md w-full py-2 px-3 focus:outline-0"
                    name="district"
                    id="district"
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
                <div className="flex flex-col space-y-1 w-full">
                  <label
                    htmlFor="fullAddress"
                    className="text-sm font-semibold text-gray-600"
                  >
                    full Address
                  </label>
                  <input
                    type="text"
                    id="fullAddress"
                    placeholder="House No, Road No, Area"
                    className="border border-gray-300 rounded-md p-2 focus:outline-none "
                  />
                </div>

                <div className="flex flex-col space-y-1 w-full">
                  <label
                    htmlFor="outletName"
                    className="text-sm font-semibold text-gray-600"
                  >
                    Phone Number
                  </label>
                  <input
                    type="text"
                    id="phoneNumber"
                    defaultValue={"0165428413"}
                    className="border border-gray-300 rounded-md p-2 focus:outline-none "
                  />
                </div>
                <div className="flex flex-col space-y-1 w-full">
                  <label
                    htmlFor="outletLocation"
                    className="text-sm font-semibold text-gray-600"
                  >
                    Email
                  </label>
                  <input
                    type="text"
                    id="email"
                    defaultValue={"managerbanani@best.com.bd"}
                    className="border border-gray-300 rounded-md p-2 focus:outline-none "
                  />
                </div>
              </div>
            </div>

            <div className="my-10">
              <h5 className="text-md font-bold mb-3 mt-10">
                Change Password
              </h5>
              <div className="grid grid-cols-1 md:grid-cols-4 justify-start items-center">
                <h5 className="text-gray-600 text-sm">Current Password</h5>
                <div className="flex">
                  <input
                    type="password"
                    id="firstName"
                    defaultValue={"Md Shaiful"}
                    className="border border-gray-300 rounded-lg focus:outline-none p-1 w-full"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-4 justify-start items-center my-5">
                <h5 className="text-gray-600 text-sm">New Password</h5>
                <div className="flex">
                  <input
                    type="password"
                    id="firstName"
                    defaultValue={"Md Shaiful"}
                    className="border border-gray-300 rounded-lg focus:outline-none p-1 w-full"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-4 justify-start items-center">
                <h5 className="text-gray-600 text-sm">Confirm New Password</h5>
                <div className="flex">
                  <input
                    type="password"
                    id="firstName"
                    defaultValue={"Md Shaiful"}
                    className="border border-gray-300 rounded-lg focus:outline-none p-1 w-full"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-4 justify-start items-center mt-5">
                <h5 className="text-gray-600 text-sm">Password Reset Link</h5>
                <button className="border-2 border-black px-3 py-1 text-sm text-black font-semibold rounded-md w-60 hover:bg-slate-100 duration-700">
                  Send Password Reset Link
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
