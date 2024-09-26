import React from "react";
import Image from "next/image";
import Link from "next/link";
import logo from "@/public/images/BestElectronics.png";

export default function LastFooter_1() {
  const footerText =
    "Prices, offers, and availability are subject to change without prior notice. All prices are inclusive of applicable taxes. Product images and colors are for illustration purposes only and may differ from the actual product. Product specifications may change and could vary from the actual product. While we strive for accuracy, content on this website is provided 'as is' without any warranty of any kind. Best Electronics reserves the right to modify or discontinue any product or service without prior notice. We are not liable for any typographical or graphical errors in content. Please consult directly with our customer service team (Drooto Helpline) for the most up-to-date product and pricing information.";
  return (
    <section className="container">
      <div className="py-10 mb-5">
        <Link href="/">
          <div className="flex justify-center items-center mb-5">
            <Image src={logo} className="w-fit" alt="SSL Commerz" />
          </div>
        </Link>
        <div className="flex flex-wrap justify-center items-center text-sm text-gray-600 mb-5">
          <a
            href="https://www.bestelectronics.com.bd/emi-facility"
            className="hover:underline px-4"
          >
            Quick EMIs
          </a>
          <a
            href="https://www.bestelectronics.com.bd/super-kisti"
            className="hover:underline border-l border-gray-300 px-4"
          >
            Super Kisti
          </a>
          <a
            href="https://www.bestelectronics.com.bd/refund-return-policy"
            className="hover:underline border-l border-gray-300 px-4"
          >
            Refund and Return Policy
          </a>
          <a
            href="https://www.bestelectronics.com.bd/warranty-policy"
            className="hover:underline border-l border-gray-300 px-4"
          >
            Terms & Conditions of Warranty
          </a>
          <a
            href="https://www.bestelectronics.com.bd/privacy-policy"
            className="hover:underline border-l border-gray-300 px-4"
          >
            Privacy Policy
          </a>
          <a
            href="https://www.bestelectronics.com.bd/customer-complaint"
            className="hover:underline border-l border-gray-300 px-4"
          >
            Customer Complaint
          </a>
        </div>

        <div className="flex justify-center items-center text-sm text-gray-600 mb-5 text-center">
          © Best Electronics - All Rights Reserved. Payment Partner: SSLCOMMERZ
        </div>
        <div className="flex text-sm text-gray-600 text-center">
          {footerText}
        </div>
      </div>
    </section>
  );
}
