"use client";
import React, { useEffect, useState } from "react";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";

export default function ImageShow() {
  const imgs = [
    {
      id: 0,
      value:
        "https://www.bestelectronics.com.bd/wp-content/uploads/2024/04/ac-new-4-9-24-500x500.jpg",
    },
    {
      id: 1,
      value:
        "https://www.bestelectronics.com.bd/wp-content/uploads/2024/04/as-12tr4ryetd00a_copy_1-500x500.jpg",
    },
    {
      id: 2,
      value:
        "https://www.bestelectronics.com.bd/wp-content/uploads/2024/04/as-12tr4ryetd00a-2_copy_1-500x500.jpg",
    },
  ];
  const [wordData, setWordData] = useState(imgs[0]);
  const [val, setVal] = useState(0);
  const handleClick = (index) => {
    setVal(index);
    const wordSlider = imgs[index];
    setWordData(wordSlider);
  };
  const handleNext = () => {
    let index = val < imgs.length - 1 ? val + 1 : val;
    setVal(index);
    const wordSlider = imgs[index];
    setWordData(wordSlider);
  };
  const handlePrevious = () => {
    let index = val <= imgs.length - 1 && val > 0 ? val - 1 : val;
    setVal(index);
    const wordSlider = imgs[index];
    setWordData(wordSlider);
  };
  return (
    <div className="flex justify-center items-start gap-5 my-5">
      <div className="flex flex-col gap-2">
        {imgs.map((data, i) => (
          <div className="" key={i}>
            <img
              className={
                wordData.id == i
                  ? "border border-[#F16521] rounded-md"
                  : "border rounded-md"
              }
              src={data.value}
              onClick={() => handleClick(i)}
              height="70"
              width="100"
            />
          </div>
        ))}
      </div>
      <div>
        <div className="w-full object-cover border rounded-md group overflow-hidden">
          <Zoom>
            {" "}
            <img
              className="rounded-md transition duration-1000 ease-in-out transform group-hover:scale-125"
              src={wordData.value}
            />
          </Zoom>
        </div>
        <div className="flex justify-between gap-3 my-5">
          <button
            className="flex justify-center w-full py-2 bg-[#FFCD00] rounded-md text-sm"
          >
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
