import React from "react";
import Swal from "sweetalert2"; // Make sure sweetalert2 is installed: npm install sweetalert2
import Image from "next/image";

// Correct icon path (Next.js)
import earthIcon from "@/public/image/admin/Settings/earthIcon.svg";

// ---------------- ToggleSwitch Component ----------------

interface ToggleSwitchProps {
  label: string;
  description: string;
  isChecked: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const ToggleSwitch: React.FC<ToggleSwitchProps> = ({
  label,
  description,
  isChecked,
  onChange,
}) => (
  <div className="flex items-center bg-[#FAF9F7] rounded-xl px-4 justify-between py-4">
    <div>
      <p className="text-gray-900 font-medium">{label}</p>
      <p className="text-gray-500 text-sm">{description}</p>
    </div>

    <label className="relative inline-flex items-center cursor-pointer">
      <input
        type="checkbox"
        checked={isChecked}
        onChange={onChange}
        className="sr-only peer"
      />
      <div
        className="w-11 h-6 bg-gray-200 rounded-full peer after:content-[''] 
        after:absolute after:top-[2px] after:start-[2px] after:w-5 after:h-5 
        after:bg-white after:border after:border-gray-300 after:rounded-full 
        after:transition-all peer-checked:bg-black peer-checked:after:translate-x-full"
      ></div>
    </label>
  </div>
);

// ---------------- StoreInformationForm Component ----------------

const StoreInformationForm: React.FC = () => {
  const [storeData, setStoreData] = React.useState({
    name: "Thundra",
    description: "Premium custom apparel with AI-powered design capabilities",
    email: "info@thomdre.com",
    phone: "+49 123 456 7890",
    address: "Berlin, Germany",
    storeOnline: true,
    acceptNewOrders: true,
  });

  const handleToggleChange =
    (field: "storeOnline" | "acceptNewOrders") =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setStoreData((prev) => ({
        ...prev,
        [field]: event.target.checked,
      }));
    };

  // Save button handler
  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Saving changes...", storeData);

    setTimeout(() => {
      Swal.fire({
        title: "Changes Saved! 🎉",
        text: "Your store information has been updated successfully.",
        icon: "success",
        confirmButtonText: "Close",
        confirmButtonColor: "#8B6A47",
        timer: 2500,
        timerProgressBar: true,
      });
    }, 500);
  };

  const inputClasses =
    "w-full px-3 py-2 bg-[#F3F3F5] text-gray-900 border border-[#E8E3DC] rounded-lg focus:outline-none placeholder-gray-500";

  return (
    <div className="flex justify-center">
      <div className="w-full bg-white p-6 sm:p-8 rounded-xl border border-gray-200">
        {/* Header */}
        <header className="flex items-center gap-2 text-lg font-medium text-gray-700 pb-4 border-b border-gray-100">
          <Image src={earthIcon} alt="icon" height={20} width={20} />
          Store Information
        </header>

        {/* Form */}
        <form className="mt-6 space-y-6" onSubmit={handleSave}>
          {/* Store Name */}
          <div>
            <label
              htmlFor="storeName"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Store Name
            </label>
            <input
              type="text"
              id="storeName"
              value={storeData.name}
              onChange={(e) =>
                setStoreData({ ...storeData, name: e.target.value })
              }
              className={inputClasses}
            />
          </div>

          {/* Description */}
          <div>
            <label
              htmlFor="storeDescription"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Store Description
            </label>
            <textarea
              id="storeDescription"
              rows={3}
              value={storeData.description}
              onChange={(e) =>
                setStoreData({ ...storeData, description: e.target.value })
              }
              className={`${inputClasses} resize-none`}
            ></textarea>
          </div>

          {/* Email + Phone */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label
                htmlFor="contactEmail"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Contact Email
              </label>
              <input
                type="email"
                id="contactEmail"
                value={storeData.email}
                readOnly
                className={inputClasses}
              />
            </div>

            <div>
              <label
                htmlFor="supportPhone"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Support Phone
              </label>
              <input
                type="tel"
                id="supportPhone"
                value={storeData.phone}
                onChange={(e) =>
                  setStoreData({ ...storeData, phone: e.target.value })
                }
                className={inputClasses}
              />
            </div>
          </div>

          {/* Address */}
          <div>
            <label
              htmlFor="storeAddress"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Store Address
            </label>
            <input
              type="text"
              id="storeAddress"
              value={storeData.address}
              onChange={(e) =>
                setStoreData({ ...storeData, address: e.target.value })
              }
              className={inputClasses}
            />
          </div>

          {/* Toggles */}
          <ToggleSwitch
            label="Store Online"
            description="Make store accessible to customers"
            isChecked={storeData.storeOnline}
            onChange={handleToggleChange("storeOnline")}
          />

          <ToggleSwitch
            label="Accept New Orders"
            description="Enable order placement"
            isChecked={storeData.acceptNewOrders}
            onChange={handleToggleChange("acceptNewOrders")}
          />

          {/* Save Button */}
          <div className="pt-2">
            <button
              type="submit"
              className="w-full flex justify-center py-3 px-4 rounded-lg bg-[#8B6A47] text-base font-medium text-white"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default StoreInformationForm;
