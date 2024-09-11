import React from 'react'

export default function page() {
    return (
        <div class="bg-white py-8">
            <h2 class="text-orange-600 text-center text-2xl font-bold uppercase mb-4">
                Quick EMI Payment Facility at Best Electronics
            </h2>
            <p class="container text-center text-gray-600">
                Best Electronics is proud to offer EMI facility for offline retail customers. Now you can pay using EMI payment facility with 0% interest using the credit card of any of the following 33 banks.
            </p>


            <div class="flex items-center justify-center my-4">
                <div class="border-t-2 border-orange-600 w-1/4"></div>
                <span class="mx-4 text-orange-600 font-semibold">Up to 12 months EMI with 32 banks</span>
                <div class="border-t-2 border-orange-600 w-1/4"></div>
            </div>


            <div class="overflow-x-auto">
                <table class="min-w-full bg-white shadow-md rounded-lg">
                    <thead>
                        <tr class="bg-orange-600 text-white border border-orange-600">
                            <th class="py-3 px-6 text-center border-r border-orange-600 uppercase">Bank Name</th>
                            <th class="py-3 px-6 text-center border-r border-orange-600 uppercase">Bank Logo</th>
                            <th class="py-3 px-6 text-center border-r border-orange-600 uppercase">Minimum EMI Amount</th>
                            <th class="py-3 px-6 text-center uppercase">Tenure (Facilities of Month)</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr class="border border-orange-600">
                            <td class="py-4 px-6 border-r-2 border-orange-600">Standard Chartered Bank</td>
                            <td class="py-4 px-6 border-r-2 border-orange-600">
                                <img src="https://via.placeholder.com/100" alt="Bank Logo" class="w-20" />
                            </td>
                            <td class="py-4 px-6 border-r-2 border-orange-600">5,000.00</td>
                            <td class="py-4 px-6">Enjoy 0% Interest Installment for 12/9/6/3 Months</td>
                        </tr>

                        <tr>
                            <td colspan="4" class=" border-orange-600"><div class="flex items-center justify-center my-4">
                                <div class="border-t-2 border-orange-600 w-1/4"></div>
                                <span class="mx-4 text-orange-600 font-semibold text-nowrap">Up to 6 months EMI with 1 Bank</span>
                                <div class="border-t-2 border-orange-600 w-1/4"></div>
                            </div></td>
                        </tr>

                        {/* <tr>
                            <td colspan="4" class="border-b-2 border-orange-600">Up to 6 months EMI with 1 Bank</td>
                        </tr> */}

                        <tr class="border border-orange-600">
                            <td class="py-4 px-6 border-r-2 border-orange-600">Standard Chartered Bank</td>
                            <td class="py-4 px-6 border-r-2 border-orange-600">
                                <img src="https://via.placeholder.com/100" alt="Bank Logo" class="w-20" />
                            </td>
                            <td class="py-4 px-6 border-r-2 border-orange-600">5,000.00</td>
                            <td class="py-4 px-6">Enjoy 0% Interest Installment for 12/9/6/3 Months</td>
                        </tr>

                    </tbody>
                </table>
                <div class="flex items-center justify-center my-4">
                    <div class="border-t-2 border-orange-600 w-1/4"></div>
                    <span class="mx-4 text-orange-600 font-semibold">Mandatory Conditions</span>
                    <div class="border-t-2 border-orange-600 w-1/4"></div>
                </div>
                <div class="py-8 px-4">
                    <ul class="list-decimal list-inside space-y text-gray-700">
                        <li class="pl-4">
                            Maximum Period/Tenure – 3 to 12 months, Must check the mentioned tenure before finalizing the sales.
                        </li>
                        <li class="pl-4">
                            Special discounts and Campaign facilities (If any) will not allow for the EMI facility.
                        </li>
                        <li class="pl-4">
                            Use the same bank form for EMI transactions.
                        </li>
                        <li class="pl-4">
                            Check the signature in Card, Sale Slip and EMI form. If there is any discrepancy, Credit Card Sales and EMI Facility will not be allowed.
                        </li>
                        <li class="pl-4">
                            After completing the transaction, send the Bank and Merchant copy to Best Electronics Head office immediately with a report signed and sealed by the Branch Manager or Asst. Branch Manager.
                        </li>
                        <li class="pl-4">
                            Mention the related Sales Invoice number in the EMI form.
                        </li>
                        <li class="pl-4">
                            Carefully fill out all mandatory parts of the EMI form.
                        </li>
                        <li class="pl-4">
                            0% EMI facility is subject to the company's decision. Some products may not be covered under the 0% EMI scheme.
                        </li>
                    </ul>
                </div>

                <h2 class="container text-orange-600 text-md font-bold uppercase mb-4">Last updated on 23 January, 2024 . Interested banks are requested to Apply Online for Best Electronics Quick EMI.</h2>



            </div>
        </div>

    )
}
