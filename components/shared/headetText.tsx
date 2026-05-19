"use client";

export default function FeaturedProducts() {
  return (
    <section className="text-center py-12 bg-white">
      {/* Top line + text + line */}
      <div className="flex items-center justify-center gap-3 mb-4">
        <hr className="bg-[#f0c12a] h-[1px] w-[2%] border-0" />
        <p
          className="tracking-[4px] text-sm uppercase text-[#f0c12a]"
          style={{ fontFamily: "'Jost', sans-serif" }}
        >
          AI-Customizable Collection
        </p>
        <hr className="bg-[#f0c12a] h-[1px] w-[2%] border-0" />
      </div>

      {/* Main title */}
      <h2
        className="text-7xl md:text-4xl font-serif italic text-[#1a1a1a] font-semibold mb-2"
        style={{ fontFamily: "'Cormorant Garamond', serif" }}
      >
        Featured Products
      </h2>

      {/* Subtitle */}
      <p className="text-sm md:text-base  text-[#6b6b6b]" style={{ fontFamily: "'Jost', sans-serif" }}>
        Select your canvas and unleash your creativity with our AI-powered design studio
      </p>
    </section>
  );
}
