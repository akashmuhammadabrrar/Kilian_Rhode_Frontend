"use client";

import React from "react";
import { motion, Variants, Transition } from "framer-motion";
import Image from "next/image";

import specialStartIcon from "../../public/image/createYourDesign/specialStarIcon.svg";
import iIcon from "../../public/image/createYourDesign/iIcon.svg"; // For Real-time Preview
import bachIcon from "../../public/image/createYourDesign/bachIcon.svg"; // For Adobe Firefly AI

import { Jost, Cormorant_Garamond } from "next/font/google";

const jostFont = Jost({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const cormorantItalic = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["italic"],
});

// 2. EXPLICIT TYPE: Assigned Variants type
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

// 3. EXPLICIT TYPE: Assigned Variants type
const itemVariants: Variants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    // The type property is now guaranteed to be compatible
    transition: { type: "tween", duration: 0.5 } as Transition,
  },
};

const DesignStudio = () => {
  return (
    <motion.div
      // Original container class, reduced for compactness
      className="bg-[#E5E5E5] border border-[#E5E5E5] flex flex-col items-center p-12 overflow-hidden"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* AI-POWERED DESIGN STUDIO Text */}
      <motion.div
        // Reduced margin: mb-10 -> mb-6
        className={`${jostFont.className} text-[12px] tracking-[3.6px] text-[#d4af37] border border-[#D4AF37] text-center py-1 px-4 mb-6 font-jost text-xs  uppercase]`}
        variants={itemVariants}
      >
        AI-POWERED DESIGN STUDIO
      </motion.div>

      {/* Create Your Design Title */}
      <motion.h1
        className={`${cormorantItalic.className} text-4xl md:text-7xl text-center text-[#1A1A1A] tracking-[0.5px] mb-6`}
        variants={itemVariants}
      >
        Create Your Design
      </motion.h1>

      {/* Divider with Accent */}
      <motion.div
        // Reduced margin: mb-10 -> mb-6
        className="flex items-center justify-center mb-6"
        variants={itemVariants}
      >
        <div className="w-16 h-px bg-[#d4af37]"></div>
        <span className="mx-2 flex items-center">
          <Image
            src={specialStartIcon}
            alt="Accent Star"
            width={20}
            height={20}
            className="w-5 h-5"
          />
        </span>
        <div className="w-16 h-px bg-[#d4af37]"></div>
      </motion.div>

      {/* Subtext */}
      <motion.p
        // Reduced margin: mb-12 -> mb-8
        className={`${jostFont.className} text-[20px] tracking-[0.5px] text-[#6B6B6B] mb-8 text-center`}
        variants={itemVariants}
      >
        Customize your{" "}
        <span className="text-[20px] tracking-[0.5px] italic text-[#1a1a1a]">
          Premium Cotton T-Shirt
        </span>{" "}
        with AI-generated art or personalized text
      </motion.p>

      {/* Feature Badges Container */}
      <motion.div
        // Reduced badge spacing: space-y-4/space-x-6 -> space-y-3/space-x-4
        className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4"
        variants={itemVariants}
      >
        {/* 300 DPI Quality Badge (Uses specialStartIcon for the graphic) */}
        <div
          className={`${jostFont.className} text-[14px] tracking-[0.35px] text-[#1a1a1a] flex items-center space-x-2 border border-gray-300 py-2 px-6  hover:border-accent-gold transition duration-300`}
        >
          <span className="text-accent-gold text-lg flex items-center">
            <Image
              src={bachIcon}
              alt="DPI Icon"
              width={20}
              height={20}
              className="w-5 h-5"
            />
          </span>
          <span>300 DPI Quality</span>
        </div>

        {/* Adobe Firefly AI Badge */}
        <div
          className={`${jostFont.className} text-[14px] tracking-[0.35px] text-[#1a1a1a] flex items-center space-x-2 border border-gray-300 py-2 px-6 text-sm hover:border-accent-gold transition duration-300`}
        >
          <span className="text-accent-gold text-lg flex items-center">
            <Image
              src={specialStartIcon}
              alt="AI Icon"
              width={20}
              height={20}
              className="w-5 h-5"
            />
          </span>
          <span>Adobe Firefly AI</span>
        </div>

        {/* Real-time Preview Badge */}
        <div
          className={`${jostFont.className} text-[14px] tracking-[0.35px] text-[#1a1a1a] flex items-center space-x-2 border border-gray-300 py-2 px-6 text-sm hover:border-accent-gold transition duration-300`}
        >
          <span className="text-accent-gold text-lg flex items-center">
            <Image
              src={iIcon}
              alt="Preview Icon"
              width={20}
              height={20}
              className="w-5 h-5"
            />
          </span>
          <span>Real-time Preview</span>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default DesignStudio;
