"use client";

import Image from "next/image";
import Link from "next/link";
import view from "@/public/images/view.svg";
import hidden from "@/public/images/view-off.svg";
import { useRouter } from "next/navigation";
import { useReducer, useRef, useState } from "react";
import { fetchApi } from "@/utils/FetchApi";
import { useDispatch } from "react-redux";
import { addCustomerInfo } from "@/redux/slice/customerSlice";

export default function UserLogin() {
  const router = useRouter();
  const formRef = useRef(null);

  const reducer = (state, action) => {
    switch (action.type) {
      case "TOGGLE_PASSWORD":
        return { ...state, showPassword: !state.showPassword };
      case "SET_LOADING":
        return { ...state, isLoading: action.payload };
      case "SET_ERROR":
        return { ...state, error: action.payload };
      default:
        return state;
    }
  };

  const INITIAL_STATE = {
    showPassword: false,
    isLoading: false,
    error: "",
  };

  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);

  const reduxDispatch = useDispatch();

  const onSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: "SET_LOADING", payload: true });
    dispatch({ type: "SET_ERROR", payload: "" });

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
          reduxDispatch(addCustomerInfo(response?.user));
          dispatch({ type: "SET_LOADING", payload: false });

          router.push("/checkout");
        } else {
          dispatch({ type: "SET_LOADING", payload: false });
          dispatch({ type: "SET_ERROR", payload: "Invalid email or password" });
        }
      } catch (error) {
        dispatch({ type: "SET_LOADING", payload: false });
        dispatch({
          type: "SET_ERROR",
          payload: "An error occurred. Please try again.",
        });
      }
    }

    dispatch({ type: "SET_LOADING", payload: false });
  };

  return (
    <section className="container">
      <div className="mx-auto flex justify-center py-20">
        <div className="flex justify-center shadow-md bg-white rounded-md">
          <div className="flex flex-col p-5 w-[26rem] space-y-4">
            <h1 className="text-xl font-semibold">Sign in</h1>
            <form ref={formRef} onSubmit={onSubmit} className="space-y-5">
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
                    type={state.showPassword === true ? "text" : "password"}
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
                    onClick={() => dispatch({ type: "TOGGLE_PASSWORD" })}
                  >
                    {state.showPassword ? (
                      <Image src={view} alt="view" width={24} height={24} />
                    ) : (
                      <Image src={hidden} alt="hidden" width={24} height={24} />
                    )}
                  </span>
                </div>
              </div>
              <div className="flex justify-between items-center text-sm">
                <Link href="/signup" className="text-[#F16521]">
                  Create an account
                </Link>
                <Link href="/forgot" className="text-[#F16521]">
                  Forgot Password?
                </Link>
              </div>
              {state.error && (
                <div className="text-red-500 text-sm">{state.error}</div>
              )}
              <button
                type="submit"
                className="flex justify-center w-full py-3 text-white bg-[#F16521] rounded-md text-sm"
              >
                {state.isLoading ? "Submitting..." : "Sign in"}
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
              <Link href="/mobilesignin" className="text-[#F16521]">
                Sign In with Phone Number
              </Link>
            </div>

            <div className="text-center text-sm">
              By signing in or creating an account, you agree with our
              <Link
                href="https://www.bestelectronics.com.bd/warranty-policy/"
                className="text-[#F16521] pl-1 pr-1"
              >
                Terms & Conditions
              </Link>
              and
              <Link
                href="https://www.bestelectronics.com.bd/privacy-policy/"
                className="text-[#F16521] pl-1"
              >
                Privacy Statement
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
