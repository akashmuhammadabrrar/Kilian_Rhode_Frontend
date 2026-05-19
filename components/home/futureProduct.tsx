"use client";

import React from "react";
import HeaderText from "@/components/shared/headetText";
import loveIcon from "../../public/image/loveIcon.svg";
import Image from "next/image";
import ladyIcon from "../../public/image/ladyImage.png";
import thanderIcon from '../../public/image/thanderIcon.svg';
import { ArrowRight } from "lucide-react";

const FutureProduct = () => {
  return (
    <section className="bg-[#fff] text-[#1c1c1c] py-16 px-4 md:px-8 lg:px-16 xl:px-20">
      {/* Header */}
      <HeaderText />

      {/* Tabs */}
      <div className="flex flex-wrap justify-center gap-2 md:gap-4 mt-8 px-2 sm:px-0">
        {["All", "T-Shirts", "Hoodies", "Caps", "Mugs"].map((tab, i) => (
          <button
            key={i}
            className={`px-4 py-2 text-xs sm:text-sm uppercase tracking-wide border border-[#ddd] transition-all duration-200 whitespace-nowrap 
                        ${tab === "All"
                ? "bg-[#0c0c0c] text-white"
                : "hover:bg-[#f9f9f9] text-[#1c1c1c]"
              }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Product Section Container */}
      <div className="max-w-7xl mx-auto mt-14 flex flex-col lg:flex-row items-center lg:items-start gap-10 lg:gap-16 xl:gap-20">

        {/* Left - Image and Frame Container */}
        <div className="relative group w-full lg:w-1/2 flex justify-center p-5"> 

          {/* Main Image Container */}
          <div className="relative z-10 overflow-hidden border border-[#d7c4aa] w-full max-w-md md:max-w-lg lg:max-w-none shadow-xl">
            <Image
              src={ladyIcon}
              alt="Premium Cotton T-Shirt"
              className="w-full h-[400px] md:h-[500px] lg:h-[526px] object-cover transition-transform duration-300 group-hover:scale-105" 
            />

            {/* Favorite icon and Labels */}
            <div className="absolute top-4 right-4 bg-white p-2 rounded-sm shadow-sm cursor-pointer transition-transform duration-300 hover:scale-110">
              <Image src={loveIcon} alt="heart" width={18} height={18} />
            </div>

            <div className="absolute top-4 left-4 flex flex-col gap-2">
              <span className="bg-[#f0c12a] text-black text-xs font-medium px-3 py-1 uppercase"
                style={{ fontFamily: "'Jost', sans-serif" }}
              >
                Featured
              </span>
              <span className="bg-[#000] text-white text-xs font-medium px-3 py-1 uppercase"
                style={{ fontFamily: "'Jost', sans-serif" }}>
                Best Seller
              </span>
            </div>
          </div>

          {/* Decorative Frame - Adjusted to stay to the LEFT and BOTTOM of the image, hidden on small screens, with animation */}
          <div
            className="absolute bg-transparent border-[3px] border-[#cfbba9] 
                       hidden sm:block // Hidden on mobile
                       w-[60%] h-[60%] 
                       max-w-[400px] max-h-[400px] 
                       bottom-0 -right-24 z-0 // Positioned to the bottom-left of the parent wrapper
                       -translate-x-1/4 translate-y-1/4 // Moves left (outside) and down (outside)
                       group-hover:-translate-x-[calc(25% + 10px)] group-hover:translate-y-[calc(25% + 10px)] 
                       transition-transform duration-300 ease-out" 
          ></div>
        </div>

        {/* Right - Details */}
        <div className="flex-1 mt-8 lg:mt-20 text-center lg:text-left px-4 sm:px-0">
          <p className="text-[#d4af37] uppercase tracking-[2px] text-sm mb-2 flex items-center justify-center lg:justify-start gap-2">
            <Image
              src={thanderIcon}
              alt="T-shirt Icon"
              width={20}
              height={20}
            />
            T-Shirts
          </p>

          <h2
            className="text-3xl md:text-4xl lg:text-5xl font-serif italic text-[#1c1c1c] mb-4"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            Premium Cotton T-Shirt
          </h2>
          <p className="text-gray-500 text-sm md:text-base mb-6 leading-relaxed max-w-xl mx-auto lg:mx-0">
            Luxurious 100% premium cotton with superior comfort
          </p>

          <div className="grid grid-cols-2 gap-x-4 gap-y-6 md:gap-x-8 md:gap-y-8 text-sm border-t border-gray-200 pt-4 mb-6 max-w-md mx-auto lg:mx-0">
            <div>
              <p className="font-semibold text-xs tracking-wide mb-1">QUALITY</p>
              <p className="text-gray-600">300 DPI Print</p>
            </div>
            <div>
              <p className="font-semibold text-xs tracking-wide mb-1">AI DESIGN</p>
              <p className="text-gray-600">Adobe Firefly</p>
            </div>
            <div>
              <p className="font-semibold text-xs tracking-wide mb-1">SIZES</p>
              <p className="text-gray-600">6 Options</p>
            </div>
            <div>
              <p className="font-semibold text-xs tracking-wide mb-1">COLORS</p>
              <p className="text-gray-600">4 Variants</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between mt-8 gap-4 sm:gap-0 max-w-md mx-auto lg:mx-0">
            <div>
              <p className="text-2xl font-medium">$29.99</p>
              <p className="text-gray-500 text-xs">Starting price</p>
            </div>
            <button className="bg-[#795548] hover:bg-[#A06C47] transition px-6 py-3 text-white text-sm tracking-wide flex items-center justify-center gap-2 shadow-md w-full sm:w-auto">
              Customize Now <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FutureProduct;