"use client";

import { useRouter } from "next/navigation";

const Custom404 = () => {
  const router = useRouter();
  const foundText = "That page can't be found";

  const handleClick = () => {
    router.push("/");
  };

  return (
    <div class="text-center my-20 md:my-28">
      <h1 class="mb-4 text-9xl font-semibold text-[#F16521]">404</h1>
      <p class="mb-4 text-3xl text-gray-600 font-semibold">{foundText}</p>
      <span>
        It looks like nothing was found at this location. Maybe try to search
        for what you are looking for?
      </span>
      <div class="animate-bounce">
        <svg
          className="mx-auto h-16 w-16 mt-10 text-[#F16521]"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
          ></path>
        </svg>
      </div>
      <button
        onClick={handleClick}
        className="bg-[#F16521] text-white py-2 px-4 rounded-md mt-4"
      >
        Go to Homepage
      </button>
    </div>
  );
};

export default Custom404;
