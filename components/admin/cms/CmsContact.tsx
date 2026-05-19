import React from "react";
import ContactInfoForm from "./ContactInfo";
import SocialMediaLinksForm from "./SocialMediaLink";
import ContactCard from "./ContactInfoPreview";

const CmsContact = () => {
  return (
    // Outer container: Added padding and max-width for overall layout
    <div>
      <div className="w-full flex flex-col md:flex-row gap-8 items-start">
        {/* Contact Information Form - Takes full width of the column */}
        <div className="w-full">
          <ContactInfoForm />
        </div>

        {/* Social Media Links Form - Takes full width of the column */}
        <div className="w-full">
          <SocialMediaLinksForm />
        </div>
      </div>
      <div className="mt-6">
        <ContactCard />
      </div>
    </div>
  );
};

export default CmsContact;
