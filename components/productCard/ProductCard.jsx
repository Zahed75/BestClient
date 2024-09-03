"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, updateQuantity } from "@/redux/slice/cartSlice";
import { motion, AnimatePresence } from "framer-motion";

export default function ProductCard({ product }) {
  const [productImage, setProductImage] = useState("");
  const [isInCart, setIsInCart] = useState(false);

  const cart = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  useEffect(() => {
    setProductImage(product?.productImage);
  }, [product]);

  useEffect(() => {
    setIsInCart(!!cart.find((item) => item._id === product?._id));
  }, [cart, product?._id]);

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
        <Link href={`/shop/${product?.productSlug}`}>
          <div className="object-cover min-h-[200px] flex justify-center overflow-hidden">
            <Image
              src={productImage}
              width={200}
              height={200}
              alt="product"
              className="hover:scale-105 duration-700"
            />
          </div>
        </Link>
        <div className="mt-5 flex justify-start items-center">
          <p
            className={`${
              product?.inventory?.stockStatus === "In Stock"
                ? "text-[#70BE38]"
                : "text-red-400"
            } text-[11px] md:text-[12px] font-semibold ${
              product?.inventory?.stockStatus === "In Stock"
                ? "border border-[#70BE38]"
                : "border border-red-400 bg-red-100"
            } rounded-md px-2 md:px-3 md:py-1`}
          >
            {product?.inventory?.stockStatus}
          </p>
          {/* <span className="text-[#F16521] text-xs font-semibold ml-3 px-3 py-1 border border-[#F16521] rounded-md">
              {product?.inventory?.inventoryStatus}
            </span> */}
        </div>
        <div className="mt-3">
          <Link href={`/shop/${product?.productSlug}`}>
            <h4 className="text-[#202435] hover:text-[#F16521] duration-700 text-[14px] md:text-[15px] font-semibold h-10 md:h-[45px] text-ellipsis overflow-hidden line-clamp-2">
              {product?.productName}
            </h4>
          </Link>
          <div className="mt-5 text-slate-500 text-[13px] md:text-[14px]">
            <div className=" ">
              Offer Price:{" "}
              <span className="font-semibold ml-1">
                ৳{product?.general?.salePrice}
              </span>{" "}
            </div>
            <div className="">
              M.R.P:
              <del className="ml-1">৳{product?.general?.regularPrice}</del>
            </div>
            <div className="flex justify-start items-center text-nowrap">
              Your Save:
              <div className="ml-1 flex justify-start items-center">
                {product?.general?.salePrice ? (
                  <p className="font-semibold">
                    {(
                      ((product?.general?.regularPrice -
                        product?.general?.salePrice) /
                        product?.general?.regularPrice) *
                      100
                    ).toFixed(1)}
                    %
                  </p>
                ) : (
                  <></>
                )}
                <p>
                  (৳
                  {product?.general?.regularPrice - product?.general?.salePrice}
                  )
                </p>
              </div>
            </div>
          </div>

          <div className="mt-5 w-full text-md">
            <AnimatePresence mode="wait">
              {isInCart ? (
                <motion.div
                  key="inCart"
                  className="bg-[#FFCD00] rounded-full w-full flex justify-between items-center font-semibold"
                  initial={{ width: "50%" }}
                  animate={{ width: "100%" }}
                  exit={{ width: "50%" }}
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
                  initial={{ width: "50%" }}
                  animate={{ width: "50%" }}
                  exit={{ width: "50%" }}
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
        </div>
      </div>
    </div>
  );
}
