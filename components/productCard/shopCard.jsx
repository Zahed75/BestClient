"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import Dynamo from "@/public/images/dynacool.jpg";
import Link from "next/link";

export default function ShopCard({ product }) {
  const [cartCount, setCartCount] = useState(0);
  const [productImage, setProductImage] = useState(
    product?.productImage || Dynamo
  );

  useEffect(() => {
    setProductImage(product?.productImage || Dynamo);
  }, [product]);

  return (
    <div
      className={`w-full min-h-full overflow-hidden border shadow-sm hover:shadow-lg duration-700 rounded-md p-5 relative`}
    >
      <Link className="" href={`/shop/${product?._id}`}>
        <div className="relative">
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
          <div className="object-cover min-h-[200px] flex justify-center overflow-hidden">
            <Image
              src={productImage}
              width={200}
              height={200}
              alt="product"
              className="hover:scale-105 duration-700"
            />
          </div>

          <div className="mt-3">
            <h4 className="text-[#202435] text-md font-semibold h-10">
              {product?.productName}
            </h4>
            <div className="mt-5 text-slate-500 text-sm">
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
                  <span>
                    (৳
                    {product?.general?.regularPrice -
                      product?.general?.salePrice}
                    )
                  </span>
                </div>
              </div>
            </div>
            <div className="mt-5 flex justify-start items-center">
              <span
                className={`${
                  product?.inventory?.stockStatus === "In Stock"
                    ? "text-[#70BE38]"
                    : "text-red-400"
                } text-xs font-semibold ${
                  product?.inventory?.stockStatus === "In Stock"
                    ? "border border-[#70BE38]"
                    : "border border-red-400 bg-red-100"
                } rounded-md px-3 py-1`}
              >
                {product?.inventory?.stockStatus}
              </span>
              <span className="text-[#F16521] text-xs font-semibold ml-3 px-3 py-1 border border-[#F16521] rounded-md">
                {product?.inventory?.inventoryStatus}
              </span>
            </div>
            <div className="hidden duration-700 justify-between items-center">
              {cartCount >= 1 ? (
                <div className="bg-[#F16521] border rounded-full w-full flex justify-between items-center">
                  <button
                    onClick={() => {
                      if (cartCount > 0) {
                        setCartCount(cartCount - 1);
                      }
                    }}
                    className="px-3 py-1 text-lg"
                  >
                    -
                  </button>
                  <button className="bg-white w-full py-1 text-lg">
                    {cartCount}
                  </button>
                  <button
                    onClick={() => setCartCount(cartCount + 1)}
                    className="px-3 py-1 text-lg"
                  >
                    +
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setCartCount(1)}
                  className="bg-[#FFCD00] px-3 py-2 rounded-full w-full"
                >
                  Add to Cart
                </button>
              )}
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}
