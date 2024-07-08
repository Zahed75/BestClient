"use client";
import { fetchProducts } from "@/redux/slice/productsSlice";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function Search() {
    const [searchTerm, setSearchTerm] = useState("");
  

    const products = useSelector((state) => state.products.products);
    const dispatch = useDispatch();

  
    const allProducts = products?.products || [];
  
    useEffect(() => {
      dispatch(fetchProducts());
    }, []);
  
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredProducts = allProducts.filter((product) =>
    product.productName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleProductClick = (productSlug) => {
    router.push(`/shop/${productSlug}`);
    setSearchTerm("");
  };

  return (
    <main className="container absolute top-0 right-0 bg-white h-full">
      <div className="w-full mx-auto col-span-2 md:hidden relative mt-5 mb-10">
        <div className="relative flex items-center w-full h-14 rounded-lg bg-[#F3F4F7] overflow-hidden">
          <div className="grid place-items-center h-full w-12 text-gray-300">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>

          <input
            className="peer h-full w-full outline-none text-sm text-gray-700 pr-2 bg-[#F3F4F7]"
            type="text"
            id="search"
            name="search"
            placeholder="Search for products..."
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>
        {searchTerm && (
          <div className="absolute z-10 bg-white shadow-md rounded-lg w-full max-h-40 overflow-y-auto scrollbar_hidden">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <div
                  key={product._id}
                  className="p-3 hover:bg-gray-200 cursor-pointer"
                  onClick={() => handleProductClick(product?.productSlug)}
                >
                  {product.productName}
                </div>
              ))
            ) : (
              <div className="p-3 text-center">No products found</div>
            )}
          </div>
        )}
      </div>
    </main>
  );
}
