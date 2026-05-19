import React from "react";
import Navber from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import CreateDesignHeader from "@/components/customizer/createDesignHeader";
import LivePreview from "@/components/customizer/livePreview";

const page = () => {
  return (
    <>
      <Navber />
      <CreateDesignHeader />
      <LivePreview />
      <Footer />
    </>
  );
};

export default page;
