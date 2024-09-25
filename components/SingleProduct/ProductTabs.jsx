"use client";

import { useState } from "react";

export default function ProductTabs({ tabs }) {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="">
      <div className="grid grid-cols-2 md:grid-cols-3 gap-x-2 border p-1 rounded-md">
        {tabs.map((tab, index) => (
          <button
            key={index}
            className={`${index === activeTab
              ? "bg-[#f1662129] text-[#F16521] "
              : "border-transparent text-gray-500 hover:text-[#F16521]"
              } flex justify-center items-center py-2 px-4 text-center text-nowrap font-dosis focus:outline-0 focus:ring-0 w-full rounded-md duration-700 uppercase`}
            onClick={() => setActiveTab(index)}
          >
            {tab.title}
          </button>
        ))}
      </div>
      <div className="mt-4">{tabs[activeTab].content}</div>
    </div>
  );
}