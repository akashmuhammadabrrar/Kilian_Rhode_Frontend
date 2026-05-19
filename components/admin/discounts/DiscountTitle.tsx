import React from "react";

// Define props interface
interface TitleProps {
  text: string;
  paragraph?: string; // optional if sometimes empty
}

const Title: React.FC<TitleProps> = ({ text, paragraph }) => {
  return (
    <div className="mb-6 text-center lg:text-left sm:text-left">
      {/* Main Title */}
      <h2
        className="
          text-[30px] 
          font-normal          
          mb-1 
          text-[#0A0A0A]
        "
      >
        {text}
      </h2>

      {/* Paragraph */}
      {paragraph && (
        <p
          className="
            text-[#4A5565] 
            text-[16px] 
            font-normal
          "
        >
          {paragraph}
        </p>
      )}
    </div>
  );
};

export default Title;
