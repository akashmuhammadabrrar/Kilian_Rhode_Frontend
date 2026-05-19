import React, { useState } from "react";
import { Toaster } from "react-hot-toast";

// Mock CmsHomePageTitle component for self-containment
interface CmsHomePageTitleProps {
  title: string;
  text: string;
}

const CmsHomePageTitle: React.FC<CmsHomePageTitleProps> = ({ title, text }) => (
  <header className="mb-8">
    <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
    <p className="text-sm text-gray-500 mt-1">{text}</p>
  </header>
);

const App = () => {
  // State for the main section title and subtitle
  const [sectionTitle, setSectionTitle] = useState("Meet Our Team");
  const [sectionSubtitle, setSectionSubtitle] = useState(
    "A diverse group of designers, developers, and dreamers dedicated to your creative success"
  );

  // Initial state for the team members
  interface TeamMember {
    name: string;
    description: string;
  }

  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([
    { name: "Sarah Chen", description: "FOUNDER & CEO" },
    { name: "Marcus Rodriguez", description: "CHIEF TECHNOLOGY OFFICER" },
    { name: "Emma Thompson", description: "HEAD OF DESIGN" },
  ]);

  // Custom class for consistent input styling
  const inputClass =
    "w-full p-3 text-base text-gray-700 bg-[#f3f3f5] rounded-lg focus:outline-none placeholder-gray-400 border-2 border-[#e8e3dc] transition-colors";

  const personHeadingClass = "text-lg font-semibold text-gray-800 mb-4 mt-6";
  const sectionTitleClass = "text-sm font-medium text-gray-700 mb-2";

  // Function to handle changes in any team member field
  const handleMemberChange = (index: number, field: keyof TeamMember, value: string) => {
    setTeamMembers((prev) => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [field]: value };
      return updated;
    });
  };


  return (
    <div className=" bg-gray-50 mt-6 font-sans">
      {/* Main Editor Card */}
      <div className="p-6 bg-white rounded-xl border-2 border-[#e8e3dc]">
        {/* Header Section: The people behind the magic section */}
        <CmsHomePageTitle title="The people behind the magic section" text="" />

        {/* Main Title Input */}
        <div className="mb-6">
          <label className={sectionTitleClass}>Title</label>
          <input
            type="text"
            placeholder="e.g., Meet Our Team"
            value={sectionTitle}
            onChange={(e) => setSectionTitle(e.target.value)}
            className={inputClass}
          />
        </div>

        {/* Main Subtitle Input (Using textarea for the multi-line appearance from the image) */}
        <div className="mb-8">
          <label className={sectionTitleClass}>Subtitle</label>
          <textarea
            rows={2}
            placeholder="e.g., A diverse group of designers..."
            value={sectionSubtitle}
            onChange={(e) => setSectionSubtitle(e.target.value)}
            className={`${inputClass} resize-none h-auto`}
          />
        </div>

        {/* Team Members Grid (Team member-der jonno grid structure) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
          {teamMembers.map((member, index) => (
            <div key={index} className="p-0 col-span-2 md:col-span-1">
              <h3
                className={personHeadingClass.replace("mt-6", "mt-0")}
              >{`Person ${index + 1}`}</h3>

              {/* Name Input */}
              <div className="mb-4">
                <label className={sectionTitleClass}>Name</label>
                <input
                  type="text"
                  placeholder="e.g., Sarah Chen"
                  value={member.name}
                  onChange={(e) =>
                    handleMemberChange(index, "name", e.target.value)
                  }
                  className={inputClass}
                />
              </div>

              {/* Description Input */}
              <div className="mb-4">
                <label className={sectionTitleClass}>Description</label>
                <input
                  type="text"
                  placeholder="e.g., FOUNDER & CEO"
                  value={member.description}
                  onChange={(e) =>
                    handleMemberChange(index, "description", e.target.value)
                  }
                  className={inputClass}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
      <Toaster />
    </div>
  );
};

export default App;
