"use client";
import Image from "next/image";
import dynacool from "@/public/images/dynacool.jpg";
import dhamaka from "@/public/images/dhamaka.png";
import bisalmullochar from "@/public/images/bisalmullochar.png";
import { useState } from "react";

export default function ProductCard({ index }) {
  const [cartCount, setCartCount] = useState(0);

  return (
    <div
      className={`w-full overflow-hidden border rounded-md p-5 relative ${
        index === 3 ? " col-span-2 md:col-span-1" : ""
      }`}
    >
      <div className="absolute top-0 right-0 w-28 object-cover rounded-full text-white z-10 ">
        <Image className="" src={bisalmullochar} alt="product" />
      </div>
      <div className="relative">
        <div className="absolute top-0 left-0 bg-[#F16521] rounded-full text-white z-10">
          <p className="text-sm px-3 py-1">5%</p>
        </div>

        <div className="object-cover flex justify-center overflow-hidden">
          <Image
            src={dynacool}
            alt="product"
            className="hover:scale-105 duration-700"
          />
        </div>

        <div className="my-3">
          <h4 className="text-[#202435] text-md font-normal mt-2">
            Conion BEW-DC24KRNV 2 Ton Inverter (DynaCool) Air Conditioner
          </h4>
          <p className="text-[#70BE38] text-xs font-dosis font-semibold my-3">IN STOCK</p>
          <div className="flex justify-between items-center mt-2">
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
    </div>
  );
}
