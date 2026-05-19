import React from "react";
import warningIcon from "@/public/image/admin/DesignQuality/warningIcon.svg";
import Image from "next/image";
const InfoBox = () => {
  return (
    <div
      className="
       
      p-4 md:p-4  
            
      border-[1.2px] border-[#8b6f47]
      bg-[#8b6f47]/5
      rounded-lg   
      shadow-sm   
    "
    >
      <div className="flex items-start space-x-3">
        {/* Clock/Info Icon */}
        <Image src={warningIcon} alt="warnig" height={20} width={20} />

        {/* Text Content */}
        <p className="text-[14px] font-medium text-[#1a1410] leading-relaxed">
          High-resolution graphics are crucial for print quality. All
          AI-generated designs are automatically optimized for professional
          printing.
        </p>
      </div>
    </div>
  );
};

export default InfoBox;
