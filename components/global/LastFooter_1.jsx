import React from 'react'
import Image from "next/image";
import logo from "@/public/images/BestElectronics.png";

export default function LastFooter_1() {
    return (
        <section className="container">
            <div className="py-10 mb-5">
                <div className="flex justify-center items-center mb-5">
                    <Image src={logo} className="w-fit" alt="SSL Commerz" />

                </div>
                <div className="flex flex-wrap justify-center items-center text-sm text-gray-600 mb-5">
                    <a href="#" className="hover:underline px-4">Quick EMIs</a>
                    <a href="#" className="hover:underline border-l border-gray-300 px-4">Super Kisti</a>
                    <a href="#" className="hover:underline border-l border-gray-300 px-4">Refund and Return Policy</a>
                    <a href="#" className="hover:underline border-l border-gray-300 px-4">Terms & Conditions of Warranty</a>
                    <a href="#" className="hover:underline border-l border-gray-300 px-4">Privacy Policy</a>
                    <a href="#" className="hover:underline border-l border-gray-300 px-4">Customer Complaint</a>
                </div>


                <div className="flex justify-center items-center text-sm text-gray-600 mb-5">
                    © Best Electronics - All Rights Reserved. Payment Partner:
                    SSLCOMMERZ
                </div>
                <div className="flex justify-center items-center text-sm text-gray-600">
                    Best Electronics Limited is authorised and regulated by the Financial Conduct Authority as a credit broker (713206), and works exclusively with the lender, Home Retail Group Card Services Limited trading as Best Electronics Card and Best Electronics Financial Services, who are authorised and regulated by the Financial Conduct Authority to provide credit (716148). Home Retail Group Card Services Limited is registered in England (04007072) at 33 Holborn, London, United Kingdom, EC1N 2HT.
                </div>
            </div>
        </section>
    );
}
