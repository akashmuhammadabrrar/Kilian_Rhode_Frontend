"use client";
import React, { useState } from "react";
import Image from "next/image";
import toast, { Toaster } from "react-hot-toast";

// Assuming this path is correct in your project
import aiIcon from "@/public/image/admin/DesignQuality/aiIcon.svg";

// Custom dark gold/brown color for the button
const ACCENT_COLOR = "#8B6F47";

// --- Switch Props Type ---
type SwitchProps = {
  checked: boolean;
  onChange: (value: boolean) => void;
};

const Switch = ({ checked, onChange }: SwitchProps) => (
  <button
    onClick={() => onChange(!checked)}
    className={`
      relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent 
      rounded-full cursor-pointer transition-colors ease-in-out duration-200 
      focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900
      ${checked ? "bg-black" : "bg-gray-200"}
    `}
    role="switch"
    aria-checked={checked}
  >
    <span
      aria-hidden="true"
      className={`
        pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow 
        transform ring-0 transition ease-in-out duration-200
        ${checked ? "translate-x-5" : "translate-x-0"}
      `}
    />
  </button>
);

const AISettingsForm: React.FC = () => {
  const [isEnabled, setIsEnabled] = useState(true);
  const [isAutoSave, setIsAutoSave] = useState(true);

  // Copy API Key to clipboard
  const handleApiKeyClick = () => {
    const apiKey = "..................."; // Masked value
    navigator.clipboard
      .writeText(apiKey)
      .then(() => {
        toast.success("API Key Copied!", { position: "bottom-center" });
      })
      .catch((err) => {
        console.error("Could not copy text: ", err);
        toast.error("Failed to copy API Key.", { position: "bottom-center" });
      });
  };

  // Handle Save button click
  const handleSaveSettings = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    console.log("Saving settings...");
    toast.success("AI Settings Saved!", { position: "bottom-center" });
  };

  return (
    <div className="bg-gray-50 mt-4">
      <Toaster />

      <div className="bg-white rounded-xl border-[1.2px] border-[#e8e3dc]">
        {/* Header */}
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center space-x-3">
            <Image src={aiIcon} alt="ai" height={20} width={20} />
            <h2 className="text-xl font-semibold text-gray-800">
              AI Image Generator
            </h2>
          </div>
        </div>

        {/* Form Body */}
        <div className="p-6 space-y-8">
          {/* AI Provider */}
          <div>
            <label
              htmlFor="provider"
              className="block text-sm font-medium text-gray-700"
            >
              AI Provider
            </label>
            <div className="mt-2 relative">
              <select
                id="provider"
                name="provider"
                defaultValue="Adobe Firefly"
                className="
                  block w-full py-2 px-3 border border-gray-300 bg-[#F3F3F5] rounded-md 
                  focus:outline-none outline-none sm:text-sm appearance-none
                "
              >
                <option>Adobe Firefly</option>
                <option>OpenAI DALL-E</option>
                <option>Midjourney</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg
                  className="h-4 w-4"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </div>
          </div>

          {/* API Key */}
          <div>
            <label
              htmlFor="api-key"
              className="block text-sm font-medium text-gray-700"
            >
              API Key
            </label>
            <div className="mt-2">
              <input
                type="password"
                id="api-key"
                name="api-key"
                value="..............." // Masked
                readOnly
                onClick={handleApiKeyClick}
                className="
                  block w-full py-2 px-3 border border-gray-300 rounded-md focus:outline-none
                  outline-none focus:ring-gray-500 focus:border-gray-500 
                  sm:text-sm bg-gray-50 cursor-pointer transition-colors
                "
              />
            </div>
            <p className="mt-2 text-xs text-gray-500">
              Your Adobe Firefly API key
            </p>
          </div>

          {/* Enable AI Generation */}
          <div className="py-4 px-3 bg-[#FAF9F7] rounded-lg flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-800">
                Enable AI Generation
              </p>
              <p className="text-xs text-gray-500">
                Allow customers to generate AI designs
              </p>
            </div>
            <Switch checked={isEnabled} onChange={setIsEnabled} />
          </div>

          {/* Auto-save Designs */}
          <div className="py-4 px-3 bg-[#FAF9F7] rounded-lg flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-800">
                Auto-save Designs
              </p>
              <p className="text-xs text-gray-500">
                Automatically save generated designs
              </p>
            </div>
            <Switch checked={isAutoSave} onChange={setIsAutoSave} />
          </div>
        </div>

        {/* Save Button */}
        <div className="p-6 border-t border-gray-100">
          <button
            type="submit"
            onClick={handleSaveSettings}
            className={`
              w-full flex justify-center py-2 px-4 border border-transparent rounded-md 
              shadow-sm text-[14px] font-normal text-white 
              hover:opacity-90 transition-opacity focus:outline-none focus:ring-2 
              focus:ring-offset-2 focus:ring-[${ACCENT_COLOR}]
              bg-[${ACCENT_COLOR}]
            `}
            style={{ backgroundColor: ACCENT_COLOR }}
          >
            Save AI Settings
          </button>
        </div>
      </div>
    </div>
  );
};

export default AISettingsForm;
