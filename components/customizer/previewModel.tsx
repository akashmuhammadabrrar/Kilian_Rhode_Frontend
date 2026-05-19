// components/LivePreviewModal.tsx

"use client";

import React, { useState } from "react"; // ✅ useState hook add kora holo
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

// T-Shirt image path (apnar main file theke neya)
import tshirtImage from "../../public/image/livePreview/tshirt.jpg";

// Type for the different views
type ProductView = "Front" | "Back" | "Side";

interface LivePreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const LivePreviewModal: React.FC<LivePreviewModalProps> = ({
  isOpen,
  onClose,
}) => {
  // 🔑 KEY: State to manage the currently selected view (Front is default)
  const [currentView, setCurrentView] = useState<ProductView>("Front");

  // Handler function to change the view when a button is clicked
  const handleViewChange = (view: ProductView) => {
    setCurrentView(view);
    // Real-world application-e ekhane T-shirt-er image change/logic thakbe
    console.log(`View changed to: ${view}`);
  };

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.3 } },
    exit: { opacity: 0, scale: 0.95 },
  };

  // Array of all possible views
  const views: ProductView[] = ["Front", "Back", "Side"];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          // Modal Overlay
          className="fixed inset-0 z-50 flex items-center justify-center bg-[rgba(26,26,26,0.5)] bg-opacity-70 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose} // Backdrop-e click korle modal bondho hobe
        >
          <motion.div
            // Modal Container
            className="bg-white rounded-xl shadow-2xl w-full max-w-lg mx-4"
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={(e) => e.stopPropagation()} // Modal-er modhye click korle bondho hobe na
          >
            {/* --- Modal Header --- */}
            <header className="flex items-center justify-between p-4 bg-[#20232A] rounded-t-xl">
              <div className="flex items-center space-x-1.5">
                {/* Traffic light controls */}
                <span className="w-3 h-3 rounded-full bg-red-500"></span>
                <span className="w-3 h-3 rounded-full bg-yellow-500"></span>
                <span className="w-3 h-3 rounded-full bg-green-500"></span>
              </div>
              {/* Show current view in header for better UX */}
              <h2 className="text-sm font-medium text-white tracking-wider">
                Design Studio - Live Preview ({currentView})
              </h2>
              <button
                onClick={onClose}
                className="text-white hover:text-gray-300 transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </header>

            {/* --- Modal Content (Image Preview) --- */}
            <main className="p-6">
              <div className="relative w-full aspect-square md:aspect-[4/3] flex items-center justify-center overflow-hidden">
                {/* Blurred background (Apnar dewa original image-er moto) */}
                <div
                  className="absolute inset-0 bg-cover bg-center filter blur-lg scale-110"
                  style={{
                    backgroundImage: `url(${tshirtImage.src})`,
                    opacity: 0.3,
                  }}
                ></div>

                {/* Main T-Shirt Image - Ekhane bhobisshot-e currentView onujaye image change hobe */}
                <div className="relative max-w-sm w-full h-full p-4 flex items-center justify-center">
                  {/* Temporarily showing the same image, but logic would go here */}
                  <div className="text-xl font-bold text-gray-800 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 p-2 bg-white/70 rounded-md">
                    Displaying: {currentView} View
                  </div>
                  <Image
                    src={tshirtImage}
                    alt={`Live T-Shirt Preview - ${currentView} View`}
                    className="w-full h-auto object-contain rounded-md shadow-lg opacity-80"
                    layout="fill"
                    objectFit="contain"
                  />
                </div>
              </div>
            </main>

            {/* --- Modal Footer (View Controls) --- */}
            <footer className="p-4 flex justify-center space-x-3 bg-gray-50 rounded-b-xl border-t border-gray-100">
              {views.map((view) => {
                const isActive = view === currentView;
                const activeClass = "bg-[#1A1A1A] text-white shadow-md";
                const inactiveClass =
                  "bg-white text-gray-700 border border-gray-300 hover:bg-gray-100";

                return (
                  <motion.button
                    key={view}
                    // 🔑 KEY: Click action implemented here
                    onClick={() => handleViewChange(view)}
                    className={`px-6 py-2 rounded text-sm font-medium transition-colors ${
                      isActive ? activeClass : inactiveClass
                    }`}
                    whileHover={{
                      scale: 1.05,
                      boxShadow: isActive
                        ? "0 4px 6px rgba(0,0,0,0.2)"
                        : "0 2px 4px rgba(0,0,0,0.05)",
                    }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {view}
                  </motion.button>
                );
              })}
            </footer>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LivePreviewModal;
