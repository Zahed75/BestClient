"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { fetchApi } from "@/utils/FetchApi";

export default function MobileLogin() {
  const router = useRouter();
  const formRef = useRef(null);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");



  const onSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    const phoneNumber = formRef.current.phoneNumber.value;

    if (phoneNumber) {
      try {
        const data = { phoneNumber };
        const response = await fetchApi("/customer/loginPhoneOTP", "POST", data);


        if (response) {
          console.log(response);

          setIsLoading(false);
          localStorage.setItem("phoneNumber", JSON.stringify(response?.customer?.phoneNumber));
          router.push("/verifyphoneotp");
        } else {
          setError("Something went wrong. Please try again.");
        }
      } catch (error) {
        setError("An error occurred. Please try again.");
      }
    }
    setIsLoading(false);
  };

  return (
    <section className="container">
      <div className="mx-auto flex justify-center py-20">
        <div className="flex justify-center shadow-md bg-white rounded-md">
          <div className="flex flex-col p-5 w-[26rem] space-y-4">
            <h1 className="text-xl font-semibold">Sign in with Phone Number</h1>
            <form ref={formRef} onSubmit={onSubmit} className="space-y-5">
              <div>
                <label className="text-sm" htmlFor="number">
                  Mobile Number
                </label>
                <input
                  className="border-2 bg-transparent rounded-md w-full py-2 px-3 focus:outline-0"
                  type="tel"
                  name="phoneNumber"
                  id="phoneNumber"
                  required
                  defaultValue={"880"}
                />
              </div>
              <div className="flex justify-start items-center text-sm">
                <Link href="/mobilesignup" className="text-[#F16521]">
                  Create an account
                </Link>
              </div>
              {error && <div className="text-red-500 text-sm">{error}</div>}
              <button
                type="submit"
                className="flex justify-center w-full py-3 text-white bg-[#F16521] rounded-md text-sm"
              >
                {isLoading ? "Submitting..." : "Sign in"}
              </button>
            </form>

            <div className="flex justify-center items-center gap-2 mb-5">
              <div className="border w-20 h-0"></div>
              <div className="text-gray-400 text-sm">
                Or use one of these options
              </div>
              <div className="border w-20 h-0"></div>
            </div>

            <div className="flex justify-center items-center gap-3 border-b pb-5">
              <Link href="/signin" className="text-[#F16521]">
                Sign in with Email
              </Link>
            </div>
            <div className="text-center text-sm">
              By signing in or creating an account, you agree with our
              <Link href="/" className="text-[#F16521] pl-1">
                Terms & Conditions
              </Link>{" "}
              and
              <Link href="/" className="text-[#F16521] pl-1">
                Privacy Statement
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
