"use client";
import Link from "next/link";
import { FaStore, FaSearch, FaUser, FaBars } from "react-icons/fa";

export default function BottomNavigation() {
  return (
    <div className="fixed md:hidden bottom-0 left-0 z-50 w-full h-16 bg-[#F16521]">
      <div className="grid h-full max-w-lg grid-cols-4 mx-auto font-medium">
        <Link
          href="/shop"
          className="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 duration-700 group"
        >
          <FaStore className="w-5 h-5 mb-2 text-white group-hover:text-[#F16521] duration-700" />
          <span className="text-sm text-white group-hover:text-[#F16521] duration-700">
            Shop
          </span>
        </Link>
        <button
          type="button"
          className="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 duration-700 group"
        >
          <FaSearch className="w-5 h-5 mb-2 text-white group-hover:text-[#F16521] duration-700" />
          <span className="text-sm text-white group-hover:text-[#F16521] duration-700">
            Search
          </span>
        </button>
        <Link
          href="/userfeed"
          className="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 duration-700 group"
        >
          <FaUser className="w-5 h-5 mb-2 text-white group-hover:text-[#F16521] duration-700" />
          <span className="text-sm text-white group-hover:text-[#F16521] duration-700">
            Profile
          </span>
        </Link>
        <button
          type="button"
          className="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 duration-700 group"
        >
          <FaBars className="w-5 h-5 mb-2 text-white group-hover:text-[#F16521] duration-700" />
          <span className="text-sm text-white group-hover:text-[#F16521] duration-700">
            Categories
          </span>
        </button>
      </div>
    </div>
  );
}

// only for mobile version
