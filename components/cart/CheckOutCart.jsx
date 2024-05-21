export default function CheckOutCart() {
  return (
    <section className="">
      <div className="my-10 grid grid-cols-1 md:grid-cols-3 justify-between items-start gap-10">
        <div className="md:col-span-2">
          <h1 className="text-lg md:text-2xl font-semibold uppercase">
            Checkout Cart
          </h1>
          <div className="my-5">
            <span className="font-semibold">Billing Details</span>
            <div className="grid grid-cols-2 justify-start items-center gap-5 my-5 max-w-screen-md">
              <div>
                <label className="text-sm" htmlFor="fname">
                  First Name *
                </label>
                <input
                  className="border-2 border-gray-400 bg-transparent rounded-md w-full py-2 px-3 focus:outline-0"
                  type="text"
                  name="fname"
                  id="fname"
                />
              </div>
              <div>
                <label className="text-sm" htmlFor="lname">
                  Last Name *
                </label>
                <input
                  className="border-2 border-gray-400 bg-transparent rounded-md w-full py-2 px-3 focus:outline-0"
                  type="text"
                  name="lname"
                  id="lname"
                />
              </div>
              <div className=" col-span-2">
                <label className="text-sm" htmlFor="faddress">
                  Enter Your Full Address*
                </label>
                <input
                  className="border-2 border-gray-400 bg-transparent rounded-md w-full py-2 px-3 focus:outline-0"
                  type="text"
                  name="faddress"
                  id="faddress"
                  placeholder="House name & no., Road no., Village name, Ward no., Thana, Upazilla"
                />
              </div>
              <div className=" col-span-2">
                <label className="text-sm" htmlFor="district">
                  District *
                </label>
                <select
                  className="border-2 border-gray-400 bg-transparent rounded-md w-full py-2 px-3 focus:outline-0"
                  name="district"
                  id="district"
                >
                  <option value="Dhaka">Dhaka</option>
                  <option value="Chattogram">Chattogram</option>
                  <option value="Khulna">Khulna</option>
                  <option value="Rajshahi">Rajshahi</option>
                  <option value="Barishal">Barishal</option>
                  <option value="Sylhet">Sylhet</option>
                  <option value="Rangpur">Rangpur</option>
                </select>
              </div>
              <div className=" col-span-2">
                <label className="text-sm" htmlFor="cphone">
                  Enter Your Full Address*
                </label>
                <input
                  className="border-2 border-gray-400 bg-transparent rounded-md w-full py-2 px-3 focus:outline-0"
                  type="tel"
                  name="cphone"
                  id="cphone"
                  placeholder="+880 "
                />
              </div>
            </div>
          </div>
        </div>
        <div className="bg-[#F8F9FD] p-5 rounded-md shadow-md">
          <h4 className="text-lg font-semibold">Products</h4>
          <div className="my-5">
            <div className="flex justify-between items-start gap-5 my-3">
              <span className="font-semibold">1 x</span>
              <span className="font-semibold max-w-52">
                Conion BEW-DC24KRNV 2 Ton Inverter (DynaCool) Air Conditioner
              </span>
              <span className="font-semibold">৳40358</span>
            </div>
            <div className="flex justify-between items-start gap-5 my-3">
              <span className="font-semibold">1 x</span>
              <span className="font-semibold max-w-52">
                Conion BEW-DC24KRNV 2 Ton Inverter (DynaCool) Air Conditioner
              </span>
              <span className="font-semibold">৳34530</span>
            </div>
          </div>
          <h4 className="text-lg font-semibold">Payment Method</h4>
          <div className="my-5">
            <div className="flex justify-start items-center">
              <input
                className="rounded-md mr-3 focus:outline-0"
                type="radio"
                name="payment"
                id="cash"
              />
              <label className="text-sm" htmlFor="cash">
                Cash on Delivery
              </label>
            </div>
            <div className="flex justify-start items-center mt-3">
              <input
                className="rounded-md mr-3 focus:outline-0"
                type="radio"
                name="payment"
                id="card"
              />
              <label className="text-sm" htmlFor="card">
                Debit/Credit Cards, Mobile Banking, Internet Banking (Conditions
                Apply on Free Home Delivery)
              </label>
            </div>
          </div>
          <h4 className="text-lg font-semibold">Order summary</h4>
          <div className="my-5">
            <div className="flex justify-between items-center my-3">
              <span>Products price</span>
              <span className="font-semibold">৳1840</span>
            </div>
            <div className="flex justify-between items-center my-3">
              <span>Delivery</span>
              <span className="font-semibold">৳40</span>
            </div>
            <div className="flex justify-between items-center my-3">
              <span>VAT</span>
              <span className="font-semibold">৳40</span>
            </div>
            <div className="border"></div>
            <div className="flex justify-between items-center my-3">
              <span>Total (Incl. VAT)</span>
              <span className="font-semibold">৳2240</span>
            </div>
          </div>
          <div className="flex justify-start items-center gap-5 my-10">
            <svg
              width="20"
              height="21"
              viewBox="0 0 20 21"
              fill="none"
              className="w-6 h-6"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clipPath="url(#clip0_707_6157)">
                <path
                  d="M18.3385 11.06C18.2451 10.8867 18.2451 10.7134 18.3385 10.54L19.0785 9.02005C19.2918 8.59338 19.3251 8.15672 19.1785 7.71005C19.0318 7.26338 18.7451 6.92672 18.3185 6.70005L16.8185 5.92005C16.6451 5.82672 16.5451 5.68672 16.5185 5.50005L16.2185 3.82005C16.1385 3.35338 15.9085 2.98338 15.5285 2.71005C15.1485 2.43672 14.7251 2.33338 14.2585 2.40005L12.5785 2.64005C12.3918 2.66672 12.2318 2.61338 12.0985 2.48005L10.8785 1.30005C10.5451 0.966717 10.1418 0.800049 9.66846 0.800049C9.19512 0.800049 8.78512 0.966717 8.43846 1.30005L7.21846 2.48005C7.08512 2.61338 6.92512 2.66672 6.73846 2.64005L5.05846 2.40005C4.59179 2.33338 4.16846 2.43672 3.78846 2.71005C3.40846 2.98338 3.17846 3.35338 3.09846 3.82005L2.79846 5.50005C2.77179 5.68672 2.67179 5.82672 2.49846 5.92005L0.998458 6.70005C0.571791 6.92672 0.285124 7.26338 0.138458 7.71005C-0.00820891 8.15672 0.0251244 8.59338 0.238458 9.02005L0.998458 10.54C1.09179 10.7134 1.09179 10.8867 0.998458 11.06L0.238458 12.58C0.0251244 13.0067 -0.00820891 13.44 0.138458 13.88C0.285124 14.32 0.571791 14.6534 0.998458 14.88L2.49846 15.68C2.67179 15.7734 2.77179 15.9134 2.79846 16.1L3.09846 17.78C3.16512 18.1934 3.35846 18.5367 3.67846 18.81C3.99846 19.0834 4.37179 19.22 4.79846 19.22C4.90512 19.22 4.99179 19.2134 5.05846 19.2L6.73846 18.96C6.92512 18.9334 7.08512 18.9867 7.21846 19.12L8.43846 20.3C8.77179 20.6334 9.17846 20.8 9.65846 20.8C10.1385 20.8 10.5451 20.6334 10.8785 20.3L12.0985 19.12C12.2318 18.9867 12.3918 18.9334 12.5785 18.96L14.2585 19.2C14.7251 19.2667 15.1485 19.1634 15.5285 18.89C15.9085 18.6167 16.1385 18.2467 16.2185 17.78L16.5185 16.1C16.5451 15.9134 16.6451 15.7734 16.8185 15.68L18.3185 14.88C18.7451 14.6534 19.0318 14.32 19.1785 13.88C19.3251 13.44 19.2918 13.0067 19.0785 12.58L18.3385 11.06ZM17.7785 13.88L16.2785 14.66C16.0385 14.7934 15.8418 14.9667 15.6885 15.18C15.5351 15.3934 15.4318 15.6334 15.3785 15.9L15.0985 17.58C15.0718 17.74 14.9918 17.8667 14.8585 17.96C14.7251 18.0534 14.5785 18.0867 14.4185 18.06L12.7385 17.82C12.4851 17.78 12.2285 17.8034 11.9685 17.89C11.7085 17.9767 11.4851 18.1134 11.2985 18.3L10.0785 19.48C9.97179 19.5867 9.83512 19.64 9.66846 19.64C9.50179 19.64 9.36512 19.5867 9.25846 19.48L8.03846 18.3C7.67846 17.9667 7.27179 17.8 6.81846 17.8L6.57846 17.82L4.89846 18.06C4.73846 18.0867 4.59179 18.0534 4.45846 17.96C4.32512 17.8667 4.24512 17.74 4.21846 17.58L3.93846 15.9C3.88512 15.6334 3.78179 15.3934 3.62846 15.18C3.47512 14.9667 3.27846 14.7934 3.03846 14.66L1.53846 13.88C1.39179 13.8134 1.29512 13.7034 1.24846 13.55C1.20179 13.3967 1.21179 13.2467 1.27846 13.1L2.01846 11.56C2.13846 11.32 2.19846 11.0667 2.19846 10.8C2.19846 10.5334 2.13846 10.28 2.01846 10.04L1.27846 8.50005C1.21179 8.35338 1.20179 8.20338 1.24846 8.05005C1.29512 7.89672 1.39179 7.78672 1.53846 7.72005L3.03846 6.94005C3.27846 6.80672 3.47512 6.63338 3.62846 6.42005C3.78179 6.20672 3.88512 5.96672 3.93846 5.70005L4.21846 4.02005C4.24512 3.86005 4.32512 3.73338 4.45846 3.64005C4.59179 3.54672 4.73846 3.51338 4.89846 3.54005L6.57846 3.78005C6.83179 3.82005 7.08846 3.79672 7.34846 3.71005C7.60846 3.62338 7.83846 3.48672 8.03846 3.30005L9.25846 2.12005C9.36512 2.01338 9.50179 1.96005 9.66846 1.96005C9.83512 1.96005 9.97179 2.01338 10.0785 2.12005L11.2985 3.30005C11.4851 3.48672 11.7085 3.62338 11.9685 3.71005C12.2285 3.79672 12.4851 3.82005 12.7385 3.78005L14.4185 3.54005C14.5785 3.51338 14.7251 3.54672 14.8585 3.64005C14.9918 3.73338 15.0718 3.86005 15.0985 4.02005L15.3785 5.70005C15.4318 5.96672 15.5351 6.20672 15.6885 6.42005C15.8418 6.63338 16.0385 6.80672 16.2785 6.94005L17.7785 7.72005C17.9251 7.78672 18.0218 7.89672 18.0685 8.05005C18.1151 8.20338 18.1051 8.35338 18.0385 8.50005L17.2985 10.04C17.1785 10.28 17.1185 10.5334 17.1185 10.8C17.1185 11.0667 17.1785 11.32 17.2985 11.56L18.0385 13.1C18.1051 13.2467 18.1151 13.3967 18.0685 13.55C18.0218 13.7034 17.9251 13.8134 17.7785 13.88ZM13.8785 6.58005C13.7718 6.47338 13.6351 6.42005 13.4685 6.42005C13.3018 6.42005 13.1651 6.47338 13.0585 6.58005L5.43846 14.2C5.33179 14.3067 5.27846 14.44 5.27846 14.6C5.27846 14.76 5.33512 14.8967 5.44846 15.01C5.56179 15.1234 5.69179 15.18 5.83846 15.18C5.98512 15.18 6.12512 15.1267 6.25846 15.02L13.8785 7.40005C13.9851 7.29338 14.0385 7.16005 14.0385 7.00005C14.0385 6.84005 13.9851 6.70005 13.8785 6.58005ZM7.35846 5.60005C6.97179 5.60005 6.61512 5.69672 6.28846 5.89005C5.96179 6.08338 5.70512 6.34005 5.51846 6.66005C5.33179 6.98005 5.23846 7.33338 5.23846 7.72005C5.23846 8.10672 5.33179 8.46005 5.51846 8.78005C5.70512 9.10005 5.96179 9.35672 6.28846 9.55005C6.61512 9.74338 6.97179 9.84005 7.35846 9.84005C7.74512 9.84005 8.09846 9.74338 8.41846 9.55005C8.73846 9.35672 8.99179 9.10005 9.17846 8.78005C9.36512 8.46005 9.45846 8.10672 9.45846 7.72005C9.45846 7.33338 9.36512 6.98005 9.17846 6.66005C8.99179 6.34005 8.73512 6.08338 8.40846 5.89005C8.08179 5.69672 7.73179 5.60005 7.35846 5.60005ZM7.35846 8.68005C7.09179 8.68005 6.86512 8.58672 6.67846 8.40005C6.49179 8.21338 6.39846 7.98672 6.39846 7.72005C6.39846 7.45338 6.49179 7.22672 6.67846 7.04005C6.86512 6.85338 7.09179 6.76005 7.35846 6.76005C7.62512 6.76005 7.85179 6.85338 8.03846 7.04005C8.22512 7.22672 8.31846 7.45338 8.31846 7.72005C8.31846 7.98672 8.22512 8.21338 8.03846 8.40005C7.85179 8.58672 7.62512 8.68005 7.35846 8.68005ZM11.9585 11.76C11.5718 11.76 11.2185 11.8534 10.8985 12.04C10.5785 12.2267 10.3251 12.4834 10.1385 12.81C9.95179 13.1367 9.85846 13.4934 9.85846 13.88C9.85846 14.4667 10.0618 14.9634 10.4685 15.37C10.8751 15.7767 11.3718 15.98 11.9585 15.98C12.3451 15.98 12.7018 15.8867 13.0285 15.7C13.3551 15.5134 13.6118 15.26 13.7985 14.94C13.9851 14.62 14.0785 14.2667 14.0785 13.88C14.0785 13.4934 13.9851 13.14 13.7985 12.82C13.6118 12.5 13.3551 12.2434 13.0285 12.05C12.7018 11.8567 12.3451 11.76 11.9585 11.76ZM11.9585 14.84C11.7051 14.84 11.4818 14.7434 11.2885 14.55C11.0951 14.3567 10.9985 14.13 10.9985 13.87C10.9985 13.61 11.0951 13.3867 11.2885 13.2C11.4818 13.0134 11.7085 12.92 11.9685 12.92C12.2285 12.92 12.4518 13.0134 12.6385 13.2C12.8251 13.3867 12.9185 13.6134 12.9185 13.88C12.9185 14.1467 12.8251 14.3734 12.6385 14.56C12.4518 14.7467 12.2251 14.84 11.9585 14.84Z"
                  fill="#202435"
                />
              </g>
              <defs>
                <clipPath id="clip0_707_6157">
                  <rect
                    width="20"
                    height="20"
                    fill="white"
                    transform="matrix(1 0 0 -1 0 20.8)"
                  />
                </clipPath>
              </defs>
            </svg>
            <span>Have a Coupon Code ?</span>
          </div>
          <div className="">
            <span>
              You can only use one coupon/voucher code per order. Enter the code
              without any space between letters. Do you have a gift card? You
              can exchange these later in the process.
            </span>
            <div className="my-5 w-full">
              <form
                className="flex justify-between items-center gap-5 "
                action=""
              >
                <input
                  className="border-2 border-gray-400 bg-transparent rounded-md w-full py-1 px-3 focus:outline-0"
                  type="text"
                  name="coupon"
                  id="coupon"
                />
                <button
                  type="submit"
                  className="border-2 border-gray-400 rounded-md py-1 px-3"
                >
                  Submit
                </button>
              </form>
            </div>

            <button
              type="submit"
              className="flex justify-center w-full py-3 text-white bg-[#F16521] rounded-md text-sm"
            >
              Continue
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
