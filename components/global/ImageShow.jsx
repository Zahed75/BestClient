"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";

export default function ImageShow({ productImage, productGallery }) {

  const [wordData, setWordData] = useState(productGallery[0]);
  const [val, setVal] = useState(0);

  const handleClick = (index) => {
    setVal(index);
    const wordSlider = productGallery[index];
    setWordData(wordSlider);
  };

  const autoPlay = () => {
    let index = val < productGallery?.length - 1 ? val + 1 : 0;
    setVal(index);
    const wordSlider = productGallery[index];
    setWordData(wordSlider);
  };
  useEffect(() => {
    const interval = setInterval(() => {
      autoPlay();
    }, 5000);
    return () => clearInterval(interval);
  });


  return (
    <div className="flex justify-center items-start gap-5 my-5">
      <div className="flex flex-col gap-2">
        {productGallery?.map((src, i) => (
          <div className="" key={i}>
            <Image
              className={
                wordData.index == i
                  ? "border border-[#F16521] rounded-md"
                  : "border rounded-md"
              }
              width="100"
              height="70"
              src={src}
              onClick={() => handleClick(i)}
            />
          </div>
        ))}
      </div>
      <div>
        <div className="w-full object-cover border rounded-md group overflow-hidden group">
          <Zoom>
            <Image
              width="400"
              height="400"
              data-aos="zoom-in"
              data-aos-once="false"
              className="rounded-md group-hover:scale-110 duration-700"
              src={wordData}
            />
          </Zoom>
        </div>
        <div className="flex justify-between gap-3 my-5">
          <button className="flex justify-center w-full py-2 bg-[#FFCD00] rounded-md text-sm">
            Add to Cart
          </button>
          <button className="flex justify-center w-full py-2 text-white bg-[#F16521] rounded-md text-sm">
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
}
