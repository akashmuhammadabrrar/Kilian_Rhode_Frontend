import React from "react";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import MiddleBody from "@/components/shipping/middleBody";

const page = () => {
  return (
    <>
      <Navbar />
      <MiddleBody />
      <Footer />
    </>
  );
};

export default page;
