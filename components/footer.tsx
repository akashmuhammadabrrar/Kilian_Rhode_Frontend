"use client";

import React, { useRef, useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

// Local SVG Image Imports
import fbIcon from "../public/image/footerIcon/fb.svg";
import youTubeIcon from "../public/image/footerIcon/Icon (6).svg";
import xIcon from "../public/image/footerIcon/xIcon.svg";
import instagramIcon from "../public/image/footerIcon/Icon (4).svg";

import { Jost, Cormorant_Garamond } from "next/font/google";
import {
  useGetContactInfoQuery,
  useGetSocialMediaQuery,
} from "@/app/store/slices/services/contentContactApi";
import { useGetDocumentPoliciesQuery } from "@/app/store/slices/services/documentPolicyApi";
import { Phone, MessageCircle, Mail, MapPin } from "lucide-react";

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
        transform: translateY(50px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    .footer-initial {
      opacity: 0;
      transform: translateY(50px);
    }

    .footer-animate {
      animation: slideUp 1s ease-out forwards;
      animation-delay: 0.1s;
    }
  `}</style>
);

// -------------------------------------------------------------

const footerLinks = [
  {
    links: [
      { name: "All Products", href: "/pages/shop" },
      { name: "Collections", href: "/pages/collections" },
      { name: "Men's Collection", href: "/pages/collection" },
      { name: "Women's Collection", href: "/pages/woman-collections" },
      { name: "Children Collection", href: "/pages/children-collections" },
      { name: "Contact Us", href: "/pages/contact" },
    ],
  },
];

const Footer = () => {
  const footerRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState<boolean>(false);

  // Fetch dynamic data
  const { data: contactData } = useGetContactInfoQuery();
  const { data: socialData } = useGetSocialMediaQuery();
  const { data: policyData } = useGetDocumentPoliciesQuery();

  const contactInfo = contactData?.data?.[0];
  const socialLinks = socialData?.data || [];

  useEffect(() => {
    const currentRef = footerRef.current;

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
        threshold: 0.05,
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

  const footerClasses = isVisible
    ? "footer-initial footer-animate"
    : "footer-initial";

  return (
    <footer
      ref={footerRef}
      className={`bg-[#0b0c0e] text-gray-300 ${footerClasses}`}
    >
      {animationStyles}
      <div className="mx-auto px-4 sm:px-6 lg:px-14 py-16">
        {/* === 1. TOP SECTION === */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 border-b border-gray-800 pb-12">
          {/* Branding */}
          <div className="space-y-6 md:col-span-1">
            <Link href="/" className="flex flex-col items-center group w-fit">
              <span
                className={`${cormorantItalic.className} text-white text-[48px] sm:text-5xl font-semibold text-center tracking-[0.5px] leading-[48px]`}
              >
                Thundra
              </span>

              <div className="flex items-center mt-3 space-x-3">
                <span className="block w-8 h-[1px] bg-[#d4af37]"></span>

                <span
                  className={`${jostFont.className} text-[12px] tracking-[3.6px] text-[#d4af37] font-light uppercase whitespace-nowrap leading-[16px]`}
                >
                  DESIGN STUDIO
                </span>

                <span className="block w-8 h-[1px] bg-[#d4af37]"></span>
              </div>
            </Link>

            <p
              className={`${jostFont.className} text-[16px] tracking-[0.5px] text-[#D1D5DC] leading-[29.25px] max-w-3xl`}
            >
              Empowering creativity through AI-powered design. Transform your
              vision into premium custom products with professional 300 DPI
              quality guaranteed.
            </p>

            {/* Social Icons */}
            <div className="flex space-x-4 pt-2">
              {socialLinks.length > 0 ? (
                socialLinks.map((social) => (
                  <Link
                    key={social.id}
                    href={social.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 border border-gray-700 rounded-sm hover:border-yellow-600 transition-colors cursor-pointer"
                  >
                    <Image
                      src={social.icon} // Using the URL from API
                      alt={social.name || "Social Media"}
                      width={20}
                      height={20}
                      className="object-contain"
                    />
                  </Link>
                ))
              ) : (
                <>
                  <Link
                    href="https://www.facebook.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 border border-gray-700 rounded-sm hover:border-yellow-600 transition-colors"
                  >
                    <Image src={fbIcon} alt="Facebook" width={20} height={20} />
                  </Link>

                  <Link
                    href="https://www.instagram.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 border border-gray-700 rounded-sm hover:border-yellow-600 transition-colors"
                  >
                    <Image
                      src={instagramIcon}
                      alt="Instagram"
                      width={20}
                      height={20}
                    />
                  </Link>

                  <Link
                    href="#"
                    className="p-2 border border-gray-700 rounded-sm hover:border-yellow-600 transition-colors"
                  >
                    <Image src={xIcon} alt="Twitter" width={20} height={20} />
                  </Link>

                  <Link
                    href="https://www.youtube.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 border border-gray-700 rounded-sm hover:border-yellow-600 transition-colors"
                  >
                    <Image
                      src={youTubeIcon}
                      alt="YouTube"
                      width={20}
                      height={20}
                    />
                  </Link>
                </>
              )}
            </div>
          </div>

        </div>

        {/* === 2. MIDDLE SECTION === */}
        <div className="py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Email */}
          {contactInfo?.email && (
            <div className="flex-1 p-6 bg-[#1a1c1f] border-[2px] border-solid border-[rgba(255,255,255,0.1)] flex items-center space-x-4 max-w-full md:max-w-md">
              <div className="p-3 bg-[#d4af37]">
                <Mail className="w-5 h-5 text-black" />
              </div>
              <div>
                <p
                  className={`${jostFont.className} text-[12px] mb-2 tracking-[2.4px] text-[#6a7282] leading-[16px] uppercase`}
                >
                  Email Us
                </p>
                <a
                  href={`mailto:${contactInfo.email}`}
                  className={`${jostFont.className} text-[14px] tracking-[0.5px] leading-[20px] text-white hover:text-[#d4af37] transition-colors`}
                >
                  {contactInfo.email}
                </a>
              </div>
            </div>
          )}

          {/* Phone */}
          {contactInfo?.phone_number && (
            <div className="flex-1 p-6 bg-[#1a1c1f] border-[2px] border-solid border-[rgba(255,255,255,0.1)] flex items-center space-x-4 max-w-full md:max-w-md">
              <div className="p-3 bg-[#d4af37]">
                <Phone className="w-5 h-5 text-black" />
              </div>
              <div>
                <p
                  className={`${jostFont.className} text-[12px] mb-2 tracking-[2.4px] text-[#6a7282] leading-[16px] uppercase`}
                >
                  Phone
                </p>
                <a
                  href={`tel:${contactInfo.phone_number}`}
                  className={`${jostFont.className} text-[14px] tracking-[0.5px] leading-[20px] text-white hover:text-[#d4af37] transition-colors`}
                >
                  {contactInfo.phone_number}
                </a>
              </div>
            </div>
          )}

          {/* WhatsApp */}
          {contactInfo?.whatsappNumber && (
            <div className="flex-1 p-6 bg-[#1a1c1f] border-[2px] border-solid border-[rgba(255,255,255,0.1)] flex items-center space-x-4 max-w-full md:max-w-md">
              <div className="p-3 bg-[#d4af37]">
                <MessageCircle className="w-5 h-5 text-black" />
              </div>
              <div>
                <p
                  className={`${jostFont.className} text-[12px] mb-2 tracking-[2.4px] text-[#6a7282] leading-[16px] uppercase`}
                >
                  WhatsApp
                </p>
                <a
                  href={`https://wa.me/${contactInfo.whatsappNumber}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${jostFont.className} text-[14px] tracking-[0.5px] leading-[20px] text-white hover:text-[#d4af37] transition-colors`}
                >
                  {contactInfo.whatsappNumber}
                </a>
              </div>
            </div>
          )}

          {/* Address */}
          {contactInfo?.businessAddress && (
            <div className="flex-1 p-6 bg-[#1a1c1f] border-[2px] border-solid border-[rgba(255,255,255,0.1)] flex items-start space-x-4 max-w-full md:max-w-md">
              <div className="p-3 bg-[#d4af37]">
                <MapPin className="w-5 h-5 text-black" />
              </div>
              <div>
                <p
                  className={`${jostFont.className} text-[12px] mb-2 tracking-[2.4px] text-[#6a7282] leading-[16px] uppercase`}
                >
                  Business Address
                </p>
                <address
                  className={`${jostFont.className} text-[14px] tracking-[0.5px] leading-[20px] text-white not-italic`}
                >
                  {contactInfo.businessAddress}
                </address>
              </div>
            </div>
          )}
        </div>

        {/* === 3. BOTTOM SECTION === */}
        <div className="border-t border-gray-800 pt-8 text-xs flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
          <div className="text-gray-500 space-y-2 w-full flex flex-col md:flex-row justify-between items-center text-center">

            <p
              className={`${jostFont.className} text-[14px] tracking-[0.5px] leading-5 text-[#99A1AF]`}
            >
              © 2025–{new Date().getFullYear()} Thundra. All rights reserved.
            </p>

            <div
              className={`${jostFont.className} text-[14px] tracking-[0.5px] leading-[20px] text-[#99A1AF] flex flex-wrap justify-center md:justify-end gap-x-4 gap-y-2`}
            >
              {policyData?.results && policyData.results.length > 0 ? (
                policyData.results.map((policy, index) => (
                  <React.Fragment key={policy.id}>
                    <Link
                      href={policy.file}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-white transition-colors capitalize"
                    >
                      {policy.title.replace(/_/g, " ")}
                    </Link>
                    {index < (policyData.results?.length ?? 0) - 1 && (
                      <p className="hidden sm:block">|</p>
                    )}
                  </React.Fragment>
                ))
              ) : (
                <>
                  <Link
                    href="/privacy"
                    className="hover:text-white transition-colors"
                  >
                    Privacy Policy
                  </Link>
                  <p className="hidden sm:block">|</p>
                  <Link href="/terms" className="hover:text-white transition-colors">
                    Terms of Service
                  </Link>
                  <p className="hidden sm:block">|</p>
                  <Link
                    href="/cookie"
                    className="hover:text-white transition-colors"
                  >
                    Cookie Policy
                  </Link>
                  <p className="hidden sm:block">|</p>
                  <Link href="/gdpr" className="hover:text-white transition-colors">
                    GDPR Compliance
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>

        {/* POWERED BY */}
        <div
          className={`${jostFont.className} text-[12px] tracking-[0.5px] leading-[16px] text-[#6A7282] flex flex-wrap justify-center items-center w-full space-x-2 pt-4 text-center`}
        >
          <hr className="hidden md:block bg-[#D4AF374D] h-[1px] w-[5%] border-0 mt-1" />

          <span className="hidden md:block text-yellow-600">&#9632;</span>
          <span className="whitespace-nowrap">
            Gemini NanoBanana Integration
          </span>
          <span className="hidden md:block text-yellow-600">&#9632;</span>

          <span className="whitespace-nowrap">Professional 300 DPI Quality</span>
          <span className="hidden md:block text-yellow-600">&#9632;</span>

          <span className="whitespace-nowrap">GDPR-Compliant</span>

          <hr className="hidden md:block bg-[#D4AF374D] h-[1px] w-[5%] border-0 mt-1" />
        </div>
      </div>
    </footer>
  );
};

export default Footer;

