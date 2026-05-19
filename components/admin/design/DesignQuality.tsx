import React from "react";
import Title from "../Title";
import InfoBox from "./InfoBox";
import AISettingsForm from "../settings/AiSettingForm";
import QualitySettingsForm from "../settings/QualitySettingsForm";
import DesignQualityCard from "./DesignQualityCard";
import Footer from "../FooterAdmin";

// --- Main App Component ---
const App = () => {
  return (
    <>
      <div className="pt-8 mb-4 sm:p-10 w-full bg-gray-50">
        <div className="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0 mb-6">
          <Title
            text="Design Quality & AI Settings"
            paragraph="Manage AI image generation and print quality settings"
          />
        </div>

        <div className="px-4">
          <div>
            <InfoBox />
          </div>
          <div className="flex flex-col md:flex-row md:space-x-8 space-y-6 md:space-y-0 justify-center items-start">
            <div className="w-full md:w-1/2  ">
              <AISettingsForm />
            </div>
            <div className="w-full md:w-1/2  ">
              <QualitySettingsForm />
            </div>
          </div>
          <div>
            <DesignQualityCard />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default App;
