import Image from "next/image";
import sslImage from "@/public/images/ssl.png";

export default function LastFooter() {
  return (
    <section className="px-5 md:px-44 lg:px-28 flex flex-col-reverse md:flex-row justify-between items-center py-10">
      <div>
        <span>
          © Best Electronics - All Rights Reserved. Payment Partner: SSLCOMMERZ
        </span>
      </div>
      <div className="flex flex-col md:flex-row items-center gap-x-5">
        <span className="text-nowrap">Terms & Conditions</span>
        <Image src={sslImage} className="w-full" alt="SSL Commerz" />
      </div>
    </section>
  );
}
