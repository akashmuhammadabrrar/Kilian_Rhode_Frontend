import React, { useState } from "react";
import { Toaster } from "react-hot-toast";

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

interface ValueItem {
  title: string;
  description: string;
}

const App: React.FC = () => {
  // State for the main section title and subtitle (Main section title & subtitle-er jonno state)
  const [sectionTitle, setSectionTitle] = useState<string>("Our Core Values");
  const [sectionSubtitle, setSectionSubtitle] = useState<string>(
    "These principles guide every decision we make and every product we create"
  );

  // Initial state for all four values (Chaar-ti value-er jonno initial state)
  const [values, setValues] = useState<ValueItem[]>([
    {
      title: "Customer First",
      description:
        "Every decision we make starts with how it benefits our customers and their creative journey.",
    },
    {
      title: "Innovation",
      description:
        "We continuously push boundaries with cutting-edge AI technology to make design accessible to everyone.",
    },
    {
      title: "Quality Guarantee",
      description:
        "Professional 300 DPI print quality ensures your designs look stunning in real life.",
    },
    {
      title: "Sustainability",
      description:
        "Committed to eco-friendly materials and responsible production practices.",
    },
  ]);

  // Custom class for consistent input styling (Shothik input styling-er jonno custom class)
  const inputClass =
    "w-full p-3 text-base text-gray-700 bg-[#f3f3f5] rounded-lg focus:outline-none placeholder-gray-400 border-2 border-[#e8e3dc] focus:border-[#8c7457] transition-colors";

  const valueHeadingClass = "text-lg font-semibold text-gray-800 mb-4 mt-6";
  const sectionTitleClass = "text-sm font-medium text-gray-700 mb-2";

  // Function to handle changes in any value field (Jekono value field change hole handle korar jonno function)
  const handleValueChange = (
    index: number,
    field: keyof ValueItem,
    value: string
  ) => {
    const newValues = [...values];
    newValues[index] = { ...newValues[index], [field]: value };
    setValues(newValues);
  };


  return (
    <div className=" bg-gray-50 mt-6 font-sans">
      {/* Main Editor Card */}
      <div className="p-6 bg-white rounded-xl border-2 border-[#e8e3dc]">
        {/* Header Section: What Drives Us Section */}
        <CmsHomePageTitle title="What Drives Us Section" text="" />

        {/* Main Title Input */}
        <div className="mb-6">
          <label className={sectionTitleClass}>Title</label>
          <input
            type="text"
            placeholder="e.g., Our Core Values"
            value={sectionTitle}
            onChange={(e) => setSectionTitle(e.target.value)}
            className={inputClass}
          />
        </div>

        {/* Main Subtitle Input */}
        <div className="mb-8">
          <label className={sectionTitleClass}>Subtitle</label>
          <input
            type="text"
            placeholder="e.g., These principles guide every decision we make..."
            value={sectionSubtitle}
            onChange={(e) => setSectionSubtitle(e.target.value)}
            className={inputClass}
          />
        </div>

        {/* Grid for Values (Values-er jonno grid structure) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
          {values.map((value, index) => (
            <div key={index} className="p-0">
              <h3
                className={valueHeadingClass.replace("mt-6", "mt-0")}
              >{`Value ${index + 1}`}</h3>

              {/* Title Input */}
              <div className="mb-4">
                <label className={sectionTitleClass}>Title</label>
                <input
                  type="text"
                  placeholder="e.g., Customer First"
                  value={value.title}
                  onChange={(e) =>
                    handleValueChange(index, "title", e.target.value)
                  }
                  className={inputClass}
                />
              </div>

              {/* Description Input */}
              <div className="mb-4">
                <label className={sectionTitleClass}>Description</label>
                <textarea
                  rows={2}
                  placeholder="e.g., Every decision we make..."
                  value={value.description}
                  onChange={(e) =>
                    handleValueChange(index, "description", e.target.value)
                  }
                  className={`${inputClass} resize-none h-auto`}
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
