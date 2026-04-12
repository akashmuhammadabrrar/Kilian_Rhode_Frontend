import React from "react";
import persentage from "@/public/image/admin/Settings/persentage.svg";
import Image from "next/image";
import PromotionBody from "@/components/admin/PromotionBody";
import { formatCurrency } from "@/utils/formatCurrency";

// ---------------------------
// Types
// ---------------------------
interface MetricCardProps {
  iconBg: string;
  icon: React.ReactNode;
  value: string | number;
  label: string;
}

// ---------------------------
// Metric Card Component
// ---------------------------
const MetricCard: React.FC<MetricCardProps> = ({
  iconBg,
  icon,
  value,
  label,
}) => (
  <div className="bg-white p-6 rounded-xl border-[1.2px] border-[#E8E3DC] flex flex-col justify-between h-full">
    {/* Icon */}
    <div
      className={`w-12 h-12 flex items-center justify-center rounded-lg ${iconBg}`}
    >
      {icon}
    </div>

    {/* Value + Label */}
    <div className="mt-8">
      <p className="text-2xl font-semibold text-gray-900">{value}</p>
      <p className="text-[14px] text-[#6b6560] mt-1">{label}</p>
    </div>
  </div>
);

// ---------------------------
// Dashboard Metrics Component
// ---------------------------
const DashboardMetrics: React.FC = () => {
  const metrics = [
    {
      id: 1,
      value: "12",
      label: "Active Promotions",
      iconBg: "bg-yellow-50",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 text-yellow-800"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
          />
        </svg>
      ),
    },
    {
      id: 2,
      value: formatCurrency("2847"),
      label: "Discount Revenue",
      iconBg: "bg-green-50",
      icon: <Image src={persentage} height={20} width={20} alt="persentage" />,
    },
    {
      id: 3,
      value: "34.2%",
      label: "Conversion Rate",
      iconBg: "bg-blue-50",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 text-blue-600"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
          />
        </svg>
      ),
    },
  ];

  return (
    <div className="bg-gray-50">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {metrics.map((metric) => (
          <MetricCard
            key={metric.id}
            iconBg={metric.iconBg}
            icon={metric.icon}
            value={metric.value}
            label={metric.label}
          />
        ))}
      </div>

      <div>
        <PromotionBody />
      </div>
    </div>
  );
};

export default DashboardMetrics;
