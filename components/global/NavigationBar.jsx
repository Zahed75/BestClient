import arrayBottom from "@/public/images/arrayBottom.svg";
import treeDot from "@/public/images/treeDot.svg";
import Image from "next/image";

export default function NavigationBar() {
  return (
    <nav className="px-5 md:px-44 min-w-full md:grid grid-cols-2 justify-stretch items-center">
      <div className="relative">
        <button className="bg-[#F16521] text-sm font-normal px-5 py-4 uppercase text-white rounded-full flex justify-start items-center relative">
          <Image src={treeDot} className="w-4 h-4 mr-5" alt="Tree Dot" /> All
          Categories
          <Image
            src={arrayBottom}
            className="w-4 h-4 ml-5"
            alt="Array Bottom"
          />{" "}
          <span className="bg-gray-100 text-[#71778E] text-[10px] text-nowrap px-1 border border-white rounded-xl absolute -bottom-[10px] left-[22%] mx-auto">
            TOTAL 813 PRODUCTS
          </span>
        </button>
      </div>
      <div></div>
    </nav>
  );
}
