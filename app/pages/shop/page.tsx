import React from "react";

import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import Header from "@/components/shop/header";
import MiddleBody from "@/components/shop/middleBody";

const text = () => {
  return (
    <>
      <Navbar />
      <Header title="Shop" />
      <MiddleBody />
      <Footer />
    </>
  );
};

export default text;
