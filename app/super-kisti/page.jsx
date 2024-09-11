import React from 'react'
import Image from "next/image";

export default function page() {
    return (
        <div className="bg-white py-8">

            <div className="text-center">
                <h3 className="text-orange-600 text-xl font-semibold mb-2">Brands</h3>
                <div className="flex justify-center items-center space-x-4">
                    <Image src="" alt="Harp" class="h-8" />
                    <Image src="" alt="Hitachi" class="h-8" />
                    <Image src="" alt="Whirlpool" class="h-8" />
                </div>
            </div>


            <div className="text-center my-8">
                <h2 className="text-orange-600 text-2xl font-semibold">Best Electronics is proud to offer Super Kisti Installment Payment System
                    Pay for your purchases through easy and flexible monthly installments without needing to have a Credit Card.</h2>
            </div>

            <div className="flex items-center justify-center my-4">
                <div className="border-t-2 border-orange-600 w-1/4"></div>
                <span className="mx-4 text-xl text-orange-600 font-semibold">Why do I use Super Kisti?</span>
                <div className="border-t-2 border-orange-600 w-1/4"></div>
            </div>

            <div className="bg-orange-600 text-center my-8">

                <div className="flex justify-center flex-wrap gap-4 mt-4">
                    <div className=" text-white px-6 py-3 rounded">18 Months Period</div>
                    <div className=" text-white px-6 py-3 rounded">No Credit Cards Required</div>
                    <div className=" text-white px-6 py-3 rounded">Instant Approval</div>
                    <div className=" text-white px-6 py-3 rounded">Simple Documentation</div>
                    <div className=" text-white px-6 py-3 rounded">Low Monthly Installment</div>
                    <div className=" text-white px-6 py-3 rounded">Simple Requirements</div>
                </div>
            </div>

            <div className="flex items-center justify-center my-4">
                <div className="border-t-2 border-orange-600 w-1/4"></div>
                <span className="mx-4 text-xl text-orange-600 font-semibold">What are my requirements?</span>
                <div className="border-t-2 border-orange-600 w-1/4"></div>
            </div>

            <div className="bg-orange-600 text-left my-8">

                <div className="flex justify-center  gap-2 mt-4">
                    <div className="text-white px-6 py-3 rounded text-center">40% - 50% Downpayment</div>
                    <div className="text-white px-6 py-3 rounded text-center">18 Years and Above</div>
                    <div className="text-white px-6 py-3 rounded text-center">National ID Card Photocopy</div>
                    <div className="text-white px-6 py-3 rounded text-center">Utility Bill Photocopy</div>
                    <div className="text-white px-6 py-3 rounded text-center">A Guarantor with National ID card photocopy</div>
                    <div className="text-white px-6 py-3 rounded text-center">Passport size image</div>
                </div>
            </div>
        </div>

    )
}
