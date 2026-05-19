import React from "react";
import Swal from "sweetalert2";

// ---------------------------
// Promotions Data
// ---------------------------
const promotionsData = [
  {
    id: 1,
    name: "Summer Sale 2025",
    code: "SUMMER25",
    discount: "25% OFF",
    uses: "234 uses",
  },
  {
    id: 2,
    name: "First Order Discount",
    code: "WELCOME15",
    discount: "15% OFF",
    uses: "189 uses",
  },
  {
    id: 3,
    name: "AI Design Special",
    code: "AIART20",
    discount: "20% OFF",
    uses: "156 uses",
  },
  {
    id: 4,
    name: "Bundle Deal",
    code: "BUNDLE30",
    discount: "30% OFF",
    uses: "98 uses",
  },
];

// ---------------------------
// Props Interface for Promotion Item
// ---------------------------
interface PromotionItemProps {
  name: string;
  code: string;
  discount: string;
  uses: string;
  isLast: boolean;
}

// ---------------------------
// Single Promotion Item
// ---------------------------
const PromotionItem: React.FC<PromotionItemProps> = ({
  name,
  code,
  discount,
  uses,
  isLast,
}) => (
  <div
    className={`py-4 ${
      !isLast ? "border-b border-gray-200" : ""
    } flex justify-between items-center`}
  >
    {/* Title + Code */}
    <div className="flex flex-col">
      <p className="text-gray-900 font-medium">{name}</p>
      <p className="text-sm text-gray-500 mt-0.5">
        Code: <span className="font-mono text-xs uppercase">{code}</span>
      </p>
    </div>

    {/* Discount + Uses */}
    <div className="flex flex-col items-end">
      <p className="text-sm font-semibold text-orange-600">{discount}</p>
      <p className="text-xs text-gray-500 mt-0.5">{uses}</p>
    </div>
  </div>
);

// ---------------------------
// Main Page Component
// ---------------------------
const ActivePromotionsPage: React.FC = () => {
  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();

    setTimeout(() => {
      Swal.fire({
        title: "Promotion created successfully! 🎉",
        text: "Your new promotion has been added.",
        icon: "success",
        confirmButtonText: "Close",
        confirmButtonColor: "#8B6A47",
        timer: 2500,
        timerProgressBar: true,
      });
    }, 500);
  };

  return (
    <div className="mt-4 bg-gray-50">
      <div>
        {/* Card Container */}
        <div className="bg-white rounded-xl border-[1.2px] border-[#e8e3dc]">
          {/* Header */}
          <div className="p-6 flex justify-between items-center border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">
              Active Promotions
            </h2>

            <button
              onClick={handleSave}
              className="flex items-center space-x-2 bg-[#8B6F47] hover:bg-yellow-800 text-white font-medium py-2.5 px-4 rounded-lg shadow-md transition duration-150"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 4v16m8-8H4"
                />
              </svg>
              <span>Create Promotion</span>
            </button>
          </div>

          {/* Promotion List */}
          <div className="p-6">
            {promotionsData.map((promo, index) => (
              <PromotionItem
                key={promo.id}
                name={promo.name}
                code={promo.code}
                discount={promo.discount}
                uses={promo.uses}
                isLast={index === promotionsData.length - 1}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActivePromotionsPage;
