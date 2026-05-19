import React, { useState } from "react";
// Image is technically not used in the ManualTextCreator component, but kept in case
// it's used elsewhere in the file or if the original t-shirt image was meant to be here.
// For *minimal* code, this could be removed, but I'll leave it to be safe.

import { motion } from "framer-motion";

// --- Main Component ---
const ManualTextCreator = () => {
  // State for text input, font size, and selected color
  const [textInput, setTextInput] = useState("");
  const [fontSize, setFontSize] = useState(48);
  const [selectedColor, setSelectedColor] = useState("Black");

  // Array of available colors for the design
  const colors = [
    { name: "Black", code: "bg-black", hex: "#000000" },
    {
      name: "White",
      code: "bg-white",
      hex: "#ffffff",
      border: "border border-gray-300",
    },
    { name: "Yellow", code: "bg-yellow-500", hex: "#f59e0b" },
    { name: "Navy", code: "bg-blue-900", hex: "#1e3a8a" },
    { name: "Red", code: "bg-red-600", hex: "#dc2626" },
    { name: "Blue", code: "bg-blue-600", hex: "#2563eb" },
    { name: "Green", code: "bg-green-500", hex: "#10b981" },
    { name: "Purple", code: "bg-purple-600", hex: "#9333ea" },
    { name: "Pink", code: "bg-pink-500", hex: "#ec4899" },
    { name: "Orange", code: "bg-orange-500", hex: "#f97316" },
  ];

  // Framer Motion Animation Variants
  const containerStagger = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.1,
      },
    },
  };

  const fadeInItem = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  };

  return (
    <motion.div
      className="space-y-6"
      variants={containerStagger}
      initial="hidden"
      animate="visible"
    >
      {/* --- Custom Text Design Header --- */}
      <motion.div
        className="border-l-4 border-[#FFC72C] pl-4 py-3 bg-[#FFFBF0] rounded-r-md"
        variants={fadeInItem}
      >
        <div className="flex items-center mb-2">
          <span className="text-2xl mr-2 h-5 text-yellow-600 font-serif">
            T
          </span>
          <h3
            className="text-[16px] font-bold tracking-widest text-gray-700"
            style={{ fontFamily: "'Cormorant Garamond', sans-serif" }}
          >
            Custom Text Design
          </h3>
        </div>
        <p
          className="text-sm text-gray-600 leading-snug"
          style={{ fontFamily: "'Jost', sans-serif", letterSpacing: "0.5px" }}
        >
          Create personalized text designs with full control over font, size,
          and color. Perfect for names, quotes, numbers, and special messages.
        </p>
      </motion.div>

      {/* --- Manual Text Creator Sub-Header --- */}
      <motion.div
        className="border-l-4 border-purple-500 pl-4 py-3 mb-6 bg-purple-50 rounded-r-md"
        variants={fadeInItem}
      >
        <div className="flex items-center mb-2">
          <span
            className="text-xl mr-2 bg-[#7e22ce] p-1 text-white"
            style={{ fontFamily: "'Jost', sans-serif" }}
          >
            Aa
          </span>
          <h3
            className="text-sm font-bold tracking-widest text-gray-700"
            style={{
              fontFamily: "'Jost', sans-serif",
              letterSpacing: "0.4px",
            }}
          >
            Manual Text Creator
          </h3>
        </div>
        <p
          className="text-sm text-[#59168b] leading-snug"
          style={{ fontFamily: "'Jost', sans-serif", letterSpacing: "0.5px" }}
        >
          Create custom designs using letters and numbers. All text is rendered
          at high resolution for crisp, professional printing quality.
        </p>
      </motion.div>

      {/* --- Input Field (YOUR TEXT) --- */}
      <motion.div className="space-y-2" variants={fadeInItem}>
        <label
          className="text-xs uppercase font-semibold text-gray-700 tracking-wider"
          htmlFor="text-input"
        >
          YOUR TEXT
        </label>
        <input
          id="text-input"
          type="text"
          maxLength={50}
          value={textInput}
          onChange={(e) => setTextInput(e.target.value)}
          placeholder="Enter your text or numbers..."
          className="w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
        />
        <p className="text-xs text-gray-500">
          Letters, numbers, and symbols allowed &nbsp;
          <span className="float-right">{textInput.length}/50</span>
        </p>
      </motion.div>

      {/* --- Font Family Selector --- */}
      <motion.div className="space-y-2" variants={fadeInItem}>
        <label className="text-xs uppercase font-semibold text-gray-700 tracking-wider">
          FONT FAMILY
        </label>
        <select
          className="w-full p-3 border border-gray-300 rounded-md appearance-none bg-white pr-8 focus:ring-blue-500 focus:border-blue-500"
          defaultValue="Arial"
        >
          <option>Arial</option>
          <option>Roboto</option>
          <option>Cormorant Garamond</option>
        </select>
      </motion.div>

      {/* --- Font Size Slider --- */}
      <motion.div className="space-y-2" variants={fadeInItem}>
        <div className="flex justify-between items-center">
          <label className="text-xs uppercase font-semibold text-gray-700 tracking-wider">
            FONT SIZE
          </label>
          <span className="font-bold text-lg text-orange-500">
            {fontSize}px
          </span>
        </div>
        <input
          type="range"
          min="20"
          max="140"
          step="1"
          value={fontSize}
          onChange={(e) => setFontSize(Number(e.target.value))}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer range-lg"
        />
        <div className="flex justify-between text-xs text-gray-500">
          <span>Small (20px)</span>
          <span>Large (140px)</span>
        </div>
      </motion.div>

      {/* --- Color Picker --- */}
      <motion.div className="space-y-3" variants={fadeInItem}>
        <label className="text-xs uppercase font-semibold text-gray-700 tracking-wider">
          COLOR
        </label>
        <motion.div
          className="grid grid-cols-5 gap-3"
          variants={containerStagger}
          initial="hidden"
          animate="visible"
        >
          {colors.map((color) => (
            <motion.div
              key={color.name}
              onClick={() => setSelectedColor(color.name)}
              className={`h-15 w-15 mt-2 rounded-md cursor-pointer flex items-center justify-center shadow-md ${
                color.code
              } ${color.border || ""}`}
              style={{
                outline:
                  selectedColor === color.name
                    ? `3px solid ${color.hex}`
                    : "none",
                outlineOffset: "2px",
              }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              variants={fadeInItem}
            >
              {selectedColor === color.name && (
                <span
                  className={`${
                    color.name === "White" || color.name === "Yellow"
                      ? "text-black"
                      : "text-white"
                  } text-xl`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={3}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </span>
              )}
            </motion.div>
          ))}
        </motion.div>
        <p className="text-xs text-gray-500">
          Selected: <span className="font-semibold">{selectedColor}</span>
        </p>
      </motion.div>

      {/* --- Design Tips --- */}
      <motion.div
        className="p-4 mb-2 bg-gray-50 border border-gray-200 rounded-md"
        variants={fadeInItem}
      >
        <h4 className="text-xs uppercase font-semibold text-gray-700 mb-2">
          DESIGN TIPS:
        </h4>
        <ul className="list-disc ml-5 space-y-1 text-sm text-gray-600">
          <li>Keep text short and readable for maximum impact</li>
          <li>Use high contrast colors for better visibility on products</li>
          <li>Bold, sans-serif fonts work best for t-shirts and apparel</li>
          <li>
            Consider the product&apos;s base color when choosing text color
          </li>
        </ul>
      </motion.div>
    </motion.div>
  );
};

export default ManualTextCreator;
