// components/TabNavigation.tsx
import { useState } from "react";
// Import your components for each tab
import GeneralSettings from "@/components/admin/settings/GeneralSettings";
import Categories from "@/components/admin/products/Categories";
import Promotion from "@/components/admin/settings/Promotions";
import EmailSetting from "@/components/admin/settings/EmailSetting";

// --- Type Definitions ---
type TabId = "general" | "categories" | "promotions" | "email";

interface Tab {
  id: TabId;
  label: string;
}

interface TabContentProps {
  activeTab: TabId;
}

// --- Tab List ---
const tabs: Tab[] = [
  { id: "general", label: "General Settings" },
  { id: "categories", label: "Categories" },
  { id: "promotions", label: "Promotions" },
  { id: "email", label: "Email Marketing" },
];

// --- Component for the Content Area ---
const TabContent: React.FC<TabContentProps> = ({ activeTab }) => {
  switch (activeTab) {
    case "general":
      return <GeneralSettings />;
    case "categories":
      return <Categories />;
    case "promotions":
      return <Promotion />;
    case "email":
      return (
        <>
          <EmailSetting />
        </>
      );
    default:
      return <GeneralSettings />;
  }
};

// --- Main Tab Navigation Component ---
const TabNavigation: React.FC = () => {
  // State to track the currently active tab
  const [activeTab, setActiveTab] = useState<TabId>("general");

  // Handle tab click
  const handleTabClick = (tabId: TabId) => {
    setActiveTab(tabId);
    console.log(`Navigating to the page for: ${tabId}`);
  };

  return (
    <div>
      {/* Tab Buttons */}
      <div
        className={`
          p-2 rounded-3xl border border-[#E8E3DC] bg-[#FAF9F7] 
          w-full grid grid-cols-1 gap-2 
          md:flex md:w-fit md:gap-0
        `}
      >
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => handleTabClick(tab.id)}
            className={`
              px-6 py-2 text-lg font-medium transition-all duration-200 ease-in-out
              w-full md:w-auto text-center
              ${
                activeTab === tab.id
                  ? "bg-white text-black rounded-3xl"
                  : "text-gray-700 hover:bg-gray-50 rounded-3xl"
              }
            `}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content Area */}
      <div className="mt-6">
        <TabContent activeTab={activeTab} />
      </div>
    </div>
  );
};

export default TabNavigation;
