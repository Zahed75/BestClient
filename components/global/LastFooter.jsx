import Image from "next/image";
import sslImage from "@/public/images/ssl.png";

export default function LastFooter() {
  return (
    <section className="container">
      <div className="flex flex-col-reverse md:flex-row justify-between items-center py-10 mb-5">
        <div>
          <span>
            © Best Electronics - All Rights Reserved. Payment Partner:
            SSLCOMMERZ
          </span>
        </div>
        <div className="flex flex-col lg:flex-row items-center gap-x-5">
          <span className="text-nowrap">Terms & Conditions</span>
          <Image src={sslImage} className="w-full" alt="SSL Commerz" />
        </div>
      </div>
    </section>
  );
}
