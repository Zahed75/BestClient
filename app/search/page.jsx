"use client";
import { fetchProducts } from "@/redux/slice/productsSlice";
import { fetchApi } from "@/utils/FetchApi";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function Search() {
  const [searchTerm, setSearchTerm] = useState("");
  const [categorySlugs, setCategorySlugs] = useState({});
  
  const products = useSelector((state) => state.products.products);
  const dispatch = useDispatch();
  const router = useRouter();

  const allProducts = products?.products || [];

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredProducts = allProducts.filter((product) =>
    product.productName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const fetchCategorySlug = async (categoryId) => {
    try {
      const response = await fetchApi(
        `/category/getCategoryById/${categoryId}`,
        "GET"
      );
      const category = response?.category;

      if (category?.parentCategory) {
        const parentResponse = await fetchApi(
          `/category/getCategoryById/${category?.parentCategory}`,
          "GET"
        );
        const parentCategory = parentResponse?.category?.slug;
        return `${parentCategory}/${category?.slug}`;
      }

      return `${category?.slug}/${category?.slug}`;
    } catch (error) {
      console.error(`Error fetching category with ID ${categoryId}`, error);
      return null;
    }
  };

  const getProductCategorySlugs = async (product) => {
    if (!product?.categoryId) return [];

    const categorySlugs = await Promise.all(
      product?.categoryId?.map((categoryId) => fetchCategorySlug(categoryId))
    );

    return categorySlugs.filter((slug) => slug);
  };

  const handleProductClick = async (product) => {
    const slugs = await getProductCategorySlugs(product);
  
    // Check if there are any valid slugs
    if (slugs.length > 0) {
      const slugPath = slugs[0]; // Use the first slug or join them if needed
      router.push(`/shop/${slugPath}/${product.productSlug}`);
      console.log(`/shop/${slugPath}/${product.productSlug}`);
    } else {
      console.log("No valid slugs found for the product");
    }
  
    setSearchTerm(""); // Clear search input after redirect
  };
  

  return (
    <main className="container w-full fixed top-0 right-0 bg-white min-h-screen">
      <div className="w-full mx-auto col-span-2 lg:hidden relative mt-5 mb-10">
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
                  className="p-3 hover:bg-gray-200 cursor-pointer text-sm"
                  onClick={() => handleProductClick(product)}
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
