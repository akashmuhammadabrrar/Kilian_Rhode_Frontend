import React, { useState } from "react";

import  { Toaster } from "react-hot-toast";

// Mock CmsHomePageTitle component for self-containment
type CmsHomePageTitleProps = {
  title: string;
  text?: string;
};

const CmsHomePageTitle: React.FC<CmsHomePageTitleProps> = ({ title, text }) => (
  <header className="mb-8">
    <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
    <p className="text-sm text-gray-500 mt-1">{text}</p>
  </header>
);

const App = () => {
  // State for managing feature 1 (Feature 1 management-er jonno state)
  const [feature1Title, setFeature1Title] = useState("Our Mission");
  const [feature1Description, setFeature1Description] = useState(
    "To empower individuals and businesses worldwide to express their unique identity through high-quality, AI-powered custom products that exceed expectations in both design and durability."
  );

  // State for managing feature 2 (Feature 2 management-er jonno state)
  const [feature2Title, setFeature2Title] = useState("Our Vision");
  const [feature2Description, setFeature2Description] = useState(
    "To become the world's most trusted platform for custom design, where creativity knows no bounds and anyone can transform their ideas into reality with just a few clicks."
  );

  // Custom class for consistent input styling (Shothik input styling-er jonno custom class)
  const inputClass =
    "w-full p-3 text-base text-gray-700 bg-[#f3f3f5] border-2 border-[#e8e3dc] rounded-lg focus:outline-none placeholder-gray-400";
  const labelClass = "block text-base font-medium text-gray-800 mb-2";
  const featureHeadingClass = "text-lg font-semibold text-gray-800 mb-4 mt-6";

  return (
    <div className=" bg-gray-50 mt-6 font-sans">
      {/* Main Editor Card */}
      <div className="p-6 bg-white rounded-xl border-2 border-[#e8e3dc]">
        {/* Header Section: Small Feature Callouts */}
        <CmsHomePageTitle
          title="Small Feature Callouts"
          text="" // Image-e kono text nei
        />

        {/* Feature 1 */}
        <h3 className={featureHeadingClass}>Feature 1</h3>
        <div className="mb-6">
          <label className={labelClass}>Title</label>
          <input
            type="text"
            placeholder="e.g., Our Mission"
            value={feature1Title}
            onChange={(e) => setFeature1Title(e.target.value)}
            className={inputClass}
          />
        </div>
        <div className="mb-8">
          <label className={labelClass}>Description</label>
          <textarea
            rows={3}
            placeholder="e.g., To empower individuals..."
            value={feature1Description}
            onChange={(e) => setFeature1Description(e.target.value)}
            className={`${inputClass} resize-none h-auto`}
          />
        </div>

        {/* Feature 2 */}
        <h3 className={featureHeadingClass}>Feature 2</h3>
        <div className="mb-6">
          <label className={labelClass}>Title</label>
          <input
            type="text"
            placeholder="e.g., Our Vision"
            value={feature2Title}
            onChange={(e) => setFeature2Title(e.target.value)}
            className={inputClass}
          />
        </div>
        <div className="mb-8">
          <label className={labelClass}>Description</label>
          <textarea
            rows={3}
            placeholder="e.g., To become the world's most trusted platform..."
            value={feature2Description}
            onChange={(e) => setFeature2Description(e.target.value)}
            className={`${inputClass} resize-none h-auto`}
          />
        </div>
      </div>
      <Toaster />
    </div>
  );
};

export default App;
