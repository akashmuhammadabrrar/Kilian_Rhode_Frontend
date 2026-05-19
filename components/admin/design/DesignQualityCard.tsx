import React from "react";
import aiIcon from "@/public/image/admin/DesignQuality/aiIcon.svg";
import rightIcon from "@/public/image/admin/DesignQuality/rightIcon.svg";
import toggoleIcon from "@/public/image/admin/DesignQuality/toggolIcon.svg";
import Image, { StaticImageData } from "next/image";

// --- Props Type for StatCard ---
type StatCardProps = {
  iconBg: string;
  icon: StaticImageData; // imported SVGs are typed as StaticImageData
  value: string | number;
  label: string;
  trend: string;
  trendColor: string;
};

// --- StatCard Component ---
const StatCard: React.FC<StatCardProps> = ({
  iconBg,
  icon,
  value,
  label,
  trend,
  trendColor,
}) => {
  return (
    <div className="bg-white p-6 rounded-xl border border-[#E8E3DC] flex-1 min-w-[280px]">
      <div
        className={`w-10 h-10 mb-4 rounded-lg flex items-center justify-center ${iconBg}`}
      >
        <Image src={icon} alt={`${label} Icon`} className="w-6 h-6" />
      </div>
      <div className="text-4xl font-semibold text-gray-900 mb-1">{value}</div>
      <div className="text-sm text-gray-500 mb-2">{label}</div>
      <div className={`text-sm font-medium ${trendColor}`}>{trend}</div>
    </div>
  );
};

// --- DesignStats Component ---
const DesignStats: React.FC = () => {
  return (
    <div className="mt-4 bg-gray-50">
      <div className="flex flex-wrap gap-6 justify-center lg:justify-start">
        <StatCard
          iconBg="bg-[#f5eee6]"
          icon={aiIcon}
          value="432"
          label="AI Designs Generated"
          trend="+23.1% this month"
          trendColor="text-green-600"
        />
        <StatCard
          iconBg="bg-[#e6f4e9]"
          icon={rightIcon}
          value="98.5%"
          label="Quality Pass Rate"
          trend="+2.3% improvement"
          trendColor="text-green-600"
        />
        <StatCard
          iconBg="bg-[#e6f0ff]"
          icon={toggoleIcon}
          value="284"
          label="Manual Designs Created"
          trend="+18.4% this month"
          trendColor="text-green-600"
        />
      </div>
    </div>
  );
};

export default DesignStats;
