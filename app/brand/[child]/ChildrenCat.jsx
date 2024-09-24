"use client";
import TagLine from "@/components/global/TagLine";
import { TfiLayoutGrid4Alt } from "react-icons/tfi";
import { TiThMenu } from "react-icons/ti";
import { RiGridFill } from "react-icons/ri";
import { CiFilter } from "react-icons/ci";
import { useEffect, useState } from "react";
import ProductCard from "@/components/productCard/ProductCard";
import Pagination from "@/components/global/Pagination";
import Skeleton from "@/components/global/Skeleton";
import { Box, Drawer } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  setBrandFilter,
  setCategoryFilter,
  setCurrentPage,
  setItemsPerPage,
  setPriceRange,
  setSorting,
} from "@/redux/slice/shopSlice";
import { fetchBrands } from "@/redux/slice/brandSlice";
import { usePathname, useRouter } from "next/navigation";
import { fetchCategories } from "@/redux/slice/categorySlice";

export default function ChildrenCat({ category, path }) {
  const { products, subCategories } = category;
  const [dynamicGrid, setDynamicGrid] = useState(3);
  const [open, setOpen] = useState(false);

  const router = useRouter();
  const dispatch = useDispatch();
  const pathName = usePathname();

  const { filters, pagination, sorting } = useSelector((state) => state.shop);
  const brandsState = useSelector((state) => state.brand);
  const categoriesState = useSelector((state) => state.categories);
  const brands = brandsState?.brands || [];
  const categories = categoriesState?.categories?.categories || [];

  useEffect(() => {
    dispatch(fetchBrands());
    dispatch(fetchCategories());
  }, [dispatch]);

  const filteredProducts = products
    ?.filter((product) => {
      const matchesCategory =
        filters.category === "" ||
        product?.categoryId.includes(filters.category);
      const matchesBrand =
        filters.brand === "" ||
        product?.productBrand.toLowerCase() === filters.brand.toLowerCase();
      const matchesPrice =
        product?.general?.regularPrice >= filters.priceRange[0] &&
        product?.general?.regularPrice <= filters.priceRange[1];
      return matchesCategory && matchesBrand && matchesPrice;
    })
    .sort((a, b) => {
      if (sorting === "newest") return b.createdAt - a.createdAt;
      if (sorting === "oldest") return a.createdAt - b.createdAt;
      if (sorting === "pricehtl")
        return b?.general?.regularPrice - a?.general?.regularPrice;
      if (sorting === "pricelth")
        return a?.general?.regularPrice - b?.general?.regularPrice;
      return 0;
    });

  const handleCategoryChange = (category) => {
    const selectedCategory = category === "All Categories" ? "" : category;
    dispatch(setCategoryFilter(selectedCategory));
  };

  const handleBrandChange = (brand) => {
    dispatch(setBrandFilter(brand));
  };

  const handlePriceChange = (priceRange) => {
    dispatch(setPriceRange(priceRange));
  };

  const handleSortingChange = (sort) => {
    dispatch(setSorting(sort));
  };

  const handleItemsPerPageChange = (itemsPerPage) => {
    dispatch(setItemsPerPage(itemsPerPage));
  };

  const handlePageChange = (currentPage) => {
    dispatch(setCurrentPage(currentPage));
  };

  const paginatedProducts = filteredProducts?.slice(
    (pagination?.currentPage - 1) * pagination?.itemsPerPage,
    pagination?.currentPage * pagination?.itemsPerPage
  );

  const parentCatName = categories.find(
    (cat) => cat._id === category?.parentCategory
  )?.categoryName;

  const tagValues = [
    {
      link: "/",
      value: "Home",
    },
    {
      link: "/brand",
      value: "Brand",
    },
    {
      link: `/${parentCatName?.toLowerCase().replace(/\s+/g, "-")}/${
        category?.slug
      }`,
      value: category?.categoryName,
    },
  ];

  const getBaseUrl = () => {
    if (typeof window !== "undefined") {
      return window.location.origin;
    }
    return "";
  };

  const withOutDomainPathname = pathName.replace(getBaseUrl(), "");

  const handleGotoCategory = (slug) => {
    router.push(`${withOutDomainPathname}/${slug}`);
  };

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
        <article className="my-10">
          <TagLine tagValues={tagValues} />
          <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 justify-between items-start gap-5">
            <div className="hidden md:hidden lg:block">
              <div>
                <h1 className="uppercase">FILTER BY CATEGORIES</h1>
                <div className="text-sm my-5">
                  <div className="flex justify-start items-center gap-3 py-1">
                    <input
                      type="checkbox"
                      id="all-categories"
                      className="w-4 h-4 bg-gray-100 rounded border-gray-300"
                      checked={filters.category === ""}
                      onChange={() => handleCategoryChange("All Categories")}
                    />
                    <label className="cursor-pointer" htmlFor="all-categories">
                      All Categories
                    </label>
                  </div>
                  {subCategories?.map((category, index) => (
                    <div
                      key={index}
                      className="flex justify-start items-center gap-3 py-1"
                    >
                      <input
                        type="checkbox"
                        id={category?._id}
                        className="w-4 h-4 bg-gray-100 rounded border-gray-300"
                        checked={filters.category === category?._id}
                        onChange={() => handleGotoCategory(category?.slug)}
                      />
                      <label className="cursor-pointer" htmlFor={category?._id}>
                        {category?.categoryName}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="my-10">
                <h1 className="uppercase">Filter by Price</h1>
                <div className="text-sm my-5">
                  <input
                    type="range"
                    id="rangeInput"
                    name="rangeInput"
                    min="0"
                    max="543200"
                    value={filters.priceRange[1]}
                    onChange={(e) => handlePriceChange([0, e.target.value])}
                  />
                  <div className="mt-3">
                    <label htmlFor="rangeInput">
                      Price: ৳ 550 — ৳ {filters.priceRange[1]}
                    </label>
                  </div>
                </div>
              </div>
              <div>
                <h1 className="uppercase">FILTER BY Brand</h1>
                <div className="text-sm my-5 h-60 overflow-y-scroll scrollbar_hidden cursor-all-scroll">
                  {brands?.map((brand, index) => (
                    <button
                      key={index}
                      className="flex justify-between items-center gap-3 py-1"
                      onClick={() => handleBrandChange(brand.name)}
                    >
                      {brand.name}
                      <p>({brand?.productCount ? brand.productCount : 0})</p>
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
                    className={`text-2xl text-gray-400 hover:text-gray-700 ${
                      dynamicGrid === 1 ? "text-gray-700" : ""
                    } duration-700`}
                  />
                  <RiGridFill
                    onClick={() => handleDynamicGrid({ value: 3 })}
                    className={`text-2xl text-gray-400 hover:text-gray-700 ${
                      dynamicGrid === 3 ? "text-gray-700" : ""
                    } duration-700`}
                  />
                  <TfiLayoutGrid4Alt
                    onClick={() => handleDynamicGrid({ value: 4 })}
                    className={`text-xl text-gray-400 hover:text-gray-700 ${
                      dynamicGrid === 4 ? "text-gray-700" : ""
                    } duration-700`}
                  />
                </div>
                <div className="flex justify-start md:block lg:hidden items-center gap-5">
                  <button type="button" onClick={toggleFilterDrawer(true)}>
                    <CiFilter className="text-xl duration-700 cursor-pointer" />
                  </button>
                </div>
                <div className="flex justify-end items-center gap-5 text-[15px]">
                  <div className="flex justify-between items-center gap-3">
                    <select
                      value={sorting}
                      onChange={(e) => handleSortingChange(e.target.value)}
                      className="py-2 px-3 bg-transparent outline-none cursor-pointer"
                    >
                      <option value="default">Select Sorting</option>
                      <option value="pricehtl">Price: High to Low</option>
                      <option value="pricelth">Price: Low to High</option>
                    </select>
                  </div>
                  <div className="flex justify-between items-center gap-3">
                    <p>Show:</p>
                    <select
                      value={pagination.itemsPerPage}
                      onChange={(e) =>
                        handleItemsPerPageChange(parseInt(e.target.value))
                      }
                      className="py-2 bg-transparent outline-none cursor-pointer"
                    >
                      <option value="9">9</option>
                      <option value="12">12</option>
                      <option value="15">15</option>
                    </select>
                  </div>
                </div>
              </div>
              {filteredProducts?.length === 0 ? (
                <div className="text-center py-10">
                  <p>No products were found matching your selection.</p>
                </div>
              ) : (
                <div className="my-10">
                  <div
                    className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-${dynamicGrid} justify-between items-center gap-5`}
                  >
                    {paginatedProducts?.map((product, index) => (
                      <ProductCard key={index} product={product} />
                    ))}
                  </div>
                  <Pagination
                    currentPage={pagination.currentPage}
                    totalItems={filteredProducts.length}
                    itemsPerPage={pagination.itemsPerPage}
                    onPageChange={handlePageChange}
                  />
                </div>
              )}
            </div>
          </section>
          <Drawer anchor="left" open={open} onClose={toggleFilterDrawer(false)}>
            <Box
              sx={{
                width: 320,
              }}
              role="presentation"
              className="mx-5"
            >
              <div>
                <h1 className="uppercase">FILTER BY CATEGORIES</h1>
                <div className="text-sm my-5">
                  <div className="flex justify-start items-center gap-3 py-1">
                    <input
                      type="checkbox"
                      id="all-categories"
                      className="w-4 h-4 bg-gray-100 rounded border-gray-300"
                      checked={filters.category === ""}
                      onChange={() => handleCategoryChange("All Categories")}
                    />
                    <label className="cursor-pointer" htmlFor="all-categories">
                      All Categories
                    </label>
                  </div>
                  {subCategories?.map((category, index) => (
                    <div
                      key={index}
                      className="flex justify-start items-center gap-3 py-1"
                    >
                      <input
                        type="checkbox"
                        id={category?._id}
                        className="w-4 h-4 bg-gray-100 rounded border-gray-300"
                        // checked={filters.category === category?._id}
                        onChange={() => handleGotoCategory(category?.slug)}
                      />
                      <label className="cursor-pointer" htmlFor={category?._id}>
                        {category?.categoryName}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
              <div className="my-10">
                <h1 className="uppercase">Filter by Price</h1>
                <div className="text-sm my-5">
                  <input
                    type="range"
                    id="rangeInput"
                    name="rangeInput"
                    min="0"
                    max="543200"
                    value={filters.priceRange[1]}
                    onChange={(e) => handlePriceChange([0, e.target.value])}
                  />
                  <div className="mt-3">
                    <label htmlFor="rangeInput">
                      Price: ৳ 550 — ৳ {filters.priceRange[1]}
                    </label>
                  </div>
                </div>
              </div>
              <div>
                <h1 className="uppercase">FILTER BY Brand</h1>
                <div className="text-sm my-5 h-60 overflow-y-scroll scrollbar_hidden cursor-all-scroll">
                  {brands?.map((brand, index) => (
                    <button
                      key={index}
                      className="flex justify-between items-center gap-3 py-1"
                      onClick={() => handleBrandChange(brand.name)}
                    >
                      {brand?.name}
                      <p>({brand?.productCount ? brand.productCount : 0})</p>
                    </button>
                  ))}
                </div>
              </div>
            </Box>
          </Drawer>
        </article>
      ) : (
        <Skeleton />
      )}
    </main>
  );
}
