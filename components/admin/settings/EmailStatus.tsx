// app/components/EmailStatisticsCard.tsx

import React from "react";

// Define the data structure for the statistics (optional, but good practice)
interface Statistic {
  value: string;
  label: string;
}

const statsData: Statistic[] = [
  { value: "1,834", label: "Subscribers" },
  { value: "42.3%", label: "Open Rate" },
  { value: "18.7%", label: "Click Rate" },
  { value: "28", label: "Campaigns Sent" },
];

export default function EmailStatisticsCard() {
  return (
    // Main Card Container (Matches border and background of the form component)
    <div className="bg-white border-[1.2px] border-[#E8E3DC] rounded-xl ">
      {/* Header Section */}
      <div className="p-6 border-b border-[#E8E3DC]">
        <h2 className="text-[#1a1410] font-medium text-[18px] leading-tight">
          Email Statistics
        </h2>
      </div>

      {/* Statistics Grid/Flex Container */}
      {/* p-6 sets padding on the bottom of the container */}
      <div className="p-6 pt-4 flex flex-wrap gap-4 sm:gap-6 justify-between">
        {statsData.map((stat) => (
          // Individual Statistic Box
          <div
            key={stat.label}
            className="flex-1 min-w-[45%] sm:min-w-0 bg-[#FAF9F7] p-4 rounded-lg text-center 
                       transition duration-200 hover:shadow-md"
          >
            <p className="text-[18px] font-semibold text-[#1a1410] mb-1">
              {stat.value}
            </p>
            <p className="text-sm text-[#6B6560]">{stat.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
