"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import Link from "next/link";
import { addToCart, updateQuantity } from "@/redux/slice/cartSlice";
import { useDispatch, useSelector } from "react-redux";

export default function ShopCard({ product }) {
  const [productImage, setProductImage] = useState("");

  const cart = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  useEffect(() => {
    setProductImage(product?.productImage);
  }, [product]);

  return (
    <div
      className={`w-full min-h-full overflow-hidden border shadow-sm hover:shadow-lg duration-700 rounded-md p-5 relative`}
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
        <div className="mt-3">
          <Link href={`/shop/${product?.productSlug}`}>
            <h4 className="text-[#202435] hover:text-[#F16521] duration-700 text-md font-semibold h-14">
              {product?.productName}
            </h4>
          </Link>
          <div className="mt-5 text-slate-500 text-md">
            <div className=" ">
              Offer Price:{" "}
              <span className="font-semibold ml-1">
                ৳{product?.general?.salePrice.toLocaleString('en-BD')}
              </span>{" "}
            </div>
            <div className="">
              M.R.P:
              <del className="ml-1">৳{product?.general?.regularPrice}</del>
            </div>
            <div className="flex justify-start items-center">
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
          <div className="mt-5 flex justify-start items-center">
            <p
              className={`${product?.inventory?.stockStatus === "In Stock"
                ? "text-[#70BE38]"
                : "text-red-400"
                } text-xs font-semibold ${product?.inventory?.stockStatus === "In Stock"
                  ? "border border-[#70BE38]"
                  : "border border-red-400 bg-red-100"
                } rounded-md px-3 py-1`}
            >
              {product?.inventory?.stockStatus}
            </p>
            <span className="text-[#F16521] text-xs font-semibold ml-3 px-3 py-1 border border-[#F16521] rounded-md">
              {product?.inventory?.inventoryStatus}
            </span>
          </div>
          <div className="hidden group-hover:block duration-700 justify-between items-center mt-5 absolute bottom-0 right-0 w-full bg-white">
            {Array.isArray(cart) &&
              cart.find((item) => item._id === product?._id) ? (
              <div className="bg-[#F16521] border rounded-full w-full flex justify-between items-center">
                <button
                  onClick={() => {
                    dispatch(
                      updateQuantity({ id: product?._id, quantity: -1 })
                    );
                  }}
                  className="px-3 py-1 text-lg"
                >
                  -
                </button>
                <button className="bg-white w-full py-1 text-lg">
                  {cart.find((item) => item._id === product?._id)?.quantity}
                </button>
                <button
                  onClick={() => {
                    dispatch(updateQuantity({ id: product?._id, quantity: 1 }));
                  }}
                  className="px-3 py-1 text-lg"
                >
                  +
                </button>
              </div>
            ) : (
              <button
                onClick={() => {
                  dispatch(addToCart(product));
                }}
                className="bg-[#FFCD00] px-3 py-2 rounded-full w-full"
              >
                Add to Cart
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
