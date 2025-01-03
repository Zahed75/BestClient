"use client";
import ImageShow from "@/components/global/ImageShow";
import TagLine from "@/components/global/TagLine";
import CompareIcon from "@/public/images/compare.svg";
import Image from "next/image";
import { Box, Drawer } from "@mui/material";
import FacebookLogo from "@/public/images/facebook.png";
import TwitterLogo from "@/public/images/twitter.png";
import PinterestLogo from "@/public/images/pinterest.png";
import WhatsAppLogo from "@/public/images/whatsapp.png";
import LinkedinLogo from "@/public/images/linkedin.png";
import CloseIcon from "@mui/icons-material/Close";
import Link from "next/link";
import { useEffect, useState } from "react";
import ProductTabs from "./ProductTabs";
import CompareProduct from "./CompareProduct";
import { useDispatch, useSelector } from "react-redux";
import { addToWishlist, removeFromWishlist } from "@/redux/slice/wishlistSlice";
import { addRelatedProduct } from "@/redux/slice/relatedSlice";
import { fetchBrands } from "@/redux/slice/brandSlice";
import { fetchCities } from "@/redux/slice/citiesSlice";
import { fetchApi } from "@/utils/FetchApi";
import { usePathname } from "next/navigation";
import shopSvg from "@/public/images/Retail.svg";
import deliverySvg from "@/public/images/Delivery-01.svg";
import { fetchOutlets, fetchProductAvailability, openOutletDrawer, openAreaDrawer, setProductId, setSelectedOutlet, setSelectArea, setProductName, setSelectProductStatus } from "@/redux/slice/outletSlice";
import NotificationToast from "../global/NotificationToast";
import { motion } from "framer-motion";
import { updateQuantity } from "@/redux/slice/cartSlice";
import { showNotificationWithTimeout } from "@/redux/slice/notificationSlice";
import { addToCart } from "@/redux/slice/cartSlice";

