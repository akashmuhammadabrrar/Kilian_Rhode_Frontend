"use client";
import React from "react";
// 💡 motion component use kora hoyeche animation-er jonno
import { motion } from "framer-motion";
import Image from "next/image";

import { Jost } from "next/font/google";
import arrowIcon from "@/public/image/shopIcon/arrowIcon.svg"; // Assuming this path is valid

const jostFont = Jost({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

// Mock index for demonstration (animation delay calculation)
const mockIndex = 0;

const ButtonOnly: React.FC = () => {
  return (
    <div>
      {/* 💡 motion.button use kora holo, kono Link ba href nei */}

      <motion.button
        // Tailwind CSS Classes for styling and positioning
        className={`${jostFont.className} absolute bottom-[8%] w-[90%] left-1/2 -translate-x-1/2 h-12 border-2 border-[#ffffff] bg-white/10 text-[#fff] tracking-[2.1px] uppercase text-[14px] font-medium flex items-center justify-center`}
        // Framer Motion initial and animation state (entry animation)
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: mockIndex * 0.1 + 0.3, duration: 0.5 }}
        // Framer Motion hover effects
        whileHover={{
          backgroundColor: "rgba(255, 255, 255, 0.2)",
          borderColor: "#D4AF37", // Border color change on hover
          scale: 1.03, // Slight scale-up on hover
          transition: { duration: 0.2 },
        }}
        // Framer Motion tap (click) effect
        whileTap={{ scale: 0.97 }}
      >
        CUSTOMIZE
        {/* Arrow Icon Image */}
        <Image
          src={arrowIcon}
          alt="Arrow Icon"
          width={16}
          height={16}
          className="ml-2"
        />
      </motion.button>
    </div>
  );
};

export default ButtonOnly;
