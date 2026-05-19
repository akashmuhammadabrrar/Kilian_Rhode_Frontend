import React, { useState } from "react";
import Image from "next/image";
import toast, { Toaster } from "react-hot-toast";
import imageIcon from "@/public/image/admin/DesignQuality/imageIcon.svg";

const ACCENT_COLOR = "#8B6F47";

// --- Switch Props Type ---
type SwitchProps = {
  checked: boolean;
  onChange: (value: boolean) => void;
};

const QualitySettingsForm: React.FC = () => {
  const [isEnabled, setIsEnabled] = useState(true);
  const [isAutoSave, setIsAutoSave] = useState(true);

  // ✅ Type the event
  const handleSaveSettings = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    console.log("Saving settings...");
    toast.success("Save Quality Settings!", {
      position: "bottom-center",
    });
  };

  const Switch: React.FC<SwitchProps> = ({ checked, onChange }) => (
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

  return (
    <div className="bg-gray-50 mt-4">
      <Toaster />
      <div className="bg-white rounded-xl border-[1.2px] border-[#e8e3dc]">
        {/* Header */}
        <div className="p-6 border-b border-gray-100 flex items-center space-x-3">
          <Image src={imageIcon} alt="ai" height={20} width={20} />
          <h2 className="text-xl font-semibold text-gray-800">
            Print Quality Control
          </h2>
        </div>

        {/* Form Body */}
        <div className="p-6 space-y-8">
          {/* Minimum Resolution */}
          <div>
            <label
              htmlFor="dpi"
              className="block text-sm font-medium text-gray-700"
            >
              Minimum Resolution (DPI)
            </label>
            <div className="mt-2 relative">
              <select
                id="dpi"
                defaultValue="300 DPI (Standard)"
                className="block w-full py-2 px-3 border border-gray-300 bg-[#F3F3F5] rounded-md sm:text-sm appearance-none focus:outline-none"
              >
                <option>300 DPI (Standard)</option>
                <option>150 DPI (Draft)</option>
                <option>600 DPI (High Quality)</option>
                <option>1200 OPI (Premium)</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-[#717182]">
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

          {/* Output Format */}
          <div>
            <label
              htmlFor="format"
              className="block text-sm font-medium text-gray-700"
            >
              Output Format
            </label>
            <div className="mt-2 relative">
              <select
                id="format"
                defaultValue="SVG (Vector)"
                className="block w-full py-2 px-3 border border-gray-300 bg-[#F3F3F5] rounded-md sm:text-sm appearance-none focus:outline-none"
              >
                <option>SVG (Vector)</option>
                <option>PDF (Print-Ready)</option>
                <option>600 DPI (High Quality)</option>
                <option>1200 OPI (Premium)</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-[#717182]">
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

          {/* Toggle Switches */}
          <div className="py-4 px-3 bg-[#FAF9F7] rounded-lg flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-800">Quality Check</p>
              <p className="text-xs text-gray-500">
                Reject low-resolution uploads
              </p>
            </div>
            <Switch checked={isEnabled} onChange={setIsEnabled} />
          </div>

          <div className="py-4 px-3 bg-[#FAF9F7] rounded-lg flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-800">
                Auto Upscaling
              </p>
              <p className="text-xs text-gray-500">
                Enhance resolution automatically
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
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-[14px] font-normal text-white hover:opacity-90 transition-opacity focus:outline-none"
            style={{ backgroundColor: ACCENT_COLOR }}
          >
            Save Quality Settings
          </button>
        </div>
      </div>
    </div>
  );
};

export default QualitySettingsForm;
