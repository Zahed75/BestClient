"use client";
import fbLogin from "@/public/images/fblogin.png";
import googleLogin from "@/public/images/googlelogin.png";
import appleLogin from "@/public/images/applelogin.png";
import Image from "next/image";
import Link from "next/link";
import view from "@/public/images/view.svg";
import hidden from "@/public/images/view-off.svg";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { fetchApi } from "@/utils/FetchApi";

export default function MobileRegistration() {
  const router = useRouter();
  const formRef = useRef(null);

  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handlePasswordToggle = () => {
    setShowPassword(!showPassword);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    const firstName = formRef.current.name.value;
    const phoneNumber = formRef.current.mobile.value;

    if (firstName && mobile) {
      try {
        const data = { firstName, phoneNumber };

        const response = await fetchApi(
          "/customer/registerByPhone",
          "POST",
          data
        );

        if (response) {
          localStorage.setItem(
            "phoneNumber",
            JSON.stringify(response?.phoneNumber)
          );
          setIsLoading(false);
          router.push("/verifyphoneotp");
        } else {
          setError("Something went wrong. Please try again.");
        }
      } catch (error) {
        console.error(error);
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
            <h1 className="text-xl font-semibold">Sign up with Phone Number</h1>
            <form
              ref={formRef}
              onSubmit={(e) => onSubmit(e)}
              className="space-y-5"
            >
              <div>
                <label className="text-sm" htmlFor="name">
                  Name
                </label>
                <input
                  className="border-2 bg-transparent rounded-md w-full py-2 px-3 focus:outline-0"
                  type="name"
                  name="name"
                  id="name"
                  required
                />
              </div>
              <div>
                <label className="text-sm" htmlFor="mobile">
                  Mobile Number
                </label>
                <input
                  className="border-2 bg-transparent rounded-md w-full py-2 px-3 focus:outline-0"
                  type="tel"
                  name="mobile"
                  id="mobile"
                  required
                  defaultValue={"880"}
                />
              </div>
              <div className="flex justify-start items-center text-sm">
                <Link href="/mobilesignin" className="text-[#F16521]">
                  Sign in With Phone Number
                </Link>
              </div>

              <button
                type="submit"
                className="flex justify-center w-full py-3 text-white bg-[#F16521] rounded-md text-sm"
              >
                {isLoading ? "Loading..." : "Continue"}
              </button>
            </form>

            {error && <div className="text-red-500 text-sm">{error}</div>}

            <div className="flex justify-center items-center gap-2 mb-5">
              <div className="border w-20 h-0"></div>
              <div className="text-gray-400 text-sm">
                Or use one of these options
              </div>
              <div className="border w-20 h-0"></div>
            </div>

            <div className="flex justify-center items-center gap-3 border-b pb-5">
              <Link href="/signup" className="text-[#F16521]">
                Sign up with Email
              </Link>
            </div>

            <div className="text-center text-sm">
              By signing in or creating an account, you agree with our
              <Link href="https://www.bestelectronics.com.bd/warranty-policy/" className="text-[#F16521] pl-1">
                Terms & Conditions
              </Link>{" "}
              and{" "}
              <Link href="https://www.bestelectronics.com.bd/privacy-policy/" className="text-[#F16521] pl-1">
                Privacy Statement
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// submit main
