"use client";

import React, { useRef, useState, useEffect } from "react";
import { useRouter } from "next/navigation";

import { Jost, Cormorant_Garamond } from "next/font/google";

const jostFont = Jost({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const cormorantItalic = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["italic"],
});

const CustomDesignStudio = () => {
   const router = useRouter();  

  const handleAllProducts = () => {
    router.push("/pages/shop");
  };
  const sectionRef = useRef(null);



  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);

          observer.unobserve(entry.target);
        }
      },
      {
        threshold: 0.1,
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    // Cleanup function for the observer
    return () => observer.disconnect();
  }, []);

  const handleStartDesigningClick = () => {
    router.push("/pages/my-creation/create-your-design");
  };

  const baseTransition = "transition-all duration-1000 ease-out";

  const animateClasses = isInView
    ? "opacity-100 translate-y-0"
    : "opacity-0 translate-y-10";

  // FIX: Explicitly type 'delayMs' as 'number' to resolve the 'implicitly has an any type' error.
  const getDelayStyle = (delayMs: number): React.CSSProperties => ({
    transitionDelay: isInView ? `${delayMs}ms` : "0ms",
  });

  return (
    <section
      ref={sectionRef}
      className="bg-[#F5F5F5] border border-[#E5E5E5] py-16 md:py-24 xl:py-32 relative overflow-hidden"
    >
      <div
        className={`max-w-4xl mx-auto px-6 text-center 
                         ${baseTransition} ${animateClasses}`}
        style={getDelayStyle(0)}
      >
        <p
          className={`inline-block border ${
            jostFont.className
          } border-[#D4AF37] text-[#D4AF37] py-2 px-5 text-xs tracking-[3.6px] uppercase mb-6 
                         ${baseTransition} ${
            isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
          }`}
          style={getDelayStyle(100)}
        >
          Custom Design Studio
        </p>

        <h2
          className={`text-[48px] sm:text-5xl md:text-5xl ${
            cormorantItalic.className
          } text-[#1a1a1a] mb-6 tracking-[0.5px]
                         ${baseTransition} ${
            isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
          }`}
          style={getDelayStyle(250)}
        >
          Can&apos;t Find What You&apos;re Looking For?
        </h2>

        <p
          className={`text-base md:text-[18px] ${
            jostFont.className
          } text-[#6B6B6B] font-jost mb-10 
                         ${baseTransition} ${
            isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
          }`}
          style={getDelayStyle(400)}
        >
          Create your own unique design with our AI-powered studio or manual
          text creator.
          <br className="hidden sm:inline" />
          Professional 300 DPI quality guaranteed on every order.
        </p>

        <div
          className={`flex flex-col sm:flex-row justify-center items-center gap-4 
                         ${baseTransition} ${
            isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
          }`}
          style={getDelayStyle(550)}
        >
          <button
            onClick={handleStartDesigningClick}
            className={`w-full sm:w-auto py-3 ${jostFont.className} px-8 text-sm font-medium uppercase tracking-[2.1] 
                                     bg-[#D4AF37] text-[#000000] border-2 border-[#c1a05c] hover:bg-[#b09052] hover:border-[#b09052] 
                                     transition duration-300 shadow-md font-jost text-[14px]`}
          >
            Start Designing
          </button>

          <button      onClick={handleAllProducts}
            className={`w-full sm:w-auto py-3 px-8 text-sm  ${jostFont.className} font-medium uppercase tracking-[2.1] 
                                     bg-white border-2 border-stone-900 font-jost hover:bg-stone-50 
                                     transition duration-300 shadow-md text-[#1a1a1a]`}
          >
            Browse All Products
          </button>
        </div>
      </div>
    </section>
  );
};

export default CustomDesignStudio;
