import React from "react";
import Navbar from "@/components/layout/navbar";
import CollecttionSections from "@/components/home/collecttionSections";
import CustomDesignStudio from "@/components/customizer/customStdio";
import WhyChooseTundra from "@/components/home/whyChooseThanda";
import OurStory from "@/components/home/ourStory";
import StayInspiredSection from "@/components/home/stayInspiredSection";
import Footer from "@/components/layout/footer";
import FeaturesSection from "@/components/home/featureSection";
const page = () => {
  return (
    <>
      <Navbar />
      <CollecttionSections />
      <CustomDesignStudio />
      <WhyChooseTundra />
      <OurStory />
      <FeaturesSection />
      <StayInspiredSection />
      <Footer />

      {/* <FutureProduct /> */}
      {/* <CreateAccount /> */}
      {/* <Login /> */}
      {/* <ForgotPassword /> */}
    </>
  );
};

export default page;
