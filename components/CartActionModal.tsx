import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Jost } from 'next/font/google';
import { X, Sparkles, ShoppingBag } from 'lucide-react';

const jostFont = Jost({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
});

interface CartActionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCustomize: () => void;
  onAddToCart: () => void;
}

export default function CartActionModal({
  isOpen,
  onClose,
  onCustomize,
  onAddToCart,
}: CartActionModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <React.Fragment>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm"
            onClick={onClose}
          />
          
          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", duration: 0.5 }}
            className={`fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-xl shadow-2xl z-50 w-full max-w-sm overflow-hidden ${jostFont.className}`}
          >
            <div className="relative p-6 pt-8 text-center">
              <button
                onClick={onClose}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
                aria-label="Close"
              >
                <X size={20} />
              </button>
              
              <h2 className="text-2xl text-[#1A1A1A] font-semibold mb-2">Choose an action</h2>
              <p className="text-gray-500 mb-8 max-w-[250px] mx-auto text-sm">
                Would you like to customize this product using our AI tools or add it directly to your cart?
              </p>
              
              <div className="flex flex-col space-y-3">
                <button
                  onClick={() => {
                    onCustomize();
                    onClose();
                  }}
                  className="w-full flex items-center justify-center py-3.5 px-4 bg-[#D4AF37] hover:bg-[#c2a25b] text-black font-medium tracking-wider uppercase text-sm rounded-lg transition-colors shadow-sm group"
                >
                  <Sparkles size={18} className="mr-2 group-hover:scale-110 transition-transform" />
                  Customize with AI
                </button>
                
                <button
                  onClick={() => {
                    onAddToCart();
                    onClose();
                  }}
                  className="w-full flex items-center justify-center py-3.5 px-4 border-2 border-[#1A1A1A] hover:bg-gray-50 text-[#1A1A1A] font-medium tracking-wider uppercase text-sm rounded-lg transition-colors group"
                >
                  <ShoppingBag size={18} className="mr-2 group-hover:scale-110 transition-transform" />
                  Add to Cart
                </button>
              </div>
            </div>
          </motion.div>
        </React.Fragment>
      )}
    </AnimatePresence>
  );
}
