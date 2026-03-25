// File: components/ContactSection.js
"use client"

import React from "react";
import { Jost, Cormorant_Garamond } from "next/font/google";
import { Mail, MapPin, Phone, MessageCircle } from "lucide-react"; // Recommended icon library
import { useGetContactInfoQuery } from "@/app/store/slices/services/contentContactApi";

// --- Font Definitions ---
// Define fonts in this file or pass them as props if preferred
const jostFont = Jost({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const cormorantItalic = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["italic"],
});

const cormorantNormal = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal"],
});

// --- Reusable Input Field Component ---
type FormInputProps = {
  label: string;
  placeholder?: string;
  type?: string;
};

const FormInput: React.FC<FormInputProps> = ({ label, placeholder, type = "text" }) => (
  <div className="mb-4">
    <label
      className={`block text-xs uppercase tracking-widest text-gray-900 mb-2 ${cormorantNormal.className}`}
    >
      {label}
    </label>
    <input
      type={type}
      placeholder={placeholder}
      className={`w-full px-4 py-3 bg-white border-2 border-[#E5E5E5] outline-none transition duration-150 ${jostFont.className}`}
    />
  </div>
);

// --- Reusable Textarea Component ---
type FormTextareaProps = {
  label: string;
  placeholder?: string;
};

const FormTextarea: React.FC<FormTextareaProps> = ({ label, placeholder }) => (
  <div className="mb-6">
    <label
      className={`block text-xs uppercase tracking-widest text-gray-900 mb-2 ${cormorantNormal.className}`}
    >
      {label}
    </label>
    <textarea
      rows={5}
      placeholder={placeholder}
      className={`w-full px-4 py-3 bg-white border-2 border-[#E5E5E5] outline-none  transition duration-150 resize-none ${jostFont.className}`}
    ></textarea>
  </div>
);

// --- Main Contact Section Component ---

const ContactSection = () => {
  const yellowColor = "text-yellow-700"; // Define custom gold color class if needed

  const { data: contactData } = useGetContactInfoQuery();
  const contactInfo = contactData?.data?.[0];

  return (
    <div className={`bg-white py-6 md:py-6 ${jostFont.className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-12">
        {/* === LEFT COLUMN: Information Panel === */}
        <div className="p-6 md:p-0">
          <h2
            className={`text-5xl mb-6 text-gray-900 ${cormorantItalic.className}`}
          >
            Let&apos;s Create Together
          </h2>

          <p className="text-gray-700 mb-12 max-w-md">
            Whether you&ldquo;re looking to create a single custom piece or need bulk
            orders for your business, our team is ready to assist you with our
            AI-powered design solutions.
          </p>

          {/* Contact Details */}
          <div className="space-y-8">
            {/* Email */}
            {contactInfo?.email && (
              <div className="flex items-start">
                <div
                  className={`p-3 border-2 border-[#D4AF37] mr-4`}
                >
                  <Mail className="w-5 h-5 text-[#D4AF37]" />
                </div>
                <div>
                  <p
                    className={`text-xs uppercase tracking-widest text-gray-900 mb-1 ${cormorantNormal.className}`}
                  >
                    EMAIL
                  </p>
                  <a
                    href={`mailto:${contactInfo.email}`}
                    className="text-gray-900 font-medium hover:text-yellow-700 transition"
                  >
                    {contactInfo.email}
                  </a>
                </div>
              </div>
            )}

            {/* Phone */}
            {contactInfo?.phone_number && (
              <div className="flex items-start">
                <div
                  className={`p-3 border-2 border-[#D4AF37] mr-4`}
                >
                  <Phone className="w-5 h-5 text-[#D4AF37]" />
                </div>
                <div>
                  <p
                    className={`text-xs uppercase tracking-widest text-gray-900 mb-1 ${cormorantNormal.className}`}
                  >
                    PHONE
                  </p>
                  <a
                    href={`tel:${contactInfo.phone_number}`}
                    className="text-gray-900 font-medium hover:text-yellow-700 transition"
                  >
                    {contactInfo.phone_number}
                  </a>
                </div>
              </div>
            )}

            {/* WhatsApp */}
            {contactInfo?.whatsappNumber && (
              <div className="flex items-start">
                <div
                  className={`p-3 border-2 border-[#D4AF37] mr-4`}
                >
                  <MessageCircle className="w-5 h-5 text-[#D4AF37]" />
                </div>
                <div>
                  <p
                    className={`text-xs uppercase tracking-widest text-gray-900 mb-1 ${cormorantNormal.className}`}
                  >
                    WHATSAPP
                  </p>
                  <a
                    href={`https://wa.me/${contactInfo.whatsappNumber}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-900 font-medium hover:text-yellow-700 transition"
                  >
                    {contactInfo.whatsappNumber}
                  </a>
                </div>
              </div>
            )}

            {/* Address */}
            {contactInfo?.businessAddress && (
              <div className="flex items-start">
                <div
                  className={`p-3 border-2 border-[#D4AF37] mr-4`}
                >
                  <MapPin className="w-5 h-5 text-[#D4AF37]" />
                </div>
                <div>
                  <p
                    className={`text-xs uppercase tracking-widest text-gray-900 mb-1 ${cormorantNormal.className}`}
                  >
                    ADDRESS
                  </p>
                  <p className="text-gray-900 font-medium whitespace-pre-line">
                    {contactInfo.businessAddress}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* === RIGHT COLUMN: Contact Form === */}
        <div className="bg-[#F5F5F5] p-8 sm:p-12 shadow-inner">
          <form>
            <FormInput label="YOUR NAME" placeholder="John Doe" />
            <FormInput
              label="EMAIL ADDRESS"
              placeholder="john@example.com"
              type="email"
            />
            <FormInput label="SUBJECT" placeholder="Design inquiry" />
            <FormTextarea
              label="MESSAGE"
              placeholder="Tell us about your project..."
            />

            {/* Submit Button */}
            <button
              type="submit"
              className={`w-full py-4 text-sm uppercase tracking-widest text-gray-900 bg-[#D4AF37] hover:bg-yellow-600 font-medium shadow-md transition duration-150 ${jostFont.className}`}
            >
              SEND MESSAGE
            </button>

            {/* Disclaimer */}
            <p
              className={`text-center text-xs text-gray-500 mt-4 ${jostFont.className}`}
            >
              We typically respond within 24 hours
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactSection;
