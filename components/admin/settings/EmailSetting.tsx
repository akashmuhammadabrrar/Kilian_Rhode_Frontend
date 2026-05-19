// app/components/EmailSettingsFormCombined.tsx
"use client";
import Image from "next/image";
import { useState } from "react";
import emailIcon from "@/public/image/admin/Settings/email.svg";
import EmailStatisticsCard from "./EmailStatus";

type FormState = {
  campaignName: string;
  subjectLine: string;
  emailContent: string;
  senderEmail: string;
  sendImmediately: boolean;
  sendDate: string;
  sendTime: string;
  newsletterEnabled: boolean;
  orderNotificationsEnabled: boolean;
};

export default function EmailSettingsForm() {
  const [formState, setFormState] = useState<FormState>({
    campaignName: "Q4 Holiday Newsletter",
    subjectLine: "",
    emailContent: "",
    senderEmail: "noreply@yourcompany.com",
    sendImmediately: true,
    sendDate: "",
    sendTime: "",
    newsletterEnabled: true,
    orderNotificationsEnabled: true,
  });

  // Proper event type
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Submitting form:", formState);
  };

  // Removed "any", using strict type
  const handleChange = <K extends keyof FormState>(
    key: K,
    value: FormState[K]
  ) => {
    setFormState((prev) => ({ ...prev, [key]: value }));
  };

  // Input Field
  const renderTextField = (
    label: string,
    name: keyof FormState,
    type: string = "text",
    placeholder?: string,
    value?: string,
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void,
    description?: string
  ) => (
    <div className="w-full">
      <label
        htmlFor={name}
        className="block text-sm font-semibold text-[#1a1410] mb-1"
      >
        {label}
      </label>

      <input
        type={type}
        name={name}
        id={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="block w-full rounded-lg border border-[#e8e3dc] p-3 text-base placeholder-gray-400
                   focus:outline-none bg-[#f3f3f5] transition duration-150 ease-in-out"
      />

      {description && (
        <p className="mt-2 text-sm text-gray-500">{description}</p>
      )}
    </div>
  );

  // TextArea
  const renderTextArea = (
    label: string,
    name: keyof FormState,
    placeholder?: string,
    value?: string,
    onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
  ) => (
    <div className="w-full">
      <label
        htmlFor={name}
        className="block text-sm font-semibold text-[#1a1410] mb-1"
      >
        {label}
      </label>

      <textarea
        name={name}
        id={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        rows={10}
        className="block w-full rounded-lg border border-[#e8e3dc] p-3 text-base placeholder-gray-400
                   focus:outline-none bg-[#f3f3f5] resize-y transition duration-150 ease-in-out"
      />
    </div>
  );

  // Toggle switch — FIXED aria support warning
  const renderToggleSwitch = (
    label: string,
    description: string,
    checked: boolean,
    onChange: (checked: boolean) => void
  ) => (
    <div className="flex items-center justify-between py-3 px-4 rounded-xl bg-[#faf9f7]">
      <div className="max-w-sm">
        <h3 className="text-[15px] font-semibold text-gray-900">{label}</h3>
        <p className="text-sm text-gray-600 mt-0.5">{description}</p>
      </div>

      <button
        type="button"
        role="switch" // FIXED: adds valid aria role
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className={`${
          checked ? "bg-[#000000]" : "bg-gray-300"
        } relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full 
        border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none`}
      >
        <span className="sr-only">{label} status</span>
        <span
          aria-hidden="true"
          className={`${
            checked ? "translate-x-5" : "translate-x-0"
          } pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-md ring-0 
          transition duration-200 ease-in-out`}
        />
      </button>
    </div>
  );

  return (
    <div className="bg-white border-[1.2px] border-[#e8e3dc] rounded-xl">
      {/* Header */}
      <div className="p-6 flex items-center border-b border-[#e8e3dc] gap-2">
        <Image src={emailIcon} alt="email" height={20} width={20} />
        <h1 className="text-[#1a1410] font-medium text-[18px] leading-tight">
          Email Campaign Settings
        </h1>
      </div>

      <form onSubmit={handleSubmit}>
        {/* Inputs */}
        <div className="space-y-6 p-6">
          {renderTextField(
            "Campaign Name",
            "campaignName",
            "text",
            "e.g., Monthly Newsletter",
            formState.campaignName,
            (e) => handleChange("campaignName", e.target.value)
          )}

          {renderTextField(
            "Subject Line",
            "subjectLine",
            "text",
            "Enter email subject",
            formState.subjectLine,
            (e) => handleChange("subjectLine", e.target.value)
          )}

          {renderTextArea(
            "Email Content",
            "emailContent",
            "Enter your email message...",
            formState.emailContent,
            (e) => handleChange("emailContent", e.target.value)
          )}
        </div>

        {/* Toggles */}
        <div className="space-y-4 p-6">
          {renderToggleSwitch(
            "Newsletter Enabled",
            "Send regular newsletters to subscribers",
            formState.newsletterEnabled,
            (checked) => handleChange("newsletterEnabled", checked)
          )}

          {renderToggleSwitch(
            "Order Notifications",
            "Send order confirmation emails",
            formState.orderNotificationsEnabled,
            (checked) => handleChange("orderNotificationsEnabled", checked)
          )}
        </div>
      </form>

      <div className="space-y-6 p-6">
        <EmailStatisticsCard />
      </div>
    </div>
  );
}
