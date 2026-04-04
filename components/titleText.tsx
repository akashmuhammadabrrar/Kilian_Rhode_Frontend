"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Jost, Cormorant_Garamond } from "next/font/google";

const jostFont = Jost({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const cormorantNormal = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const TitleText = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="w-full flex flex-col items-center text-center gap-4 mb-8 md:mb-12 lg:mb-16 px-2 mt-5">
      <Link href="/pages/shop">
        <button
          className={`
            bg-[#8B5E3C] hover:bg-[#A06C47] text-white 
            px-8 py-2.5 rounded-sm text-sm tracking-[2px] font-semibold
            transition-all duration-700 ease-out mb-2 cursor-pointer
            ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"}
            ${jostFont.className}
          `}
        >
          SHOP NOW
        </button>
      </Link>

      <h2
        className={`
                    text-[#1a1a1a] font-semibold 
                    text-4xl sm:text-4xl md:text-6xl lg:text-6xl 
                    tracking-wide leading-tight transition-all duration-700 delay-100 ease-out
                    ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"}
                    ${cormorantNormal.className} italic
                `}
      >
        Collections
      </h2>

      <div className="max-w-2xl">
        <p
          className={`
                        text-base md:text-lg text-[#6b6b6b] 
                        tracking-wider leading-relaxed 
                        font-normal transition-all duration-700 delay-200 ease-out
                        ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"}
                        ${jostFont.className}
                    `}
        >
          Unique designs — personalized with your creativity
        </p>
      </div>
    </div>
  );
};

export default TitleText;
