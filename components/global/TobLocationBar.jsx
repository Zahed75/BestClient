"use client";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Box, Drawer } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import shopSvg from "@/public/images/Retail.svg";
import deliverySvg from "@/public/images/Delivery-01.svg";
import { fetchOutlets, fetchProductAvailability, setSelectArea, setSelectCity, closeOutletDrawer, openOutletDrawer, closeAreaDrawer, openAreaDrawer, setSelectedOutlet } from "@/redux/slice/outletSlice";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { fetchCities } from "@/redux/slice/citiesSlice";

export default function TopLocationBar() {
  const [open, setOpen] = useState(false);

  const [showroom, setShowroom] = useState("Select Showroom");
  const [availability, setAvailability] = useState("Status");
  const [selectedOutletCity, setSelectedOutletCity] = useState("City");
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedArea, setSelectedArea] = useState("Area");
  const [selectOutlet, setSelectOutlet] = useState(null);


  const [openDropdown, setOpenDropdown] = useState(null);
  const [openOutletDropdown, setOpenOutletDropdown] = useState(false);
  const [openCityDropdown, setOpenCityDropdown] = useState(false); // Manage city dropdown visibility
  const [openAreaDropdown, setOpenAreaDropdown] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  const router = useRouter();
  const dispatch = useDispatch();
  const outletDrawerOpen = useSelector(
    (state) => state.outlet.outletDrawerOpen
  );
  const areaDrawerOpen = useSelector(
    (state) => state.outlet.areaDrawerOpen
  );
  const cities = useSelector((state) => state.cities);
  const cart = useSelector((state) => state.cart.items) || [];
  const productAvailability = useSelector((state) => state.outlet);
  const outlets = useSelector((state) => state.outlet);
  const selectCity = outlets?.selectCity;
  const selectArea = outlets?.selectArea;
  const productId = outlets?.productId;

  useEffect(() => {
    dispatch(fetchCities());
    // dispatch(fetchProductAvailability());
    dispatch(fetchOutlets());
  }, [dispatch]);

  useEffect(() => {
    if (!outletDrawerOpen) {
      // Ensure showroom is updated only when drawer is closed
      setShowroom(selectOutlet?.outletName || "Select Showroom");
    }
  }, [outletDrawerOpen, selectOutlet]);

  // useEffect(() => {
  //   if (Array.isArray(cart)) {
  //     const updatedItems = cart?.map(item => item._id);
  //     console.log("updatedItems", updatedItems);
  //     dispatch(fetchProductAvailability(updatedItems));
  //     // dispatch(setItems(updatedItems));
  //   }
  // }, [cart, dispatch]);

  useEffect(() => {
    if (Array.isArray(cart)) {
      if (productId === "") {
        // Dispatch with cart items if productId is empty
        const updatedItems = cart.map(item => item._id);
        console.log("Dispatching with updatedItems from cart:", updatedItems);
        dispatch(fetchProductAvailability(updatedItems));
      } else {
        // Dispatch with productId if it is not empty
        console.log("Dispatching with single productId:", productId);
        dispatch(fetchProductAvailability([productId]));
      }
    }
  }, [cart, productId, dispatch]);


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

  const toggleDropdown = (dropdownName) => {
    setOpenDropdown(openDropdown === dropdownName ? null : dropdownName);
  };

  const handleOptionClick = (option) => {
    setAvailability(option); // Update selected option
    setOpenOutletDropdown(false); // Close dropdown after selection
    setOpenDropdown(null);
  };
  const handleCitySelect = (cityName) => {
    setSelectedCity(cityName); // Update selected city
    setSelectedOutletCity(cityName);
    setOpenCityDropdown(false); // Close city dropdown
    setSelectedArea("Area"); // Reset area selection
    setOpenDropdown(null);
  };
  const handleAreaSelect = (areaName) => {
    setSelectedArea(areaName); // Update selected area
    setOpenDropdown(null);  // Close area dropdown after selection
  };
  const handleCloseDrawer = () => {
    // Update showroom here or reset it if necessary
    setShowDetails(false);
    setShowroom(selectOutlet?.outletName || "Select Showroom");
    setOpenDropdown(null);
    dispatch(closeOutletDrawer());
  };
  const handleAreaCloseDrawer = () => {
    // Update showroom here or reset it if necessary
    // console.log("select", areaSelect);
    setArea(areaSelect?.areaName || "Enter Area");
    dispatch(setSelectArea(areaSelect));
    dispatch(closeAreaDrawer());
  };
  const handleGoToCheckout = () => {
    setOpen(false);
    router.push("/checkout");
  };

  const allOutlets = outlets?.outlets?.outlet;
  const outletAreas = cities?.cities?.find((city) => city.cityName === selectedOutletCity)?.areas || [];
  const areas = cities?.cities?.find((city) => city.cityName === selectedCity)?.areas || [];
  const filteredOutlets = productAvailability?.productAvailability?.availability || [];
  console.log("filter", filteredOutlets);

  // Filter outlets based on selected filters (availability, city, area)
  const matchingOutlets = allOutlets?.filter(outlet => {
    // Check if no filters are applied
    // const noFiltersApplied =
    //   (!availability || availability === "Status") &&
    //   (!selectedOutletCity || selectedOutletCity === "City") &&
    //   (!selectedArea || selectedArea === "Area");

    // if (noFiltersApplied) return true; // Show all outlets if no filters are applied

    // Filter based on city, area, and availability if filters are selected
    const matchesCity = selectedOutletCity && selectedOutletCity !== "City" ? outlet.cityName === selectedOutletCity : true;
    const matchesArea = selectedArea && selectedArea !== "Area" ? outlet.areaName === selectedArea : true;

    // Update matchesAvailability to handle "Not Available" explicitly
    const matchesAvailability = availability === "Available"
      ? filteredOutlets.some(filter => {
        const match = filter.outletDetails?.outletName === outlet.outletName && filter.available;
        // console.log(`Checking Available: ${filter.outletDetails?.outletName} -> ${match}`);
        return match;
      })
      : availability === "Not Available"
        ? filteredOutlets.some(filter => {
          const match = filter.outletDetails?.outletName === outlet.outletName && !filter.available;
          // console.log(`Checking Not Available: ${filter.outletDetails?.outletName} -> ${match}`);
          return match;
        })
        : true; // If availability is not set, include all outlets

    return matchesCity && matchesArea && matchesAvailability;
  }) || [];
  // console.log("match", matchingOutlets);





  // const outletAreas = cities?.cities?.find((city) => city.cityName === selectedOutletCity)?.areas || [];
  // const areas = cities?.cities?.find((city) => city.cityName === selectedCity)?.areas || [];
  // const allOutlets = outlets?.outlets?.outlet;
  // const filteredOutlets = productAvailability?.productAvailability?.availability || [];



  // const filteredOutlets = outlets?.outlets?.outlet?.filter(outlet => outlet.cityName === selectedCity);
  // const filteredOutlets = outlets?.outlets?.outlet?.filter(outlet => {
  // const filteredOutlets = productAvailability?.availability?.filter(outlet => {
  // const matchesCity = outlet.cityName === selectedCity;
  // const isAreaInvalid = !selectedArea || selectedArea === "Area";
  // if (isAreaInvalid) {
  //   return matchesCity;
  // }
  // const matchesArea = outlet.areaName === selectedArea;
  // return matchesCity && matchesArea;

  //   const matchesCity = outlet?.outletDetails?.cityName === selectedCity;
  //   const isAreaInvalid = (!selectedArea || selectedArea === "Area") && outlet.available == true;

  //   if (isAreaInvalid) {
  //     return matchesCity;
  //   }

  //   const matchesArea = outlet.areaName === selectedArea;
  //   return matchesCity && matchesArea;
  // }) || [];
  // console.log("filteredOutlets", filteredOutlets);



  // const matchingOutlets = allOutlets?.filter(item =>
  //   filteredOutlets?.some(
  //     filter => filter.outletDetails?.outletName === item.outletName
  //   )
  // );


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
              onClick={() => dispatch(openAreaDrawer())}
            >
              <Image
                src={deliverySvg}
                width={25}
                height={25}
                alt="location Icon"
                className="mr-2"
              />
              {/* Enter Area */}
              {/* {area} */}
              {selectArea === "Enter Area" ? (
                <span>{selectArea}</span>
              ) : (
                <span className="text-nowrap">
                  {selectArea}
                </span>
              )}
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
              {/* Select Showroom */}
              {showroom}
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
        onClose={handleCloseDrawer}
      >
        <Box
          role="presentation"
          className="w-[378px] bg-[#F3F4F7] h-full flex flex-col justify-between"
        >
          <div className="flex-grow p-3">
            <div className="flex justify-end items-end mb-2">
              <button
                className="inline-block hover:text-[#F16521] duration-700"
                onClick={() => {
                  setOpenDropdown(null);
                  setShowDetails(false);
                  dispatch(closeOutletDrawer());
                }}
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
                        onClick={() => toggleDropdown("availability")}
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
                      {openDropdown === "availability" && (
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
                        onClick={() => toggleDropdown("city")}
                      >
                        <span>{selectedOutletCity}</span>
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
                      {openDropdown === "city" && (
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
                        onClick={() => toggleDropdown("area")}
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

                      {openDropdown === "area" && (
                        <div className="absolute left-0 mt-2 w-full bg-white border rounded-lg shadow-lg z-10">
                          {outletAreas.map((area, i) => (
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

                <div className="space-y-4" onClick={() => { setOpenDropdown(null) }}>
                  {matchingOutlets?.map((item, i) => (
                    <div
                      key={i}
                      onClick={() => {
                        setShowDetails(true);
                        setSelectOutlet(item);
                        setOpenDropdown(null);
                        setSelectedOutletCity(item?.cityName);
                        dispatch(setSelectedOutlet(item));
                      }}
                      className="p-4 border-2 rounded-lg bg-gray-100  hover:border-[#F16521] duration-700 cursor-pointer"
                    >
                      <div className="flex flex-col items-start justify-between">
                        <div>
                          <h3 className="font-inter font-semibold text-[16px] text-[#202435]">
                            {/* BEL Banani */}
                            {item?.outletName}
                          </h3>
                          <p className="font-inter text-[14px] text-[#202435]">
                            {/* Road-02, Banani Dhaka */}
                            {item?.outletLocation}
                          </p>
                        </div>
                        {filteredOutlets.some(filter => filter.outletDetails?.outletName === item.outletName && filter.available) ? (
                          <div className="flex items-center space-x-2 mt-3">
                            <span className="h-4 w-4 rounded-full bg-green-500"></span>
                            <span className="text-sm text-[#202435]">Available</span>
                          </div>
                        ) : (
                          <div className="flex items-center space-x-2 mt-3">
                            <span className="h-4 w-4 rounded-full bg-red-500"></span>
                            <span className="text-sm text-[#202435]">Not Available</span>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}

                </div>
              </div>

            )}
            {showDetails && (
              <div>
                <h2 className="text-lg font-bold mb-4">{selectOutlet?.outletName}</h2>

                <div className="text-md my-5">
                  <span className="font-semibold">Open until 10:00 PM</span>{" "}
                  <br />
                  <span className="">{selectOutlet?.outletLocation}</span> <br />
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
            <button
              onClick={() => {
                handleGoToCheckout();
                setShowDetails(false);
                dispatch(closeOutletDrawer());
              }}
              className="w-full py-3 bg-[#F16521] text-white font-semibold rounded-lg hover:bg-[#F16521]">
              Continue With Selection
            </button>
          </div>
        </Box>
      </Drawer>
      <Drawer
        anchor="right"
        open={areaDrawerOpen}
        onClose={handleAreaCloseDrawer}
      >
        <Box
          role="presentation"
          className="w-[378px] bg-[#F3F4F7] h-full flex flex-col justify-between"
        >
          <div className="flex-grow p-3">
            <div className="flex justify-end items-end mb-2">
              <button
                className="inline-block hover:text-[#F16521] duration-700"
                onClick={() => { dispatch(closeAreaDrawer()) }}
              >
                <CloseIcon />
              </button>
            </div>

            <div>
              <h2 className="text-lg text-gray-800 mb-4">
                Enter your location
              </h2>
              <div className="mb-4">
                <div className="">
                  <h2>Give updated information for product delivery.</h2>
                </div>
              </div>
              <div className="my-3">
                <label className="text-sm" htmlFor="city">
                  City *
                </label>
                <select
                  className="border-2 border-gray-400 bg-transparent rounded-md w-full py-2 px-3 focus:outline-0"
                  name="city"
                  id="city"
                  required
                  defaultValue={selectCity}
                  onChange={(e) => {
                    const selectedItem = cities?.cities.find(item => item.cityName === e.target.value);
                    setSelectedCity(selectedItem?.cityName);
                    dispatch(setSelectCity(selectedItem?.cityName));

                  }}

                >
                  <option>
                    Select an city
                  </option>
                  {cities?.cities?.map((item, i) => (
                    <option key={i} value={item.cityName}>
                      {item?.cityName}
                    </option>
                  ))}
                </select>
              </div>
              <div className="my-3">
                <label className="text-sm" htmlFor="area">
                  Area *
                </label>
                <select
                  className="border-2 border-gray-400 bg-transparent rounded-md w-full py-2 px-3 focus:outline-0"
                  name="area"
                  id="area"
                  required
                  defaultValue={selectArea}
                  // onChange={(e) => handleAreaSelect(e.target.value)}
                  onChange={(e) => {
                    const selectedItem = areas.find(item => item?.areaName === e.target.value);
                    dispatch(setSelectArea(selectedItem?.areaName));
                  }}
                >
                  <option>
                    Select an area
                  </option>
                  {areas?.map((item, i) => (
                    <option key={i} value={item?.areaName}>
                      {item?.areaName}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div className="mt-6 p-3">
            <button
              onClick={() => {
                dispatch(closeAreaDrawer());
              }}
              className="w-full py-3 bg-[#F16521] text-white font-semibold rounded-lg hover:bg-[#F16521]">
              Save
            </button>
          </div>
        </Box>
      </Drawer>
    </section >
  );
}
