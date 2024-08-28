import imag10 from "@/public/testImages/10.png";
import Image from "next/image";

export default function NewProduct() {
  return (
    <div className="flex justify-start items-center md:gap-5 my-5">
      <div className="relative">
        <div className="absolute top-0 left-0 bg-[#F16521] text-white w-[60px] h-[60px] rounded-full px-5 pt-4 flex justify-center z-10">
          <span className="text-2xl">
            5%
          </span>
        </div>
        <div className="object-cover w-[200px] h-[200px]">
          <Image
            src={imag10}
            alt="product"
            className="hover:scale-105 duration-700"
          />
        </div>
      </div>
      <div className="z-20">
        <h4 className="text-[#202435] text-md font-semibold mt-2">
          Conion BEW-DC24KRNV 2 Ton Inverter (DynaCool) Air Conditioner
        </h4>
        <p className="text-[#70BE38] text-xs font-semibold font-dosis my-3">IN STOCK</p>
      </div>
    </div>
  );
}
