"use client";
import { useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { fetchApi } from "@/utils/FetchApi";

export default function Otp() {
  const [otpValues, setOtpValues] = useState(["", "", "", ""]);
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const inputRefs = [useRef(null), useRef(null), useRef(null), useRef(null)];
  const [countdown, setCountdown] = useState(120);
  const router = useRouter();

  const handleOtpChange = (index, value) => {
    const newOtpValues = [...otpValues];
    if (value.length <= 1) {
      newOtpValues[index] = value;
      setOtpValues(newOtpValues);
      if (value && index < inputRefs.length - 1) {
        inputRefs[index + 1].current.focus();
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    const otp = otpValues.join("");
    if (otp.length !== 4) {
      setError("Please enter a 4-digit OTP.");
      return;
    }

    setIsLoading(true);
    try {
      const data = { email, otp };
      const response = await fetchApi("/customer/otpverify", "POST", data);
      setIsLoading(false);

      if (response) {
        router.push("/signin");
      } else {
        setError("Invalid OTP. Please try again.");
      }
    } catch (err) {
      setIsLoading(false);
      setError("An error occurred while verifying the OTP.");
    }
  };

  const handleResendOtp = async () => {
    setError("");
    setMessage("");
    setIsLoading(true);
    try {
      const response = await fetchApi("/auth/otpResend", "POST", { email });
      if (response) {
        setMessage("OTP resent successfully.");
        setIsLoading(false);
        setCountdown(120);
      } else {
        setError("something went wrong");
      }
    } catch (err) {
      setError("An error occurred while resending the OTP.");
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const customer = localStorage.getItem("customer");
      const email = customer ? JSON.parse(customer).customer.email : "";
      if (email) {
        setEmail(email);
        console.log(email);
      } else {
        setError("Email not found.");
      }
    }
  }, []);

  useEffect(() => {
    const timer =
      countdown > 0 && setInterval(() => setCountdown(countdown - 1), 1000);
    if (countdown === 0) {
      setCountdown(0);
      setError("OTP expired. Please Click resend.");
    }
    return () => clearInterval(timer);
  }, [countdown]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  };

  return (
    <section className="container">
      <section className="flex mx-auto p-5 shadow-md max-w-[412px] my-[10vh]">
        <div className="w-full">
          <div>
            <h3 className="text-2xl font-bold">Email Verification</h3>
            <p className="text-sm text-[#6B7280] pt-2">
              Please enter the OTP sent to your email address.
            </p>
          </div>
          <form
            onSubmit={handleSubmit}
            className="flex flex-col space-y-4 mt-5"
          >
            <div className="flex justify-evenly items-center my-10">
              {otpValues.map((value, index) => (
                <div key={index} className="w-16 h-16">
                  <input
                    ref={inputRefs[index]}
                    className="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-black"
                    type="number"
                    maxLength={1}
                    value={value}
                    onChange={(e) => handleOtpChange(index, e.target.value)}
                  />
                </div>
              ))}
            </div>
            {error && <div className="text-red-500 text-sm">{error}</div>}
            {message && <div className="text-green-500 text-sm">{message}</div>}
            <div className="">
              <div>
                Did not receive code?
                <span
                  className="font-semibold hover:opacity-75 pl-1 cursor-pointer"
                  onClick={handleResendOtp}
                >
                  Resend
                </span>
                {countdown > 0 && (
                  <span className="text-gray-500 text-sm pl-2">
                    ({formatTime(countdown)})
                  </span>
                )}
              </div>
            </div>
            <button
              type="submit"
              className="bg-[#F16521] text-center text-white py-2 mt-5 rounded-md w-full"
              disabled={isLoading}
            >
              {isLoading ? "Submitting..." : "Submit"}
            </button>
          </form>
        </div>
      </section>
    </section>
  );
}
