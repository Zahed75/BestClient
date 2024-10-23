"use client";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Box, Drawer } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import shopSvg from "@/public/images/Retail.svg";
import deliverySvg from "@/public/images/Delivery-01.svg";
import { fetchOutlets, closeOutletDrawer, openOutletDrawer, setSelectedOutlet } from "@/redux/slice/outletSlice";
import { useDispatch, useSelector } from "react-redux";
import { fetchCities } from "@/redux/slice/citiesSlice";

export default function TopLocationBar() {
  const [open, setOpen] = useState(false);
  const [availability, setAvailability] = useState("Status");
  const [selectedCity, setSelectedCity] = useState("City");
  const [selectedArea, setSelectedArea] = useState("Area");
  // const [selectedOutlet, setSelectedOutlet] = useState(null);
  const [openOutletDropdown, setOpenOutletDropdown] = useState(false);
  const [openCityDropdown, setOpenCityDropdown] = useState(false); // Manage city dropdown visibility
  const [openAreaDropdown, setOpenAreaDropdown] = useState(false);
  const [showDetails, setShowDetails] = useState(false);


  const dispatch = useDispatch();
  const outletDrawerOpen = useSelector(
    (state) => state.outlet.outletDrawerOpen
  );
  const cities = useSelector((state) => state.cities);
  const outlets = useSelector((state) => state.outlet);

  useEffect(() => {
    dispatch(fetchCities());
    dispatch(fetchOutlets());
  }, [dispatch]);

  const linkData = [
    { name: "My Account", url: "/my-account" },
    { name: "Wishlist", url: "/my-account/wishlist" },
    { name: "Order Tracking", url: "/" },
    { name: "Cart", url: "/cart" },
  ];
  const toggleFilterDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  // const toggleDropdown = (dropdown) => {
  //   setOpenOutletDropdown(openOutletDropdown === dropdown ? null : dropdown);
  // };
  const toggleDropdown = () => {
    setOpenOutletDropdown((prev) => !prev); // Toggle dropdown visibility
  };
  const toggleCityDropdown = () => {
    setOpenCityDropdown((prev) => !prev); // Toggle city dropdown visibility
    setOpenAreaDropdown(false); // Close area dropdown when toggling city dropdown
  };
  const toggleAreaDropdown = () => {
    setOpenAreaDropdown((prev) => !prev); // Toggle area dropdown visibility
  };
  const handleOptionClick = (option) => {
    setAvailability(option); // Update selected option
    setOpenOutletDropdown(false); // Close dropdown after selection
    setSelectedCity("City"); // Update selected city
    setOpenCityDropdown(false);
  };
  const handleCitySelect = (cityName) => {
    setSelectedCity(cityName); // Update selected city
    setOpenCityDropdown(false); // Close city dropdown
    setSelectedArea("Area"); // Reset area selection
    setOpenAreaDropdown(false);
  };
  const handleAreaSelect = (areaName) => {
    setSelectedArea(areaName); // Update selected area
    setOpenAreaDropdown(false); // Close area dropdown after selection
  };
  const areas = cities?.cities?.find((city) => city.cityName === selectedCity)?.areas || [];
  // const filteredOutlets = outlets?.outlets?.outlet?.filter(outlet => outlet.cityName === selectedCity);
  const filteredOutlets = outlets?.outlets?.outlet?.filter(outlet => {
    const matchesCity = outlet.cityName === selectedCity;
    const isAreaInvalid = !selectedArea || selectedArea === "Area";
    if (isAreaInvalid) {
      return matchesCity;
    }
    const matchesArea = outlet.areaName === selectedArea;
    return matchesCity && matchesArea;
  }) || [];

  return (
    <section className="container">
      <div className="text-[#3E445A] text-xs py-3 hidden md:hidden lg:grid grid-cols-2 justify-between items-center">
        <div>
          <ul className="flex justify-start items-center gap-5">
            {linkData.map((link, index) => (
              <li key={index}>
                <Link
                  className="hover:text-[#F16521] duration-700"
                  href={link.url}
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex justify-end items-center gap-2 divide-x-2 w-full">
          <div className="flex justify-center gap-3 cursor-pointer">
            <div
              className="flex justify-start items-center"
              onClick={() => dispatch(openOutletDrawer())}
            >
              <Image
                src={deliverySvg}
                width={25}
                height={25}
                alt="location Icon"
                className="mr-2"
              />
              Enter Area
            </div>

            <div
              className="flex justify-start items-center"
              onClick={() => dispatch(openOutletDrawer())}
            >
              <Image
                src={shopSvg}
                width={18}
                height={18}
                alt="location Icon"
                className="mr-2"
              />
              Select Showroom
            </div>
          </div>

          <div className="pl-3">
            Need Help? Call <strong>Drooto Helpline:</strong>{" "}
            <span className="text-[#F16521]">09606 111 777</span>
          </div>
        </div>
      </div>
      <Drawer
        anchor="right"
        open={outletDrawerOpen}
        onClose={() => dispatch(closeOutletDrawer())}
      >
        <Box
          role="presentation"
          className="w-[378px] bg-[#F3F4F7] h-full flex flex-col justify-between"
        >
          <div className="flex-grow p-3">
            <div className="flex justify-end items-end mb-2">
              <button
                className="inline-block hover:text-[#F16521] duration-700"
                onClick={() => dispatch(closeOutletDrawer())}
              >
                <CloseIcon />
              </button>
            </div>
            {!showDetails && (
              <div>
                <h2 className="text-lg text-gray-800 mb-4">
                  Choose From Available Stores
                </h2>
                <div className="mb-4">
                  <div className="grid grid-cols-3 justify-center items-center gap-3 text-sm">
                    <div className="relative">
                      <button
                        className="w-full flex items-center justify-between bg-gray-200 px-2 py-2 rounded-full text-gray-700 hover:bg-gray-300"
                        onClick={toggleDropdown}
                      >
                        <span>{availability}</span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          className="w-4 h-4"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M19 9l-7 7-7-7"
                          />
                        </svg>
                      </button>

                      {/* Custom dropdown showing availability options */}
                      {openOutletDropdown && (
                        <div className="absolute left-0 mt-2 w-full bg-white rounded-lg z-10 shadow-lg">
                          <div
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-200 cursor-pointer"
                            onClick={() => handleOptionClick("Available")}
                          >
                            Available
                          </div>
                          <div
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-200 cursor-pointer text-nowrap"
                            onClick={() => handleOptionClick("Not Available")}
                          >
                            Not Available
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="relative">
                      <button
                        className="w-full flex items-center justify-between bg-gray-200 px-2 py-2 rounded-full text-gray-700 hover:bg-gray-300"
                        onClick={toggleCityDropdown}
                      >
                        <span>{selectedCity}</span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          className="w-4 h-4"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M19 9l-7 7-7-7"
                          />
                        </svg>
                      </button>

                      {/* Dropdown showing cities */}
                      {openCityDropdown && (
                        <div className="absolute left-0 mt-2 w-full bg-white border rounded-lg shadow-lg z-10">
                          {cities?.cities?.map((item, i) => (
                            <label
                              key={i}
                              className="block px-4 py-2 text-sm text-gray-700 hover:text-[#F26522] duration-700 cursor-pointer"
                              onClick={() => handleCitySelect(item?.cityName)} // Handle city selection
                            >
                              {item?.cityName}
                            </label>
                          ))}
                        </div>
                      )}
                    </div>

                    <div className="relative">
                      <button
                        className="w-full flex items-center justify-between bg-gray-200 px-2 py-2 rounded-full text-gray-700 hover:bg-gray-300"
                        onClick={toggleAreaDropdown}
                      >
                        <span>{selectedArea}</span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          className="w-4 h-4"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M19 9l-7 7-7-7"
                          />
                        </svg>
                      </button>

                      {openAreaDropdown && (
                        <div className="absolute left-0 mt-2 w-full bg-white border rounded-lg shadow-lg z-10">
                          {areas.map((area, i) => (
                            <label
                              key={i}
                              className="block px-4 py-2 text-sm text-gray-700 hover:text-[#F26522] duration-700 cursor-pointer"
                              onClick={() => handleAreaSelect(area.areaName)} // Handle area selection
                            >
                              {area.areaName}
                            </label>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  {filteredOutlets?.map((item, i) => (
                    <div
                      key={i}
                      onClick={() => {
                        setShowDetails(true);
                        dispatch(setSelectedOutlet(item));
                      }}
                      className="p-4 border-2 rounded-lg bg-gray-100  hover:border-[#F16521] duration-700 cursor-pointer"
                    >
                      <div className="flex flex-col items-start justify-between">
                        <div>
                          <h3 className="font-inter font-semibold text-[16px] text-[#202435]">
                            {/* BEL Banani */}
                            {item.outletName}
                          </h3>
                          <p className="font-inter text-[14px] text-[#202435]">
                            {/* Road-02, Banani Dhaka */}
                            {item.outletLocation}
                          </p>
                        </div>

                        <div className="flex items-center space-x-2 mt-3">
                          <span className="h-4 w-4 bg-green-500 rounded-full"></span>
                          <span className="text-sm text-[#202435]">
                            Available
                          </span>
                        </div>
                      </div>

                    </div>
                  ))}
                  <div
                    onClick={() => setShowDetails(true)}
                    className="p-3 border-2 rounded-lg bg-gray-100 hover:border-[#F16521] duration-700 cursor-pointer"
                  >
                    <div className="flex flex-col items-start justify-between">
                      <div>
                        <h3 className="font-inter font-semibold text-[16px] text-[#202435]">
                          BEL Default
                        </h3>
                        <p className="font-inter text-[14px] text-[#202435]">
                          Road-02, Banani Dhaka
                        </p>
                      </div>
                      <div className="flex items-center space-x-2 mt-3">
                        <span className="h-4 w-4 bg-red-500 rounded-full"></span>
                        <span className="text-sm text-[#202435]">
                          Not Available
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

            )}
            {showDetails && (
              <div>
                <h2 className="text-lg font-bold mb-4">DDK Banani</h2>

                <div className="text-md my-5">
                  <span className="font-semibold">Open until 10:00 PM</span>{" "}
                  <br />
                  <span className="">15/2 Nursery Street, Dhaka</span> <br />
                </div>

                <div className="my-10">
                  <span
                    onClick={() => setShowDetails(false)}
                    className="text-md font-semibold underline cursor-pointer hover:text-[#F26522] duration-700"
                  >
                    select a different store
                  </span>
                </div>

                <div className="text-md my-5">
                  <span className="font-bold">Normal opening hours</span>{" "}
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <span>Mon - Fri</span>
                    <span className="ml-5">10:00 AM - 10:00 PM</span>
                    <span>Sat</span>
                    <span className="ml-5">09:00 AM - 09:00 PM</span>
                    <span>Sun</span>
                    <span className="ml-5">09:00 AM - 07:00 PM</span>
                  </div>
                </div>

                <div className="text-md mt-10">
                  <span className="font-bold">Holiday hours</span>{" "}
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <span>2024-10-13</span>
                    <span className="ml-5">09:00 AM - 09:00 PM</span>
                    <span>2024-10-14</span>
                    <span className="ml-5">Closed</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="mt-6 p-3">
            <button className="w-full py-3 bg-[#F16521] text-white font-semibold rounded-lg hover:bg-[#F16521]">
              Continue With Selection
            </button>
          </div>
        </Box>
      </Drawer>
    </section>
  );
}
