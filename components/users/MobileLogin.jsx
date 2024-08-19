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
import { useDispatch } from "react-redux";
import { addCustomerInfo } from "@/redux/slice/customerSlice";

export default function MobileLogin() {
    const router = useRouter();
    const formRef = useRef(null);

    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    const dispatch = useDispatch();

    const handlePasswordToggle = () => {
        setShowPassword(!showPassword);
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError("");

        const email = formRef.current.email.value;
        const password = formRef.current.password.value;

        if (email && password) {
            try {
                const data = { email, password };
                const response = await fetchApi(
                    "/customer/customerSignIn",
                    "POST",
                    data
                );

                if (response) {
                    dispatch(addCustomerInfo(response?.user));
                    setIsLoading(false);
                    router.push("/checkout");
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
                        <h1 className="text-xl font-semibold">
                            Sign in with Phone Number
                        </h1>
                        <form ref={formRef} onSubmit={onSubmit} className="space-y-5">
                            <div>
                                <label className="text-sm" htmlFor="number">
                                    Mobile Number
                                </label>
                                <input
                                    className="border-2 bg-transparent rounded-md w-full py-2 px-3 focus:outline-0"
                                    type="tel"
                                    name="number"
                                    id="number"
                                    required
                                    placeholder="01*********"
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
