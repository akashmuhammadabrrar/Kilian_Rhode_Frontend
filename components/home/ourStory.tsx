"use client";

import React, { useRef, useEffect, useState } from "react";
import Image from "next/image";

// Replace with your actual paths
import storyImage from "../../public/image/ourStoryImages/ourStoryImage1.jpg";
// import arrowIcon from "../../public/image/cardIcon/Icon.svg";

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


const animationStyles = (
  <style jsx global>{`
    @keyframes slideUp {
      from {
        opacity: 0;
        transform: translateY(30px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    @keyframes slideLeft {
      from {
        opacity: 0;
        transform: translateX(-30px);
      }
      to {
        opacity: 1;
        transform: translateX(0);
      }
    }

    /* Initial State (Hidden) */
    .initial-hidden {
      opacity: 0;
    }

    /* Left Column (Image) Animation */
    .image-slide-in {
      animation: slideLeft 1s ease-out forwards;
      animation-delay: 0.2s;
    }

    /* Right Column (Text) Animation */
    .text-slide-in {
      animation: slideUp 1s ease-out forwards;
      animation-delay: 0.4s; /* Staggered delay */
    }

    /* Smaller Badge Animation (Appears after main content) */
    .badge-slide-in {
      animation: slideUp 0.6s ease-out forwards;
      opacity: 0;
      transform: translateY(10px);
      animation-delay: 1s; /* Delayed appearance */
    }
  `}</style>
);

const OurStory = () => {
  // 1. Setup Hooks for Scroll Animation
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState<boolean>(false);

  useEffect(() => {
    const currentRef = sectionRef.current;

    // Safety check: The ref might be null on initial render if not attached yet
    if (!currentRef) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Optional: Stop observing once visible
          observer.unobserve(entry.target);
        }
      },
      {
        root: null,
        rootMargin: "0px",
        threshold: 0.1, // Trigger when 10% of the section is visible
      }
    );

    // Start observing the stable, local reference
    observer.observe(currentRef);

    // CLEANUP: Use the local variable 'currentRef' in the cleanup function.
    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []); // Empty dependency array ensures effect runs only on mount and cleanup on unmount

  // Conditional classes for animation
  const imageClasses = isVisible
    ? "initial-hidden image-slide-in"
    : "initial-hidden";
  const textClasses = isVisible
    ? "initial-hidden text-slide-in"
    : "initial-hidden";
  const badgeClasses = isVisible ? "badge-slide-in" : "initial-hidden";

  return (
    <section
      ref={sectionRef} // Attach ref to the section
      className="bg-[#fcf8f2] py-20 lg:py-32"
    >
      {/* ⚠️ Warning resolved by copying ref.current inside useEffect */}
      {animationStyles}
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.5fr] gap-8 lg:gap-16 items-center">
          {/* LEFT COLUMN: Image Section (Slide Left Animation) */}
          <div className={`relative h-[450px] lg:h-[800px] ${imageClasses}`}>
            {/* Main Image */}
            <div className="absolute top-0 left-0 flex self-center w-[98%] h-[85%]">
              <Image
                src={storyImage}
                alt="Abstract design elements with a pedestal"
                fill
                style={{ objectFit: "cover" }}
                priority
              />
            </div>

            {/* Floating Badge (Delayed Slide Up Animation) */}
            <div
              className={`absolute 
                          bottom-10 -right-3 
                          lg:bottom-22 lg:-right-4 lg:left-auto 
                          border border-[#D7C4AA] bg-white text-center py-4 px-8 shadow-2xl z-20 w-58 
                          ${badgeClasses}`}
            >
              <p
                className={`${jostFont.className} text-[48px] tracking-[0.5px] font-medium text-[#795548]`}
              >
                10K+
              </p>
              <p
                className={`${jostFont.className} text-[14px] tracking-[2.8px] uppercase text-[#6b6b6b] mt-1`}
              >
                DESIGNS CREATED
              </p>
            </div>
          </div>

          {/* RIGHT COLUMN: Text Content Section (Slide Up Animation) */}
          <div className={`text-left py-4 pt-6 lg:pt-0 ${textClasses}`}>
            {/* OUR STORY Header */}
            <p
              className={`${jostFont.className} text-[#f4bc08] uppercase tracking-[4.2px] text-[20px]  mb-2`}
            >
              OUR STORY
            </p>

            <h2
              className={`${cormorantItalic.className} text-3xl md:text-6xl tracking-[0.5px] text-[#1a1a1a] mb-5 leading-[60px]`}
            >
              Where Creativity <br /> Meets Technology
            </h2>

            <div
              className={`${jostFont.className} text-[18px] tracking-[0.5px] max-w-[694px] text-left text-[#6b6b6b] leading-[29.25px] inline-block space-y-1`}
            >
              <p>
                Everything starts with an idea — a spark of creativity that
                deserves to be seen. We founded this platform because we believe
                that everyone has the power to create something unique. Whether
                it’s a bold design, a personal message, or a spontaneous idea —
                creativity should never be limited by tools or resources.
              </p>

              <p>
                That’s why we built a place where imagination meets technology.
                Here, you can bring your vision to life: design your own
                products, generate artwork with the help of AI, and see your
                ideas instantly printed on real items like shirts, mugs, and
                more — all in one seamless experience.
              </p>

              <p>
                We’re still at the beginning of our journey, but every day we
                grow, improve, and learn from our community. Our mission is to
                make creativity accessible to everyone and to build the most
                inspiring platform for personal design and product creation. We
                know where we want to go — and we’re working passionately to get
                there. Because the future belongs to the creators. And here, you
                are one of them.
              </p>
            </div>

            {/* Stats and Support Grid */}
            <div className="grid grid-cols-2 gap-x-8 mb-6 pt-6">
              {/* Stat 1: 98% Satisfaction Rate */}
              <div>
                <p
                  className={`${jostFont.className} text-[36px] tracking-[0.5px] font-medium text-[#795548]`}
                >
                  98%
                </p>
                <p
                  className={`${jostFont.className} text-[14px] tracking-[2.1px] text-[#795548]  uppercase mt-1`}
                >
                  SATISFACTION RATE
                </p>
              </div>

              {/* Stat 2: E-Mail Support */}
              <div>
                <p
                  className={`${jostFont.className} text-[36px] tracking-[0.5px] font-medium text-[#795548]`}
                >
                  E-Mail Support
                </p>
                <p
                  className={`${jostFont.className} text-[14px] tracking-[2.1px] text-[#795548] mt-1`}
                >
                  SUPPORT AVAILABLE
                </p>
              </div>
            </div>

            {/* OUR STORY Button */}
            {/* <button
              className={`${jostFont.className} text-[14px] tracking-[2.1px] bg-[#795548] hover:bg-[#72543B] transition duration-200 px-7 py-4 text-white text-sm font-medium flex items-center gap-2 shadow-md`}
            >
              OUR STORY
              <Image
                src={arrowIcon}
                alt="Arrow Icon"
                width={18}
                height={18}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </button> */}
          </div>
        </div>
      </div>
    </section>
  );
};

export default OurStory;
