// components/SendButton.jsx
import { Send } from "lucide-react";
import React from "react";

import toast, { Toaster } from "react-hot-toast";

const SendButton = () => {
  // Renamed to reflect the action and included it inside the component scope for cleaner access
  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Discount Codes Sent Successfully!", {
      position: "bottom-center",
      duration: 3000,
    });
  };

  return (
    <div className="p-4">
      <button
        type="submit"
        className="w-full py-2 px-6 bg-purple-700 text-white font-semibold text-lg rounded-lg
                    transition duration-200 ease-in-out 
                   hover:bg-purple-800 focus:outline-none "
        // --- FUNCTION ATTACHED HERE ---
        onClick={handleSend}
      >
        <span className="flex items-center justify-center space-x-2">
          {/* Send Icon - Corrected placement and added rotation to match the original design */}
          <Send className="w-6 h-6 transform rotate-45 -mt-1 text-[#ffffff]" />
          <span>Send Now</span>
        </span>
      </button>

      <Toaster position="bottom-center" />
    </div>
  );
};

export default SendButton;
