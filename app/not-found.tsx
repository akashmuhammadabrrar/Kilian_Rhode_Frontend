"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Cormorant_Garamond, Jost } from "next/font/google";
import { ArrowLeft } from "lucide-react";

const cormorantGaramond = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const jostFont = Jost({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#FAFAFA] px-4 overflow-hidden relative">
      <main className="max-w-2xl w-full text-center space-y-8 z-10">
        {/* Decorative element */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex flex-col items-center"
        >
          <div className="flex items-center space-x-4 mb-4">
            <span className="block w-12 h-[1px] bg-[#d4af37]"></span>
            <span className="text-[#d4af37] text-xs tracking-[4px] uppercase font-medium">DESIGN STUDIO</span>
            <span className="block w-12 h-[1px] bg-[#d4af37]"></span>
          </div>
          
          <h1 
            className={`${cormorantGaramond.className} text-[120px] md:text-[220px] font-semibold text-[#1a1a1a] leading-none mb-2 select-none`}
            style={{ letterSpacing: "-0.05em" }}
          >
            404
          </h1>
          
          <h2 
            className={`${jostFont.className} text-xl md:text-3xl tracking-[8px] uppercase text-[#795548] font-medium mb-6`}
          >
            Page Not Found
          </h2>
          
          <p 
            className={`${jostFont.className} text-gray-500 text-base md:text-lg max-w-md mx-auto leading-relaxed mb-10 px-4`}
          >
            The masterpiece you’re looking for has moved or no longer exists. 
            Let’s take you back to where creativity begins.
          </p>
          
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link
              href="/"
              className={`${jostFont.className} inline-flex items-center space-x-3 bg-[#1a1a1a] text-[#FAFAFA] px-12 py-5 text-xs tracking-[4px] uppercase font-bold transition-all duration-300 hover:bg-[#795548] hover:shadow-[0_20px_50px_rgba(121,85,72,0.3)] group`}
            >
              <ArrowLeft size={16} className="transition-transform duration-300 group-hover:-translate-x-1" />
              <span>Return Home</span>
            </Link>
          </motion.div>
        </motion.div>
      </main>

      {/* Large Background Decorative Watermark */}
      <div className="absolute inset-0 flex items-center justify-center -z-0 opacity-[0.04] pointer-events-none overflow-hidden">
        <h1 className={`${cormorantGaramond.className} text-[30vw] font-bold whitespace-nowrap`}>
          Thundra
        </h1>
      </div>

      {/* Subtle Corner Accents */}
      <div className="absolute top-10 left-10 w-20 h-[1px] bg-gray-200 hidden md:block"></div>
      <div className="absolute top-10 left-10 h-20 w-[1px] bg-gray-200 hidden md:block"></div>
      <div className="absolute bottom-10 right-10 w-20 h-[1px] bg-gray-200 hidden md:block"></div>
      <div className="absolute bottom-10 right-10 h-20 w-[1px] bg-gray-200 hidden md:block"></div>
    </div>
  );
}

