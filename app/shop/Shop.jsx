"use client";
import TagLine from "@/components/global/TagLine";
import { TfiLayoutGrid4Alt } from "react-icons/tfi";
import { TiThMenu } from "react-icons/ti";
import { RiGridFill } from "react-icons/ri";
import { CiFilter } from "react-icons/ci";
import { useState } from "react";
import ShopCard from "@/components/productCard/shopCard";
import CloseIcon from "@mui/icons-material/Close";
import Skeleton from "@/components/global/Skeleton";
import Pagination from "@/components/global/Pagination";
import { Box, Drawer } from "@mui/material";
import ProductCard from "@/components/productCard/ProductCard";

export default function Shop({ products }) {
  const tagValues = ["Home", "Shop"];
  const brands = [
    {
      name: "Conion",
      count: 4,
    },
    {
      name: "Samsung",
      count: 2,
    },
    {
      name: "LG",
      count: 3,
    },
    {
      name: "Sony",
      count: 1,
    },
    {
      name: "Walton",
      count: 2,
    },
    {
      name: "Panasonic",
      count: 3,
    },
    {
      name: "Philips",
      count: 2,
    },
    {
      name: "Sharp",
      count: 1,
    },
    {
      name: "Vision",
      count: 3,
    },
    {
      name: "Hitachi",
      count: 2,
    },
    {
      name: "Toshiba",
      count: 1,
    },

    {
      name: "Hisense",
      count: 1,
    },
  ];

  const [dynamicGrid, setDynamicGrid] = useState(3);
  const [open, setOpen] = useState(false);

  const handleDynamicGrid = ({ value }) => {
    if (value) {
      setDynamicGrid(value);
    }
  };

  const toggleFilterDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };
  return (
    <main className="container">
      {products ? (
        <div className="my-10">
          <TagLine tagValues={tagValues} />
          <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 justify-between items-start gap-5">
            <div className="hidden md:hidden lg:block">
              <div>
                <h1 className="uppercase">FILTER BY CATEGORIES</h1>
                <div className="text-sm my-5">
                  <div className="flex justify-start items-center gap-3 py-1">
                    <input
                      id="all"
                      type="checkbox"
                      className="w-4 h-4 bg-gray-100 rounded border-gray-300   dark:border-gray-600"
                    />
                    <label htmlFor="all">All Categories</label>
                  </div>
                  <div className="flex justify-start items-center gap-3 py-1">
                    <input
                      id="brand"
                      type="checkbox"
                      className="w-4 h-4 bg-gray-100 rounded border-gray-300   dark:border-gray-600"
                    />
                    <label htmlFor="brand">All Brand</label>
                  </div>
                  <div className="flex justify-start items-center gap-3 py-1">
                    <input
                      id="conion"
                      type="checkbox"
                      className="w-4 h-4 bg-gray-100 rounded border-gray-300   dark:border-gray-600"
                    />
                    <label htmlFor="conion">Conion</label>
                  </div>
                </div>
              </div>
              <div className="my-10">
                <h1 className="uppercase">Filter by Price</h1>
                <div className="text-sm my-5">
                  <div>
                    <input
                      type="range"
                      id="rangeInput"
                      name="rangeInput"
                      min="0"
                      max="100"
                    />
                  </div>
                  <div className="mt-3">
                    <label htmlFor="rangeInput">Price: ৳ 550 — ৳ 543,200</label>
                  </div>
                </div>
              </div>
              <div>
                <h1 className="uppercase">FILTER BY Brand</h1>
                <div className="text-sm my-5 h-60 overflow-y-scroll scrollbar_hidden cursor-all-scroll">
                  {brands.map((brand, index) => (
                    <button
                      key={index}
                      className="flex justify-between items-center gap-3 py-1"
                    >
                      {brand.name}
                      <p>({brand.count})</p>
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <div className="md:col-span-5">
              <div className="bg-[#f7f8fd] py-4 px-5 w-full rounded-md flex justify-between items-center text-[17px]">
                <div className="hidden md:hidden lg:flex justify-start items-center gap-5">
                  <TiThMenu
                    onClick={() => handleDynamicGrid({ value: 1 })}
                    className={`text-2xl text-gray-400 hover:text-gray-700 ${dynamicGrid == 1 ? "text-gray-700" : ""
                      } duration-700`}
                  />

                  <RiGridFill
                    onClick={() => handleDynamicGrid({ value: 3 })}
                    className={`text-2xl text-gray-400 hover:text-gray-700 ${dynamicGrid == 3 ? "text-gray-700" : ""
                      } duration-700`}
                  />
                  <TfiLayoutGrid4Alt
                    onClick={() => handleDynamicGrid({ value: 4 })}
                    className={`text-xl text-gray-400 hover:text-gray-700 ${dynamicGrid == 4 ? "text-gray-700" : ""
                      } duration-700`}
                  />
                </div>

                <div className="flex justify-start md:block lg:hidden items-center gap-5">
                  <div className="flex justify-center items-center gap-2 text-nowrap">
                    <div>
                      <button type="button"
                        onClick={toggleFilterDrawer(true)}>
                        <CiFilter
                          className={`text-xl 
                      duration-700 cursor-pointer`} />
                      </button></div>

                    {/* <div>Filter Products</div> */}
                  </div>
                </div>
                <div className="flex items-center gap-3 ">
                  <div>
                    <select
                      name="sort"
                      id="sort"
                      className="focus:ring-0 focus:outline-0 px-3"
                    >
                      <option className="" value="default">
                        Short by latest
                      </option>
                      <option className="" value="pricehtl">
                        Price: high to low
                      </option>
                      <option className="" value="pricelth">
                        Price: low to high
                      </option>
                    </select>
                  </div>
                  <div>
                    show
                    <select
                      name="show"
                      id="show"
                      className="focus:ring-0 focus:outline-0 px-3 border-none"
                    >
                      <option className="" value="default">
                        9
                      </option>
                      <option className="" value="18">
                        18
                      </option>
                      <option className="" value="27">
                        27
                      </option>
                      <option className="" value="36">
                        36
                      </option>
                    </select>
                  </div>
                </div>
              </div>
              <div
                className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-${dynamicGrid} justify-between items-center gap-5 my-5 w-full`}
              >
                {products?.map((product, index) => (
                  <ProductCard key={index} product={product} />
                ))}
              </div>
              <Pagination />
            </div>


          </section>
        </div>
      ) : (
        <Skeleton />
      )}
      <Drawer anchor="left" open={open} onClose={toggleFilterDrawer(false)}>
        <Box role="presentation" className="w-[350px] md:w-[400px]">
          <div className="flex justify-end items-center p-3 mt-10">
            {/* <div>
              <Image src={bestLogo} alt="bestLogo" width={200} height={200} />
            </div> */}
            <button className="inline-block" onClick={toggleFilterDrawer(false)}>
              <CloseIcon />
            </button>
          </div>
          <div className="flex flex-col lg:hidden justify-start items-start p-10">
            <div>
              <h1 className="uppercase">FILTER BY CATEGORIES</h1>
              <div className="text-sm my-5">
                <div className="flex justify-start items-center gap-3 py-1">
                  <input
                    id="all"
                    type="checkbox"
                    className="w-4 h-4 bg-gray-100 rounded border-gray-300   dark:border-gray-600"
                  />
                  <label htmlFor="all">All Categories</label>
                </div>
                <div className="flex justify-start items-center gap-3 py-1">
                  <input
                    id="brand"
                    type="checkbox"
                    className="w-4 h-4 bg-gray-100 rounded border-gray-300   dark:border-gray-600"
                  />
                  <label htmlFor="brand">All Brand</label>
                </div>
                <div className="flex justify-start items-center gap-3 py-1">
                  <input
                    id="conion"
                    type="checkbox"
                    className="w-4 h-4 bg-gray-100 rounded border-gray-300   dark:border-gray-600"
                  />
                  <label htmlFor="conion">Conion</label>
                </div>
              </div>
            </div>
            <div className="my-10">
              <h1 className="uppercase">Filter by Price</h1>
              <div className="text-sm my-5">
                <div>
                  <input
                    type="range"
                    id="rangeInput"
                    name="rangeInput"
                    min="0"
                    max="100"
                  />
                </div>
                <div className="mt-3">
                  <label htmlFor="rangeInput">Price: ৳ 550 — ৳ 543,200</label>
                </div>
              </div>
            </div>
            <div>
              <h1 className="uppercase">FILTER BY Brand</h1>
              <div className="text-sm my-5 h-60 scrollbar_hidden overflow-y-scroll cursor-all-scroll">
                {brands.map((brand, index) => (
                  <button
                    key={index}
                    className="flex justify-between items-center gap-3 py-1"
                  >
                    {brand.name}
                    <p>({brand.count})</p>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </Box>
      </Drawer>
    </main>
  );
}
