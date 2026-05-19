import React from "react";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import MiddleBody from "@/components/checkout/middleBody";

const CheckoutPage = () => {
  return (
    <>
      <Navbar />
      <MiddleBody />
      <Footer />
    </>
  );
};

export default CheckoutPage;
