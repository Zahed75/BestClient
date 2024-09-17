"use client";
import Link from "next/link";
// import { useState } from "react";
import { Box, Drawer } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import bestLogo from "@/public/images/bestElectronicsLogo.svg";
import { FaStore, FaSearch, FaUser, FaBars, FaRegHeart } from "react-icons/fa";
import { SlHeart } from "react-icons/sl";
import Image from "next/image";
import { useEffect, useState } from "react";
import { fetchApi } from "@/utils/FetchApi";

const categories = [
  {
    title: "TV & Entertainment",
    link: "/shop",
    subcategories: [
      {
        title: "Televisions",
        link: "/shop",
        subcategories: [],
      },
      {
        title: "Home Theater Systems",
        link: "/shop",
        subcategories: [],
      },
    ],
  },
  {
    title: "Home Appliance",
    link: "/shop",
    subcategories: [
      {
        title: "Refrigerators",
        link: "/shop",
        subcategories: [],
      },
      {
        title: "Washing Machines",
        link: "/shop",
        subcategories: [],
      },
    ],
  },
  {
    title: "Kitchen Appliances",
    link: "/shop",
    subcategories: [
      {
        title: "Microwaves",
        link: "/shop",
        subcategories: [],
      },
      {
        title: "Blenders",
        link: "/shop",
        subcategories: [],
      },
    ],
  },
  {
    title: "Small Appliances",
    link: "/shop",
    subcategories: [],
  },
  {
    title: "Fan ",
    link: "/shop",
    subcategories: [],
  },
  {
    title: "Brand",
    link: "/shop",
    subcategories: [
      {
        title: "Samsung",
        link: "/shop",
        subcategories: [],
      },
      {
        title: "LG",
        link: "/shop",
        subcategories: [],
      },
    ],
  },
];

const navigationLink = [
  {
    title: "Home",
    link: "/",
  },
  {
    title: "All Products",
    link: "/shop",
  },
  {
    title: "Quick EMI",
    link: "/",
  },
  {
    title: "Super Kisti",
    link: "/",
  },
  {
    title: "Your Order",
    link: "/my-account/orders",
  },
  {
    title: "Contact Us",
    link: "/",
  },
];

