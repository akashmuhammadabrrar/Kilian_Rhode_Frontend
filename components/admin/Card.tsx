// components/TotalRevenueCard.tsx

import Image from "next/image";
import React from "react";
import { formatCurrency } from "@/utils/formatCurrency";

// ---- Fix: Props Types ----
type TotalRevenueCardProps = {
  icon: string;
  percent: string;
  total: string | number;
  text: string;
};

const TotalRevenueCard = ({
  icon,
  percent,
  total,
  text,
}: TotalRevenueCardProps) => {
  const percentColor = "#00A63E";
  const labelColor = "#6B6560";

  // --- New Logic: Conditionally display Euro sign ---
  // We check if the 'text' prop contains the word 'Revenue' (case-insensitive)
  const isRevenue = text.toLowerCase().includes("revenue");
  const formattedTotal = isRevenue ? formatCurrency(total) : total;

  return (
    <div
      className="
        w-full p-6 
        bg-[#FFF] 
        rounded-[14px]
        border-[1.173px] border-solid border-[#E8E3DC]
        hover:shadow-md
        transition duration-300
      "
    >
      {/* Top Row */}
      <div className="flex justify-between items-start mb-6">
        {/* Icon Block */}
        <div
          className="
            w-12 h-12 flex items-center justify-center 
            bg-[#f4f3f1] 
            rounded-lg
          "
        >
          <Image src={icon} alt="icon" height={20} width={20} />
        </div>

        {/* Percentage */}
        <p className="text-base font-medium" style={{ color: percentColor }}>
          {percent}
        </p>
      </div>

      {/* Main Metric */}
      <div className="mb-4">
        {/* Use the conditionally formatted total here */}
        <h2 className="text-[18px] font-medium text-[#1A1410]">
          {formattedTotal}
        </h2>
      </div>

      {/* Label */}
      <p className="text-[14px] font-normal" style={{ color: labelColor }}>
        {text}
      </p>
    </div>
  );
};

export default TotalRevenueCard;
