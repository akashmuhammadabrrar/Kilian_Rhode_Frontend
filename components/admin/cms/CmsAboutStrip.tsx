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
  type Stat = { value: string; title: string };

  // Initial state for all four statistics (Chaar-ti stat-er jonno initial state)
  const [stats, setStats] = useState<Stat[]>([
    { value: "10,000+", title: "DESIGNS CREATED" },
    { value: "98%", title: "SATISFACTION RATE" },
    { value: "50+", title: "COUNTRIES SERVED" },
    { value: "24/7", title: "CUSTOMER SUPPORT" },
  ]);

  // Custom class for consistent input styling (Shothik input styling-er jonno custom class)
  const inputClass =
    "w-full p-3 text-base text-gray-700 bg-[#f3f3f5] rounded-lg focus:outline-none placeholder-gray-400 border-2 border-[#e8e3dc] transition-colors uppercase font-semibold";

  const sectionTitleClass = "text-sm font-medium text-gray-700 mb-2";

  // Function to handle changes in any stat field (Jekono stat field change hole handle korar jonno function)
  const handleStatChange = (index: number, field: keyof Stat, value: string) => {
    const newStats = [...stats];
    newStats[index] = { ...newStats[index], [field]: value };
    setStats(newStats);
  };


  return (
    <div className=" bg-gray-50 mt-6 font-sans">
      {/* Main Editor Card */}
      <div className="p-6 bg-white rounded-xl border-2 border-[#e8e3dc]">
        {/* Header Section: Stats Strip Section */}
        <CmsHomePageTitle title="Stats Strip Section" text="" />

        {/* Grid for Stats (Stats-er jonno grid structure) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
          {stats.map((stat, index) => (
            <React.Fragment key={index}>
              {/* Stat Value Input */}
              <div className="mb-4">
                <label className={sectionTitleClass}>{`Stat ${
                  index + 1
                }`}</label>
                <input
                  type="text"
                  placeholder="e.g., 10,000+"
                  value={stat.value}
                  onChange={(e) =>
                    handleStatChange(index, "value", e.target.value)
                  }
                  className={inputClass.replace("uppercase font-semibold", "")} // Value input should be regular
                />
              </div>

              {/* Stat Title Input */}
              <div className="mb-4">
                <label className={sectionTitleClass}>Title</label>
                <input
                  type="text"
                  placeholder="e.g., DESIGNS CREATED"
                  value={stat.title}
                  onChange={(e) =>
                    handleStatChange(index, "title", e.target.value)
                  }
                  className={inputClass}
                />
              </div>
            </React.Fragment>
          ))}
        </div>
      </div>
      <Toaster />
    </div>
  );
};

export default App;
