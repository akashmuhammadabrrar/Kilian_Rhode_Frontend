import React from "react";

// Define the TypeScript interface for the component's props
interface CmsHomePageTitleProps {
  title: string;
  text: string;
}

// Assign the interface to the component
const CmsHomePageTitle: React.FC<CmsHomePageTitleProps> = ({ title, text }) => {
  return (
    <div>
      <h1 className="text-[16px] font-medium text-[#1a1410]">{title}</h1>
      <p className="text-[16px] font-normal text-[#6b6560]">{text}</p>
    </div>
  );
};

export default CmsHomePageTitle;
