"use client";
import fbLogin from "@/public/images/fblogin.png";
import googleLogin from "@/public/images/googlelogin.png";
import appleLogin from "@/public/images/applelogin.png";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useRef } from "react";

export default function UserRegistration() {
  const router = useRouter();
  const formRef = useRef(null);

  const onSubmit = (e) => {
    e.preventDefault();
    const email = formRef.current.email.value;
    if (email) {
      router.push("/createpassword");
    }
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
              onClick={(e) => onSubmit(e)}
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
              <button
                type="submit"
                className="flex justify-center w-full py-3 text-white bg-[#F16521] rounded-md text-sm"
              >
                Continue with Email
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
