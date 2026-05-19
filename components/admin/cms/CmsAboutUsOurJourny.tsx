import React, { useState } from "react";
import { Toaster } from "react-hot-toast"; // FIX: Corrected import

// 1. Define the type/interface for the Achievement data structure
interface Achievement {
  year: string;
  title: string;
  subtitle: string;
  description: string;
}

// Mock CmsHomePageTitle component for self-containment
interface CmsHomePageTitleProps {
  title: string;
  text?: string;
}

const CmsHomePageTitle: React.FC<CmsHomePageTitleProps> = ({ title, text }) => (
  <header className="mb-8">
    <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
    <p className="text-sm text-gray-500 mt-1">{text}</p>
  </header>
);

const App = () => {
  // Initial state uses the Achievement[] type
  const [achievements, setAchievements] = useState<Achievement[]>([
    {
      year: "2020",
      title: "The Beginning",
      subtitle:
        "Thundra was founded with a vision to democratize custom design",
      description: "",
    },
    {
      year: "2021",
      title: "AI Integration",
      subtitle:
        "Integrated Adobe Firefly AI for next-generation design capabilities",
      description: "",
    },
    {
      year: "2023",
      title: "10K+ Designs",
      subtitle: "",
      description: "Reached milestone of 10,000 custom designs created",
    },
    {
      year: "2024",
      title: "Global Expansion",
      subtitle: "",
      description: "Expanded services to serve customers in 50+ countries",
    },
  ]);

  // Custom class for consistent input styling
  const inputClass =
    "w-full p-3 text-base text-gray-700 bg-[#f3f3f5] rounded-lg focus:outline-none placeholder-gray-400 border-2 border-[#e8e3dc] transition-colors";

  const achievementHeadingClass =
    "text-lg font-semibold text-gray-800 mb-4 mt-6";
  const sectionTitleClass = "text-sm font-medium text-gray-700 mb-2";

  // 2. FIX: Restrict 'field' to be a valid key of the Achievement interface (keyof Achievement)
  const handleAchievementChange = (
    index: number,
    field: keyof Achievement,
    value: string
  ) => {
    const newAchievements = [...achievements];
    // This line is now type-safe
    newAchievements[index][field] = value;
    setAchievements(newAchievements);
  };

  return (
    <div className=" bg-gray-50 mt-6 font-sans">
      {/* Main Editor Card */}
      <div className="p-6 bg-white rounded-xl border-2 border-[#e8e3dc]">
        {/* Header Section: Our Journey Section */}
        <CmsHomePageTitle title="Our Journey Section" text="Edit the company's historical achievements below." />

        {/* Grid for Achievements */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
          {achievements.map((achievement, index) => (
            <div key={index} className="p-4 rounded-lg bg-[#fafafa] border border-gray-200 shadow-sm">
              <h3
                className={achievementHeadingClass.replace("mt-6", "mt-0")}
              >{`Achievement ${index + 1}`}</h3>

              {/* Year Input */}
              <div className="mb-4">
                <label className={sectionTitleClass}>Year</label>
                <input
                  type="text"
                  placeholder="e.g., 2020"
                  value={achievement.year}
                  onChange={(e) =>
                    handleAchievementChange(index, "year", e.target.value)
                  }
                  className={inputClass}
                />
              </div>

              {/* Title Input */}
              <div className="mb-4">
                <label className={sectionTitleClass}>Title</label>
                <input
                  type="text"
                  placeholder="e.g., The Beginning"
                  value={achievement.title}
                  onChange={(e) =>
                    handleAchievementChange(index, "title", e.target.value)
                  }
                  className={inputClass}
                />
              </div>

              {/* Conditional Sub-Title/Description Area */}
              <>
                {/* Sub-Title Input */}
                <div className="mb-4">
                  <label className={sectionTitleClass}>Sub-Title</label>
                  <textarea
                    rows={2}
                    placeholder="e.g., Thundra was founded..."
                    value={achievement.subtitle}
                    onChange={(e) =>
                      handleAchievementChange(
                        index,
                        "subtitle",
                        e.target.value
                      )
                    }
                    className={`${inputClass} resize-none h-auto`}
                  />
                </div>

                {/* Description Input */}
                <div className="mb-4">
                  <label className={sectionTitleClass}>Description</label>
                  <textarea
                    rows={2}
                    placeholder="e.g., Reached milestone..."
                    value={achievement.description}
                    onChange={(e) =>
                      handleAchievementChange(
                        index,
                        "description",
                        e.target.value
                      )
                    }
                    className={`${inputClass} resize-none h-auto`}
                  />
                </div>
              </>
            </div>
          ))}
        </div>
      </div>
      <Toaster />
    </div>
  );
};

export default App;