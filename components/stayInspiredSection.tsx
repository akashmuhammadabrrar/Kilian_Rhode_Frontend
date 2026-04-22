"use client";

import React, { useRef, useEffect, useState } from "react";
import { Jost, Cormorant_Garamond } from "next/font/google";
import { useSubscribeNewsletterMutation } from "@/app/store/slices/services/newsletterApi";
import { toast } from "sonner";

const jostFont = Jost({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const cormorantItalic = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["italic"],
});

// --- CSS Animation Definitions ---
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

    @keyframes slideRight {
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

    /* Left Column Animation (Slide Right) */
    .left-animate {
      animation: slideRight 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
      animation-delay: 0.2s;
    }

    /* Right Column Animation (Slide Up) */
    .right-animate {
      animation: slideUp 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
      animation-delay: 0.4s; /* Staggered delay */
    }
  `}</style>
);

const StayInspired = () => {
  // 1. Setup Hooks for Scroll Animation
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState<boolean>(false);

  // Form states
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");

  const [subscribeNewsletter, { isLoading }] = useSubscribeNewsletterMutation();

  useEffect(() => {
    // Capture the current value of the ref
    const currentElement = sectionRef.current;

    if (currentElement) {
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
          threshold: 0.1, // Trigger when 10% of the section is visible
        }
      );

      // Observe the captured element
      observer.observe(currentElement);

      // Cleanup function uses the captured element
      return () => {
        if (currentElement) {
          observer.unobserve(currentElement);
        }
      };
    }
    // Dependency array is empty because we only want this to run once on mount
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email) {
      toast.error("Please enter your email address.");
      return;
    }

    const formData = new FormData();
    formData.append("email", email);
    if (name) {
      formData.append("name", name);
    }

    try {
      const response = await subscribeNewsletter(formData).unwrap();
      if (response.success) {
        toast.success(response.message || "Newsletter subscriber created successfully");
        setEmail("");
        setName("");
      } else {
        toast.error(response.message || "Failed to subscribe.");
      }
    } catch (error: any) {
      toast.error(error?.data?.message || "An error occurred while subscribing.");
    }
  };

  // Conditional classes
  const leftClasses = isVisible
    ? "initial-hidden left-animate"
    : "initial-hidden";
  const rightClasses = isVisible
    ? "initial-hidden right-animate"
    : "initial-hidden";

  return (
    <section
      ref={sectionRef} // Attach ref to the section
      className="flex items-center justify-center px-10 bg-white py-16 md:py-20"
    >
      {animationStyles}
      <div className="flex flex-col md:flex-row w-full max-w-6xl border border-gray-200 overflow-hidden">
        {/* Left Content (Slide Right Animation) */}
        <div
          className={`flex-1 bg-[#E5D6C3] p-10 md:p-16 flex flex-col justify-center ${leftClasses}`}
        >
          <h2
            className={`${cormorantItalic.className} text-3xl font-semibold tracking-[0.5px]  md:text-6xl text-[#1a1a1a] mb-4`}
          >
            Stay Inspired
          </h2>
          <p
            className={`${jostFont.className} text-[18px] tracking-[0.5px] text-[#1a1a1a] leading-[29.25px] mb-8 max-w-md`}
          >
            Subscribe to receive exclusive design inspiration, AI tips, special
            offers, and early access to new features.
          </p>

          <div className="flex space-x-10 text-[#3F3F3F]">
            <div>
              <p
                className={`${jostFont.className} text-[30px] tracking-[0.5px] text-[#795548] leading-[36px] italic`}
              >
                10K+
              </p>
              <p
                className={`${jostFont.className} text-[12px] tracking-[1.2px] uppercase text-[#1a1a1a]`}
              >
                Subscribers
              </p>
            </div>
            <div>
              <p
                className={`${jostFont.className} text-[30px] tracking-[0.5px] text-[#795548] leading-[36px] italic`}
              >
                98%
              </p>
              <p
                className={`${jostFont.className} text-[12px] tracking-[1.2px] uppercase text-[#1a1a1a]`}
              >
                Satisfaction
              </p>
            </div>
          </div>
        </div>

        {/* Right Form (Slide Up Animation) */}
        <div
          className={`flex-1 bg-[#E5D6C3] p-10 md:p-14 flex flex-col justify-center ${rightClasses}`}
        >
          <form onSubmit={handleSubmit} className="space-y-6 bg-white/5 border-2 border-white/10 p-4">
            <div>
              <label
                className="block text-[11px] uppercase tracking-[1px] text-gray-700 mb-2"
                style={{ fontFamily: "'Jost', sans-serif" }}
              >
                Email Address
              </label>
              <input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full border-2  bg-[rgba(255,255,255,0.1)] border-[rgba(255,255,255,0.2)] text-gray-800 text-sm px-3 py-4  outline-none transition-all"
                style={{ fontFamily: "'Jost', sans-serif" }}
              />
            </div>

            <div>
              <label
                className="block text-[11px] uppercase tracking-[1px] text-gray-700 mb-2"
                style={{ fontFamily: "'Jost', sans-serif" }}
              >
                First Name (Optional)
              </label>
              <input
                type="text"
                placeholder="Your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full border-2  bg-[rgba(255,255,255,0.1)] border-[rgba(255,255,255,0.2)] text-gray-800 text-sm px-3 py-4  outline-none transition-all"
                style={{ fontFamily: "'Jost', sans-serif" }}
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#795548] hover:bg-[#593125] disabled:opacity-70 disabled:cursor-not-allowed text-white text-[11px] uppercase tracking-[2px] py-3  transition-all"
              style={{ fontFamily: "'Jost', sans-serif" }}
            >
              {isLoading ? "Subscribing..." : "Subscribe Now"}
            </button>
            <p
              className={`${jostFont.className} tracking-[0.5px] text-[12px] text-[#6A7282] mt-5 leading-relaxed`}
            >
              By subscribing, you agree to our{" "}
              <span className="underline cursor-pointer">Privacy Policy</span>.
              Unsubscribe anytime. GDPR compliant.
            </p>
          </form>
        </div>
      </div>
    </section>
  );
};

export default StayInspired;
