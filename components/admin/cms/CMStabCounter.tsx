import React, { useState } from "react";
import { Mail, Home, Shield, File } from "lucide-react";
import CmsContact from "./CmsContact";
import Legal from "./Legal";
import CmsHome from "./CmsHome";
import CmsAboutUs from "./CmsAboutUs";

// --- 1. Define Tab Data ---
const tabData = [
  {
    name: "Contact",
    icon: Mail,
    content: (
      <div>
        <CmsContact />
      </div>
    ),
  },
  {
    name: "Homepage",
    icon: Home,
    content: <CmsHome />,
  },
  {
    name: "About Us",
    icon: File,
    content: <CmsAboutUs />,
  },
  {
    name: "Legal",
    icon: Shield,
    content: <Legal />,
  },
];

const TabbedContent = () => {
  const [activeTabName, setActiveTabName] = useState("Contact");

  const activeContent = tabData.find(
    (item) => item.name === activeTabName
  )?.content;

  return (
    <div className="flex flex-col items-center bg-gray-50 w-full">
      {/* --- Tab Buttons --- */}
      <div
        className="
          flex flex-col sm:flex-row
          items-stretch sm:items-center
          bg-white 
          rounded-3xl 
          p-2 border border-[#e8e3dc]
          w-full 
          ring-1 ring-gray-200 
          mb-8 
          gap-2 sm:gap-0
        "
      >
        {tabData.map((item) => (
          <button
            key={item.name}
            onClick={() => setActiveTabName(item.name)}
            className={`
              flex items-center justify-center
              px-5 py-3 
              rounded-3xl 
              text-sm font-semibold 
              transition-all duration-200 
              whitespace-nowrap
              w-full
              ${
                activeTabName === item.name
                  ? "text-white bg-gradient-to-t from-[#7a5f3a] to-[#8b6f47]"
                  : "bg-white text-gray-700 hover:bg-gray-50"
              }
            `}
            style={
              activeTabName === item.name
                ? { backgroundColor: "#8B7454", color: "white" }
                : {}
            }
          >
            <item.icon className="h-5 w-5 mr-2" />
            {item.name}
          </button>
        ))}
      </div>

      {/* --- Tab Content Display Area --- */}
      <div className="w-full">{activeContent}</div>
    </div>
  );
};

export default TabbedContent;
