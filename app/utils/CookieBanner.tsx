"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useGetDocumentPoliciesQuery } from "@/app/store/slices/services/documentPolicyApi";
import { X, Cookie, Info } from "lucide-react";
import { Jost } from "next/font/google";

const jostFont = Jost({
    subsets: ["latin"],
    weight: ["400", "500", "600"],
});

export default function CookieBanner() {
    const [visible, setVisible] = useState(false);
    const { data: policyData } = useGetDocumentPoliciesQuery();

    useEffect(() => {
        const consent = localStorage.getItem("cookieConsent");
        if (!consent) {
            // Delay showing the banner for a better UX
            const timer = setTimeout(() => setVisible(true), 1500);
            return () => clearTimeout(timer);
        }
    }, []);

    const handleChoice = (choice: string) => {
        localStorage.setItem("cookieConsent", choice);
        setVisible(false);
    };

    // Find the cookie policy file from API data
    const cookiePolicy = policyData?.results?.find((policy) =>
        policy.title.toLowerCase().includes("cookie")
    );

    const policyUrl = cookiePolicy?.file || "#";

    return (
        <AnimatePresence>
            {visible && (
                <motion.div
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 100, opacity: 0 }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    className={`${jostFont.className} fixed bottom-6 left-6 right-6 md:left-auto md:max-w-md z-50`}
                >
                    <div className="relative overflow-hidden bg-[#0b0c0e]/90 backdrop-blur-md border border-white/10 rounded-2xl p-6 shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
                        {/* Decorative Gold Accent */}
                        <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#d4af37] to-transparent opacity-50" />

                        <div className="flex items-start gap-4">
                            <div className="p-3 bg-[#d4af37]/10 rounded-xl border border-[#d4af37]/20">
                                <Cookie className="w-6 h-6 text-[#d4af37]" />
                            </div>

                            <div className="flex-1">
                                <h3 className="text-white font-semibold text-lg mb-1 flex items-center gap-2">
                                    Cookie Settings
                                </h3>
                                <p className="text-gray-400 text-sm leading-relaxed mb-6">
                                    We use essential cookies to enhance your experience. By continuing, you agree to our use of cookies.{" "}
                                    <a
                                        href={policyUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-[#d4af37] hover:underline inline-flex items-center gap-1 font-medium transition-colors"
                                    >
                                        Learn more
                                        <Info className="w-3 h-3" />
                                    </a>
                                </p>

                                <div className="flex items-center gap-3">
                                    <button
                                        onClick={() => handleChoice("accepted")}
                                        className="flex-1 bg-[#d4af37] hover:bg-[#c4a132] text-black font-semibold py-2.5 rounded-lg transition-all active:scale-95 text-sm cursor-pointer"
                                    >
                                        Accept All
                                    </button>
                                    <button
                                        onClick={() => handleChoice("rejected")}
                                        className="flex-1 bg-white/5 hover:bg-white/10 text-white font-medium py-2.5 rounded-lg border border-white/10 transition-all active:scale-95 text-sm cursor-pointer"
                                    >
                                        Decline
                                    </button>
                                </div>
                            </div>

                            <button
                                onClick={() => setVisible(false)}
                                className="text-gray-500 hover:text-white transition-colors p-1"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}