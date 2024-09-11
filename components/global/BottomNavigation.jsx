"use client";
import Link from "next/link";
import { useState } from "react";
import { Box, Drawer } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import bestLogo from "@/public/images/bestElectronicsLogo.svg";
import { FaStore, FaSearch, FaUser, FaBars, FaRegHeart } from "react-icons/fa";
import { SlHeart } from "react-icons/sl";
import Image from "next/image";

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
  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };
  const [categoryShow, setCategoryShow] = useState(false);
  const [submenuShow, setSubmenuShow] = useState(null);
  const toggleSubmenu = (index) => {
    setSubmenuShow(submenuShow === index ? null : index);
  };
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
                    {categories.map((category, index) => (
                      <li key={index} className="py-2">
                        <div className="flex justify-between items-center">
                          <Link href={category.link}>
                            <span
                              className="text-gray-500 hover:text-[#F16521] duration-700 cursor-pointer"
                              onClick={() => toggleSubmenu(index)}
                            >
                              {category.title}
                            </span>
                          </Link>
                          {category.subcategories.length > 0 && (
                            <span
                              onClick={() => toggleSubmenu(index)}
                              className="cursor-pointer"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className={`h-7 w-7 transition-transform duration-300 transform text-gray-400 ${submenuShow === index ? "rotate-180" : ""
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
                          )}
                        </div>
                        {submenuShow === index &&
                          category.subcategories.length > 0 && (
                            <ul className="ml-5 mt-2">
                              {category.subcategories.map(
                                (subcategory, subIndex) => (
                                  <li key={subIndex} className="py-1">
                                    <Link href={subcategory.link}>
                                      <span className="text-gray-500 hover:text-[#F16521] duration-700 cursor-pointer">
                                        {subcategory.title}
                                      </span>
                                    </Link>
                                    {subcategory.subcategories.length > 0 && (
                                      <ul className="ml-5 mt-1">
                                        {subcategory.subcategories.map(
                                          (subSubcategory, subSubIndex) => (
                                            <li
                                              key={subSubIndex}
                                              className="py-1"
                                            >
                                              <Link href={subSubcategory.link}>
                                                <span className="text-gray-500 hover:text-[#F16521] duration-700 cursor-pointer">
                                                  {subSubcategory.title}
                                                </span>
                                              </Link>
                                            </li>
                                          )
                                        )}
                                      </ul>
                                    )}
                                  </li>
                                )
                              )}
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