export default function BottomNavigation() {
  const [open, setOpen] = useState(false);
  const [category, setCategory] = useState([]);
  const [hoveredCategoryId, setHoveredCategoryId] = useState(null);
  const [hoveredSubCategoryId, setHoveredSubCategoryId] = useState(null);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };
  const [categoryShow, setCategoryShow] = useState(false);
  const [submenuShow, setSubmenuShow] = useState(null);
  const toggleSubmenu = (index) => {
    setSubmenuShow(submenuShow === index ? null : index);
  };
  useEffect(() => {
    const fetchCategory = async () => {
      try {
        // const data = await fetchApi(`/category/categories-name`, "GET");
        const data = await fetchApi(`/category/getAllCat`, "GET");
        setCategory(data?.categories);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategory();
  }, []);
  return (
    <section>
      <div className="fixed md:visible lg:hidden bottom-0 left-0 z-50 w-full h-16 bg-[#F16521] mx-auto">
        <div className="grid h-full max-w-lg grid-cols-5 mx-auto font-medium">
          <Link
            href="/shop"
            className="inline-flex flex-col items-center justify-center px-4 hover:bg-gray-50 duration-700 group"
          >
            <FaStore className="w-5 h-5 mb-2 text-white group-hover:text-[#F16521] duration-700" />
            <span className="text-sm text-white group-hover:text-[#F16521] duration-700">
              Shop
            </span>
          </Link>
          <Link
            href="/search"
            className="inline-flex flex-col items-center justify-center px-4 hover:bg-gray-50 duration-700 group"
          >
            <FaSearch className="w-5 h-5 mb-2 text-white group-hover:text-[#F16521] duration-700" />
            <span className="text-sm text-white group-hover:text-[#F16521] duration-700">
              Search
            </span>
          </Link>
          <Link
            href="/my-account/wishlist"
            className="inline-flex flex-col items-center justify-center px-4 hover:bg-gray-50 duration-700 group"
          >
            <FaRegHeart className="w-5 h-5 mb-2 text-white group-hover:text-[#F16521] duration-700" />
            <span className="text-sm text-white group-hover:text-[#F16521] duration-700">
              Whishlist
            </span>
          </Link>
          <Link
            href="/my-account"
            className="inline-flex flex-col items-center justify-center px-4 hover:bg-gray-50 duration-700 group"
          >
            <FaUser className="w-5 h-5 mb-2 text-white group-hover:text-[#F16521] duration-700" />
            <span className="text-sm text-white group-hover:text-[#F16521] duration-700">
              Profile
            </span>
          </Link>
          <button
            type="button"
            onClick={toggleDrawer(true)}
            className="inline-flex flex-col items-center justify-center px-4 hover:bg-gray-50 duration-700 group"
          >
            <FaBars className="w-5 h-5 mb-2 text-white group-hover:text-[#F16521] duration-700" />
            <span className="text-sm text-white group-hover:text-[#F16521] duration-700">
              Categories
            </span>
          </button>
        </div>
      </div>

      <Drawer anchor="left" open={open} onClose={toggleDrawer(false)}>
        <Box role="presentation" className="w-[350px] md:w-[400px]">
          <div className="flex justify-between items-center border-b-2 p-3">
            <div>
              <Image src={bestLogo} alt="bestLogo" width={200} height={200} />
            </div>
            <button className="inline-block" onClick={toggleDrawer(false)}>
              <CloseIcon />
            </button>
          </div>
          <div>
            <div
              onClick={() => setCategoryShow(!categoryShow)}
              className="bg-primary mt-5 mx-3 p-3 rounded-md text-white flex justify-between items-center cursor-pointer "
            >
              All Categories
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className={`h-7 w-7 transition-transform duration-300 transform ${categoryShow ? "rotate-180" : ""
                    }`}
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M6.293 7.707a1 1 0 0 1 1.414 0L10 10.586l2.293-2.293a1 1 0 0 1 1.414 1.414l-3 3a1 1 0 0 1-1.414 0l-3-3a1 1 0 0 1 0-1.414z"
                  />
                </svg>
              </span>
            </div>
            <div>
              {categoryShow && (
                <div className="bg-white px-3 transition-all duration-700">
                  <ul>
                    {category.filter((categories) => !categories.subCategories?.categoryName).map((categories) => (
                      <li key={categories?._id} className="py-2">
                        <div className="flex justify-between items-center">
                          <Link href={""}>
                            <span
                              className="text-gray-500 hover:text-[#F16521] duration-700 cursor-pointer"
                              onClick={() => setHoveredCategoryId(hoveredCategoryId === categories._id ? null : categories._id)}
                            >
                              {categories.categoryName}
                            </span>
                          </Link>
                          {categories?.subCategories &&
                            categories?.subCategories.length > 0 && (
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className={`h-7 w-7 transition-transform duration-300 transform ${hoveredCategoryId === categories._id
                                  ? "rotate-180"
                                  : ""
                                  }`}
                                viewBox="0 0 20 20"
                                fill="currentColor"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M6.293 7.707a1 1 0 0 1 1.414 0L10 10.586l2.293-2.293a1 1 0 0 1 1.414 1.414l-3 3a1 1 0 0 1-1.414 0l-3-3a1 1 0 0 1 0-1.414z"
                                />
                              </svg>
                            )}
                        </div>
                        {hoveredCategoryId === categories._id &&
                          categories?.subCategories &&
                          categories?.subCategories.length > 0 && (
                            <ul>
                              {categories?.subCategories.map((category) => (
                                <li
                                  onClick={() => setHoveredSubCategoryId(hoveredSubCategoryId === category._id ? null : category._id)}

                                  className="py-2 px-3 cursor-pointer relative"
                                  key={category?._id}
                                >
                                  <div className="flex items-center justify-between w-full hover:text-[#F16521] cursor-pointer">
                                    <span>{category?.categoryName}</span>

                                    {category?.subCategories &&
                                      category?.subCategories.length > 0 && (
                                        <svg
                                          xmlns="http://www.w3.org/2000/svg"
                                          className={`h-7 w-7 transition-transform duration-300 transform ${hoveredSubCategoryId === category._id
                                            ? "rotate-180"
                                            : ""
                                            }`}
                                          viewBox="0 0 20 20"
                                          fill="currentColor"
                                        >
                                          <path
                                            fillRule="evenodd"
                                            d="M6.293 7.707a1 1 0 0 1 1.414 0L10 10.586l2.293-2.293a1 1 0 0 1 1.414 1.414l-3 3a1 1 0 0 1-1.414 0l-3-3a1 1 0 0 1 0-1.414z"
                                          />
                                        </svg>
                                      )}
                                  </div>

                                  {hoveredSubCategoryId === category._id &&
                                    category?.subCategories &&
                                    category?.subCategories.length > 0 && (
                                      <ul>
                                        {category.subCategories.map(
                                          (subCategory) => (
                                            <li
                                              key={subCategory?._id}
                                              className="py-2 hover:text-[#F16521] cursor-pointer"
                                              onClick={() =>
                                                setHoveredSubCategoryId(category._id)}
                                            >
                                              {subCategory?.categoryName}
                                            </li>
                                          )
                                        )}
                                      </ul>
                                    )}
                                </li>
                              ))}
                            </ul>
                          )}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
          <div className="p-3 my-5">
            <h4 className="text-sm text-gray-400 tracking-wider">
              Site Navigation
            </h4>
            <ul className="my-5">
              {navigationLink.map((link, i) => (
                <li
                  className={`py-2 border-b ${i === 0 ? "border-t" : ""}`}
                  key={i}
                >
                  <Link
                    className="text-gray-500 hover:text-[#F16521] duration-700"
                    href={link.link}
                  >
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </Box>
      </Drawer>
    </section>
  );
}
