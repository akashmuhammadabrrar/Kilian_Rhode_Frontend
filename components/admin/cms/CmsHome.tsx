import React from "react";
import HomeHeroBanner from "@/components/admin/cms/HomeHeroBanner";
import CmsHomeMidPageBanner from "@/components/admin/cms/CmsHomeMidPageBanner";
import CmsHomeProductSystem from "@/components/admin/cms/CmsHomeProductSystem";
import CmsHomeTechknolodgy from "@/components/admin/cms/CmsHomeTechknology";
import CmsHomeFeatureIcon from "@/components/admin/cms/CmsHomeFeatureIcon";
const CmsHome = () => {
  return (
    <>
      <HomeHeroBanner />
      <div className="grid grid-cols-1 lg:grid-cols-1 md:grid-cols-2 ">
        <CmsHomeMidPageBanner />
        <CmsHomeProductSystem />
        <CmsHomeTechknolodgy />
        <CmsHomeFeatureIcon />
      </div>
    </>
  );
};

export default CmsHome;