export default function SingleProduct({ product, categoryName }) {
  const [favorite, setFavorite] = useState(false);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [outletDrawerOpen, setOutletDrawerOpen] = useState(false);
  const [areaDrawerOpen, setAreaDrawerOpen] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [availability, setAvailability] = useState("Status");
  const [selectedCity, setSelectedCity] = useState("");
  // const [selectArea, setSelectArea] = useState("Enter Area");
  const [selectedOutletCity, setSelectedOutletCity] = useState("City");
  const [selectedArea, setSelectedArea] = useState("Area");
  const [selectOutlet, setSelectOutlet] = useState(null);
  const [openCityDropdown, setOpenCityDropdown] = useState(false); // Manage city dropdown visibility
  const [error, setError] = useState(null);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isAdded, setIsAdded] = useState(false);

  const [outletInfo, setOutletInfo] = useState(null);

  const dispatch = useDispatch();
  const pathName = usePathname();

  const brandsState = useSelector((state) => state.brand);
  const brands = brandsState?.brands || [];
  const customer = useSelector((state) => state.customer);
  const customerId = customer.items.userId;
  const wishlist = useSelector((state) => state.wishlist.items);
  const productAvailability = useSelector((state) => state.outlet);
  const outlets = useSelector((state) => state.outlet);
  // const selectedOutlet = outlets.selectedOutlet;
  const favoriteProduct = wishlist.find((item) => item._id === product?._id);
  const productId = useSelector((state) => state.outlet.productId);
  const outletName = useSelector((state) => state.outlet.selectedOutlet);
  const productOutlet = outlets?.selectedProductOutlet;
  const productStatus = outlets?.selectProductStatus;
  const selectArea = outlets?.selectArea;
  // const selectArea = useSelector((state) => state.outlet.selectProductArea);
  const cities = useSelector((state) => state.cities);
  // console.log("filter_Single", filteredOutlets);
  const cart = useSelector((state) => state.cart.items) || [];
  const cartItem = cart?.find((cartItem) => cartItem._id === product?._id) || [];

  const filteredOutlets = productAvailability?.productAvailability?.availability || [];
  console.log("filter_Single_Product", filteredOutlets);
  console.log("favoriteProduct", favoriteProduct);

  console.log("selectArea", selectArea);

  console.log("categoryName", categoryName);



  useEffect(() => {
    if (product) {
      dispatch(addRelatedProduct(product));
      dispatch(fetchProductAvailability(product?._id));
      dispatch(fetchOutlets());
      dispatch(fetchCities());
      dispatch(fetchBrands());
    }
  }, [dispatch]);

  useEffect(() => {
    if (favoriteProduct) {
      setFavorite(true);
    } else {
      setFavorite(false);
    }
  }, [favoriteProduct]);

  useEffect(() => {
    const fetchTagValues = async () => {
      try {
        const tags = await createTagValues(product);
        setTagValues(tags);
      } catch (err) {
        setError("Failed to load tag values");
      } finally {
        setLoading(false);
      }
    };

    fetchTagValues();
  }, [product]);

  // Reset `outletNAme` when `productId` changes
  useEffect(() => {
    if (productId) {
      // dispatch(setSelectedOutlet(null));
      dispatch(setSelectProductStatus(null));
    }
  }, [productId, dispatch]);

  useEffect(() => {
    if (productId && productId !== product?._id) {
      dispatch(setProductId("")); // Set `productId` to an empty string if they don't match
      dispatch(setSelectProductStatus(null));
    }
  }, [productId, dispatch]);


  useEffect(() => {
    return () => {
      // Clear selectedOutlet when the component unmounts (e.g., page close/navigation)
      // dispatch(setSelectedOutlet(null));
      dispatch(setProductId(""));
      dispatch(setSelectProductStatus(null));
      dispatch(setProductName(""));
    };
  }, [dispatch]);

  const getOutletName = (outletId) => {
    const outlet = outlets?.outlets?.outlet?.find((outlet) => outlet?._id === outletId);
    return outlet ? outlet.outletName : null;
  };

  // const handleBuyNow = () => {
  //   dispatch(addToCart(product));
  //   router.push("/checkout");
  // };

  const showNotification = (message) => {
    console.log("showNotification called", message);

    dispatch(showNotificationWithTimeout(message));
  };

  const handleAddToCart = () => {
    setIsLoading(true);
    showNotification("Product Add to Cart successfully!");
    setTimeout(() => {
      dispatch(addToCart(product));
      setIsLoading(false);
      setIsAdded(true);

      setTimeout(() => {
        setIsAdded(false);
      }, 1500);
    }, 2000);
  };

  const outletAreas = cities?.cities?.find((city) => city.cityName === selectedOutletCity)?.areas || [];

  const isAvailable = filteredOutlets.some(
    outlet => productId === outlet.productId && outlet.available
  );
  // const productId = useSelector((state) => state.outlet.productId);
  // const outletNAme = useSelector((state) => state.outlet.selectedOutlet);
  // const showroom = getOutletName(outletNAme) || "Select Showroom";
  // console.log(showroom);

  // const productId = useSelector((state) => state.product.productId);


  const toggleDropdown = (dropdownName) => {
    setOpenDropdown(openDropdown === dropdownName ? null : dropdownName);
  };

  const handleOpenDrawer = () => {
    dispatch(setProductId(product?._id))
    setOutletDrawerOpen(true);
  }

  const handleOpenAreaDrawer = () => {
    setAreaDrawerOpen(true);
  }

  // Only call `getOutletName` if `productId` exists
  const showroom = productId ? getOutletName(outletName) || "Select Showroom" : "Select Showroom";
  const areas = cities?.cities?.find((city) => city.cityName === selectedCity)?.areas || [];

  const handleOptionClick = (option) => {
    setAvailability(option); // Update selected option
    // setOpenOutletDropdown(false); // Close dropdown after selection
    setOpenDropdown(null);
  };
  const handleCitySelect = (cityName) => {
    setSelectedCity(cityName); // Update selected city
    setSelectedOutletCity(cityName);
    setSelectedArea("Area"); // Reset area selection
    setOpenDropdown(null);
  };
  const handleAreaSelect = (areaName) => {
    setSelectedArea(areaName); // Update selected area
    setOpenDropdown(null);  // Close area dropdown after selection
  };

  const logoSrc = [
    { src: FacebookLogo, alt: "Facebook Logo", link: "/product" },
    { src: TwitterLogo, alt: "Twitter Logo", link: "/product" },
    { src: PinterestLogo, alt: "Pinterest Logo", link: "/product" },
    { src: WhatsAppLogo, alt: "WhatsApp Logo", link: "/product" },
    { src: LinkedinLogo, alt: "Linkedin Logo", link: "/product" },
  ];

  const getBaseUrl = () => {
    if (typeof window !== "undefined") {
      return window.location.origin;
    }
    return "";
  };
  const handleCloseDrawer = () => {
    setShowDetails(false);
    setSelectedOutletCity("City");
    setOpenDropdown(null);
    setOutletDrawerOpen(false);
    // dispatch(setShowroom(null)); // Reset showroom when closing the drawer
  };
  const handleAreaCloseDrawer = () => {
    setOpenDropdown(null);
    setAreaDrawerOpen(false);
    // dispatch(setShowroom(null)); // Reset showroom when closing the drawer
  };

  const pathWithoutDomain = pathName.replace(getBaseUrl(), "");

  const pathParts = pathWithoutDomain.split("/").filter((part) => part);


  const toTitleCase = (str) => {
    return str
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");
  };
  const allOutlets = outlets?.outlets?.outlet;


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

  const tagValues = [
    {
      link: "/",
      value: "Home",
    },
    ...pathParts.map((part, index) => {
      const link = `/${pathParts.slice(0, index + 1).join("/")}`;

      return {
        link,
        value: toTitleCase(part),
      };
    }),
  ];

  const productDataTabs = [
    {
      title: "Descriptions",
      content: (
        <section
          className="my-5"
          dangerouslySetInnerHTML={{ __html: product?.productDescription }}
        />
      ),
    },
    {
      title: "Specifications",
      content: (
        <section className="my-5">
          <table className="w-full">
            <tbody>
              <tr>
                <td className="border px-5 py-2">Brand:</td>
                <td className="border px-5 py-2">
                  {
                    brands?.find((brand) => brand._id === product?.productBrand)
                      ?.name
                  }
                </td>
              </tr>
              {product?.productSpecification?.map((spec, i) => (
                <tr key={i}>
                  <td className="border px-5 py-2 w-1/2">{spec.key}</td>
                  <td className="border px-5 py-2 w-1/2">{spec.value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      ),
    },
  ];

  return (
    <section className="container">
      <NotificationToast />
      <div className="my-10">
        <TagLine tagValues={tagValues} />
        <section className="bg-white rounded-md shadow-md p-5 border-t">
          <h1 className="text-[#202435] text-lg font-semibold">
            {product?.productName}
          </h1>
          <div className="flex flex-col md:flex-col lg:flex-row justify-between items-start lg:gap-x-10">
            <div className="">
              <ImageShow
                product={product}
                productImage={product?.productImage}
                productGallery={product?.productGallery}
              />
            </div>

            <div className="my-5 md:w-full lg:w-1/3 ">
              <p
                className={`
                ${product?.inventory?.stockStatus === "In Stock"
                    ? "text-[#70BE38] bg-[#E5F8ED]"
                    : "text-red-400 bg-red-100"
                  }  text-xs font-semibold px-3 py-1 inline-block rounded-full
                `}
              >
                {product?.inventory?.stockStatus}
              </p>
              <p className="text-[#202435] font-semibold my-2">
                MRP Price: ৳
                {product?.general?.regularPrice.toLocaleString("en-BD")}
              </p>
              <p className="text-[#F16521] font-semibold mb-2">
                Offer Price: ৳
                {product?.general?.salePrice.toLocaleString("en-BD")}
              </p>
              <section
                className="my-5 min-h-48 [&_ul]:list-disc [&_ol]:list-decimal [&_li]:ml-10"
                dangerouslySetInnerHTML={{
                  __html: product?.productShortDescription,
                }}
              />

              <div className="my-10">
                <div className="mb-2 flex items-center justify-between text-sm">
                  <span className="font-semibold">How to get it</span>
                  {/* <button
                    onClick={() => dispatch(openOutletDrawer())}
                    className="underline"
                  >
                    Change store
                  </button> */}
                </div>
                <div className="border rounded-md text-sm p-3 default-transition divide-y-2 divide-gray-100 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-start gap-3">
                      <div className="w-10">
                        <Image
                          src={deliverySvg}
                          alt="delivery Icon"
                          className="w-7 flex mx-auto"
                        />
                      </div>

                      <div className="flex flex-col items-start">
                        <h6 className="font-semibold">{selectArea === "Enter Area" ? (
                          <span>Delivery Area</span>
                        ) : (
                          <span className="text-nowrap">
                            {selectArea}
                          </span>
                        )}</h6>
                        <div className="flex items-center">
                          {/* <div className="w-3 h-3 bg-[#70BE38] rounded-full mr-2"></div> */}
                          {/* <div className={`w-3 h-3 rounded-full mr-2 ${product?.productName ? (isAvailable ? "bg-[#70BE38]" : "bg-red-400") : "bg-gray-300"
                            }`}></div> */}
                          <div className={`w-3 h-3 rounded-full mr-2 ${selectArea !== "Enter Area" ? "bg-[#70BE38]" : "bg-gray-300"
                            }`}></div>
                          {selectArea === "Enter Area" ? (
                            <span>Add area for Delivery</span>
                          ) : (
                            <span className="text-nowrap">
                              <span>Available</span>
                            </span>
                          )}
                          {/* <span>Available</span> */}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        className="w-5 h-5 text-gray-300 cursor-pointer"
                        onClick={() => {
                          dispatch(setProductName(product?.productName));
                          dispatch(openAreaDrawer());
                        }}
                      // onClick={handleOpenAreaDrawer}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </div>
                  </div>
                  <div className="flex items-center justify-between pt-3">
                    <div className="flex items-start gap-3">
                      <div className="w-10">
                        <Image
                          src={shopSvg}
                          alt="Shop Icon"
                          className="w-6 flex mx-auto"
                        />
                      </div>

                      <div className="flex flex-col items-start">
                        <h6 className="font-semibold">{productOutlet?.outletName || showroom}</h6>
                        {productId && productStatus !== null && productOutlet?.outletName ? (
                          <>
                            {/* <div className="flex items-center">
                          <div className={`w-3 h-3 rounded-full mr-2 ${productOutlet?.pickUpAvailable ? "bg-[#70BE38]" : "bg-red-400"
                            }`}></div>
                          <span className="cursor-pointer" onClick={() => {
                            dispatch(setProductId(product?._id));
                            dispatch(openOutletDrawer());
                          }}> Click and collect {productOutlet?.pickUpAvailable ? "Pick up - Available" : "Pick up - Unavailable"}</span>
                        </div> */}

                            {/* Pickup Availability */}
                            <div className="flex items-center">
                              <div
                                className={`w-3 h-3 rounded-full mr-2 ${productStatus?.pickUpAvailable ? "bg-[#70BE38]" : "bg-red-400"
                                  }`}
                              ></div>
                              <span>
                                Pick up - {productStatus?.pickUpAvailable ? "Available" : "Unavailable"}
                              </span>
                            </div>

                            {/* Store Stock */}
                            <div className="flex items-center mt-2">
                              <div
                                className={`w-3 h-3 rounded-full mr-2 ${productStatus?.inStoreStock ? "bg-[#70BE38]" : "bg-red-400"
                                  }`}
                              ></div>
                              <span>Store - {productStatus?.inStoreStock ? "In stock" : "Out of stock"}</span>
                            </div>
                          </>
                        ) : (
                          <div className="flex items-center">
                            <div className={"w-3 h-3 rounded-full mr-2  bg-gray-300"
                            }></div>
                            <span className="cursor-pointer" onClick={() => {
                              dispatch(setProductId(product?._id));
                              dispatch(openOutletDrawer());
                            }}>Click and collect </span>
                          </div>
                        )}


                        {/* <div className="flex items-center">
                              <div className={`
                ${productOutlet?.inStoreStock
                                  ? "bg-[#70BE38]"
                                  : "bg-red-400"
                                }  w-3 h-3 rounded-full mr-2
                `}></div>
                              <span>Store - {productOutlet?.inStoreStock ? "In stock" : "Out of stock"}</span>
                            </div> */}


                        {/* <h6 className="font-semibold">
                          {outletInfo?.outletName || showroom}
                        </h6>

                        {productId && outletInfo?.outletName ? (
                          <> */}
                        {/* Pickup Availability */}
                        {/* <div className="flex items-center">
                              <div
                                className={`w-3 h-3 rounded-full mr-2 ${outletInfo?.pickUpAvailable ? "bg-[#70BE38]" : "bg-red-400"
                                  }`}
                              ></div>
                              <span>
                                Pick up - {outletInfo?.pickUpAvailable ? "Available" : "Unavailable"}
                              </span>
                            </div> */}

                        {/* Store Stock */}
                        {/* <div className="flex items-center mt-2">
                              <div
                                className={`w-3 h-3 rounded-full mr-2 ${outletInfo?.inStoreStock ? "bg-[#70BE38]" : "bg-red-400"
                                  }`}
                              ></div>
                              <span>Store - {outletInfo?.inStoreStock ? "In stock" : "Out of stock"}</span>
                            </div>
                          </>
                        ) : (
                          <div className="flex items-center">
                            <div className={"w-3 h-3 rounded-full mr-2  bg-gray-300"
                            }></div>
                            <span className="cursor-pointer" onClick={() => {
                              dispatch(setProductId(product?._id));
                              dispatch(openOutletDrawer());
                            }}>Click and collect </span>
                          </div>
                        )} */}



                      </div>
                    </div>

                    <div className="flex items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        className="w-5 h-5 text-gray-300 cursor-pointer"
                        onClick={() => {
                          dispatch(setProductId(product?._id));
                          dispatch(openOutletDrawer());
                        }}
                      // onClick={handleOpenDrawer}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-between gap-3 my-5">
                <div className="flex justify-start items-center gap-x-5">
                  <div>
                    <button
                      onClick={() =>
                        dispatch(updateQuantity({ id: cartItem?._id, quantity: -1 }))
                      }
                      className="w-[44px] h-[44px] rounded-full shadow-sm bg-[#EDEEF5] font-semibold"
                    >
                      -
                    </button>
                  </div>
                  {/* <div>{product?.quantity}</div> */}
                  <div> {cartItem?.quantity} </div>
                  <div>
                    <button
                      onClick={() =>
                        dispatch(updateQuantity({ id: cartItem?._id, quantity: 1 }))
                      }
                      className="w-[44px] h-[44px] rounded-full shadow-sm bg-[#EDEEF5] font-semibold"
                    >
                      +
                    </button>
                  </div>
                </div>

                <motion.button
                  type="button"
                  onClick={handleAddToCart}
                  className="flex justify-center items-center w-full py-2 text-white bg-[#F16521] rounded-full text-sm"
                  whileTap={{ scale: 0.95 }}
                  disabled={isLoading || isAdded}
                >
                  {isLoading ? (
                    <motion.div
                      className="w-5 h-5 bg-[#78766eb1]"
                      style={{ borderRadius: "5px" }}
                      animate={{ rotate: 360 }}
                      transition={{
                        duration: 0.8,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                    />
                  ) : isAdded ? (
                    <div className="flex items-center">
                      <span className="text-black font-bold text-sm mr-2">✓</span>
                      <span>Added!</span>
                    </div>
                  ) : (
                    "Add to Cart"
                  )}
                </motion.button>
              </div>

              <div className="flex justify-start items-center border-b-2 pb-10">
                <button
                  onClick={() => {
                    if (favorite) {
                      dispatch(removeFromWishlist(product._id)); // Dispatch the remove action
                    } else {
                      dispatch(addToWishlist(product)); // Dispatch the add action
                    }
                  }}
                  // disabled={favorite}
                  className={`text-xs text-[#9B9BB4] border px-3 py-2 rounded-full flex justify-center items-center uppercase ${favorite ? "cursor-pointer" : "cursor-pointer"
                    }`}
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 14 15"
                    fill={favorite ? "#868B9F" : "none"}
                    className="mr-2"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M11.3364 3.02526C9.82075 2.09557 8.49793 2.47022 7.70328 3.067C7.37739 3.3117 7.21451 3.43405 7.11865 3.43405C7.0228 3.43405 6.85991 3.3117 6.53402 3.067C5.73938 2.47022 4.41655 2.09557 2.90092 3.02526C0.911824 4.24538 0.461739 8.2706 5.04981 11.6665C5.92369 12.3133 6.36062 12.6367 7.11865 12.6367C7.87668 12.6367 8.31362 12.3133 9.18751 11.6665C13.7756 8.2706 13.3255 4.24538 11.3364 3.02526Z"
                      stroke="#71778E"
                      strokeWidth="0.847778"
                      strokeLinecap="round"
                    />
                  </svg>
                  {/* Add to Wishlist */}
                  {favorite ? "Remove from Wishlist" : "Add to Wishlist"}
                </button>
                <button
                  onClick={() => setOpen(true)}
                  className="text-xs text-[#9B9BB4] px-5 py-2 flex justify-center items-center uppercase"
                >
                  <Image
                    src={CompareIcon}
                    className="w-5 h-5 mr-3"
                    alt="Hard Icon"
                  />
                  Compare
                </button>
                <div>
                  <CompareProduct
                    open={open}
                    setOpen={setOpen}
                    currentProduct={product}
                  />
                </div>
              </div>

              <div className="mt-10 text-[#9B9BB4]  ">
                <p>
                  <span className="mr-1">Categories:</span>{" "}
                  {/* {categoryName?.join(", ")} */}
                  {categoryName?.map((category, index) => (

                    <>
                      <Link href={`/${category.link}`} className="text-[#9B9BB4] hover:underline">
                        {category.categoryName}
                      </Link>
                      {index < categoryName.length - 1 && ", "}
                    </>

                  ))}
                </p>
              </div>

              <div className="mt-10 flex justify-center items-center gap-3">
                {logoSrc.map((src, index) => (
                  <Link
                    href={src.link}
                    key={index}
                    className="w-8 h-8 object-cover cursor-pointer u"
                  >
                    <Image
                      src={src.src}
                      alt={src.alt}
                      className="cursor-pointer w-full"
                    />
                  </Link>
                ))}
              </div>
            </div>

            <div className="my-5 md:w-full lg:w-1/4">
              <div className="text-[#BE143C] bg-[#FFEEF2] p-5 text-xs rounded-md mb-5 text-center">
                <span>Largest Collection of World Class Home Appliances</span>
              </div>
              <div className="bg-[#F8F9FD] p-5 text-xs rounded-md">
                <div className="flex justify-between md:justify-start items-center gap-5">
                  <svg
                    width="20"
                    height="21"
                    viewBox="0 0 20 21"
                    fill="none"
                    className="w-10 h-10"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g clipPath="url(#clip0_707_6150)">
                      <path
                        d="M15.1508 12.68C14.6974 12.68 14.2774 12.7933 13.8908 13.02C13.5041 13.2467 13.1974 13.5567 12.9708 13.95C12.7441 14.3433 12.6308 14.7667 12.6308 15.22C12.6308 15.6733 12.7441 16.0933 12.9708 16.48C13.1974 16.8667 13.5041 17.1733 13.8908 17.4C14.2774 17.6267 14.6974 17.74 15.1508 17.74C15.6041 17.74 16.0241 17.6267 16.4108 17.4C16.7974 17.1733 17.1041 16.8667 17.3308 16.48C17.5574 16.0933 17.6708 15.6733 17.6708 15.22C17.6708 14.7667 17.5574 14.3467 17.3308 13.96C17.1041 13.5733 16.7974 13.2633 16.4108 13.03C16.0241 12.7967 15.6041 12.68 15.1508 12.68ZM15.1508 16.48C14.8174 16.48 14.5241 16.3533 14.2708 16.1C14.0174 15.8467 13.8908 15.55 13.8908 15.21C13.8908 14.87 14.0141 14.5767 14.2608 14.33C14.5074 14.0833 14.8041 13.96 15.1508 13.96C15.4974 13.96 15.7941 14.0833 16.0408 14.33C16.2874 14.5767 16.4108 14.8733 16.4108 15.22C16.4108 15.5667 16.2874 15.8633 16.0408 16.11C15.7941 16.3567 15.4974 16.48 15.1508 16.48ZM6.55078 12.68C6.09745 12.68 5.67745 12.7933 5.29078 13.02C4.90411 13.2467 4.59745 13.5567 4.37078 13.95C4.14411 14.3433 4.03078 14.7667 4.03078 15.22C4.03078 15.6733 4.14411 16.0933 4.37078 16.48C4.59745 16.8667 4.90411 17.1733 5.29078 17.4C5.67745 17.6267 6.09745 17.74 6.55078 17.74C7.00411 17.74 7.42411 17.6267 7.81078 17.4C8.19745 17.1733 8.50411 16.8667 8.73078 16.48C8.95745 16.0933 9.07078 15.6733 9.07078 15.22C9.07078 14.7667 8.95745 14.3467 8.73078 13.96C8.50411 13.5733 8.19745 13.2633 7.81078 13.03C7.42411 12.7967 7.00411 12.68 6.55078 12.68ZM6.55078 16.48C6.20411 16.48 5.90745 16.3567 5.66078 16.11C5.41411 15.8633 5.29078 15.5667 5.29078 15.22C5.29078 14.8733 5.41411 14.5767 5.66078 14.33C5.90745 14.0833 6.20411 13.96 6.55078 13.96C6.89745 13.96 7.19411 14.0833 7.44078 14.33C7.68745 14.5767 7.81078 14.87 7.81078 15.21C7.81078 15.55 7.68745 15.8467 7.44078 16.1C7.19411 16.3533 6.89745 16.48 6.55078 16.48ZM16.8508 5.47999C16.7974 5.37332 16.7208 5.28666 16.6208 5.21999C16.5208 5.15332 16.4108 5.11999 16.2908 5.11999H12.9708V6.37999H15.9108L17.6108 9.79999L18.7508 9.23999L16.8508 5.47999ZM4.65078 14.6H2.47078C2.29745 14.6 2.14745 14.66 2.02078 14.78C1.89411 14.9 1.83078 15.05 1.83078 15.23C1.83078 15.41 1.89411 15.56 2.02078 15.68C2.14745 15.8 2.29745 15.86 2.47078 15.86H4.65078C4.82411 15.86 4.97411 15.8 5.10078 15.68C5.22745 15.56 5.29078 15.4133 5.29078 15.24C5.29078 15.0667 5.22745 14.9167 5.10078 14.79C4.97411 14.6633 4.82411 14.6 4.65078 14.6ZM19.9108 10.74L18.6708 9.15999C18.5374 8.98666 18.3774 8.89999 18.1908 8.89999H13.6108V4.49999C13.6108 4.32666 13.5474 4.17666 13.4208 4.04999C13.2941 3.92332 13.1441 3.85999 12.9708 3.85999H2.47078C2.29745 3.85999 2.14745 3.91999 2.02078 4.03999C1.89411 4.15999 1.83078 4.30999 1.83078 4.48999C1.83078 4.66999 1.89078 4.81999 2.01078 4.93999C2.13078 5.05999 2.28411 5.11999 2.47078 5.11999H12.3508V9.53999C12.3508 9.71332 12.4108 9.85999 12.5308 9.97999C12.6508 10.1 12.7974 10.16 12.9708 10.16H17.8708L18.7908 11.36V14.6H17.0508C16.8774 14.6 16.7274 14.66 16.6008 14.78C16.4741 14.9 16.4108 15.05 16.4108 15.23C16.4108 15.41 16.4741 15.56 16.6008 15.68C16.7274 15.8 16.8774 15.86 17.0508 15.86H19.4308C19.6041 15.86 19.7508 15.8 19.8708 15.68C19.9908 15.56 20.0508 15.4133 20.0508 15.24V11.14C20.0508 10.98 20.0041 10.8467 19.9108 10.74ZM4.61078 11.4H1.71078C1.53745 11.4 1.39078 11.4633 1.27078 11.59C1.15078 11.7167 1.09078 11.8667 1.09078 12.04C1.09078 12.2133 1.15078 12.36 1.27078 12.48C1.39078 12.6 1.53745 12.66 1.71078 12.66H4.61078C4.78411 12.66 4.93411 12.6 5.06078 12.48C5.18745 12.36 5.25078 12.2133 5.25078 12.04C5.25078 11.8667 5.18745 11.7167 5.06078 11.59C4.93411 11.4633 4.78411 11.4 4.61078 11.4ZM6.05078 8.91999H0.690781C0.517448 8.91999 0.367448 8.98332 0.240781 9.10999C0.114115 9.23666 0.0507812 9.38666 0.0507812 9.55999C0.0507812 9.73332 0.114115 9.87999 0.240781 9.99999C0.367448 10.12 0.517448 10.18 0.690781 10.18H6.05078C6.22411 10.18 6.37411 10.12 6.50078 9.99999C6.62745 9.87999 6.69078 9.73332 6.69078 9.55999C6.69078 9.38666 6.62745 9.23666 6.50078 9.10999C6.37411 8.98332 6.22411 8.91999 6.05078 8.91999ZM7.09078 6.45999H1.71078C1.53745 6.45999 1.39078 6.51999 1.27078 6.63999C1.15078 6.75999 1.09078 6.90666 1.09078 7.07999C1.09078 7.25332 1.15078 7.40332 1.27078 7.52999C1.39078 7.65666 1.53745 7.71999 1.71078 7.71999H7.09078C7.26411 7.71999 7.41078 7.65666 7.53078 7.52999C7.65078 7.40332 7.71078 7.25332 7.71078 7.07999C7.71078 6.90666 7.65078 6.75999 7.53078 6.63999C7.41078 6.51999 7.26411 6.45999 7.09078 6.45999Z"
                        fill="#202435"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_707_6150">
                        <rect
                          width="20"
                          height="20"
                          fill="white"
                          transform="matrix(1 0 0 -1 0 20.8)"
                        />
                      </clipPath>
                    </defs>
                  </svg>

                  <span>Largest Collection of World Class Home Appliances</span>
                </div>
                <div className="flex justify-between md:justify-start items-center gap-5 my-10">
                  <svg
                    width="20"
                    height="21"
                    viewBox="0 0 20 21"
                    fill="none"
                    className="w-10 h-10"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g clipPath="url(#clip0_707_6157)">
                      <path
                        d="M18.3385 11.06C18.2451 10.8867 18.2451 10.7134 18.3385 10.54L19.0785 9.02005C19.2918 8.59338 19.3251 8.15672 19.1785 7.71005C19.0318 7.26338 18.7451 6.92672 18.3185 6.70005L16.8185 5.92005C16.6451 5.82672 16.5451 5.68672 16.5185 5.50005L16.2185 3.82005C16.1385 3.35338 15.9085 2.98338 15.5285 2.71005C15.1485 2.43672 14.7251 2.33338 14.2585 2.40005L12.5785 2.64005C12.3918 2.66672 12.2318 2.61338 12.0985 2.48005L10.8785 1.30005C10.5451 0.966717 10.1418 0.800049 9.66846 0.800049C9.19512 0.800049 8.78512 0.966717 8.43846 1.30005L7.21846 2.48005C7.08512 2.61338 6.92512 2.66672 6.73846 2.64005L5.05846 2.40005C4.59179 2.33338 4.16846 2.43672 3.78846 2.71005C3.40846 2.98338 3.17846 3.35338 3.09846 3.82005L2.79846 5.50005C2.77179 5.68672 2.67179 5.82672 2.49846 5.92005L0.998458 6.70005C0.571791 6.92672 0.285124 7.26338 0.138458 7.71005C-0.00820891 8.15672 0.0251244 8.59338 0.238458 9.02005L0.998458 10.54C1.09179 10.7134 1.09179 10.8867 0.998458 11.06L0.238458 12.58C0.0251244 13.0067 -0.00820891 13.44 0.138458 13.88C0.285124 14.32 0.571791 14.6534 0.998458 14.88L2.49846 15.68C2.67179 15.7734 2.77179 15.9134 2.79846 16.1L3.09846 17.78C3.16512 18.1934 3.35846 18.5367 3.67846 18.81C3.99846 19.0834 4.37179 19.22 4.79846 19.22C4.90512 19.22 4.99179 19.2134 5.05846 19.2L6.73846 18.96C6.92512 18.9334 7.08512 18.9867 7.21846 19.12L8.43846 20.3C8.77179 20.6334 9.17846 20.8 9.65846 20.8C10.1385 20.8 10.5451 20.6334 10.8785 20.3L12.0985 19.12C12.2318 18.9867 12.3918 18.9334 12.5785 18.96L14.2585 19.2C14.7251 19.2667 15.1485 19.1634 15.5285 18.89C15.9085 18.6167 16.1385 18.2467 16.2185 17.78L16.5185 16.1C16.5451 15.9134 16.6451 15.7734 16.8185 15.68L18.3185 14.88C18.7451 14.6534 19.0318 14.32 19.1785 13.88C19.3251 13.44 19.2918 13.0067 19.0785 12.58L18.3385 11.06ZM17.7785 13.88L16.2785 14.66C16.0385 14.7934 15.8418 14.9667 15.6885 15.18C15.5351 15.3934 15.4318 15.6334 15.3785 15.9L15.0985 17.58C15.0718 17.74 14.9918 17.8667 14.8585 17.96C14.7251 18.0534 14.5785 18.0867 14.4185 18.06L12.7385 17.82C12.4851 17.78 12.2285 17.8034 11.9685 17.89C11.7085 17.9767 11.4851 18.1134 11.2985 18.3L10.0785 19.48C9.97179 19.5867 9.83512 19.64 9.66846 19.64C9.50179 19.64 9.36512 19.5867 9.25846 19.48L8.03846 18.3C7.67846 17.9667 7.27179 17.8 6.81846 17.8L6.57846 17.82L4.89846 18.06C4.73846 18.0867 4.59179 18.0534 4.45846 17.96C4.32512 17.8667 4.24512 17.74 4.21846 17.58L3.93846 15.9C3.88512 15.6334 3.78179 15.3934 3.62846 15.18C3.47512 14.9667 3.27846 14.7934 3.03846 14.66L1.53846 13.88C1.39179 13.8134 1.29512 13.7034 1.24846 13.55C1.20179 13.3967 1.21179 13.2467 1.27846 13.1L2.01846 11.56C2.13846 11.32 2.19846 11.0667 2.19846 10.8C2.19846 10.5334 2.13846 10.28 2.01846 10.04L1.27846 8.50005C1.21179 8.35338 1.20179 8.20338 1.24846 8.05005C1.29512 7.89672 1.39179 7.78672 1.53846 7.72005L3.03846 6.94005C3.27846 6.80672 3.47512 6.63338 3.62846 6.42005C3.78179 6.20672 3.88512 5.96672 3.93846 5.70005L4.21846 4.02005C4.24512 3.86005 4.32512 3.73338 4.45846 3.64005C4.59179 3.54672 4.73846 3.51338 4.89846 3.54005L6.57846 3.78005C6.83179 3.82005 7.08846 3.79672 7.34846 3.71005C7.60846 3.62338 7.83846 3.48672 8.03846 3.30005L9.25846 2.12005C9.36512 2.01338 9.50179 1.96005 9.66846 1.96005C9.83512 1.96005 9.97179 2.01338 10.0785 2.12005L11.2985 3.30005C11.4851 3.48672 11.7085 3.62338 11.9685 3.71005C12.2285 3.79672 12.4851 3.82005 12.7385 3.78005L14.4185 3.54005C14.5785 3.51338 14.7251 3.54672 14.8585 3.64005C14.9918 3.73338 15.0718 3.86005 15.0985 4.02005L15.3785 5.70005C15.4318 5.96672 15.5351 6.20672 15.6885 6.42005C15.8418 6.63338 16.0385 6.80672 16.2785 6.94005L17.7785 7.72005C17.9251 7.78672 18.0218 7.89672 18.0685 8.05005C18.1151 8.20338 18.1051 8.35338 18.0385 8.50005L17.2985 10.04C17.1785 10.28 17.1185 10.5334 17.1185 10.8C17.1185 11.0667 17.1785 11.32 17.2985 11.56L18.0385 13.1C18.1051 13.2467 18.1151 13.3967 18.0685 13.55C18.0218 13.7034 17.9251 13.8134 17.7785 13.88ZM13.8785 6.58005C13.7718 6.47338 13.6351 6.42005 13.4685 6.42005C13.3018 6.42005 13.1651 6.47338 13.0585 6.58005L5.43846 14.2C5.33179 14.3067 5.27846 14.44 5.27846 14.6C5.27846 14.76 5.33512 14.8967 5.44846 15.01C5.56179 15.1234 5.69179 15.18 5.83846 15.18C5.98512 15.18 6.12512 15.1267 6.25846 15.02L13.8785 7.40005C13.9851 7.29338 14.0385 7.16005 14.0385 7.00005C14.0385 6.84005 13.9851 6.70005 13.8785 6.58005ZM7.35846 5.60005C6.97179 5.60005 6.61512 5.69672 6.28846 5.89005C5.96179 6.08338 5.70512 6.34005 5.51846 6.66005C5.33179 6.98005 5.23846 7.33338 5.23846 7.72005C5.23846 8.10672 5.33179 8.46005 5.51846 8.78005C5.70512 9.10005 5.96179 9.35672 6.28846 9.55005C6.61512 9.74338 6.97179 9.84005 7.35846 9.84005C7.74512 9.84005 8.09846 9.74338 8.41846 9.55005C8.73846 9.35672 8.99179 9.10005 9.17846 8.78005C9.36512 8.46005 9.45846 8.10672 9.45846 7.72005C9.45846 7.33338 9.36512 6.98005 9.17846 6.66005C8.99179 6.34005 8.73512 6.08338 8.40846 5.89005C8.08179 5.69672 7.73179 5.60005 7.35846 5.60005ZM7.35846 8.68005C7.09179 8.68005 6.86512 8.58672 6.67846 8.40005C6.49179 8.21338 6.39846 7.98672 6.39846 7.72005C6.39846 7.45338 6.49179 7.22672 6.67846 7.04005C6.86512 6.85338 7.09179 6.76005 7.35846 6.76005C7.62512 6.76005 7.85179 6.85338 8.03846 7.04005C8.22512 7.22672 8.31846 7.45338 8.31846 7.72005C8.31846 7.98672 8.22512 8.21338 8.03846 8.40005C7.85179 8.58672 7.62512 8.68005 7.35846 8.68005ZM11.9585 11.76C11.5718 11.76 11.2185 11.8534 10.8985 12.04C10.5785 12.2267 10.3251 12.4834 10.1385 12.81C9.95179 13.1367 9.85846 13.4934 9.85846 13.88C9.85846 14.4667 10.0618 14.9634 10.4685 15.37C10.8751 15.7767 11.3718 15.98 11.9585 15.98C12.3451 15.98 12.7018 15.8867 13.0285 15.7C13.3551 15.5134 13.6118 15.26 13.7985 14.94C13.9851 14.62 14.0785 14.2667 14.0785 13.88C14.0785 13.4934 13.9851 13.14 13.7985 12.82C13.6118 12.5 13.3551 12.2434 13.0285 12.05C12.7018 11.8567 12.3451 11.76 11.9585 11.76ZM11.9585 14.84C11.7051 14.84 11.4818 14.7434 11.2885 14.55C11.0951 14.3567 10.9985 14.13 10.9985 13.87C10.9985 13.61 11.0951 13.3867 11.2885 13.2C11.4818 13.0134 11.7085 12.92 11.9685 12.92C12.2285 12.92 12.4518 13.0134 12.6385 13.2C12.8251 13.3867 12.9185 13.6134 12.9185 13.88C12.9185 14.1467 12.8251 14.3734 12.6385 14.56C12.4518 14.7467 12.2251 14.84 11.9585 14.84Z"
                        fill="#202435"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_707_6157">
                        <rect
                          width="20"
                          height="20"
                          fill="white"
                          transform="matrix(1 0 0 -1 0 20.8)"
                        />
                      </clipPath>
                    </defs>
                  </svg>

                  <span>Follow Us for Every Occasional Campaign Discounts</span>
                </div>
                <div className="flex justify-between md:justify-start items-center gap-5">
                  <svg
                    width="20"
                    height="21"
                    viewBox="0 0 20 21"
                    fill="none"
                    className="w-10 h-10"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g clipPath="url(#clip0_707_6164)">
                      <path
                        d="M10.0508 0.800049C8.23745 0.800049 6.55745 1.25338 5.01078 2.16005C3.50411 3.05338 2.30411 4.25338 1.41078 5.76005C0.504115 7.30672 0.0507812 8.98672 0.0507812 10.8C0.0507812 12.6134 0.504115 14.2934 1.41078 15.84C2.30411 17.3467 3.50411 18.5467 5.01078 19.44C6.55745 20.3467 8.23745 20.8 10.0508 20.8C11.8641 20.8 13.5441 20.3467 15.0908 19.44C16.5974 18.5467 17.7974 17.3467 18.6908 15.84C19.5974 14.2934 20.0508 12.6134 20.0508 10.8C20.0508 8.98672 19.5974 7.30672 18.6908 5.76005C17.7974 4.25338 16.5974 3.05338 15.0908 2.16005C13.5441 1.25338 11.8641 0.800049 10.0508 0.800049ZM10.0508 19.56C8.47745 19.56 7.01078 19.16 5.65078 18.36C4.33078 17.5867 3.28411 16.54 2.51078 15.22C1.71078 13.86 1.31078 12.3867 1.31078 10.8C1.31078 9.21338 1.71078 7.74005 2.51078 6.38005C3.28411 5.06005 4.33078 4.01338 5.65078 3.24005C7.01078 2.44005 8.48078 2.04005 10.0608 2.04005C11.6408 2.04005 13.1108 2.44005 14.4708 3.24005C15.7908 4.01338 16.8374 5.06005 17.6108 6.38005C18.4108 7.74005 18.8108 9.21338 18.8108 10.8C18.8108 12.3867 18.4108 13.86 17.6108 15.22C16.8374 16.54 15.7908 17.5867 14.4708 18.36C13.1108 19.16 11.6374 19.56 10.0508 19.56ZM10.0508 10.18C9.54411 10.18 9.10411 10.0567 8.73078 9.81005C8.35745 9.56338 8.17078 9.27005 8.17078 8.93005C8.17078 8.59005 8.35745 8.29672 8.73078 8.05005C9.10411 7.80338 9.54411 7.68005 10.0508 7.68005C10.6374 7.68005 11.1241 7.84005 11.5108 8.16005C11.6441 8.28005 11.7974 8.33672 11.9708 8.33005C12.1441 8.32338 12.2874 8.25338 12.4008 8.12005C12.5141 7.98672 12.5641 7.83338 12.5508 7.66005C12.5374 7.48672 12.4708 7.34672 12.3508 7.24005C11.9108 6.84005 11.3508 6.58672 10.6708 6.48005V5.80005C10.6708 5.62672 10.6108 5.48005 10.4908 5.36005C10.3708 5.24005 10.2241 5.18005 10.0508 5.18005C9.87745 5.18005 9.73078 5.24005 9.61078 5.36005C9.49078 5.48005 9.43078 5.62672 9.43078 5.80005V6.48005C8.71078 6.58672 8.11411 6.87005 7.64078 7.33005C7.16745 7.79005 6.93078 8.32005 6.93078 8.92005C6.93078 9.37338 7.07078 9.79005 7.35078 10.17C7.63078 10.55 8.01078 10.8534 8.49078 11.08C8.97078 11.3067 9.49078 11.42 10.0508 11.42C10.5574 11.42 10.9974 11.5434 11.3708 11.79C11.7441 12.0367 11.9308 12.33 11.9308 12.67C11.9308 13.01 11.7441 13.3034 11.3708 13.55C10.9974 13.7967 10.5574 13.92 10.0508 13.92C9.46411 13.92 8.97745 13.76 8.59078 13.44C8.45745 13.32 8.30411 13.2634 8.13078 13.27C7.95745 13.2767 7.81411 13.3467 7.70078 13.48C7.58745 13.6134 7.53745 13.7667 7.55078 13.94C7.56411 14.1134 7.63745 14.2534 7.77078 14.36C8.18411 14.76 8.73745 15.0134 9.43078 15.12V15.8C9.43078 15.9734 9.49078 16.12 9.61078 16.24C9.73078 16.36 9.87745 16.42 10.0508 16.42C10.2241 16.42 10.3708 16.36 10.4908 16.24C10.6108 16.12 10.6708 15.9734 10.6708 15.8V15.12C11.3908 15.0134 11.9874 14.73 12.4608 14.27C12.9341 13.81 13.1708 13.28 13.1708 12.68C13.1708 12.2267 13.0308 11.81 12.7508 11.43C12.4708 11.05 12.0908 10.7467 11.6108 10.52C11.1308 10.2934 10.6108 10.18 10.0508 10.18Z"
                        fill="#202435"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_707_6164">
                        <rect
                          width="20"
                          height="20"
                          fill="white"
                          transform="matrix(1 0 0 -1 0 20.8)"
                        />
                      </clipPath>
                    </defs>
                  </svg>

                  <span>
                    We Assure Best Quality & Competitive Price in the Market
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-white rounded-md shadow-md p-5 border-t my-10">
          <ProductTabs tabs={productDataTabs} />
        </section>
      </div>
      {/* <Drawer
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
                // onClick={() => {
                //   setOpenDropdown(null);
                //   setShowDetails(false);
                //   setSelectedOutletCity("City");
                //   dispatch(closeOutletDrawer());
                // }}
                onClick={handleCloseDrawer}
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

                      // {/* Custom dropdown showing availability options */}
      {/* {openDropdown === "availability" && (
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
                            Unavailable
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
                      </button> */}

      {/* Dropdown showing cities */}
      {/* {openDropdown === "city" && (
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

                <div className="space-y-4" onClick={() => { setOpenDropdown(null); }}>
                  {matchingOutlets?.map((item, i) => {

                    const isAvailable = filteredOutlets.some(
                      outlet => productId === outlet.productId && outlet.available
                    );

                    const outletInfo = {
                      outletName: item?.outletName,
                      outletLocation: item?.outletLocation,
                      pickUpAvailable: filteredOutlets.some(
                        (filter) =>
                          filter.outletDetails?.outletName === item.outletName && filter.available
                      ),
                      inStoreStock: filteredOutlets.some(
                        (filter) =>
                          filter.outletDetails?.outletName === item.outletName && !!filter.quantity
                      ),
                    };



                    return (
                      <div
                        key={i}
                        onClick={() => {
                          setShowDetails(true);
                          setSelectOutlet(item);
                          setOutletInfo(outletInfo);
                          setOpenDropdown(null);
                          setSelectedOutletCity(item?.cityName);
                          // dispatch(setSelectedOutlet(item));
                        }}
                        className={"p-4 border-2 rounded-lg bg-gray-100 hover:border-[#F16521] cursor-pointer  duration-700"}
                      >
                        <div className="flex flex-col items-start justify-between">
                          {/* <div>
                            <h3 className="font-inter font-semibold text-[16px] text-[#202435]">
                              {item?.outletName}
                            </h3>
                            <p className="font-inter text-[14px] text-[#202435]">
                              {item?.outletLocation}
                            </p>
                          </div>
                          {
                            filteredOutlets.some(filter => filter.outletDetails?.outletName === item.outletName && filter.available) ? (
                              <div className="flex items-center space-x-2 mt-3">
                                <span className="h-3 w-3 rounded-full bg-green-500"></span>
                                <span className="text-sm text-[#202435]">Pick up - Available</span>
                              </div>
                            ) : (
                              <div className="flex items-center space-x-2 mt-3">
                                <span className="h-3 w-3 rounded-full bg-red-500"></span>
                                <span className="text-sm text-[#202435]">Pick up - Unavailable</span>
                              </div>
                            )
                          }
                          {
                            filteredOutlets.some(filter => filter.outletDetails?.outletName === item.outletName && !!filter.quantity) ? (
                              <div className="flex items-center space-x-2 mt-3">
                                <span className="h-3 w-3 rounded-full bg-green-500"></span>
                                <span className="text-sm text-[#202435]">In store - In stock</span>
                              </div>
                            ) : (
                              <div className="flex items-center space-x-2 mt-3">
                                <span className="h-3 w-3 rounded-full bg-red-500"></span>
                                <span className="text-sm text-[#202435]">In store - Out of stock</span>
                              </div>
                            )
                          } */}

      {/* <div>
                            <h3 className="font-inter font-semibold text-[16px] text-[#202435]">
                              {outletInfo.outletName}
                            </h3>
                            <p className="font-inter text-[14px] text-[#202435]">
                              {outletInfo.outletLocation}
                            </p>  */}

      {/* Pick up Availability */}
      {/* <div className="flex items-center space-x-2 mt-3">
                              <span
                                className={`h-3 w-3 rounded-full ${outletInfo.pickUpAvailable ? "bg-green-500" : "bg-red-500"
                                  }`}
                              ></span>
                              <span className="text-sm text-[#202435]">
                                {outletInfo.pickUpAvailable
                                  ? "Pick up - Available"
                                  : "Pick up - Unavailable"}
                              </span>
                            </div> */}

      {/* In store Stock */}
      {/* <div className="flex items-center space-x-2 mt-3">
                              <span
                                className={`h-3 w-3 rounded-full ${outletInfo.inStoreStock ? "bg-green-500" : "bg-red-500"
                                  }`}
                              ></span>
                              <span className="text-sm text-[#202435]">
                                {outletInfo.inStoreStock
                                  ? "In store - In stock"
                                  : "In store - Out of stock"}
                              </span>
                            </div>
                          </div> */}
      {/* 
                        </div>
                      </div>
                    );
                  })}
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
              // onClick={() => {
              //   handleGoToCheckout();
              //   setShowDetails(false);
              //   dispatch(closeOutletDrawer());
              // }}
              className="w-full py-3 bg-[#F16521] text-white font-semibold rounded-lg hover:bg-[#F16521]">
              Continue With Selection
            </button>
          </div>
        </Box>
      </Drawer> */}
      {/* <Drawer
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
                onClick={() => {
                  setOpenDropdown(null);
                  setAreaDrawerOpen(false);
                }}
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
                  // defaultValue={selectCity}
                  onChange={(e) => {
                    const selectedItem = cities?.cities.find(item => item.cityName === e.target.value);
                    setSelectedCity(selectedItem?.cityName);
                    // dispatch(setSelectCity(selectedItem?.cityName));

                  }}

                >
                  <option>
                    Select a city
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
                    setSelectArea(selectedItem?.areaName);
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
                setAreaDrawerOpen(false);
              }}
              className="w-full py-3 bg-[#F16521] text-white font-semibold rounded-lg hover:bg-[#F16521]">
              Save
            </button>
          </div>
        </Box>
      </Drawer> */}
    </section>
  );
}
