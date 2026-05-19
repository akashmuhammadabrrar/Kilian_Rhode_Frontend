import React from "react";
import {
 
  Sparkles,
  CheckCircle,
  Truck,
  UserPlus,
  Infinity,
} from "lucide-react";

interface CreateDiscountCardProps {
  onCreateClick: () => void;
}

const CreateDiscountCard: React.FC<CreateDiscountCardProps> = ({
  onCreateClick,
}) => {
  return (
    <div className="p-6 md:p-8 rounded-2xl bg-gradient-to-br from-indigo-50 to-purple-50 border-2 border-[#e9d4ff]">
      <div className="flex items-start">
        {/* Sparkle Icon with Background */}
        <div className="bg-white p-2.5 rounded-xl mr-4 shadow-md">
          <Sparkles className="w-6 h-6 text-purple-600" />
        </div>
        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            Create Custom Discount Codes
          </h2>
          <p className="text-gray-600 mb-6 max-w-xl">
            Quickly create powerful discount codes with advanced features like
            free shipping, new customer exclusivity, unlimited or one-time use,
            and more.
          </p>

          {/* Feature Icons */}
          <div className="flex flex-wrap items-center space-x-4 mb-8 text-sm font-medium text-gray-700">
            <span className="flex items-center">
              <CheckCircle className="w-4 h-4 text-green-500 mr-1.5" />
              One-Time Use
            </span>
            <span className="flex items-center">
              <Truck className="w-4 h-4 text-green-500 mr-1.5" />
              Free Shipping
            </span>
            <span className="flex items-center">
              <UserPlus className="w-4 h-4 text-green-500 mr-1.5" />
              New Customer Only
            </span>
            <span className="flex items-center">
              <Infinity className="w-4 h-4 text-green-500 mr-1.5" />
              Limited/Unlimited
            </span>
          </div>

          {/* "Try It Now" Button (calls the function to switch view) */}
          <button
            onClick={onCreateClick}
            className="flex items-center justify-center px-6 py-3 rounded-xl text-white font-medium transition-all transform hover:scale-[1.02] bg-gradient-to-r from-indigo-600 to-purple-600"
          >
            Try It Now →
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateDiscountCard;
