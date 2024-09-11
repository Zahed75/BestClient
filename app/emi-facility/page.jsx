import React from 'react'
import Image from "next/image";

export default function page() {
    return (
        <div className="bg-white py-8">
            <h2 className="text-orange-600 text-center text-2xl font-bold uppercase mb-4">
                Quick EMI Payment Facility at Best Electronics
            </h2>
            <p className="container text-center text-gray-600">
                Best Electronics is proud to offer EMI facility for offline retail customers. Now you can pay using EMI payment facility with 0% interest using the credit card of any of the following 33 banks.
            </p>


            <div className="flex items-center justify-center my-4">
                <div className="border-t-2 border-orange-600 w-1/4"></div>
                <span className="mx-4 text-orange-600 font-semibold">Up to 12 months EMI with 32 banks</span>
                <div className="border-t-2 border-orange-600 w-1/4"></div>
            </div>


            <div className="overflow-x-auto">
                <table className="min-w-full bg-white shadow-md rounded-lg">
                    <thead>
                        <tr className="bg-orange-600 text-white border border-orange-600">
                            <th className="py-3 px-6 text-center border-r border-orange-600 uppercase">Bank Name</th>
                            <th className="py-3 px-6 text-center border-r border-orange-600 uppercase">Bank Logo</th>
                            <th className="py-3 px-6 text-center border-r border-orange-600 uppercase">Minimum EMI Amount</th>
                            <th className="py-3 px-6 text-center uppercase">Tenure (Facilities of Month)</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="border border-orange-600">
                            <td className="py-4 px-6 border-r-2 border-orange-600">Standard Chartered Bank</td>
                            <td className="py-4 px-6 border-r-2 border-orange-600">
                                <Image src="" alt="Bank Logo" class="w-20" />
                            </td>
                            <td className="py-4 px-6 border-r-2 border-orange-600">5,000.00</td>
                            <td className="py-4 px-6">Enjoy 0% Interest Installment for 12/9/6/3 Months</td>
                        </tr>

                        <tr>
                            <td colspan="4" class=" border-orange-600"><div class="flex items-center justify-center my-4">
                                <div className="border-t-2 border-orange-600 w-1/4"></div>
                                <span className="mx-4 text-orange-600 font-semibold text-nowrap">Up to 6 months EMI with 1 Bank</span>
                                <div className="border-t-2 border-orange-600 w-1/4"></div>
                            </div></td>
                        </tr>

                        {/* <tr>
                            <td colspan="4" class="border-b-2 border-orange-600">Up to 6 months EMI with 1 Bank</td>
                        </tr> */}

                        <tr className="border border-orange-600">
                            <td className="py-4 px-6 border-r-2 border-orange-600">Standard Chartered Bank</td>
                            <td className="py-4 px-6 border-r-2 border-orange-600">
                                <Image src="" alt="Bank Logo" class="w-20" />
                            </td>
                            <td className="py-4 px-6 border-r-2 border-orange-600">5,000.00</td>
                            <td className="py-4 px-6">Enjoy 0% Interest Installment for 12/9/6/3 Months</td>
                        </tr>

                    </tbody>
                </table>
                <div className="flex items-center justify-center my-4">
                    <div className="border-t-2 border-orange-600 w-1/4"></div>
                    <span className="mx-4 text-orange-600 font-semibold">Mandatory Conditions</span>
                    <div className="border-t-2 border-orange-600 w-1/4"></div>
                </div>
                <div className="py-8 px-4">
                    <ul className="list-decimal list-inside space-y text-gray-700">
                        <li className="pl-4">
                            Maximum Period/Tenure – 3 to 12 months, Must check the mentioned tenure before finalizing the sales.
                        </li>
                        <li className="pl-4">
                            Special discounts and Campaign facilities (If any) will not allow for the EMI facility.
                        </li>
                        <li className="pl-4">
                            Use the same bank form for EMI transactions.
                        </li>
                        <li className="pl-4">
                            Check the signature in Card, Sale Slip and EMI form. If there is any discrepancy, Credit Card Sales and EMI Facility will not be allowed.
                        </li>
                        <li className="pl-4">
                            After completing the transaction, send the Bank and Merchant copy to Best Electronics Head office immediately with a report signed and sealed by the Branch Manager or Asst. Branch Manager.
                        </li>
                        <li className="pl-4">
                            Mention the related Sales Invoice number in the EMI form.
                        </li>
                        <li className="pl-4">
                            Carefully fill out all mandatory parts of the EMI form.
                        </li>
                        <li className="pl-4">
                            <span>0% EMI facility is subject to the company&apos;s decision. Some products may not be covered under the 0% EMI scheme.</span>
                        </li>
                    </ul>
                </div>

                <h2 className="container text-orange-600 text-md font-bold uppercase mb-4">Last updated on 23 January, 2024 . Interested banks are requested to Apply Online for Best Electronics Quick EMI.</h2>



            </div>
        </div>

    )
}
