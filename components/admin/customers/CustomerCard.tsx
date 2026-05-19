// components/TotalRevenueCard.tsx

import React from "react";
import { formatCurrency } from "@/utils/formatCurrency";

// ---- Fix: Props Types ----
type TotalRevenueCardProps = {
  total: string | number;
  text: string;
};

const TotalRevenueCard = ({ total, text }: TotalRevenueCardProps) => {
  const labelColor = "#6B6560";

  return (
    <div
      className="
        w-full p-4 
        bg-[#FFF] 
        rounded-[14px]
        border-[1.173px] border-solid border-[#E8E3DC]
        hover:shadow-md
        transition duration-300
     
      "
    >
      {/* Label */}
      <p className="text-[14px] font-normal" style={{ color: labelColor }}>
        {text}
      </p>
      {/* Main Metric */}
      <div className="mt-2 mb-2">
        <h2 className="text-[18px] font-medium text-[#1A1410]">{formatCurrency(total)}</h2>
      </div>
    </div>
  );
};

export default TotalRevenueCard;
