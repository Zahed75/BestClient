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

export default function UserRegistration() {
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

    const email = formRef.current.email.value;
    const phoneNumber = formRef.current.mobile.value;
    const password = formRef.current.password.value;

    if (email && password && mobile) {
      try {
        const data = { email, password, phoneNumber, role: "CUS" };
        const response = await fetchApi(
          "/customer/createCustomer",
          "POST",
          data
        );

        if (response) {
          localStorage.setItem("customer", JSON.stringify(response.customer));
          setIsLoading(false);
          router.push("/otp");
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
            <h1 className="text-xl font-semibold">
              Sign in or Create an account
            </h1>
            <form
              ref={formRef}
              onSubmit={(e) => onSubmit(e)}
              className="space-y-5"
            >
              <div>
                <label className="text-sm" htmlFor="email">
                  Email Address
                </label>
                <input
                  className="border-2 bg-transparent rounded-md w-full py-2 px-3 focus:outline-0"
                  type="email"
                  name="email"
                  id="email"
                  required
                  placeholder="example@example.com"
                />
              </div>
              <div className="flex flex-col space-y-1">
                <label htmlFor="password" className="text-sm">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    name="password"
                    required
                    placeholder="*********"
                    minLength={6}
                    maxLength={12}
                    className="border border-gray-300 rounded-md p-2 focus:outline-none w-full"
                  />
                  <span
                    className="absolute right-2 top-2 cursor-pointer"
                    onClick={handlePasswordToggle}
                  >
                    {showPassword ? (
                      <Image src={view} alt="view" width={24} height={24} />
                    ) : (
                      <Image src={hidden} alt="hidden" width={24} height={24} />
                    )}
                  </span>
                </div>
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
                  placeholder="Enter your mobile number"
                />
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
              <div className="border shadow-sm p-3 rounded-md cursor-pointer">
                <Image
                  src={fbLogin}
                  alt="Facebook Login"
                  className="w-[30px]"
                />
              </div>
              <div className="border shadow-sm p-3 rounded-md cursor-pointer">
                <Image
                  src={googleLogin}
                  alt="Google Login"
                  className="w-[30px]"
                />
              </div>
              <div className="border shadow-sm p-3 rounded-md cursor-pointer">
                <Image
                  src={appleLogin}
                  alt="apple Login"
                  className="w-[25px]"
                />
              </div>
            </div>

            <div className="text-center text-sm">
              By signing in or creating an account, you agree with our
              <Link href="/" className="text-[#F16521] pl-1">
                Terms & Conditions
              </Link>{" "}
              and{" "}
              <Link href="/" className="text-[#F16521]">
                Privacy Statement
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
