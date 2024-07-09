"use client";
import Image from "next/image";
import dynacool from "@/public/images/dynacool.jpg";
import bisalmullochar from "@/public/images/bisalmullochar.png";
import dhamaka from "@/public/images/dhamaka.png";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, updateQuantity } from "@/redux/slice/cartSlice";

export default function RelatedProductCard({ product, index }) {
  const { productName, productImage, general, inventory } = product;

  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.items);

  return (
    <div
      className={`w-full overflow-hidden border rounded-md p-5 relative ${
        index === 5 ? " col-span-2 md:col-span-1" : ""
      }`}
    >
      <div className="absolute top-0 right-0 w-28 object-cover rounded-full text-white z-10 ">
        <Image className="" src={dhamaka} alt="offer_img" />
      </div>
      <div className="relative">
        <div className="absolute top-0 left-0 bg-[#F16521] rounded-full text-white z-10">
          <p className="text-sm px-3 py-1">
            {(
              ((product?.general?.regularPrice - product?.general?.salePrice) /
                product?.general?.regularPrice) *
              100
            ).toFixed(1)}
            %
          </p>
        </div>
        <div className="object-cover flex justify-center overflow-hidden">
          <Image
            src={productImage}
            width={200}
            height={200}
            alt="product"
            className="hover:scale-105 duration-700"
          />
        </div>

        <div className="my-3">
          <h4 className="text-[#202435] text-md font-normal mt-2">
            {productName}
          </h4>
          <p className="text-[#70BE38] text-sm font-semibold my-3">
            {inventory?.stockStatus}
          </p>
          <div className="text-md my-3 flex justify-start items-center gap-3">
            <p className="text-[#F16521] font-semibold">
              ৳ {general?.salePrice}
            </p>
            <del className="font-normal">৳ {general?.regularPrice}</del>
          </div>
          <div className=" duration-700 justify-between items-center mt-5 w-full bg-white">
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
