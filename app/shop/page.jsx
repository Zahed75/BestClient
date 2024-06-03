"use client";
import { useState } from "react";
import TagLine from "@/components/global/TagLine";
import { TfiLayoutGrid4Alt } from "react-icons/tfi";
import { TiThMenu } from "react-icons/ti";
import { RiGridFill } from "react-icons/ri";
import { BiSolidGridAlt } from "react-icons/bi";
import ProductCard from "@/components/productCard/ProductCard";

export default function Shop() {
  const tagValues = ["Home", "Shop"];
  const brands = [
    { name: "Conion", count: 4 },
    { name: "Samsung", count: 2 },
    { name: "LG", count: 3 },
    { name: "Sony", count: 1 },
    { name: "Walton", count: 2 },
    { name: "Panasonic", count: 3 },
    { name: "Philips", count: 2 },
    { name: "Sharp", count: 1 },
    { name: "Vision", count: 3 },
    { name: "Hitachi", count: 2 },
    { name: "Toshiba", count: 1 },
    { name: "Hisense", count: 1 },
  ];

  const [dynamicGrid, setDynamicGrid] = useState(3);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 100]);

  const handleDynamicGrid = (value) => {
    setDynamicGrid(value);
  };

  const handleCategoryChange = (e) => {
    const { id, checked } = e.target;
    setSelectedCategories((prev) =>
      checked ? [...prev, id] : prev.filter((item) => item !== id)
    );
  };

  const handleBrandChange = (e) => {
    const { id, checked } = e.target;
    setSelectedBrands((prev) =>
      checked ? [...prev, id] : prev.filter((item) => item !== id)
    );
  };

  const handlePriceChange = (e) => {
    setPriceRange([0, e.target.value]);
  };

  return (
    <main className="container">
      <div className="my-10">
        <TagLine tagValues={tagValues} />
        <section className="grid grid-cols-1 md:grid-cols-4 justify-between items-start gap-5">
          <div>
            <div>
              <h1 className="uppercase">FILTER BY CATEGORIES</h1>
              <div className="text-sm my-5">
                <div className="flex justify-start items-center gap-3 py-1">
                  <input
                    id="all"
                    type="checkbox"
                    className="w-4 h-4 bg-gray-100 rounded border-gray-300 dark:border-gray-600"
                    onChange={handleCategoryChange}
                  />
                  <label htmlFor="all">All Categories</label>
                </div>
                {/* Add more category checkboxes here as needed */}
                <div className="flex justify-start items-center gap-3 py-1">
                  <input
                    id="conion"
                    type="checkbox"
                    className="w-4 h-4 bg-gray-100 rounded border-gray-300 dark:border-gray-600"
                    onChange={handleCategoryChange}
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
                    value={priceRange[1]}
                    onChange={handlePriceChange}
                  />
                </div>
                <div className="mt-3">
                  <label htmlFor="rangeInput">
                    Price: ৳ {priceRange[0]} — ৳ {priceRange[1] * 5432}
                  </label>
                </div>
              </div>
            </div>
            <div>
              <h1 className="uppercase">FILTER BY Brand</h1>
              <div className="text-sm my-5 h-60 overflow-y-scroll scrollbar_hidden cursor-all-scroll">
                {brands.map((brand, index) => (
                  <div key={index} className="flex justify-start items-center gap-3 py-1">
                    <input
                      id={brand.name.toLowerCase()}
                      type="checkbox"
                      className="w-4 h-4 bg-gray-100 rounded border-gray-300 dark:border-gray-600"
                      onChange={handleBrandChange}
                    />
                    <label htmlFor={brand.name.toLowerCase()}>
                      {brand.name} ({brand.count})
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="col-span-3">
            <div className="bg-[#f7f8fd] py-4 px-5 w-full rounded-md flex justify-between items-center">
              <div className="flex justify-start items-center gap-5">
                <TiThMenu
                  onClick={() => handleDynamicGrid(1)}
                  className={`text-2xl text-gray-400 hover:text-gray-700 ${
                    dynamicGrid == 1 ? "text-gray-700" : ""
                  } duration-700`}
                />
                <BiSolidGridAlt
                  onClick={() => handleDynamicGrid(2)}
                  className={`text-2xl text-gray-400 hover:text-gray-700 ${
                    dynamicGrid == 2 ? "text-gray-700" : ""
                  } duration-700`}
                />
                <RiGridFill
                  onClick={() => handleDynamicGrid(3)}
                  className={`text-2xl text-gray-400 hover:text-gray-700 ${
                    dynamicGrid == 3 ? "text-gray-700" : ""
                  } duration-700`}
                />
                <TfiLayoutGrid4Alt
                  onClick={() => handleDynamicGrid(4)}
                  className={`text-xl text-gray-400 hover:text-gray-700 ${
                    dynamicGrid == 4 ? "text-gray-700" : ""
                  } duration-700`}
                />
              </div>
              <div className="flex items-center gap-3">
                <div>
                  <select
                    name="sort"
                    id="sort"
                    className="focus:ring-0 focus:outline-0 px-3"
                  >
                    <option value="default">Short by latest</option>
                    <option value="pricehtl">Price: high to low</option>
                    <option value="pricelth">Price: low to high</option>
                  </select>
                </div>
                <div>
                  show
                  <select
                    name="show"
                    id="show"
                    className="focus:ring-0 focus:outline-0 px-3 border-none"
                  >
                    <option value="default">9</option>
                    <option value="18">18</option>
                    <option value="27">27</option>
                    <option value="36">36</option>
                  </select>
                </div>
              </div>
            </div>
            <div className={`grid grid-cols-${dynamicGrid} justify-between items-center gap-5 my-5`}>
              <ProductCard />
              <ProductCard />
              <ProductCard />
              <ProductCard />
              <ProductCard />
              {/* Add more ProductCard components as needed */}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
