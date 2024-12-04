"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, updateQuantity } from "@/redux/slice/cartSlice";
import { motion, AnimatePresence } from "framer-motion";
import { fetchApi } from "@/utils/FetchApi";
import { usePathname } from "next/navigation";
import { addToWishlist, removeFromWishlist } from "@/redux/slice/wishlistSlice";

export default function ProductCard({ product }) {
  const [productImage, setProductImage] = useState("");
  const [isInCart, setIsInCart] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [favorite, setFavorite] = useState(false);
  const [subCategory, setSubCategory] = useState([]);

  const cart = useSelector((state) => state.cart.items);
  const wishlist = useSelector((state) => state.wishlist.items);
  const favoriteProduct = wishlist.find((item) => item._id === product?._id);
  const pathName = usePathname();
  const dispatch = useDispatch();

  useEffect(() => {
    setProductImage(product?.productImage);
  }, [product]);

  useEffect(() => {
    setIsInCart(!!cart.find((item) => item._id === product?._id));
  }, [cart, product?._id]);

  useEffect(() => {
    if (favoriteProduct) {
      setFavorite(true);
    } else {
      setFavorite(false);
    }
  }, [favoriteProduct]);

  const fetchFullCategoryPath = async (
    categoryId,
    visitedCategories = new Set()
  ) => {
    try {
      const response = await fetchApi(
        `/category/getCategoryById/${categoryId}`,
        "GET"
      );
      const category = response?.category;

      if (visitedCategories.has(category?.slug)) {
        return "";
      }

      visitedCategories.add(category?.slug);

      // If there's a parent category, fetch the parent's full path
      if (category?.parentCategory) {
        const parentPath = await fetchFullCategoryPath(
          category?.parentCategory,
          visitedCategories
        );
        return `${parentPath ? `${parentPath}/` : ""}${category?.slug}`;
      }

      // If this category is the topmost (no parent), return its slug
      return category?.slug;
    } catch (error) {
      console.error(`Error fetching category with ID ${categoryId}`, error);
      return null;
    }
  };

  const getProductCategorySlugs = async (product) => {
    if (!product?.categoryId || !Array.isArray(product.categoryId)) {
      return [];
    }

    // Create a set to track visited categories to avoid duplicates
    const visitedCategories = new Set();

    // Fetch the full path for the product categories (grandparent, parent, child)
    const categorySlugs = await Promise.all(
      product.categoryId.map((categoryId) =>
        fetchFullCategoryPath(categoryId, visitedCategories)
      )
    );

    // Return an array of slugs, filtering out any empty or null values
    return categorySlugs.filter((slug) => slug);
  };

  useEffect(() => {
    getProductCategorySlugs(product)
      .then((productCategorySlugs) => {
        setSubCategory(productCategorySlugs || []);
      })
      .catch((error) => {
        console.error("Error fetching product category slugs:", error);
      });
  }, [product]);

  const handleWishlistToggle = () => {
    if (favorite) {
      dispatch(removeFromWishlist(product._id)); // Remove from wishlist
    } else {
      dispatch(addToWishlist(product)); // Add to wishlist
    }
  };

  return (
    <div
      className={`w-full min-h-full overflow-hidden border shadow-sm hover:shadow-lg duration-700 rounded-md p-2 md:p-5 mx-auto relative`}
    >
      <div className="relative group duration-700">
        {product?.general?.salePrice ? (
          <div className="absolute top-0 left-0 bg-[#F16521] rounded-full text-white z-10">
            <p className="text-sm px-3 py-1">
              {(
                ((product?.general?.regularPrice -
                  product?.general?.salePrice) /
                  product?.general?.regularPrice) *
                100
              ).toFixed(1)}
              %
            </p>
          </div>
        ) : (
          <></>
        )}
        {/* <Link
          href={`/${subCategory?.[0] ?? ""}/${subCategory?.[1] ?? ""}/${subCategory?.[2] ?? ""
            }/${product?.productSlug}`}
        >
          <div className="object-cover min-h-[200px] flex justify-center overflow-hidden">
            <Image
              src={productImage}
              width={200}
              height={200}
              alt="product"
              className="hover:scale-105 duration-700"
            />
          </div>
        </Link> */}
        {/* <div className="mt-5 flex justify-start items-center">
          <p
            className={`${product?.inventory?.stockStatus === "In Stock"
                ? "text-[#70BE38]"
                : "text-red-400"
              } text-[11px] md:text-[12px] font-semibold ${product?.inventory?.stockStatus === "In Stock"
                ? "border border-[#70BE38]"
                : "border border-red-400 bg-red-100"
              } rounded-md px-2 md:px-3 md:py-1`}
          >
            {product?.inventory?.stockStatus}
          </p>
        </div>
        <div className="mt-3">
          <Link
            href={`/${subCategory?.[0] ?? ""}/${subCategory?.[1] ?? ""}/${subCategory?.[2] ?? ""
              }/${product?.productSlug}`}
          >
            <h4 className="text-[#202435] hover:text-[#F16521] duration-700 text-[14px] md:text-[15px] font-semibold h-10 md:h-[45px] text-ellipsis overflow-hidden line-clamp-2">
              {product?.productName}
            </h4>
          </Link>
          <div className="mt-5 text-slate-500 text-[13px] md:text-[14px]">
            <div className=" ">
              Offer Price:{" "}
              <span className="font-bold text-black ml-1">
                ৳ {product?.general?.salePrice.toLocaleString("en-BD")}
              </span>{" "}
            </div>
            <div className="">
              M.R.P:
              <del className="ml-1">
                ৳ {product?.general?.regularPrice.toLocaleString("en-BD")}
              </del>
            </div>
            <div className="flex justify-start items-center text-nowrap">
              You Save:
              <div className="ml-1 flex justify-start items-center">
                {product?.general?.salePrice ? (
                  <p className="font-semibold">
                    {(
                      ((product?.general?.regularPrice -
                        product?.general?.salePrice) /
                        product?.general?.regularPrice) *
                      100
                    ).toFixed(1)}
                    %{" "}
                  </p>
                ) : (
                  <></>
                )}
                <p className="ml-1">
                  (৳
                  {(
                    product?.general?.regularPrice - product?.general?.salePrice
                  ).toLocaleString("en-BD")}
                  )
                </p>
              </div>
            </div>
          </div>

          <div className={`mt-5 w-full text-[14px] ${pathName === "/" ? "hidden" : ""}`}>
            <AnimatePresence mode="wait">
              {isInCart ? (
                <motion.div
                  key="inCart"
                  className="bg-[#FFCD00] rounded-full w-full flex justify-between items-center font-semibold"
                  initial={{ width: "60%" }}
                  animate={{ width: "100%" }}
                  exit={{ width: "60%" }}
                  transition={{ duration: 0.7 }}
                >
                  <button
                    onClick={() => {
                      const currentQuantity = cart.find(
                        (item) => item._id === product?._id
                      )?.quantity;

                      if (currentQuantity > 1) {
                        dispatch(
                          updateQuantity({ id: product?._id, quantity: -1 })
                        );
                      } else {
                        setIsInCart(false);
                        dispatch(
                          updateQuantity({ id: product?._id, quantity: -1 })
                        );
                      }
                    }}
                    className="px-3 py-2"
                  >
                    -
                  </button>
                  <button className="w-full py-2">
                    {cart.find((item) => item._id === product?._id)?.quantity}
                  </button>
                  <button
                    onClick={() => {
                      dispatch(
                        updateQuantity({ id: product?._id, quantity: 1 })
                      );
                    }}
                    className=""
                  >
                    <span className="bg-[#dbb51f] rounded-full w-2 h-2 px-3 py-2 mr-1 shadow-inner">
                      +
                    </span>
                  </button>
                </motion.div>
              ) : (
                <motion.button
                  key="addToCart"
                  onClick={() => {
                    dispatch(addToCart(product));
                    setIsInCart(true);
                  }}
                  className="bg-[#FFCD00] px-3 py-2 rounded-full w-full md:w-2/4 transition-all duration-500"
                  initial={{ width: "60%" }}
                  animate={{ width: "60%" }}
                  exit={{ width: "60%" }}
                  transition={{ duration: 0.7 }}
                >
                  <motion.span
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.9, delay: 0.1 }}
                  >
                    Add to Cart
                  </motion.span>
                </motion.button>
              )}
            </AnimatePresence>
          </div>
        </div> */}


        {/* New Demo  */}
        <div className="group relative">
          {/* <div className="absolute top-0 right-0 p-2 rounded-full shadow-md z-10 bg-[#F26522] cursor-pointer">
            <svg
              width="22"
              height="22"
              viewBox="0 0 18 17"
              fill="none"
              className="cursor-pointer"
              // onClick={() => dispatch(removeFromWishlist(product?._id))}
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M15.0789 1.18277C11.5408 -0.714809 9.00042 2.08244 9.00042 2.08244C9.00042 2.08244 6.45986 -0.714818 2.92177 1.18276C-1.36355 3.4811 -1.67127 12.4815 9.00042 16.4773C19.6721 12.4815 19.3642 3.48111 15.0789 1.18277Z"
                fill="white"
              />
            </svg>
          </div> */}

          {/* Child div: Visible when hovering over the parent */}
          {/* <div className="absolute top-0 right-0 p-2 rounded-full z-10 bg-white cursor-pointer transition-all group-hover:bg-[#F26522] group-hover:flex shadow-lg"> */}
          {/* Default Black SVG */}
          {/* <svg
              width="20"
              height="20"
              viewBox="0 0 22 22"
              fill="none"
              className="cursor-pointer transition-all group-hover:hidden"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M11 20C11 20 3.5 13.6 2 9.4C0.6 5.6 3.2 3 6.2 3.6C8.2 4 9.8 5.8 11 7C12.2 5.8 13.8 4 15.8 3.6C18.8 3 21.4 5.6 20 9.4C18.5 13.6 11 20 11 20Z"
                fill="none"
                stroke="black"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg> */}

          {/* Hover White SVG */}
          {/* <svg
              width="20"
              height="20"
              viewBox="0 0 22 22"
              fill="none"
              className="cursor-pointer hidden group-hover:block"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M11 20C11 20 3.5 13.6 2 9.4C0.6 5.6 3.2 3 6.2 3.6C8.2 4 9.8 5.8 11 7C12.2 5.8 13.8 4 15.8 3.6C18.8 3 21.4 5.6 20 9.4C18.5 13.6 11 20 11 20Z"
                fill="none"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div> */}

          <div
            className="relative"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={handleWishlistToggle}
          >
            <div
              className={`absolute top-0 right-0 p-2 rounded-full z-10 
                ${isHovered ? "bg-[#F26522]" : "bg-white"
                } cursor-pointer transition-all shadow-lg`}
            >
              {!isHovered ? (
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 22 22"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M11 20C11 20 3.5 13.6 2 9.4C0.6 5.6 3.2 3 6.2 3.6C8.2 4 9.8 5.8 11 7C12.2 5.8 13.8 4 15.8 3.6C18.8 3 21.4 5.6 20 9.4C18.5 13.6 11 20 11 20Z"
                    fill={favorite ? "#F26522" : "none"}
                    stroke={favorite ? "#F26522" : "black"}
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              ) : (
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 22 22"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M11 20C11 20 3.5 13.6 2 9.4C0.6 5.6 3.2 3 6.2 3.6C8.2 4 9.8 5.8 11 7C12.2 5.8 13.8 4 15.8 3.6C18.8 3 21.4 5.6 20 9.4C18.5 13.6 11 20 11 20Z"
                    fill={favorite ? "white" : "none"}
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              )}
            </div>
          </div>

          <Link
            href={`/${subCategory?.[0] ?? ""}/${subCategory?.[1] ?? ""}/${subCategory?.[2] ?? ""
              }/${product?.productSlug}`}
          >
            {/* Image - Shrinks on Hover */}
            <div className="transition-all duration-500 group-hover:scale-90">
              <Image
                src={productImage}
                width={200}
                height={200}
                alt="product"
                className="w-full h-auto transition-transform duration-500 group-hover:scale-90"
              />
            </div>
          </Link>
          {/* Container for Stock Status and Product Details */}
          <div
            className="transition-transform transform group-hover:translate-y-[-45px] duration-500 ease-in-out"
          >
            <div className="flex justify-start items-center">
              <p
                className={`${product?.inventory?.stockStatus === "In Stock"
                  ? "text-[#70BE38]"
                  : "text-red-400"
                  } text-[11px] md:text-[12px] font-semibold ${product?.inventory?.stockStatus === "In Stock"
                    ? "border border-[#70BE38]"
                    : "border border-red-400 bg-red-100"
                  } rounded-md px-2 md:px-3 md:py-1`}
              >
                {product?.inventory?.stockStatus}
              </p>
            </div>
            <div className="mt-3">
              <Link
                href={`/${subCategory?.[0] ?? ""}/${subCategory?.[1] ?? ""}/${subCategory?.[2] ?? ""}/${product?.productSlug}`}
              >
                <h4 className="text-[#202435] hover:text-[#F16521] duration-700 text-[14px] md:text-[15px] font-semibold h-10 md:h-[45px] text-ellipsis overflow-hidden line-clamp-2">
                  {product?.productName}
                </h4>
              </Link>
              <div className="mt-5 text-slate-500 text-[13px] md:text-[14px]">
                <div>
                  Offer Price:{" "}
                  <span className="font-bold text-black ml-1">
                    ৳ {product?.general?.salePrice.toLocaleString("en-BD")}
                  </span>{" "}
                </div>
                <div>
                  M.R.P:
                  <del className="ml-1">
                    ৳ {product?.general?.regularPrice.toLocaleString("en-BD")}
                  </del>
                </div>
                <div className="flex justify-start items-center text-nowrap">
                  You Save:
                  <div className="ml-1 flex justify-start items-center">
                    {product?.general?.salePrice ? (
                      <p className="font-semibold">
                        {(
                          ((product?.general?.regularPrice -
                            product?.general?.salePrice) /
                            product?.general?.regularPrice) *
                          100
                        ).toFixed(1)}
                        %{" "}
                      </p>
                    ) : (
                      <></>
                    )}
                    <p className="ml-1">
                      (৳
                      {(
                        product?.general?.regularPrice - product?.general?.salePrice
                      ).toLocaleString("en-BD")}
                      )
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Add to Cart Button - Visible only on hover */}
          {/* <div className="absolute bottom-0 left-0 w-full opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transform translate-y-5 transition-all duration-500 ease-in-out"> */}
          <div className="absolute text-white bottom-0 left-0 w-full opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transform translate-y-5 transition-all duration-500 ease-in-out">
            {/* <div className={`mt-5 w-full text-[14px] ${pathName === "/" ? "hidden" : ""}`}> */}
            <AnimatePresence mode="wait">
              {isInCart ? (
                <motion.div
                  key="inCart"
                  // className="bg-[#FFCD00] rounded-full w-full flex justify-between items-center font-semibold"
                  className="bg-[#F16521] rounded-full w-full flex justify-between items-center font-semibold"
                  initial={{ opacity: 0, translateY: 20 }}
                  animate={{ opacity: 1, translateY: 0 }}
                  exit={{ opacity: 0, translateY: 20 }}
                  transition={{ duration: 0.7 }}
                >
                  <button
                    onClick={() => {
                      const currentQuantity = cart.find(
                        (item) => item._id === product?._id
                      )?.quantity;

                      if (currentQuantity > 1) {
                        dispatch(
                          updateQuantity({ id: product?._id, quantity: -1 })
                        );
                      } else {
                        setIsInCart(false);
                        dispatch(
                          updateQuantity({ id: product?._id, quantity: -1 })
                        );
                      }
                    }}
                    className="px-3 py-2"
                  >
                    -
                  </button>
                  <button className="w-full py-2">
                    {cart.find((item) => item._id === product?._id)?.quantity}
                  </button>
                  <button
                    onClick={() => {
                      dispatch(
                        updateQuantity({ id: product?._id, quantity: 1 })
                      );
                    }}
                    className=""
                  >
                    {/* <span className="bg-[#dbb51f] rounded-full w-2 h-2 px-3 py-2 mr-1 shadow-inner"> */}
                    <span className="bg-[#F16521] rounded-full w-2 h-2 px-3 py-2 mr-1 shadow-inner">
                      +
                    </span>
                  </button>
                </motion.div>
              ) : (
                <motion.button
                  key="addToCart"
                  onClick={() => {
                    dispatch(addToCart(product));
                    setIsInCart(true);
                  }}
                  // className="bg-[#FFCD00] px-3 py-2 rounded-full w-full md:w-2/4"
                  className="bg-[#F16521] px-3 py-2 rounded-full w-full md:w-2/4"
                  initial={{ opacity: 0, translateY: 20 }}
                  animate={{ opacity: 1, translateY: 0 }}
                  exit={{ opacity: 0, translateY: 20 }}
                  transition={{ duration: 0.5 }}
                >
                  Add to Cart
                </motion.button>
              )}
            </AnimatePresence>
            {/* </div> */}
          </div>
        </div>
        {/* Finish Demo  */}

      </div>
    </div>
  );
}
