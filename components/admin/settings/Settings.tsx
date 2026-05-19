import React from "react";
import Title from "./Title";
import SettingsBody from "@/components/admin/settings/SettingsBody";
import Footer from "./FooterAdmin";

const App = () => {
  return (
    <>
      <div className="pt-8 sm:p-10 w-full mb-4 bg-gray-50">
        <div className="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0 mb-6">
          <Title
            text="Marketing & Settings"
            paragraph="Manage your store settings, promotions, and marketing campaigns"
          />
        </div>
        <div className="px-4 lg:px-0">
          <SettingsBody />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default App;
