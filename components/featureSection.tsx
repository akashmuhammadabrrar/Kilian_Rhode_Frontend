"use client";

import React, { useRef, useEffect, useState } from "react";
import Image from "next/image";

import { Jost, Cormorant_Garamond } from "next/font/google";
import { useGetSaveFeaturesQuery } from "@/app/store/slices/services/contentHomepageApi";

const jostFont = Jost({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const cormorantNormal = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal"],
});

// --- CSS Animation Definitions ---
const animationStyles = (
  <style jsx global>{`
    @keyframes slideUp {
      from {
        opacity: 0;
        transform: translateY(20px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    /* Initial State (Hidden) */
    .feature-initial {
      opacity: 0;
      transform: translateY(20px);
    }

    /* Animated State */
    .feature-animate {
      animation: slideUp 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
    }
  `}</style>
);

const FeaturesSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const { data, isLoading } = useGetSaveFeaturesQuery();
  const features = data?.data;

  useEffect(() => {
    const currentRef = sectionRef.current;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      {
        root: null,
        rootMargin: "0px",
        threshold: 0.2,
      }
    );

    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="bg-[#F5F5F5] py-16 px-4 border border-[#E5E5E5] sm:px-6 lg:px-8"
    >
      {animationStyles}
      <div className="max-w-screen-xl mx-auto">
        {isLoading ? (
          <div className="flex justify-center items-center py-8">
            <div className="w-8 h-8 border-4 border-[#D4AF37] border-t-transparent rounded-full animate-spin" />
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-y-12 sm:gap-y-16 lg:gap-y-0 lg:gap-x-8">
            {features?.map((feature, index) => {
              const delay = `${index * 0.1}s`;
              const featureClasses = isVisible
                ? "feature-initial feature-animate"
                : "feature-initial";

              return (
                <div
                  key={feature?.id ?? index}
                  className={`flex flex-col items-center text-center ${featureClasses}`}
                  style={{ animationDelay: delay }}
                >
                  {/* Icon Container */}
                  <div className="w-16 h-16 border-2 border-[#D4AF37] flex items-center justify-center mb-6">
                    {feature?.icon && (
                      <Image
                        src={feature.icon}
                        alt={feature?.title ?? "Feature icon"}
                        width={24}
                        height={24}
                        unoptimized
                      />
                    )}
                  </div>

                  {/* Title */}
                  <p
                    className={`${cormorantNormal.className} text-[#1a1a1a] text-[14px] sm:text-base font-medium tracking-[0.5px] uppercase mb-2`}
                  >
                    {feature?.title}
                  </p>

                  {/* Subtitle */}
                  <p
                    className={`${jostFont.className} text-[12px] tracking-[0.5px] text-[#6B6B6B] sm:text-sm`}
                  >
                    {feature?.subtitle}
                  </p>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};

export default FeaturesSection;
