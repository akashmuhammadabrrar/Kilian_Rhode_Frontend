import React from "react";

import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import MyCreationBody from "@/app/pages/my-creation/myCreationBody";

const page = () => {
  return (
    <>
      <Navbar />
      <MyCreationBody />
      <Footer />
    </>
  );
};

export default page;
