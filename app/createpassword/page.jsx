"use client";
import { useState } from 'react';
import Link from 'next/link';
import view from '@/public/images/view.svg';
import hidden from '@/public/images/view-off.svg';
import Image from 'next/image';

export default function Page() {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const toggleConfirmPasswordVisibility = () => {
    setConfirmPasswordVisible(!confirmPasswordVisible);
  };

  return (
    <main className="bg-gray-50">
      <div className="container">
        <div className="mx-auto flex justify-center py-20">
          <div className="flex justify-center shadow-md bg-white rounded-md">
            <div className="flex flex-col p-5 w-[26rem] space-y-4">
              <h1 className="text-xl font-semibold">Create password</h1>
              <form className="space-y-5">
                <div className="relative">
                  <label className="text-sm" htmlFor="password">
                    Password
                  </label>
                  <input
                    className="border-2 bg-transparent rounded-md w-full py-2 px-3 focus:outline-0"
                    type={passwordVisible ? "text" : "password"}
                    name="password"
                    id="password"
                    required
                    placeholder="Password"
                  />
                  <div
                    className="absolute inset-y-0 right-3 flex items-center cursor-pointer"
                    onClick={togglePasswordVisibility}
                  >
                    <Image
                      src={passwordVisible ? hidden : view}
                      alt="Toggle visibility"
                      className='mt-6'
                    />
                  </div>
                </div>
                <div className="relative">
                  <label className="text-sm" htmlFor="confirm-password">
                    Confirm New Password
                  </label>
                  <input
                    className="border-2 bg-transparent rounded-md w-full py-2 px-3 focus:outline-0"
                    type={confirmPasswordVisible ? "text" : "password"}
                    name="confirm-password"
                    id="confirm-password"
                    required
                    placeholder="Confirm Password"
                  />
                  <div
                    className="absolute inset-y-0 right-3 flex items-center cursor-pointer"
                    onClick={toggleConfirmPasswordVisibility}
                  >
                    <Image
                      src={confirmPasswordVisible ? hidden : view}
                      alt="Toggle visibility"
                      className='mt-6'
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  className="flex justify-center w-full py-3 text-white bg-[#F16521] rounded-md text-sm"
                >
                  Create Account
                </button>
              </form>

              <div className="text-center text-sm pt-5">
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
      </div>
    </main>
  );
}
