import Footer from "@/components/layout/footer";
import Navbar from "@/components/layout/navbar";

import Header from "@/components/save-products-body/header";
import MiddleBoddy from "@/components/save-products-body/middeleBody";
import React from "react";

const page = () => {
  return (
    <>
      <Navbar />
      <Header title="SAVED PRODUCTS" />
      <MiddleBoddy />
      <Footer />
    </>
  );
};

export default page;
